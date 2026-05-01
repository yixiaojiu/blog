# Mac Sunshine 串流设置

## 配置声音

Mac 上用 Sunshine 串流给 Moonlight 时，系统声音不会像 Windows 那样天然被捕捉。这里使用 `BlackHole 2ch` 把系统输出回环成一个输入设备，再让 Sunshine 捕捉这个输入。

### 安装 BlackHole 2ch

```sh
brew install blackhole-2ch
```

安装完成后需要重启 Mac。重启之后再打开系统声音设置，确认能看到 `BlackHole 2ch`。

如果没有看到，可以检查：

- `系统设置` -> `隐私与安全性`，底部是否有被拦截的系统软件需要允许。
- 重新安装后再重启：

```sh
brew reinstall blackhole-2ch
```

### 设置 Mac 声音

打开：

```text
系统设置 -> 声音
```

在 `输出` 里选择：

```text
BlackHole 2ch
```

在 `输入` 里也选择：

```text
BlackHole 2ch
```

然后把 `输入音量` 拉满。

这是很关键的一步：`BlackHole 2ch` 是虚拟输入设备，但 macOS 的输入音量滑杆仍然会影响 Sunshine 捕捉到的音量。如果输入音量太低，Moonlight 里可能几乎听不到声音。

设置好后可以播放一段音乐，看 `输入电平` 是否跳动。只要 `BlackHole 2ch` 的输入电平会跳动，就说明系统声音已经进入 BlackHole。

注意：输出选择 `BlackHole 2ch` 后，Mac 本机通常听不到声音，这是正常现象。这个配置的目标是优先保证 Moonlight 端能听到声音。

### 设置 Sunshine

打开 Sunshine Web UI：

```text
https://localhost:47990
```

进入：

```text
Configuration -> Audio/Video
```

设置：

```text
Stream Audio = enabled
Audio Sink = BlackHole 2ch
Virtual Sink = 留空
```

保存配置后，彻底重启 Sunshine，再重新用 Moonlight 连接。

### iTerm 启动时的权限

如果是用 iTerm 命令行启动 Sunshine，需要给 iTerm 开权限。

打开：

```text
系统设置 -> 隐私与安全性
```

确认这些权限里允许了 iTerm：

- `麦克风`
- `屏幕与系统音频录制`
- `辅助功能`
- `输入监控`

改完权限后，要完全退出 Sunshine 和 iTerm，再重新打开 iTerm 启动 Sunshine。

如果麦克风权限状态异常，可以重置后重新授权：

```sh
tccutil reset Microphone com.googlecode.iterm2
```

### Windows Moonlight 检查

如果 Mac 侧确认 `BlackHole 2ch` 输入电平会跳动，但 Windows 里还是没声音，检查 Windows：

```text
设置 -> 系统 -> 声音 -> 音量混合器
```

确认：

- `Moonlight` 没有被静音。
- 输出设备是当前正在使用的耳机或音箱。
- Moonlight 自己的音频设置没有关闭。

## 声音卡顿

如果 Windows 端能听到声音，但音乐播放听起来一卡一卡的，不一定是音频码率太低。Sunshine 的音频通常使用 Opus 编码，如果日志里已经出现类似下面的内容，音频码率本身一般是够用的：

```text
Info: Opus initialized: 48 kHz, 2 channels, 512 kbps (total), LOWDELAY
```

这种卡顿更可能是视频串流占用了太多网络带宽，导致音频包也跟着抖动。

可以先在 Sunshine 配置里限制最大视频码率：

```text
max_bitrate = 55000
```

这里的单位是 Kbps，`55000` 大约是 `55 Mbps`。

然后在 Windows 的 Moonlight 里，把请求码率也调低一些。调整后如果声音明显变顺，说明问题主要在网络带宽或抖动，不是 `BlackHole 2ch` 或 Opus 音频编码本身。

## 常见日志

### opening microphone '' failed

```text
Error: opening microphone '' failed. Please set a valid input source in the Sunshine config.
```

这通常表示 Sunshine 没有拿到有效的音频输入源。检查 Sunshine 配置：

```text
Audio Sink = BlackHole 2ch
```

还要确认 `系统设置 -> 声音 -> 输入` 里能看到并选中了 `BlackHole 2ch`。

### Unable to initialize audio capture

```text
Error: Unable to initialize audio capture. The stream will not have audio.
```

这表示 Sunshine 初始化音频捕捉失败。优先检查：

- iTerm 是否有 `麦克风` 权限。
- Sunshine 是否彻底重启过。
- `BlackHole 2ch` 是否出现在可用输入设备里。
- `BlackHole 2ch` 的输入音量是否拉满。

### set_sink unimplemented

```text
Warning: audio_control_t::set_sink() unimplemented: BlackHole 2ch
```

这个日志表示 Sunshine 在 macOS 上不能自动切换系统输出设备。只要已经手动在 macOS 的 `声音 -> 输出` 里选择了 `BlackHole 2ch`，并且 Sunshine 后续出现了类似下面的日志，就可以先忽略：

```text
Info: Opus initialized: 48 kHz, 2 channels, 512 kbps (total), LOWDELAY
```

`Opus initialized` 表示音频流已经开始编码。

### Encoder did not produce IDR frame

```text
Error: Encoder did not produce IDR frame when requested!
```

这是视频编码相关日志，`IDR frame` 是视频关键帧。它可能影响画面刷新、黑屏、卡顿或花屏，但和 Moonlight 没有声音通常没有关系。
