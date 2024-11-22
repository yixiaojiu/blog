# 基础

## 所有权

### 所有权规则

- Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
- 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
- 当所有者(变量)离开作用域范围时，这个值将被丢弃(drop)

### 借用规则

- **同一时刻**，你只能拥有要么一个可变引用, 要么任意多个不可变引用
- 引用必须总是有效的

**案例** 存在借用时，不能转移所有权

```rust
fn main() {
    let string = String::from("hello");
    let borrow_string = &string;
    // Error(E0505): cannot move out of `string` because it is borrowed
    let new_owner = string;
    println!("ref_str: {}", borrow_string);
}
```

## 智能指针

### Box

将数据存储在堆上

使用场景：

- 在编译时无法确定大小
- 数据太大 Copy 浪费资源
- 想要 dyn Trait Object 而不是具体的类型

```rust
trait Animal {
    fn eat(&self);
}

struct Cat {
    children: Option<Box<Cat>>,
}

impl Animal for Cat {
    fn eat(&self) {
        println!("I'm eating");
    }
}

fn main() {
    let cat: Box<dyn Animal>;
    cat = Box::new(Cat {
        children: Some(Box::new(Cat { children: None })),
    });
    cat.eat();
}

```

### 裸指针

```rust
fn main() {
    let num = 1;
    let raw_point = &num as *const i32;
    // 解引用时必须用 unsafe 包裹
    let point = unsafe { *raw_point };
}
```

### Rc

```rust
// 可以直接当 String 类型使用
let string = Rc::new(String::from("Hello, World!"));
let vec = vec![Rc::clone(&string)];
println!("ref num: {}", Rc::strong_count(&string)); // 2
```

- Rc 单线程， Arc 多线程
- Rc 与 Arc 都是只读，想要修改想要配合 Cell 与 RefCell

### Cell 与 RefCell

提供了内部可变性

```rust
fn main() {
    let cell = Cell::new("bar");
    let bar = cell.get();
    cell.set("foo");
    let foo = cell.get();
}
```

```rust
let ref_cell = RefCell::new(String::from("hello"));
{
    let mut s = ref_cell.borrow_mut();
    s.push_str(" world");
}
let s = ref_cell.borrow();
println!("{}", s);
```

同一作用域不能同时 `borrow_mut` 与 `borrow`

## 泛型

```rust
trait Foo {
    type Item;
    fn foo(&self) -> Self::Item;
}
fn bar<T: Foo<Item = i32>>(item: T) {
    let num = item.foo();
}
```

## Copy 与 Clone

[Copy 和 Clone 有什么区别](https://skyao.io/learning-rust/std/marker/copy/std-doc/#copy-%E5%92%8C-clone-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

Copy 是隐形发生的，Clone 是显性发生的，例如 `x.clone()`

只有基本类型可以实现 Copy，例如:

```rust
#[derive(Copy)]
struct Point {
   x: i32,
   y: i32,
}

// 这个 struct 不能实现 Copy
#[derive(Copy)]
struct Bar {
    bar: String,
}
```

## 实现 Future

```rust
use std::{future::Future, pin::Pin, time::Duration};
use tokio::time::sleep;

struct Task {
    time: Duration,
    task: Option<Pin<Box<tokio::time::Sleep>>>,
}

impl Future for Task {
    type Output = ();

    fn poll(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Self::Output> {
        if self.task.is_none() {
            let task = Box::pin(sleep(self.time));
            self.task.replace(task);
        }

        match self.task.as_mut().unwrap().as_mut().poll(cx) {
            std::task::Poll::Pending => {
                println!("pending");
                std::task::Poll::Pending
            }
            std::task::Poll::Ready(_) => {
                println!("ready");
                std::task::Poll::Ready(())
            }
        }
    }
}
```
