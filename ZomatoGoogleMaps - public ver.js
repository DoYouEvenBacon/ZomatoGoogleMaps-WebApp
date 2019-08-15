const mapsAPIKey = '';
const zomatoAPIKey = '';

let currentFocus = ''; //URL of restaurant that is currently selected
let searchParam = '';
let start = 0; //offset used for displaying 3 search results at a time
const end = 3; //max results to display
const citiesNZ = { //names and id of cities in NZ that are available on Zomato
	Ashburton: 133,
	Auckland: 70,
	'Banks Peninsula': 134,
	Buller: 160,
	'Central Otago': 143,
	Christchurch: 90,
	Clutha: 144,
	Coromandel: 157,
	Dunedin: 145,
	'Far North': 139,
	Gisborne: 135,
	Gore: 147,
	Grey: 161,
	'Hamilton & Waikato': 11879,
	Hauraki: 152,
	'Hawkes Bay Central': 136,
	Horowhenua: 163,
	Hurunui: 126,
	Invercargill: 148,
	Kaikoura: 127,
	Kaipara: 140,
	Kawerau: 120,
	Mackenzie: 128,
	Manawatu: 164,
	Marlborough: 103,
	Matamata: 153,
	'Napier Hastings': 137,
	Nelson: 95,
	'New Plymouth': 149,
	Opotiki: 121,
	Otorohanga: 154,
	'Palmerston North': 165,
	Queenstown: 146,
	Rangitikei: 166,
	Rotorua: 122,
	Ruapehu: 167,
	Selwyn: 129,
	'South Taranaki': 150,
	'South Waikato': 155,
	Southland: 98,
	Stratford: 151,
	Tararua: 168,
	Taupo: 156,
	Tauranga: 123,
	Timaru: 130,
	Waimakariri: 131,
	Waimate: 132,
	Waipa: 158,
	Wairoa: 138,
	Waitaki: 142,
	Waitomo: 159,
	Wanganui: 169,
	Wellington: 71,
	'Western Bay of Plenty': 124,
	Westland: 162,
	Whakatane: 125,
	Whangarei: 141,
	
};



const formatResponse = (res) =>{ //create the divs for search results
	let resultsContent = '';
	
	const addResult = (info) =>{
		const restaurantName = info.restaurant['name'];
		const restaurantAddr = info.restaurant['location'].address;
		const restaurantLocality = info.restaurant['location'].locality_verbose;
		const restaurantPhone = info.restaurant['phone_numbers'];
		const restaurantLatitude = info.restaurant['location'].latitude;
		const restaurantLongitude = info.restaurant['location'].longitude;
		const restaurantURL = info.restaurant['url'];
		
		const restaurantCuisines = info.restaurant['cuisines'];
		const restaurantTimes = info.restaurant['timings'];
		const restaurantAvgCost = info.restaurant['average_cost_for_two'];
		
		const restaurantRatingNum = info.restaurant['user_rating'].aggregate_rating;
		const restaurantRatingColour = info.restaurant['user_rating'].rating_color;
		const restaurantRatingVotes = info.restaurant['user_rating'].votes;
		const restaurantFeaturedImg = info.restaurant['featured_image'];
		
		//create a div container to store information about a restaurant
		let resultContainer = document.createElement('div');
		resultContainer.className = 'resultContainer';
		resultContainer.onclick = function() {centreMapsLocation(restaurantName, restaurantAddr); currentSearchFocus(restaurantURL); showZomatoButton(restaurantName); showMapsButton(restaurantName, restaurantLocality)}; //focus map onto restaurant location
		document.getElementById('resultsBox').appendChild(resultContainer);
		
		//create a div for the featured image
		let featuredImgContainer = document.createElement('div');
		featuredImgContainer.className = 'featuredImgContainer';
		let featuredImg = document.createElement('img');
		featuredImg.className = 'featuredImg';
		featuredImg.src = restaurantFeaturedImg;
		featuredImgContainer.appendChild(featuredImg);
		resultContainer.appendChild(featuredImgContainer);
		
		
		//create a div for the restaurant name and append to the container
		let nameContainer = document.createElement('div');
		nameContainer.className = 'nameContainer';
		let nameTextNode = document.createTextNode(`${restaurantName}`);
		nameContainer.appendChild(nameTextNode);
		resultContainer.appendChild(nameContainer);
		
		//create a div for the address
		let addrContainer = document.createElement('div');
		addrContainer.className = 'addrContainer';
		let addrTextNode = document.createTextNode(`${restaurantAddr}`);
		addrContainer.appendChild(addrTextNode);
		resultContainer.appendChild(addrContainer);	

		//create a div for the rating
		let ratingContainer = document.createElement('div');
		ratingContainer.className = 'ratingContainer';
		ratingContainer.style.cssText = `background-color:#${restaurantRatingColour};color:#fff;font-size:15px;font-weight:bold;text-align:center;line-height:30px;border-radius:5px;width:35px;height:30px`;
		let ratingNumTextNode = document.createTextNode(`${restaurantRatingNum}`);
		ratingContainer.appendChild(ratingNumTextNode);
		
		let votesContainer = document.createElement('span');
		votesContainer.className = 'votesContainer';
		let ratingVotesTextNode = document.createTextNode(`${restaurantRatingVotes} votes`);
		votesContainer.appendChild(ratingVotesTextNode);		
		resultContainer.appendChild(ratingContainer);
		resultContainer.appendChild(votesContainer);
		
		//create a div for cuisines
		let cuisinesContainer = document.createElement('div');
		cuisinesContainer.className = 'cuisinesContainer';
		let cuisinesTextNode = document.createTextNode(`Cuisines: ${restaurantCuisines}`);
		cuisinesContainer.appendChild(cuisinesTextNode);
		resultContainer.appendChild(cuisinesContainer);	
		
		//create a div for average cost
		let avgCostContainer = document.createElement('div');
		avgCostContainer.className = 'avgCostContainer';
		let avgCostTextNode = document.createTextNode(`Cost for Two: $${restaurantAvgCost}`);
		avgCostContainer.appendChild(avgCostTextNode);
		resultContainer.appendChild(avgCostContainer);	

		//create a div for opening times
		let timesContainer = document.createElement('div');
		timesContainer.className = 'timesContainer';
		let timesTextNode = document.createTextNode(`Hours: ${restaurantTimes}`);
		timesContainer.appendChild(timesTextNode);
		resultContainer.appendChild(timesContainer);

		//create a divider div between restaurant containers
		let dividerContainer = document.createElement('div');
		dividerContainer.className = 'divider';
		document.getElementById('resultsBox').appendChild(dividerContainer);
	};
	for(let i = 0; i < res.restaurants.length; i++){
		console.log(res.restaurants[i].restaurant['name']);
		addResult(res.restaurants[i]);
	};
	
};

const centreMapsLocation = (name, address) =>{ //place marker over restaurant
	document.getElementById('mapFrame').src = `https://www.google.com/maps/embed/v1/place?key=${mapsAPIKey}&q=${name} ${address}`;
};

const gotoCityMaps = () =>{ //go to city on maps when selected from the cities dropdown
	let citiesListID = document.getElementById('citiesList');
	let city = citiesListID.options[citiesListID.selectedIndex].text;
	document.getElementById('mapFrame').src = `https://www.google.com/maps/embed/v1/place?key=${mapsAPIKey}&q=${city}, New Zealand`;
};

const currentSearchFocus = (zomatoURL) =>{
	currentFocus = zomatoURL;
}

const showZomatoButton = (restaurantName) =>{
	document.getElementById('linkToZomatoPage').innerHTML = `<img id="zomatoLogo" src="https://b.zmtcdn.com/web/hygiene/4ccfb701bfb183300f1851f784f521521564057524.png">`;
	document.getElementById('zomatoLogo').onclick = function() {openZomatoTab()};
	document.getElementById('linkToZomatoPage').style.display = 'block';
}

const openZomatoTab = () =>{
	window.open(currentFocus);
};

const showMapsButton = (name, locality) =>{
	document.getElementById('linkToMaps').innerHTML = `Directions to ${name}: <img id="mapsLogo" src="https://www.google.com/maps/about/images/home/home-maps-icon.svg">`;
	document.getElementById('mapsLogo').onclick = function() {openMapsDirections(name, locality)};
	document.getElementById('linkToMaps').style.display = 'block';
};


const openMapsDirections = (name, locality) =>{
	let dirURL = `https://www.google.co.nz/maps/dir//${name}, ${locality}/`;
	window.open(dirURL);
};

const resetStartOffset = () =>{ //reset start to 0 when doing a new search
	start = 0;
}

const clearResults = () =>{ //clear results from the box when doing a new search or going to a different page of results
	let resultsBox = document.getElementById('resultsBox');
	while(resultsBox.hasChildNodes()){
		resultsBox.removeChild(resultsBox.lastChild);
	}
	document.getElementById('linkToZomatoPage').style.display = 'none';
	document.getElementById('linkToMaps').style.display = 'none';     //remove zomato and maps links when performing another search
};

const searchZomato = (searchParam) =>{
	//let entityID = 70; //Auckland
	let citiesListID = document.getElementById('citiesList');
	let entityID = citiesListID.options[citiesListID.selectedIndex].value;
	let entityType = 'city';
	//let start = 0; moved to global for next and previous 3 search results
	//let end = 3; ^
	const xhr = new XMLHttpRequest();
	const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${entityID}&entity_type=${entityType}&q=${searchParam}&start=${start}&count=${end}`;
	
	xhr.responseType = 'json';
	xhr.onreadystatechange = () =>{
		if(xhr.readyState === XMLHttpRequest.DONE){
			formatResponse(xhr.response);
		};
	};
	
	xhr.open("GET", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('X-Zomato-API-Key', zomatoAPIKey);
	xhr.send();
};

const renderPrevNextButtons = () =>{ //create prev and next buttons, show prev as disabled if start === 0
	let prevButton = document.createElement('button');
	prevButton.className = 'prevNextButtons';
	prevButton.id = 'prevButton';
	prevButton.innerHTML = '&#8249;';
	prevButton.style.cssText = 'position:absolute; bottom:0;';
	prevButton.onclick = function() {prevResults()};
	if(start < 3){
		prevButton.disabled = true;
	};
	
	let nextButton = document.createElement('button');
	nextButton.className = 'prevNextButtons';
	nextButton.id = 'nextButton';
	nextButton.innerHTML = '&#8250;';
	nextButton.style.cssText = 'position:absolute; bottom:0; right:0;';
	nextButton.onclick = function() {nextResults()};

	let resultsBox = document.getElementById('resultsBox');
	resultsBox.appendChild(prevButton);
	resultsBox.appendChild(nextButton);
}

const prevResults = () =>{ //set start and end values, then call searchZomato() and clearResults()
	if (start >= 3){
		start -= 3;
	};
	clearResults();
	searchZomato(searchParam);
	renderPrevNextButtons();
};

const nextResults = () =>{
	start += 3;
	clearResults();
	searchZomato(searchParam);
	renderPrevNextButtons();
};

const displaySearchResultsBox = () =>{
	document.getElementById('resultsBox').style.display = 'block';

};

const citiesDropdown = () =>{
	/*for(let city in citiesNZ){
		console.log(`${city} id:${citiesNZ[city]}`);
	};*/
	citiesDropdownID = document.getElementById('citiesList');
	
	for(let city in citiesNZ){
		let cityOption = document.createElement('option');
		cityOption.value = citiesNZ[city];
		if(citiesNZ[city] === 70){ //default Auckland
			cityOption.selected = 'selected';
		};
		cityOption.innerHTML = city;
		citiesDropdownID.appendChild(cityOption);
	};
};

const search = () =>{
	searchParam = document.getElementById('searchInput').value;
	displaySearchResultsBox();
	searchZomato(searchParam);
	
};

const aboutPopup = () =>{
	let about = window.open('', '', 'width=350, height=250');
	about.document.write("Made by <a href='https://github.com/DoYouEvenBacon'>GitHub/DoYouEvenBacon</a><br><br>Search for restaurants or cuisines in New Zealand through Zomato and show the location and get directions on Google Maps<br><br>Powered by:<br>");
	about.document.write("<a href='https://developers.zomato.com/api'><img src='https://b.zmtcdn.com/web/hygiene/4ccfb701bfb183300f1851f784f521521564057524.png' height='35%' width='35%'></a>");
	about.document.write("<a href='https://developers.google.com/maps/documentation/'><img src='https://www.google.com/maps/about/images/home/home-maps-icon.svg' ></a><br>");
	about.document.write("All users of this web app are bound by the <a href='https://maps.google.com/help/terms_maps/'>Google Maps/Google Earth Additional Terms of Service</a> and the <a href='https://policies.google.com/privacy?hl=en-GB'>Google Privacy Policy.</a>");
};
