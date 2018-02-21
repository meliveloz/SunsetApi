
// Evento click para ver las horas de sunset y sunrise de hoy
$('.today').on('click', function() {
  $('.today').addClass('hidden');
  $('.anyDay').addClass('hidden');
  $('#todayInfo').removeClass('hidden');
  $('.moonButton').addClass('hidden');
});

// evento click para ver las horas de sunset y sunrise de cualquier día
$('.anyDay').on('click', function() {
  $('.today').addClass('hidden');
  $('.anyDay').addClass('hidden');
  $('.inputDate').removeClass('hidden');
  $('#searchWithDate').removeClass('hidden');
  $('.moonButton').addClass('hidden');
});
// inicializando el autocompletado de google map para obtener longitud y latitud de cualquier parte del mundo.
function initialize1() {
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var long = place.geometry.location.lng();
               
    // alert('latitude'+' '+lat+','+ 'longitude'+' '+long);
    document.getElementById('city2').value = place.name;
    document.getElementById('cityLat').value = place.geometry.location.lat();
    document.getElementById('cityLng').value = place.geometry.location.lng();
  

    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`)
      .then((response)=>{
        return response.json();
      })
      .then((data) =>{
        console.log(data);
        $('.buttons').addClass('hidden');
        let sunrise = data.results.sunrise;
        let sunset = data.results.sunset;
        let lengthDay = data.results.day_length;
        console.log(sunrise);

        // Cambiando hora UTC sunrise a local con momentjs
        let dateFormat = 'HH:mm:ss a';
        let testDateUtc = moment.utc(sunrise);
        let localDate = testDateUtc.local();
        let localDate1 = localDate.format(dateFormat);
        // Cambiando hora UTC sunset a local con momentjs
        let dateFormat2 = 'HH:mm:ss a';
        let testDateUtc2 = moment.utc(sunset);
        let localDate3 = testDateUtc2.local();
        let localDate2 = localDate3.format(dateFormat2);

        $('#info').empty();
        $('#info').append(`
        <div class='row text-center'>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunrise-512.png' class = 'icons'>
            <h4>Sunrise Time<h4>
            <h2>${localDate1}<h2>
          </div>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunset-512.png' class ='icons'>
            <h4>Sunset Time<h4>
            <h2>${localDate2} <h2>
          </div>
        </div>
        <div class='row'>
        <div class='col-xs-12 text-center'>
            <h2 class='dayLength'>Day length: ${((lengthDay / 60) / 60).toFixed(2)} hr</h2>
        <div>
        <div>`);
      });
  });
}
// Función para fecha y hora corriendo continuamente, con momentjs.
var datetime = null,
  date = null;

var update = function() {
  date = moment(new Date());
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function() {
  datetime = $('.currentTime');
  update();
  setInterval(update, 1000);
});

google.maps.event.addDomListener(window, 'load', initialize1);

// funcion google map para el buscador por fechas , autocompletado de ciudades. 
function initialize() {
  var input = document.getElementById('searchWithDate');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var long = place.geometry.location.lng();
               
    // alert('latitude'+' '+lat+','+ 'longitude'+' '+long);
    document.getElementById('city3').value = place.name;
    document.getElementById('cityLat3').value = place.geometry.location.lat();
    document.getElementById('cityLng3').value = place.geometry.location.lng();

    $('#date').change(function() {
      let myDate = $(this).val();
      console.log(myDate);

      fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0&date=${myDate}`)
        .then((response)=>{
          return response.json();
        })
        .then((data) =>{
          console.log(data);

          let sunrise = data.results.sunrise;
          let sunset = data.results.sunset;
          let lengthDay = data.results.day_length;

          // Cambiando hora UTC sunrise a local con momentjs
          let dateFormat = 'HH:mm:ss a';
          let testDateUtc = moment.utc(sunrise);
          let localDate = testDateUtc.local();
          let localDate1 = localDate.format(dateFormat);
          // Cambiando hora UTC sunset a local con momentjs
          let dateFormat2 = 'HH:mm:ss a';
          let testDateUtc2 = moment.utc(sunset);
          let localDate3 = testDateUtc2.local();
          let localDate2 = localDate3.format(dateFormat2);

          $('#info2').empty();
          $('#info2').append(`
        <div class='row text-center'>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunrise-512.png' class = 'icons'>
            <h4>Sunrise Time<h4>
            <h2>${localDate1}<h2>
          </div>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunset-512.png' class ='icons'>
            <h4>Sunset Time<h4>
            <h2>${localDate2}<h2>
          </div>
        </div>
        <div class='row'>
        <div class='col-xs-12 text-center'>
            <h2 class='dayLength'>Day length:${((lengthDay / 60) / 60).toFixed(2)} hr</h2>
        <div>
        <div>`);
        });
    });
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

// API LUNAR para obtener el tipo de lunas durante la semana.

function load_moon_phases(obj) {
  var gets = [];
  for (var i in obj) {
    gets.push(i + '=' + encodeURIComponent(obj[i]));
  } 
  var xmlhttp = new XMLHttpRequest();
  var url = 'http://www.icalendar37.net/lunar/api/?' + gets.join('&');
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var moon = JSON.parse(xmlhttp.responseText);
      example_1(moon);
      example_2(moon);
      example_3(moon); 
      example_4(moon);
      example_5(moon);
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}
document.addEventListener('DOMContentLoaded', function() { 
  var configMoon = {
    lang: 'es', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
    month: new Date().getMonth() + 1, // 1  - 12
    year: new Date().getFullYear(),
    size: 100, // pixels
    lightColor: '#FFFF88', // CSS color
    shadeColor: '#111111', // CSS color
    sizeQuarter: 20, // pixels
    texturize: false / true - false
  };
  configMoon.LDZ = new Date(configMoon.year, configMoon.month - 1, 1) / 1000;
  load_moon_phases(configMoon);
});

$('.moonButton').on('click', function() {
  $('.today').addClass('hidden');
  $('.anyDay').addClass('hidden');
  $('#todayInfo').addClass('hidden');
  $('#moonInfo').removeClass('hidden');
  $('.moonButton').addClass('hidden');
  example_1(moon);
});

function example_1(moon) {
  var day = new Date().getDate();
  var dayWeek = moon.phase[day].dayWeek;
  var html = '<div class="moon">';
  html += '<div>' + moon.nameDay[dayWeek] + '</div>'
  html += '<div>'+ day + ' ' + moon.monthName + ' ' + moon.year + '</div>'
  html += moon.phase[day].svg
  html += '<div>' + moon.phase[day].phaseName + ' ' + Math.round(moon.phase[day].lighting)+'%</div>'
  html += '</div>'
  document.getElementById('ex1').innerHTML = html
}


function example_2(moon){
  var day = new Date().getDate() + 1;
  var dayWeek = moon.phase[day].dayWeek
  var html = "<div class='moon'>"
  html += '<div>'+moon.nameDay[dayWeek]+"</div>"
  html += '<div>'+ day + ' ' + moon.monthName + ' ' + moon.year + '</div>'
  html += moon.phase[day].svg
  html += '<div>' + moon.phase[day].phaseName + ' '+ Math.round(moon.phase[day].lighting)+'%</div>'
  html += '</div>'
  document.getElementById('ex2').innerHTML = html
}


function example_3(moon){
  var day = new Date().getDate()+2
  var dayWeek = moon.phase[day].dayWeek
  var html = '<div class="moon">'
  html += '<div>' + moon.nameDay[dayWeek] + '</div>'
  html += '<div>' +  day + ' ' + moon.monthName + ' ' + moon.year + '</div>'
  html += moon.phase[day].svg
  html += '<div>' + moon.phase[day].phaseName + ' ' + Math.round(moon.phase[day].lighting) + '%</div>'
  html += '</div>'
  document.getElementById('ex3').innerHTML = html
}


function example_4(moon){
  var day = new Date().getDate() + 3
  var dayWeek = moon.phase[day].dayWeek
  var html = '<div class="moon">'
  html += '<div>'+moon.nameDay[dayWeek]+"</div>"
  html += '<div>'+ day + ' ' + moon.monthName + ' ' + moon.year + '</div>'
  html += moon.phase[day].svg
  html += '<div>' + moon.phase[day].phaseName + " " + Math.round(moon.phase[day].lighting) + '%</div>'
  html += '</div>'
  document.getElementById('ex4').innerHTML = html
}



function example_5(moon){
  var day = new Date().getDate() + 4
  var dayWeek = moon.phase[day].dayWeek
  var html = '<div class="moon">'
  html += '<div>' + moon.nameDay[dayWeek] + '</div>'
  html += '<div>' + day + ' ' + moon.monthName + ' ' + moon.year + '</div>'
  html += moon.phase[day].svg
  html += '<div>' + moon.phase[day].phaseName + ' ' + Math.round(moon.phase[day].lighting) + '%</div>'
  html += '</div>'
  document.getElementById('ex5').innerHTML = html
}


