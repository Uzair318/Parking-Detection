// REQUIRE PACKAGES
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
var NodeWebcam = require('node-webcam')
var path = require('path')

const app = express();
const dotenv = require('dotenv').config();

// ENV VARIABLES
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json(), cors()) // cross origin resource sharing

// START SERVER
app.listen(PORT, () => {
    console.log('server listening on port: ' + PORT);
})


// CREATE WEBCAM
var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false
};

var Webcam = NodeWebcam.create( opts );




/**
 * Takes a picture and returns it to backend in response
 */
app.get('/check_parking', (request, response) => {

    // take picture with webcam
    Webcam.capture("parking_pic", () => {
        response.sendFile('parking_pic.jpg', {root: path.join(__dirname)})
        console.log('sending parking picture to ' + response)
    })

    // res.sendFile(filepath);

})



// Webcam.capture("test_picture", (err, data) => {
//     console.log(data)
// })




