# NONO 

Nono is a Front-End Development Scaffolding based command-line operations for mobile single-page web application develop.

Latest version `1.0.5`

Features：

  - Zepto
  - CommonJS
  - Single Page
  - Gulp
  - WebPack

## Installation：

Install global nono-cli with npm:

```shell
$ sudo npm install -g nono
```

## Basic Usage

### Help Information

```shell
$ nono -help
```

### Install Nono-scaffolding & Develop

 - **step 1**：Enter the folder which will to initialize the nono-scaffolding.

 ```shell
 $ cd your-folder
 ```
 
 - **step 2**：Initialize nono-scaffolding for your folder.
 
    ```shell
    $ nono init
    ```
- **step 3**：Install npm dependencies

    ```shell
    $ npm install
    ```
    
- **step 4**：start the local development environment

    ```shell
    $ nono dev
    ```    
    
- **step 5**：Open browser and enjoy it

    ```
    http://localhost:3001
    ```   
    

### Command For Nono-scaffolding

- **page**：add or delete a page

    ```shell
    $ nono add p pageName
    $ nono del p pageName
    ```
- **common module**：add or delete a common module

    ```shell
    $ nono add c modName
    $ nono del c modName
    ```
    
- **develep**：start the local development environment

    ```shell
    $ nono dev
    ```

- **build**：build the assets for publish

    ```shell
    $ nono build
    ```
    
### Directory Structure

```
--
  |--.gitignore
  |--node_modules/ 
  |--build/ [files for publish. Created by 'nono build']
  |--dist/  [files for develop. Created by 'nono dev']
  |--lib/
     |--mbase/
     |--zepto/
  |--src/
     |--commons/ [common mudules]
     |--pages/   [single pages]
  |--LICENSE
  |--README.md
  |--package.json
  |--gulpfile.js
  |--webpack.config.js
  |--webpack.config.prod.js
```
