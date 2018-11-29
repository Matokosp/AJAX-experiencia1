	var coords = {
		scl: {lat: -33.45694, lng: -70.64827},
		nyc: {lat: 40.7308619, lng: -73.9871558},
		shs: {lat:59.3251172, lng: 18.0710935}
	}

// MAPA
	var map, marker;
	function initMap(coord = coords.scl) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: coord,
			zoom: 9
		});
		marker = new google.maps.Marker({
			position: coord,
			// map: map
		});


	}

// CLIMA
	var api_data = {
		url: 'https://api.darksky.net/forecast/',
		key: '6f3904234b64a9333355327168b9b104/',
		queryParams: ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=si'],
		get_queryParams: function(){
			return this.queryParams.join('&')			
		}
	}
	
	var weatherIcon = {
		'clear-day': 'images/clear-day.png',
		'clear-night': 'images/clear-night.png',
		'rain': 'images/rain.png',
		'snow': 'images/snow',
		'sleet': 'images/sleet.png',
		'wind': 'images/wind.png',
		'fog': 'images/fog.png',
		'cloudy': 'images/cloudy.png',
		'partly-cloudy-day': 'images/partly-cloudy-day.png',
		'partly-cloudy-night': 'images/partly-cloudy-night.png'
	}

	$('#select').on('change', function (){
		$.ajax ({
			url: api_data.url + api_data.key + coords[$(this).val()]['lat'] + ',' + coords[$(this).val()]['lng'] + '?' + api_data.get_queryParams(),
			dataType: 'jsonp',
			method: 'GET'
		}).then(function (data) {
			console.log(data);
			$('#resumen').text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
			$('#apparent').text(data.currently.apparentTemperature + '°');
			$('#rain').text(data.currently.precipProbability * 100 + '%');
			$('#humidity').text(data.currently.humidity * 100 + '%');
			$('#weather-icon').attr('src', weatherIcon[data.currently.icon]);
			$('#escondido').removeAttr('hidden');

			// initMap(coords[$(this).val()])
		})

		// MAP SELECT
		 map.center = coords[$(this).val()]
		 map.setCenter(map.center); 
         marker.setMap(map);
         marker.setPosition(map.center);
         marker.setAnimation(google.maps.Animation.BOUNCE);         
         map.setZoom(9);
		 console.log(map.center);
	})




