// createView.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const generateFile = (path, data) => {
  if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
    delDir(path)
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function() {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
// 递归删除
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
    errorLog(`正在删除view文件 ${path}`)
  }
}
function dotExistDirectoryCreate(directory) {
  return new Promise(resolve => {
    mkdirs(directory, function() {
      resolve(true)
    })
  })
}

module.exports = function (name, obj) {
  log('\n正在创建View'+ name +'\n')
  let inputName = String(name)
    .trim()
    .toString()
  /**
   * 组件目录路径
   */
  // const componentDirectory = resolve('../src/server', inputName)
  /**
   * vue组件路径
   */
  const componentVueName = resolve('../src/server', `${inputName}.vue`)

  // const hasComponentDirectory = fs.existsSync(componentDirectory)
  // if (hasComponentDirectory) {
  //   errorLog(`${inputName}view目录已存在。`)
  // } else {
  //   log(`\n\r正在生成 view 目录 ${componentDirectory}\n\r`)
  //   dotExistDirectoryCreate(componentDirectory)
  // }
  const viewTemp = `<template>
  <div>
    <${obj.compType} :curData='data'></${obj.compType}>
  </div>
</template>
<script>
import ${obj.compType} from '@/components/server/${obj.compType}'
export default {
  name: 'first',
  components: { ${obj.compType} },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.data = [
      {worker: 'lee1', age: 23, car: 'test1'},
      {worker: 'lee2', age: 23, car: 'test2'},
      {worker: 'lee3', age: 23, car: 'test3'},
      {worker: 'lee4', age: 23, car: 'test4'}
    ]
  }
}
</script>
`
  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
    } else {
      componentName = inputName
    }
    log(`\n正在生成 vue 文件 ${componentVueName}\n`)
    generateFile(componentVueName, viewTemp)
    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }
}