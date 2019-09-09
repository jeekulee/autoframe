const chokidar = require('chokidar'),
    control = require('./monitored'),
    fs = require('fs'),
    sysPath = require('path');

const watchServer = () => {
  let watcher = chokidar.watch('./vuesetting', {
    ignored: /[\/\\]\./, persistent: true
  });
    
  watcher
    .on('ready', function() { control.monitored(); })
    .on('raw', function(event, path, details) {
      delDir(sysPath.resolve(__dirname, '../src/server'))
      control.monitored(); 
    })
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
  }
}

module.exports.watchServer = watchServer
