const fs = require('fs');
const NodeWebcam = require( "node-webcam" );
const mongojs = require('mongojs');

const databaseURL = "imagesdb";
const collections = ["images"];
const db = mongojs(databaseURL, collections);

db.on("error", error => {
    console.log(`${error}\n\nDatabase Error, ya dip shit\n`);
})

function dbStore(data, imgName) {
    let obj = {name: imgName, data: data};
    let x = obj.toString();
    fs.writeFileSync('./obj.csv', x)
    // let obj = {name: 'test', option:1}
    // db.images.insert(obj, (err, saved) => {
    //     if(err){console.log(err)}else{
    //         console.log(saved)
    //     }
    // });
};

function fileNaming() {
    let date = new Date;
    let formatDate = `[${(date.getMonth() + 1).toString()}-${date.getDate().toString()}-${date.getFullYear().toString()}]_[h-${date.getHours().toString()}m-${date.getMinutes().toString()}s-${date.getSeconds().toString()}]`
    return formatDate;
}

//capture camera data as base64 string
function snap() {
    // let imgName = fileNaming();
    let imgName = "img";
    
    var opts = {
        width: 1280,
        height: 960,
        quality: 2,
        output: "png",
        callbackReturn: "base64",
        verbose: true
    };

NodeWebcam.capture( imgName, opts, function( err, data ) {
    dbStore(data, imgName);
    let test = `use images.db
    show`
    fs.writeFileSync("./test.js", )
});
}

// fileNaming();
snap();