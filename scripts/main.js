;(function($){
	'use strict';
	
	$('a[href*="#"]').on('click', function() {
		event.preventDefault();
		$('body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1000);
	});
	
	$(window).on('load', function() {
		$('.ba-slider').slick({
			dots: true,
			slide: '.ba-slide',
			autoplay: true,
  			autoplaySpeed: 1500,
  			arrows: false
		});
	});

	$(window).on('load', function() {
		$('.ba-testimonials-slider').slick({
			dots: true,
			slide: '.ba-testimonials-slide',
			autoplay: true,
  			autoplaySpeed: 1500,
  			arrows: false
		});
	});

	function createMap() {
		var $markers = $('.ba-marker');
		var map = new google.maps.Map($('.ba-map')[0], {
			zoom: 14,
			scrollwheel: false,
			center: new google.maps.LatLng(0,0)
		});
		addMarkers($markers, map);
		centerMap($markers, map);
	}
	
	function addMarkers($markers, map) {
		$markers.each(function() {
			var lat = $(this).data('lat');
			var lng = $(this).data('lng');
			var marker = new google.maps.Marker({
				position: {lat: lat, lng: lng},
				map: map,
				icon: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/128/Map-Marker-Flag--Pink.png'
			});

			var content = $(this).find('.description').html();

			var infoWindow = new google.maps.InfoWindow({
				content: content
			});
			marker.addListener('click', function() {
				infoWindow.open(map, marker);
			});
			
		});
	}

	function centerMap($markers, map) {
		if ($markers.length == 1) {
			var lat = $($markers).data('lat');
			var lng = $($markers).data('lng');
			var latLng = new google.maps.LatLng(lat, lng);
			map.setCenter(latLng);
		} else {
			var bounds = new google.maps.LatLngBounds();
			$markers.each(function() {
				var lat = $(this).data('lat');
				var lng = $(this).data('lng');
				var latLng = new google.maps.LatLng(lat, lng);
				bounds.extend(latLng);
			});
			map.fitBounds(bounds);
		}
	}

	createMap();

})(jQuery);