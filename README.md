# ZomatoGoogleMaps-webApp
This web app combines Zomato and Google Maps Embed APIs.

I wanted to combine the full on map view of Google Maps along with restaurant information and reviews from Zomato instead of Google.
The Maps API only uses the Embed SKU because Google has recently added billing for many of the features. The Embed SKU requires no cost call, while many of the other advanced ones do.

## Requirements
```
- A modern web browser - this web app was developed on Google Chrome.
- A Zomato API Key from https://developers.zomato.com/api - 1000 free calls per day.
- A Google Maps API Key from https://cloud.google.com/maps-platform/ - requires you to set up billing info but this web app only makes free calls to the Embed SKU.
```
## Setting Up
1. Place the html and JavaScript files in the same directory.
2. Paste your Zomato and Google Maps API keys on the first two lines of the JavaScript file.
3. Paste your Google Maps API key on line 240 in the src url.

## Features
* Search for restaurants or cuisines from a list of cities in New Zealand. <br/>
* View information about a restaurant including the rating, cost and trading hours. <br/>
* Display the location of a restaurant on the map from a list of search results. <br/>
* Open detailed information about the retaurant in a new tab on Zomato. <br/>
* Open Google Maps Directions to the restaurant location. <br/>

## Images of the website

