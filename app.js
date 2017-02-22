searchButton.addEventListener('click', searchWeather);

function searchWeather() {
	// display loading and hide weather box on every new search
	loadingText.style.display = 'block';
	weatherBox.style.display = 'none';
	weatherErrorBox.style.display = 'none';

	const cityName = searchCity.value;
	const http = new XMLHttpRequest();
	const apiKey = '5c56b3fd9f9caaf0b9b40a4eae24323f';
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
	const method = 'GET';

	// check if search field is empty
	if (cityName.trim().length == 0) {
		return alert('Please enter a City Name');
	}

	// AJAX
	http.open(method, url);
	http.onreadystatechange = function () {
		if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
			const data = JSON.parse(http.responseText);
			const weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
			weatherData.temperature = data.main.temp;
			// display name of the city found
			weatherData.cityName = data.name;
			updateWeather(weatherData);
		} else if (http.readyState == XMLHttpRequest.DONE) {
			loadingText.style.display = 'none';
			weatherErrorBox.style.display = 'block';
			weatherErrorMessage.textContent = `Sorry, we don't have data for ${cityName}.`;
		}
	};
	http.send();
}

function capitalize(cityName) {
	return cityName.split(" ").map((w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(" ");
}

function updateWeather(weatherData) {
	// add data to corresponding fields
	weatherCity.textContent = capitalize(weatherData.cityName);
	weatherDescription.textContent = weatherData.description;
	weatherTemperature.textContent = weatherData.temperature;

	// hide loading and display weather box
	loadingText.style.display = 'none'
	weatherBox.style.display = 'block';
}