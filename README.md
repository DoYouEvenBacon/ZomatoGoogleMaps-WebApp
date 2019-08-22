# ZomatoGoogleMaps-webApp
This web app combines Zomato and Google Maps Embed APIs.

I wanted to combine the full on map view of Google Maps along with restaurant information and reviews from Zomato instead of Google.
The Maps API only uses the Embed SKU because Google has recently added billing for many of the features. The Embed SKU requires no cost call, while many of the other advanced ones do.

## Requirements
- A modern web browser - this web app was developed on Google Chrome.
- [A Zomato API Key](https://developers.zomato.com/api) - 1000 free calls per day.
- [A Google Maps API Key](https://cloud.google.com/maps-platform/) - requires you to set up billing info but this web app only makes free calls to the Embed SKU.

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
![startScreen](https://user-images.githubusercontent.com/45221821/63070834-e58d5d00-bf70-11e9-9b9b-07e09af7b98c.PNG) <br/>
Select from a list of cities. <br/>
![searchCities](https://user-images.githubusercontent.com/45221821/63070860-fc33b400-bf70-11e9-8526-9b7146d6565d.PNG) <br/>
Search by cuisine. <br/>
![searchCuisine](https://user-images.githubusercontent.com/45221821/63070867-0ce42a00-bf71-11e9-8181-3ace088f7e18.PNG) <br/>
Search by restaurant name. <br/>
![searchRestaurant](https://user-images.githubusercontent.com/45221821/63070869-0f468400-bf71-11e9-8553-14a2eecf180a.PNG) <br/>
Multiple pages of results.  <br/>
![searchResultsPage1](https://user-images.githubusercontent.com/45221821/63070874-1372a180-bf71-11e9-8832-2bae5f6ba838.PNG)
![searchResultsPage2](https://user-images.githubusercontent.com/45221821/63070877-15d4fb80-bf71-11e9-97ea-17d89cd35458.PNG) <br/>
Open the restaurant's Zomato page. <br/>
![openZomatoPage](https://user-images.githubusercontent.com/45221821/63070887-1ec5cd00-bf71-11e9-92dc-1866728e9190.PNG) <br/>
Open the resaurant location on Google Maps Directions mode. <br/>
![openMapsDirections](https://user-images.githubusercontent.com/45221821/63070889-208f9080-bf71-11e9-82e5-1074c0459402.PNG) <br/>
The About page. <br/>
![about](https://user-images.githubusercontent.com/45221821/63070894-22595400-bf71-11e9-8f30-43daaacfa7e2.PNG)
