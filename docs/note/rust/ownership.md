# 所有权

## 所有权规则

- Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
- 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
- 当所有者(变量)离开作用域范围时，这个值将被丢弃(drop)

## 借用规则

- **同一时刻**，你只能拥有要么一个可变引用, 要么任意多个不可变引用
- 引用必须总是有效的

## 案例

### 存在借用时，不能转移所有权

```rust
fn main() {
    let string = String::from("hello");
    let borrow_string = &string;
    // Error(E0505): cannot move out of `string` because it is borrowed
    let new_owner = string;
    println!("ref_str: {}", borrow_string);
}
```
