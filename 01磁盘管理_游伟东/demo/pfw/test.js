const DiskClean = require('./main')
const cfg = require('./config')

let diskClean = new DiskClean(cfg)

console.time('d')
diskClean.run().then((data) => {
    console.timeEnd('d')
}).catch(e => console.error(e))