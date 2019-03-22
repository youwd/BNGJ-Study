const option = {
    url: 'D:\\',//目录
    cleanNum: 999999999999,//小于这个值启动清理计划 单位bit
    fileSuffix: ['asdsasasvsavas'],//根据后缀删除
    delOrReserve: 2,//1为保留,2为删除
    // reserveSuffix: [''],//根据后缀保留
    delChildFolder: true,//是否遍历子文件夹
    reserveTime: null,//根据时间保留 时间戳
}

module.exports = option