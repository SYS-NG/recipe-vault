const express = require('express');
const PiCamera = require('pi-camera');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const app = express();
const port = 3000;

// Set up RPi Camera
const myCamera = new PiCamera({
  mode: 'photo',
  output: './cameraTest.jpg',
  width: 2592,
  length: 1944,
  nopreview: false
});

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'rv-cred.json'
});

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});

function snapImage(){
  //Captures image from RPi Camera
  myCamera.snap()
    .then(async(result) => {
      console.log("Image was Captured");
      await processImage();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function processImage() {
  // Performs label detection on the image file
  console.log("Beginning Processing Image");
  // const [label] = await client.labelDetection('./cameraTest.jpg');
  // const labels = label.labelAnnotations;
  // console.log('Labels:');
  // labels.forEach(label => console.log(label.description));

  const [object] = await client.objectLocalization('./cameraTest.jpg');
  const objects = object.localizedObjectAnnotations;
  console.log('Objects:');
  objects.forEach(object => console.log(object.name));
}

snapImage();


