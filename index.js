const fs = require('fs');
const NodeWebcam = require( "node-webcam" );
const shell = require('shelljs')

 

function dbStore(data, imgName) {
    // let test = `use imagesdb \ndb.images.insert({"name": "test", "img": "${data}"})`
    let obj = {name: imgName, data: data};
    fs.writeFile("./img.json", JSON.stringify(obj), function(data, err){
        let errData = `\nError: ${err}\n`
        if(err){fs.appendFileSync("./logs..txt", errData)}else
        {shell.exec('./imgInjection.sh');}
    })
    
};

//capture camera data as base64 string
function snap() {
    let imgName = "img";
    
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
    dbStore(data, imgName);
});
}

snap();