const file = './vuesetting',
      serverpath = '../src/server'
      createView = require('./createView'),
      fs = require('fs'),
      chalk = require('chalk'),
      path = require('path');
const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));

function addDir () {
  try{
    if (!fs.existsSync(path.resolve(__dirname, serverpath))) {
      fs.mkdir(path.resolve(__dirname, serverpath),function(error){
        if(error){
          errorLog(error);
          return false;
        }
        successLog('创建server目录成功');
      })
    }
  } catch(err) {throw err}
}
function monitored () {
  addDir()
  fs.readdir(file,function(err,files){
    let setting = {};
    if (!files) {
      fs.mkdir(file,function(error){
        if(error){
            errorLog(error);
            return false;
        }
        successLog(`创建${file}目录成功`);
      })
      monitored()
      return false
    }
    for(let i = 0;i<files.length;i++){
      let filename = files[i];
      let stats = fs.statSync(file + '/'+ filename);
      if(!stats.isDirectory()){
        let curdata = fs.readFileSync(file + '/'+ filename).toString()
        if (curdata) {
          setting[(filename.replace(/.json/, ""))] = JSON.parse(curdata)
        } else {
          setting[(filename.replace(/.json/, ""))] = {}
        }
      }
    }
    let data = ''
    for(let key in setting) {
      if (setting[key].compType === undefined) continue
      data +=  `{ path: '/${key}', name: '${key}', component: require('@/server/${key}').default }, `
      createView(key, setting[key])
    }
    data = `export default [${data.substring(0, data.lastIndexOf(','))}]\n`
    log('\n正在创建路由文件！\n')
    try {
      fs.writeFile('./src/router/server.js',data,function(err){
        if(err){
          errorLog('\n' + err + '\n');
        } else {
          successLog('\n创建路由文件完成！\n')
        }
      })
    } catch (error) {
      throw error
    }
  });


 
}

module.exports = {
  monitored
}