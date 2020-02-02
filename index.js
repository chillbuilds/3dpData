const fs = require('fs');
const NodeWebcam = require( "node-webcam" );

function dbStore(data, imgName) {
    // let test = `use imagesdb \ndb.images.insert({"name": "test", "img": "${data}"})`
    let obj = {name: imgName, data: data};
    fs.writeFileSync("./img.json", JSON.stringify(obj))

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
    dbStore(data, imgName);
});
}

snap();