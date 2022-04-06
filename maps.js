(function($) {

/*
*  new_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery element)
*  @return	n/a
*/

function new_map( $el ) {
	
	// var
	var $markers = $el.find('.marker');
	
	
	// vars
	var args = {
		zoom		: 16,
		center		: new google.maps.LatLng(0, 0),
	   styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#cfcfcf"},{"visibility":"on"}]}]
	};
	
	
	// create map	        	
	var map = new google.maps.Map( $el[0], args);
	
	
	// add a markers reference
	map.markers = [];
	
	
	// add markers
	$markers.each(function(){
		
    	add_marker( $(this), map );
		
	});
	
	
	// center map
	center_map( map );
	
	
	// return
	return map;
	
}

/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$marker (jQuery element)
*  @param	map (Google Map object)
*  @return	n/a
*/

function add_marker( $marker, map ) { 
	// var
	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
    var icon = $marker.attr('data-img');
    var marker_filter = $marker.data('mapfilter');
    var type = $marker.attr('data-type');
    
	// create marker
	var marker = new google.maps.Marker({
		position	: latlng,
		map			: map,
		icon        : icon,
		type        : type,
        category: marker_filter,
	});

	// add to array
	map.markers.push( marker );
    
	// if marker contains HTML, add it to an infoWindow
	if( $marker.html() )
	{
		// create info window
		var infowindow = new google.maps.InfoWindow({
			content		: $marker.html()
		});

		// show marker when mouse in
		google.maps.event.addListener(marker, 'mouseover', function() {          
			infowindow.open( map, marker );
		});
        // close info window when mouse out
		google.maps.event.addListener(marker, 'mouseout', function() {          
			infowindow.close( map, marker );
		});
	}

}
// Filter markers on input change
			$(document).on('click', '[data-mapfilter]', function (event) {
				var id = $(this).data('mapfilter');
				filterMarker(id);
			});
/*
*  Marker Filter - NEW!
*/

filterMarker = function (id) {
    for (i = 0; i < map.markers.length; i++) {
        marker = map.markers[i];
        
       // If is same category or category not picked
			if (marker.category === id || id === 'all' || marker.category === 'all') {
				marker.setVisible(true);
			} else {
				marker.setVisible(false);
			}
    }   
    // set categories nav active
		filterCategories(id); 
}
	/*
	*  filterCategories
	* set active in category nav
	*/
	filterCategories = function (id) {
        console.log('id:',id);
		$('[data-mapFilter]').removeClass('active');
		$('[data-mapFilter*="' + id + '"]').addClass('active').show();
	}
/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	map (Google Map object)
*  @return	n/a
*/

function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();

	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	// only 1 marker?
	if( map.markers.length == 1 )
	{
		// set center of map
	    map.setCenter( bounds.getCenter() );
	    map.setZoom( 16 );
	}
	else
	{
		// fit to bounds
		map.fitBounds( bounds );
	}

}

/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type	function
*  @date	8/11/2013
*  @since	5.0.0
*
*  @param	n/a
*  @return	n/a
*/
// global var
var map = null;

$(document).ready(function(){

	$('.map').each(function(){

		// create map
		map = new_map( $(this) );

	});		

});

})(jQuery);
