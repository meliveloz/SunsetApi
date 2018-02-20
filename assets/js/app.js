
/*let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  let crd = pos.coords;

  sessionStorage.setItem('latitude', crd.latitude);
  sessionStorage.setItem('longitude', crd.longitude);
  console.log(sessionStorage.getItem('latitude'));
  console.log(sessionStorage.getItem('longitude'));
};
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

let latitude = sessionStorage.getItem('latitude');
let longitude = sessionStorage.getItem('longitude');


$('.today').on('click', function(){
navigator.geolocation.getCurrentPosition(success, error, options);*/

function initialize() {
            var input = document.getElementById('searchTextField');
            var autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                var lat = place.geometry.location.lat();
                var long = place.geometry.location.lng();
               
                alert('latitude'+' '+lat+','+ 'longitude'+' '+long);
                document.getElementById('city2').value = place.name;
                document.getElementById('cityLat').value = place.geometry.location.lat();
                document.getElementById('cityLng').value = place.geometry.location.lng();
                //alert("This function is working!");
                //alert(place.name);
               // alert(place.address_components[0].long_name);


fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`)
  .then((response)=>{
    return response.json();
  })
  .then((data) =>{
    console.log(data);
    $('.buttons').addClass('hidden');
    let sunrise =data.results.sunrise;
    let sunset = data.results.sunset;
    let lengthDay = data.results.day_length;
    $('#info').empty();
    $('#info').append(`
        <div class='row text-center'>
          <div class='col-xs-6'>
          <img src='assets/images/sunrise-512.png' class = 'icons'>
            <h4>Sunrise Time<h4>
            <h2>${sunrise}<h2>
          </div>
          <div class='col-xs-6'>
          <img src='assets/images/sunset-512.png' class ='icons'>
            <h4>Sunset Time<h4>
            <h2>${sunset}<h2>
          </div>
        </div>
        <div class='row'>
        <div class='col-xs-12 text-center'>
            <h2>Day length: ${lengthDay}</h2>
        <div>
        <div>`)

})
//})

 });
        }


  google.maps.event.addDomListener(window, 'load', initialize); 


$('.currentTime').text(moment().format('h:mm:ss a'));

 //setTimeout(initialize(), 10000);