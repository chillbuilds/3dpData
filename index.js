const fs = require('fs');
const NodeWebcam = require('node-webcam')
const shell = require('shelljs')
let date = new Date
let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDate()
let hour = date.getHours()
let minute = date.getMinutes()
let second = date.getSeconds()
let AMPM = ""
let dateArr = [year, month, day, hour, minute, second, AMPM]

function nameFormat() {
    dateArr[6] = "am"
    for(i = 0; i < dateArr.length; i++){
        // correcting 24 hr display
        if(i === 3){
            if(dateArr[i] > 12 && dateArr[i] !== typeof string){
                dateArr[i] = dateArr[i] - 12
                dateArr[i + 3] = "pm"
            }}
        dateArr[i] = `${dateArr[i]}`
        if(dateArr[i].length < 2){
            dateArr[i] = `${0}${dateArr[i]}`
        }
    }
    console.log(AMPM)
    console.log(dateArr)
    let formattedName = dateArr.join("_")
    return formattedName
}

function dbStore(data, imgName) {
    let obj = {name: imgName, data: data};
    fs.writeFile("./img.json", JSON.stringify(obj), function(data, err){
        let errData = `\nError: ${err}\n`
        if(err){fs.appendFileSync("./logs..txt", errData)}else{
        // shell.exec('./imgInjection.sh')
    }})
}

//capture camera data as base64 string
function snap() {
    let imgName = nameFormat()
    
    var opts = {
        width: 1200,
        height: 800,
        quality: 3,
        output: "png",
        callbackReturn: "base64",
        verbose: true
    };

NodeWebcam.capture( imgName, opts, function( err, data ) {
    let errData = `\nError: ${err}\n`
    if(err){fs.appendFileSync("./logs..txt", errData)}
    dbStore(data, imgName)
})
}


snap()