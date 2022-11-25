# Express.js on Netlify 
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/btovee/netlify-express-ram-api) [![Netlify Status](https://api.netlify.com/api/v1/badges/e40cd351-83aa-4450-81db-36a5647312f9/deploy-status)](https://app.netlify.com/sites/golden-choux-ea9564/deploys)

- An example of how to host an Express.js app on Netlify using [serverless-http](https://github.com/dougmoscrop/serverless-http). See [express/server.js](express/server.js) for details, or check it out at https://netlify-express-ram-api.netlify.com/!
- [index.html](index.html) simply loads html from the Express.js app using `<object>`, and the app is hosted at `/.netlify/functions/server`. 
- Rick and Morty Api with GET, POST, PUT DELETE endpoints (however no data mutation), examples:


```sh
curl --location --request GET 'https://golden-choux-ea9564.netlify.app/.netlify/functions/server/api/character'

curl --location --request GET 'https://golden-choux-ea9564.netlify.app/.netlify/functions/server/api/character/1'

curl --location --request POST 'https://golden-choux-ea9564.netlify.app/.netlify/functions/server/api/character' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 3,
    "name": "Summer Smith",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Female"
}'

curl --location --request PUT 'https://golden-choux-ea9564.netlify.app/.netlify/functions/server/api/character' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 3,
    "name": "Summer Smith",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Female"
}'

curl --location --request DELETE 'https://golden-choux-ea9564.netlify.app/.netlify/functions/server/api/character/3'
```
