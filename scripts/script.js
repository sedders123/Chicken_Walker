function initialize() {
  var myLatlng = new google.maps.LatLng(55.3632592,-3.4433238);
  var mapOptions = {
    zoom: 5,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  $.getJSON("data/KFC_Locations.json", function(json1) {
    $.each(json1, function(key, data) {
        var latLng = new google.maps.LatLng(data.lat, data.lng); 
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.title
        });
    });
});
}

google.maps.event.addDomListener(window, 'load', initialize);


// Scrolls to the selected menu item on the page
$(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });