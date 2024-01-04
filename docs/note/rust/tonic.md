# tonic

## 实现文件上传

依赖

```toml
[dependencies]
tonic = "0.10"
prost = "0.12"
tokio = { version = "1.0", features = ["rt-multi-thread", "macros", "sync", "time", "fs", "io-util"] }
tokio-stream = "0.1"
async-stream = "0.2"

[build-dependencies]
tonic-build = "0.10"
```

`file.proto`

```proto3
syntax = "proto3";
package file;

service FileDemo {
    rpc UploadFile (stream FileServiceRequest) returns (FileServiceResponse);
}

message FileServiceRequest {
    bytes data = 1;
}

message FileServiceResponse {
}
```

`file_server.rs`

```rust
use file_demo::file_demo_server::{FileDemo, FileDemoServer};
use file_demo::{FileServiceRequest, FileServiceResponse};
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use tokio_stream::StreamExt;
use tonic::{transport::Server, Request, Response, Status};

pub mod file_demo {
    tonic::include_proto!("file");
}

#[derive(Debug, Default)]
pub struct FileService {}

#[tonic::async_trait]
impl FileDemo for FileService {
    async fn upload_file(
        &self,
        request: Request<tonic::Streaming<FileServiceRequest>>,
    ) -> Result<Response<FileServiceResponse>, Status> {
        let filename = request
            .metadata()
            .get("filename")
            .unwrap()
            .to_str()
            .unwrap();
        let mut file = File::create(format!("json/{}", &filename)).await?;

        let mut stream = request.into_inner();
        while let Some(request) = stream.next().await {
            let request = request?;
            let data = request.data;
            println!("Received {} bytes", data.len());
            file.write(&data[..]).await?;
        }

        Ok(Response::new(FileServiceResponse::default()))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "127.0.0.1:50051".parse()?;
    let file_service = FileService::default();

    Server::builder()
        .add_service(FileDemoServer::new(file_service))
        .serve(addr)
        .await?;

    Ok(())
}
```

`file_client.rs`

```rust
use file_demo::file_demo_client::FileDemoClient;
use file_demo::FileServiceRequest;
use tokio::fs::File;
use tokio::io::AsyncReadExt;
use tokio::sync::mpsc;
pub mod file_demo {
    tonic::include_proto!("file");
}
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = FileDemoClient::connect("http://127.0.0.1:50051").await?;
    let mut file = File::open("json/test.json").await?;
    let (tx, rx) = mpsc::channel(100);

    tokio::spawn(async move {
        let mut buf = [0; 100];
        loop {
            let n = file.read(&mut buf).await.unwrap();
            if n == 0 {
                break;
            }
            let req = FileServiceRequest {
                data: buf[..n].to_vec(),
            };
            tx.send(req).await.unwrap();
            println!("Sent {} bytes", n);
        }
    });

    let mut request = tonic::Request::new(tokio_stream::wrappers::ReceiverStream::new(rx));
    request
        .metadata_mut()
        .insert("filename", "receive.json".parse()?);

    client.upload_file(request).await?;

    Ok(())
}
```
