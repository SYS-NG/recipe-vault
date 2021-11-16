const express = require('express');
const PiCamera = require('pi-camera');
const vision = require('@google-cloud/vision');

const app = express();
const port = 3000;
const imageLocation = './capturedImage.jpg';
const googleCredFile = 'rv-cred.json';

// Set up RPi Camera
const myCamera = new PiCamera({
  mode: 'photo',
  output: imageLocation,
  width: 2592,
  length: 1944,
  nopreview: false
});

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: googleCredFile
});

async function snapImage(){
  //Captures image from RPi Camera
  myCamera.snap()
    .then(async(result) => {
      console.log("Image was Captured");
      const ingredients = await processImage();
      return ingredients;
    })
    .catch((error) => {
      console.log(error);
    });
}

function toList(annotResult, annotationType) {
  let words = [];
  for (var element in annotResult[annotationType]){
    let result = annotResult[annotationType][element];
    let word = annotationType === 'labelAnnotations' ? result.description : result.name;
    let newWords = word.toLowerCase().split(' ');
    words = words.concat(newWords);
  }
  return words;
}

  /**
   * Filtering based on commonly found vision results in the testing envrionment
   */
function foodWords(list) {
  let commonNonFoodDetected = ["Food", "Tableware", "Fruit", "Ingredient", "Natrual Foods", "Crusine", "Staple Food", " Food Group", "Produce", "Superfood", "Matoke", "Rangpor", "Seedless Fruit", "Recipe", "Citric Acid", "Citrus", "Serveware", "Accessory Fruit", "Dish", "Plate", "Dishware", "Local Food", "Sweetness", "Vegan Nutrition", "Still Life Photography", "Malus", "Whole Food", "Kitch Utensil", "Still Life", "Rectangle", "Drink", "Peel", "Breakfast"];
  let nonFoodWords = []
  for (var element in commonNonFoodDetected.toLowerCase()){
    let eachWord = element.toLowerCase().split();
    nonFoodWords = nonFoodWords.concat(eachWord);
  }
  for(var ingredient in list){
    var nonFood = nonFoodWords.indexOf(ingredient);
    if(nonFood > -1){
      list = list.splice(nonFood);
    }
  }
  return list;
}

async function processImage() {
  // Performs label detection on the image file
  console.log("Beginning Processing Image");
  
  const [label] = await client.labelDetection(imageLocation);
  // const labels = label.labelAnnotations;
  // console.log('Label:');
  // labels.forEach(label => console.log(label.description));

  const [object] = await client.objectLocalization(imageLocation);
  // const objects = object.localizedObjectAnnotations;
  // console.log('object:');
  // objects.forEach(object => console.log(object.name));

  const result = label;
  result.localizedObjectAnnotations = object.localizedObjectAnnotations;

  let annotList = toList(result, 'labelAnnotations');
  annotList = annotList.concat(toList(result, 'localizedObjectAnnotations'));

  console.log("Image process finished and filtered");
  console.log(annotList);
  let filteredList = foodWords(annotList);
  console.log("Filtered Non-Food-Related Words");
  console.log(filteredList);
  return filteredList;
}

app.get('/get_ingredients', async (req, res) => {
  try{
    await snapImage().then((result) => {
      console.log("Sending Data to Endpoint");
      res.send({"ingredients": result});
    })
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
