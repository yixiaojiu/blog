# Deno

## deno_core

ES Module 模块加载

依赖

deno_core = "0.238"

```rust
use std::path::Path;
use std::rc::Rc;

use deno_core::anyhow::Result;
use deno_core::{
    resolve_url_or_path, FsModuleLoader, JsRuntime, PollEventLoopOptions, RuntimeOptions,
};

#[tokio::main]
async fn main() -> Result<()> {
    let options = RuntimeOptions {
        module_loader: Some(Rc::new(FsModuleLoader)),
        ..Default::default()
    };
    let mut rt = JsRuntime::new(options);

    let path = resolve_url_or_path(
        "./examples/basic_module.js",
        &Path::new(env!("CARGO_MANIFEST_DIR")),
    )?;
    let id = rt.load_main_module(&path, None).await?;
    rt.mod_evaluate(id).await?;
    rt.run_event_loop(PollEventLoopOptions::default()).await?;

    Ok(())
}

```

```js
// basic_module.js
import { print } from './base.js'
async function hello() {
  return new Promise((resolve, _) => {
    print('Hello World\n')
    resolve('Return')
  })
}
await hello()

// base.js
Deno.core.print('Resolving module base.js\n')
export function print(anything) {
  Deno.core.print(`${anything}\n`)
}
```

## op

```rust
use std::{path::Path, rc::Rc};

use deno_core::{
    anyhow::{Ok, Result},
    resolve_url_or_path, FsModuleLoader, JsRuntime, RuntimeOptions,
};
use deno_core_live::ops::sleep;

#[tokio::main]
async fn main() -> Result<()> {
    let options = RuntimeOptions {
        module_loader: Some(Rc::new(FsModuleLoader)),
        extensions: vec![sleep::init()],
        ..Default::default()
    };
    let mut rt = JsRuntime::new(options);
    let path = resolve_url_or_path(
        "./examples/sleep.js",
        &Path::new(env!("CARGO_MANIFEST_DIR")),
    )?;
    let id = rt.load_main_module(&path, None).await?;
    rt.mod_evaluate(id).await?;

    Ok(())
}

```

```js
// examples/sleep.js
await sleep(1)
```

```rust
use std::{cell::RefCell, rc::Rc};

use deno_core::{op2, Extension, OpState};
use tokio::time;

#[op2(async)]
async fn op_sleep(_state: Rc<RefCell<OpState>>, secs: u32) {
    println!("Sleeping for {} seconds", secs);
    time::sleep(time::Duration::from_secs(secs as u64)).await;
}

pub fn init() -> Extension {
    deno_core::extension!(deno_sleep, ops = [op_sleep], js = ["./src/ops/sleep.js"]);
    deno_sleep::ext()
}

```

```js
// src/ops/sleep.js
;(() => {
  const sleep = async (ms) => {
    return await Deno.core.opAsync('op_read_file', ms)
  }
  globalThis.sleep = sleep
})()
```
