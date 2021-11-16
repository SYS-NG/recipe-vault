# Recipe Vault (Knight Hacks 2021)

Hackathon team: [Luke](https://github.com/lukesno), [Hannah](https://github.com/hannah-chuchu) and [Steven](https://github.com/SYS-NG)

Go check out our [Devpost](https://devpost.com/software/recipe-vault) for our Hackathon story!!

## Inspiration

Do you find yourself at home constantly asking, "What's there to eat?" Cooking can be hard. Especially when there are so many recipes out there and you don't have all of the ingredients in your kitchen. As broke engineering students, we understand the struggle. We were inspired to develop software that eases the stress of figuring out what to make to eat, while eliminating the need to buy more groceries. Ultimately saving our wallets from eating out and our health from eating instant ramen.


## What does Recipe Vault do?

Recipe Vault uses a camera module to scan the items in your fridge or pantry. Utilizing computer vision from Google Cloud Vision, it compiles a list of the ingredients you have and lists them on the screen. From there, the user can click a button to access recipes that use the ingredients on their list (based on Spoonacular API results).

## What does the code in this repo do?

The code here:

- Captures images through PiCamera module and Raspberry Pi 4.

- Analyzes the captured images using Google Vision

- Compiles a list of ingredients to send to our API endpoint for the frontend to access.

- Check out the frontend code [here](https://github.com/lukesno/recipe-vault)

## How to run the program?

***Requires:*** 

A Google Cloud Credential file with google-vision-api permission labelled `rv-cred.json` in src folder and Pi Camera module connected to a Raspberry Pi (code built on Raspberry Pi 4). If you are testing the camera module on the Pi using `test/camera.py`, then GPIO pin 17 (BCM) should be connected to a button for trigger.

To run the main program, run `node ./main.js` in the project directory and access endpoint at `localhost:3000/get_ingredients`. See hardware setup requirement under `test` below.

### test

`test/camera.py` is used to test that the camera is functional. Run on Pi with camera module connected and use GPIO pin 17 to trigger camera capture

### src

`src/main.js` configures the Raspberry Pi Camera module and utilize Google Vision API to return a list of ingredients.


