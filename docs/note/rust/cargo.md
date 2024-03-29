# Cargo

## Workspace

```toml
[workspace]
members = ["foo", "bar"]
```

运行 `bar`

```sh
cargo run -p bar
```

## 别名

```toml
[alias]
bar = "cargo run -p bar --"
```

运行 `bar`

```sh
cargo bar -p ./git
```

## build 脚本

[官方文档](https://doc.rust-lang.org/stable/cargo/reference/build-scripts.html)

[Rust 语言圣经](https://course.rs/cargo/reference/build-script/intro.html)

### 常用

```rust
fn main() {
  // 当指定路径的文件发生变化时，Cargo 会重新运行脚本
  // 以文件的 last-modified timestamp 作为依据
  println!("cargo:rerun-if-changed=PATH");
}
```

## 详细错误信息

```sh
RUST_BACKTRACE=1 cargo run
```
