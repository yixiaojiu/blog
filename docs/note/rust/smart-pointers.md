# 智能指针

## Box

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

## 裸指针

```rust
fn main() {
    let num = 1;
    let raw_point = &num as *const i32;
    // 解引用时必须用 unsafe 包裹
    let point = unsafe { *raw_point };
}
```

## Rc

```rust
let string = Rc::new(String::from("Hello, World!"));
let vec = vec![Rc::clone(&string)];
println!("ref num: {}", Rc::strong_count(&string)); // 2
```

## Cell 与 RefCell

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
