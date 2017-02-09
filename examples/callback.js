/**
 * This shows how to write code for node-exiftool if you need to
 * use callbacks. 
 * 
 * LOCAL=1 node example/callback 28.jpg, or
 * npm run callback-example
 */

const path = require('path')
const exiftool = process.env.LOCAL ? require('..') : require('node-exiftool')
const exiftoolBin = require('dist-exiftool')

const photo = path.join(process.cwd(), process.argv[2])

const ep = new exiftool.ExiftoolProcess(exiftoolBin)

function readMetadata(file, callback) {
    ep
        .open()
        .then((pid) => console.log('Started exiftool process %s', pid))
        .then(() => ep.readMetadata(file))
        .then((res) => {
            if (typeof callback === 'function') callback(null, res)
        })
        .catch((err) => {
            if (typeof callback === 'function') callback(err)
        })
        // repeat as many times as required
        .then(() => ep.close())
        .then(() => console.log('Closed exiftool'))
}

readMetadata(photo, function myCallback(err, res) {
    console.error(err)
    console.log(res)
})
