# recipe-vault (Knight Hacks 2021)

Captures images through PiCamera module and Raspberry Pi 4.

Backend code transfering ingredients compiled by google cloud vision API to API endpoint.

To run program, run `node /main.js` in src directory and access endpoint at `localhost:3000/get_ingredients`.

## test

`test/camera.py` is used to test that the camera is functional. Run on Pi with camera module connected and use GPIO pin 17 to trigger camera capture

## src

`src/main.js` configures the Raspberry Pi Camera module and utilize Google Vision API to return a list of ingredients.

***Requires*** a Google Credential file with google-vision-api permission labelled `rv-cred.json` in src folder.

