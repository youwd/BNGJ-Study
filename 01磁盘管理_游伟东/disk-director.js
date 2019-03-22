var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var config = new Object(); // 配置文件信息 config.json

/**
 * 磁盘检测小工具
 * @param configPath 配置文件路径 
 */
function diskDirector(configPath) {
    // 读取JSON配置文件
    config = getConfig(configPath);

    // 基于linux的返回linux,基于苹果的返回Darwin,基于windows的返回Windows_NT
    // console.log(os.type());

    // 获取磁盘大小
    getDiskUsed().then(function (usedSizeG) {

        maxValueG = unit2G(config.maxValue, config.unit.charAt(0)); // 获取配置文件中设置的最大存储值

        // 如果已用空间超过配置文件设置的值，则执行清理文件操作
        if (usedSizeG > maxValueG) {
            cleanFile(config.cleanPath, function () {
                // 清理结束的回调，检测清理后是否还大于设置的值
                getDiskUsed().then(function (usedSizeG) {
                    // 如果已用空间超过配置文件设置的值，则执行清理文件操作
                    if (usedSizeG > maxValueG) {
                        console.log('清理后，磁盘已占空间仍然大于设定值！');
                    }
                });
            });
        }
    });
}

/**
 * 获取磁盘可用空间
 */
function getDiskUsed() {
    return new Promise(function (resolve, reject) {
        child_process.exec('df -h', function (err, stdout) {
            var mem = stdout.split(/\n/).slice(1);
            var temp = mem[0].split(/\s+/);
            if (temp[0].charAt(0) === '/') {
                data = temp[3];
            }
            usedSize = data.slice(0, -2); // 获取已用空间数值
            unit = data.slice(data.length - 2, -1); // 获取已用空间单位
            usedSizeG = unit2G(usedSize, unit); // 调用单位转换方法，统一转换为G
            resolve(usedSizeG);
        });
    });
}

/**
 * 单位转换到G
 * @param size 数值
 * @param unit 单位
 */
function unit2G(size, unit) {
    res = size;
    switch (unit.toUpperCase()) {
        case 'T':
            res = size * 1024;
            break;
        case 'M':
            res = size / 1024;
            break;
        case 'K':
            res = size / 1024 / 1024;
            break;
        default:
            break;
    }
    return res;
}

/**
 * 读取配置文件
 * @param configPath 配置文件路径 
 */
function getConfig(configPath) {
    // 读取配置文件中的json数据
    res = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(res);
}

/**
 * 清理文件
 * @param cleanPath 要清理的文件夹
 * @param callback 清理完成的回调
 */
function cleanFile(cleanPath, callback) {
    // 读取要清理文件夹下的所有文件
    files = fs.readdirSync(cleanPath);
    files.forEach(function (file) {
        // 读取文件状态
        states = fs.statSync(cleanPath + '/' + file);

        // 如果是文件夹
        if (states.isDirectory()) {
            if (config.isDeleteSubfolder) {
                // 如果配置文件中isDeleteSubfolder:true  则要清理子文件夹
                cleanFile(cleanPath + '/' + file);
            }
        } else { // 如果是文件，则删除满足配置文件条件的文件

            // 判断文件后缀名是否在配置参数中
            flag_extension = config.deleteFileExtension.some(function (res) {
                // 后缀名统一不加.
                if (res.indexOf('.') !== -1) {
                    res = res.substr(1);
                }
                return res.toUpperCase() === path.extname(file).substr(1).toUpperCase();
            });

            configTime = new Date(config.noDeleteLastTime); // 配置文件中设置的时间

            // 如果最后修改日期大于设置的日期，则不删除
            flag_time = (states.mtime.getTime() > configTime.getTime()) ? false : true

            // 如果两个条件都满足，则删除文件
            if (flag_extension && flag_time) {
                fs.unlink(cleanPath + '/' + file, (err) => {
                    if (err) throw err;
                    console.log(file + '文件已删除！');
                });
            }
        }
    });

    callback && callback.call();
}

module.exports = diskdirector = {
    diskDirector
}