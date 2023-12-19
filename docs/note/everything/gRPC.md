# gRPC

## 介绍

gPRC 使用 HTTP/2 进行通信，使用 Protocol Buffers(ProtoBuf) 进行数据序列化和反序列化。

## Node demo

```
// pet.proto
syntax = "proto3";

package pet;

// 服务名为 Adopt
// 方法为 AdoptPet
service Adopt {
  rpc AdoptPet(PetRequest) returns (PetReply) {}
}

// 请求时 需传递type
message PetRequest {
  string type = 1;
}

// 返回体只包含name属性
message PetReply {
  string name = 1;
}
```

```ts
// server.ts
const PROTO_PATH = __dirname + '/pet.proto'

import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
  type UntypedHandleCall,
} from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const pet_proto = loadPackageDefinition(packageDefinition).pet as any

const AdoptPet: UntypedHandleCall = (_: any, callback: any) => {
  callback(null, { name: 'Tom' })
}

function start() {
  const server = new Server()
  server.addService(pet_proto.Adopt.service, { AdoptPet })

  server.bindAsync(
    '127.0.0.1:50052',
    ServerCredentials.createInsecure(),
    () => {
      server.start()
    }
  )
}

start()
```

```ts
// client.ts
const PROTO_PATH = __dirname + '/pet.proto'

import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  defaults: true,
  oneofs: true,
})

const pet_proto = loadPackageDefinition(packageDefinition).pet as any

function main() {
  const target = '127.0.0.1:50052'
  const client = new pet_proto.Adopt(target, credentials.createInsecure())

  client.AdoptPet({ type: 'dog' }, function (error: any, res: any) {
    console.log('pet name:', res.name)
  })
}

main()
```
