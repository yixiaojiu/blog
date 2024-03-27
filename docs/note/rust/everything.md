# 杂货

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
