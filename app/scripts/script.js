console.log("Copyright Chicken Walker Team")
var markers =[]
window.app = {}
function initialize() {
  var myLatlng = new google.maps.LatLng(55.3632592,-3.4433238);
  var mapOptions = {
    zoom: 5,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  var infowindow = new google.maps.InfoWindow();
  
  $.getJSON("data/KFC_Locations.json", function(json1) {
    $.each(json1, function(key, data) {
        var chicken = 'imgs/chicken.svg'
        var latLng = new google.maps.LatLng(data.lat, data.lng); 
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.title,
            icon: 'imgs/chicken.png'
        });
        google.maps.event.addListener(marker, "click", (function(marker){
        return function() {
        console.log("Clicked")
          var image = '<p>' + data.title + '</p>' + '<p>' + data.description + '</p>';
          infowindow.setContent(image);
          console.log(infowindow)
          console.log(image)
          infowindow.open(map, marker);
        };
      })(marker));
        
    });
    
    


    
      
      
      
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


function getMarkersPos(callback){
    var markers = []
    $.getJSON("data/KFC_Locations.json", function(json1) {
    $.each(json1, function(key, data) {
        var latLng = new google.maps.LatLng(data.lat, data.lng);
        markers.push(latLng)
        
        });
        
        callback(markers)
    });
}

function getMenu(callback){
    
    var menu = []
    $.getJSON("data/KFC_Menu_Stripped.json", function(json1) {
    $.each(json1, function(key, data) {
        var item = data.Menu_Item
        menu.push(item)
        
        });
        window.app.json = json1
        callback(menu)
    });
    
}


function getDistance(){
    
    geocoder = new google.maps.Geocoder();
    
    postcode = document.getElementById("postcode").value;
    console.log(postcode)
    var postcodeLocation
    if (geocoder){
    geocoder.geocode( { 'address': postcode}, function(results, status)
   {
      if (status == google.maps.GeocoderStatus.OK)
      {
         //location of first address (latitude + longitude)
         postcodeLocation = results[0].geometry.location;
         console.log("Postcode: " + postcodeLocation)
      } else
      {
         alert("Geocode was not successful for the following reason: " + status);
      }
   });
   
   getMarkersPos(function (markers){
       var closest
       console.log(markers)
       $.each(markers,function(i,marker){
    var distance=google.maps.geometry.spherical.computeDistanceBetween(marker,postcodeLocation);
    if(!closest || closest.distance > distance){
        
      closest={marker:marker,
               distance:distance}
        console.log(closest)
        console.log(marker)
    }
    
     
  
  });
  console.log(closest)
   if(closest){
    //closest.marker will be the nearest marker, do something with it
    //here we simply trigger a click, which will open the InfoWindow 
    getNoOfTimesToWalk(closest.distance, getNoOfCalories())  
    console.log("Works")
   } 
   });
   
}
    
    
}

function getNoOfCalories(){
    
    var selected = $("#menu").val()
    console.log(selected)
    var json = window.app.json
    var calories = 0
    $.each(selected, function(i,index){
        console.log(index)
        index = parseInt(index)
        calories += parseInt(json[index].Calories)
        console.log(calories)
        
    });
    return calories
    
    
    
}

function getNoOfTimesToWalk(distance, calories){
  var calPerMeter = 0.053622272 ;
  
  var distNeeded = calories / calPerMeter;
  
  if (distNeeded < distance) {
    return "1";  
  } 
  else if (distNeeded > distance){
     var noOfTimes =  distNeeded/distance
       document.getElementById("noOfTimes").innerHTML= "Number of times to walk between your home and the nearest KFC to burn the calories off.: " +Math.ceil(noOfTimes) + " times"
   };1
   };

getMenu(function(menu){
    $.each(menu, function(index, value) {

     $('#menu').append($('<option>').text(value).attr('value', index));
});

});

$("menu").multiSelect()
