var fs = require('fs');
var diskusage = require('diskusage-ng');
var configJson = require('./config.json');

var currentPercent = 0, //磁盘已用百分比
  clearFile = [], //需要清除的文件路径数组
  currentTime = new Date(configJson.time).getTime(); //配置文件预设时间戳


diskusage(configJson.path, function (err, usage) {
  if (err) return console.log(err);

  currentPercent = ((usage.used / usage.total) * 100).toFixed(1);
  if (currentPercent > configJson.per) { //超出预定值 
    getFilesPath(configJson.path, configJson.isDeep);
    deleteFile(clearFile);
  }
});

//获取文件名后缀名
String.prototype.extension = function () {
  var ext = null;
  var name = this.toLowerCase();
  var i = name.lastIndexOf(".");
  if (i > -1) {
    var ext = name.substring(i + 1);
  }
  return ext;
}
//获取需要清理的文件路径
function getFilesPath(path, deep) {
  var files = fs.readdirSync(path);
  files.forEach((file) => {
    var states = fs.statSync(path + '/' + file);
    if (deep) { //进行深度遍历
      if (!file.extension()) {
        getFilesPath(path + '/' + file, deep);
      }
    }

    if (file.extension()) {
      if (new Date(states.mtime).getTime() <= currentTime) { //文件修改时间在配置时间前才被清除
        if (configJson.file.isDelete) { //删除某种类型文件
          file.extension() === configJson.file.type ? clearFile.push(path + '/' + file) : null;
        } else { //删除某种类型以外的文件
          file.extension() !== configJson.file.type ? clearFile.push(path + '/' + file) : null;
        }
      }
    }
  })
}
//清理文件
function deleteFile(pathList) {
  if (!pathList.length) return;
  pathList.forEach(path => {
    if (!fs.existsSync(path)) return;
    fs.unlinkSync(path);
  })

  diskusage(configJson.path, function (err, usage) {
    if (err) return console.log(err);

    currentPercent = ((usage.used / usage.total) * 100).toFixed(1);
    if (currentPercent > configJson.per) { //超出预定值 
      console.log('清除后磁盘所用空间还是超出预定值');
    }
  });
}