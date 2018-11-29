	var coords = {
		scl: {lat: -33.45694, lng: -70.64827},
		nyc: {lat: 40.7308619, lng: -73.9871558},
		shs: {lat:59.3251172, lng: 18.0710935}
	}

// MAPA
	var map;
	var marker;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: (coords.scl),
          zoom: 9
        });
        marker = new google.maps.Marker({
			position: map.center
		 });
      }

// CLIMA
	var url = 'https://api.darksky.net/forecast/';
	var key = '6f3904234b64a9333355327168b9b104/';
	var resumen = $('#resumen');
	var apparent = $('#apparent');
	var rain = $('#rain');
	var humidity = $('#humidity');
	var weatherIcon = $('#weather-icon');

	var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=si']
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
			url: url + key + coords[$(this).val()]['lat'] + ',' + coords[$(this).val()]['lng'] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
			dataType: 'jsonp',
			method: 'GET'
		}).then(function (data) {
			console.log(data);
			$(resumen).text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
			$(apparent).text(data.currently.apparentTemperature + '°');
			$(rain).text(data.currently.precipProbability * 100 + '%');
			$(humidity).text(data.currently.humidity * 100 + '%');
			$(weatherIcon).attr('src',weatherIcon[data.currently.icon]);
			$('#escondido').removeAttr('hidden');
		})

		// MAP SELECT
		 map.center = {
		 	lat: coords[$(this).val()]['lat'],
		 	lng: coords[$(this).val()]['lng']
		 }
		 map.setCenter(map.center); 
         marker.setMap(map);
         marker.setPosition(map.center);
         marker.setAnimation(google.maps.Animation.BOUNCE);
         map.setZoom(9);
		 console.log(map.center);
	})




