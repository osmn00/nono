# NONO 

NONO 是一个基于命令行操作的，用于开发无线单页 web 应用的前端脚手架。 

最新版本 `1.0.3`

## 安装：

通过 npm 安装全局的 nono-cli 

```shell
$ sudo npm install -g nono
```

## 基本用法

### 帮助信息

```shell
$ nono -help
```

### 安装 nono 脚手架

 - **step 1**：进入你要安装 nono 脚手架的文件夹

 ```shell
 $ cd your-folder
 ```
 
 - **step 2**：为当前文件夹安装 nono 脚手架
 
    ```shell
    $ nono install
    ```
- **step 3**：初始化 nono 脚手架

    ```shell
    $ nono init
    ```

### nono 脚手架的命令行方法

- **page**：创建\删除 一个页面

    ```shell
    $ nono add p pageName
    $ nono del p pageName
    ```
- **common module**：创建\删除 一个公用模块

    ```shell
    $ nono add c modName
    $ nono del c modName
    ```
    
- **develep**：开启本地调试环境

    ```shell
    $ nono dev
    ```

- **build**：打包资源为发布做准备

    ```shell
    $ nono build
    ```
    
### 目录结构

```
--
  |--node_modules/ 
  |--build/ [发布用文件. 通过 'nono build' 创建]
  |--dist/  [调试用文件. 通过 'nono dev' 创建]
  |--lib/
     |--mbase/
     |--zepto/
  |--src/
     |--commons/ [公用模块目录]
     |--pages/   [页面目录]
  |--LICENSE
  |--README.md
  |--.gitignore
  |--package.json
  |--gulpfile.js
  |--webpack.config.js
  |--webpack.config.prod.js
```
