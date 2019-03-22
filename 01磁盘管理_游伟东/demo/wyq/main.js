const diskusage = require('diskusage-ng');
const path = require('path')
const getSuffixReg = /.*\.(.*)$/
const { promisify } = require('util')
const fs = require('fs')
// const cfg = require('./config')

class DiskClean {
    constructor(cfg) {
        this.cfg = cfg
        this.cleanFiles = []
    }

    async run() {
        try {
            let cfg = this.cfg
            let url = path.resolve(cfg.url)
            let usage = await promisify(diskusage)(url)
            if (usage.available > cfg.cleanNum) return console.log(`不需要清理,当前剩余空间:${usage.available} 字节,删除设定值:${cfg.cleanNum} 字节`)
            console.log(`开始清理,当前剩余空间:${usage.available} 字节,删除设定值:${cfg.cleanNum} 字节`)
            await this.getCleanFile(url)
            await this.clean()
            let usageAfter = await promisify(diskusage)(url)
            if (usageAfter.available < cfg.cleanNum) return console.log(`清理完成仍小于设定值,当前剩余空间:${usageAfter.available} 字节,删除设定值:${cfg.cleanNum} 字节`)
        } catch (e) {
            console.error(e)
        }
    }

    async getCleanFile(url) {
        try {
            let self = this
            let cfg = this.cfg
            let files = await promisify(fs.readdir).bind(fs)(url)
            let reserveSuffix = cfg.delOrReserve === 1//true根据后缀名保留
            let reserveTime = cfg.reserveTime > 0 ? cfg.reserveTime : Number.MAX_VALUE
            let dirsFunc = []
            for (let i = 0; i < files.length; i++) {
                let filename = files[i]
                let filedir = path.join(url, filename);//获取当前文件的绝对路径
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                let stats = null
                try {
                    stats = await promisify(fs.stat).bind(fs)(filedir)
                } catch (e) {
                    continue
                }
                let isFile = stats.isFile();//是文件
                let isDir = stats.isDirectory();//是文件夹
                if (isFile) {
                    let regResult = getSuffixReg.exec(filename) || []
                    let suffix = regResult[1]
                    if (!suffix) continue//没有后缀的跳过
                    if (!reserveSuffix) {//根据后缀删除
                        if (cfg.fileSuffix.includes(suffix) && stats.mtimeMs < reserveTime) self.cleanFiles.push(filedir)
                    } else {//根据后缀保留
                        if (!cfg.fileSuffix.includes(suffix) && stats.mtimeMs < reserveTime) self.cleanFiles.push(filedir)
                    }
                } else if (isDir && cfg.delChildFolder) dirsFunc.push(self.getCleanFile(filedir))
            }
            await Promise.all(dirsFunc)
        } catch (e) {
            console.error(e)
        }
    }

    async clean() {
        let cleanFuncs = []
        for (let i = 0; i < this.cleanFiles.length; i++) {
            let func = new Promise((res, rej) => {
                fs.unlink(this.cleanFiles[i], (err) => {
                    if (err) return rej(err)
                    res(this.cleanFiles[i])
                })
            })
            // console.log(func)
            cleanFuncs.push(func)
        }
        // console.log(cleanFuncs)
        let result = await Promise.all(cleanFuncs)
        console.log('清理文件:', result)
    }
}

module.exports = DiskClean