# 杂货箱

## clap 输入 flag 但不输入值

[default_missing_value](https://docs.rs/clap/latest/clap/struct.Arg.html#method.default_missing_value)

```rust
#[derive(Args, Debug)]
#[command(version, about, long_about = None)]
pub struct SendArgs {
    // An equal sign must be added, For example "-m=hello"
    #[arg(short, long, value_name = "message", require_equals = true, num_args = 0..=1, default_missing_value = "")]
    pub message: Option<String>,

}
```

## 多线程中使用 `tokio::sync::oneshot::Sender`

例如，定义一个异步的 web server，在请求的处理函数中使用 `close_server_tx`，会报出 `close_server_tx` 未实现 Copy trait，不能拿走 `close_server_tx` 所有权的错误。

```rust
struct ReceiverServer {
    close_server_tx: Arc<Mutex<oneshot::Sender<()>>>,
}
```

可以给 `oneshot::Sender<()>` 包裹一个 Option

```rust
struct ReceiverServer {
    close_server_tx: Arc<Mutex<Option<oneshot::Sender<()>>>>,
}
```

可以这样使用 `close_server_tx`

```rust
struct ReceiverServer {
    close_server_tx: Arc<Mutex<Option<oneshot::Sender<()>>>>,
}

impl ReceiverServer {
    async fn post_upload(self) {
        if let Some(close_udp_tx) = self.close_udp_tx.lock().await.take() {
            if let Err(e) = close_udp_tx.send(()) {
                eprintln!("Error: {:?}", e);
            };
        }
    }
}
```
