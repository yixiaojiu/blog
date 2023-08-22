# Expo

## 热更新服务

[custom-expo-updates-server](https://github.com/expo/custom-expo-updates-server)

`publish.sh` 做了以下事情：

1. 在 client 端执行 `expo export --experimental-bundle` 打包静态文件
2. 将打包后的静态文件复制到 `updates` 的一个目录下
3. 根据 client 端到 `app.json` 生成配置文件
