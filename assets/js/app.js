//------------------ FIREBASE ------------------
jQuery(document).ready(function($) {
  $('#sect-nav').hide();
  $('#apis-place').hide();
});
var config = {
    apiKey: "AIzaSyDhWCc6S10Usx70Q8NhSZnlGjjO66IYZ80",
    authDomain: "login-prueba-f9344.firebaseapp.com",
    databaseURL: "https://login-prueba-f9344.firebaseio.com",
    projectId: "login-prueba-f9344",
    storageBucket: "",
    messagingSenderId: "130120816145"
  };

firebase.initializeApp(config);

var loginGoogle = document.getElementById('btn-google');
var loginFacebook = document.getElementById('btn-facebook');
var userName = document.getElementById('user-name');
var userImage = document.getElementById('user-img');
var cerrarSesion = document.getElementById('cerrar');


var database = firebase.database();

var userConect = null;
var conectkey = '';

loginGoogle.addEventListener('click', IngresoGoogle);
loginFacebook.addEventListener('click', IngresoFacebook);
cerrarSesion.addEventListener('click', out);
//document.getElementById('botonlogout').addEventListener('click', function() {
//  authService.signOut()
//})

//cerrarSesion.addEventListener('click', EliminarUserBD);
//var provider = new firebase.auth.GoogleAuthProvider();


function IngresoGoogle() {
  if(!firebase.auth().currentUser){
    
    var provider = new firebase.auth.GoogleAuthProvider();
    //indico a google que se van a autentificar
    //provider.addScope('https:wwww.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider).then (function(result){
      var token = result.credential.accesstoken;
      var user= result.user;
      var name = result.user.displayName;

      $('#sect-nav').css('display', 'inline-block');
      $('#apis-place').css('display', 'inline-block');
      $('#login').css('display', 'none');
      

        
      


      //document.querySelector('span.title').textContent = 'Welcome' + name;

  


    }).catch (function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var erroremail = error.email;
      var credential = error.credential;

      if (errorCode==='auth/acconunt-exists-with-different-credential'){
        alert ('Es el mismo usuario');
      }
    });

  }else{
    firebase.auth().signOut();
    
  }
}

function IngresoFacebook() {
  if(!firebase.auth().currentUser){
    
    var provider = new firebase.auth.FacebookAuthProvider();
    //indico a google que se van a autentificar
    //provider.addScope('https:wwww.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider).then (function(result){
      var token = result.credential.accesstoken;
      var user= result.user;
      var name = result.user.displayName;

      

      //document.querySelector('span.title').textContent = 'Welcome' + name;

    }).catch (function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var erroremail = error.email;
      var credential = error.credential;

      if (errorCode==='auth/acconunt-exists-with-different-credential'){
        alert ('Es el mismo usuario');
      }
    });
      }//else{
   // firebase.auth().signOut();
 // }
}

function InicializarFire() {

  firebase.auth().onAuthStateChanged(function(user){
    console.log(user);
    if (user) {
      var displayName = user.displayName;
      var userPhoto = user.photoURL;
      

      //document.querySelector('span.user-name').textContent= displayName;
      userName.textContent = displayName;
      if  (userPhoto){
        //userImage.style.backgroundImage = 'url(../' + userPhoto + ')';
       // userImage.style.backgroundImage = 'url(' +userPhoto+ ')';
     $('#user-img').append('<img class="img-user" src ='+userPhoto+' >');
     } //else {
      // userImage.style.backgroundImage = 'url(../images/profile_placeholder.png)';
      //}
     /*
     userConect = database.ref('/user');
     AgregarUserBD(user.uid, user.displayName);

     userConect.on('child_added', function(data){
      console.log('Ha ingresado a la sala' +data.val().name);
     });

     userConect.on('child_removed', function(data){
      console.log(data.val().name+ 'Ha cerrado sesión');
     })*/
    } else { 
      firebase.auth().signOut();
      $('#user-img').empty();
    }
  });
}
/*
function AgregarUserBD(uid,name){
  var conectado = userConect.push({
    uid:uid,
    name:name
  });

  conectkey = conectado.key;
}
function EliminarUserBD(){
  database.ref('/user/'+conectkey).remove();
  $('#pages2').css ('display', 'none') && $('#page').css ('display', 'block');
}*/


/*función para log out*/

function out(){
  firebase.auth().signOut().then(function(){
    console.log("saliendo..");
    $(document).ready(function(){
  window.location = "index.html";
  window.reload();
  //$('#user-img').empty();
 //recargo la página nuevamente
});
})
  .catch(function(error){
 console.log(error);
  });
};

window.onload = function () {

  InicializarFire();
  //$('#user-img').empty();
  /*setTimeout(function() { //settimeout llama a una función después de un número especificado de milisegundos.
        $('.splash').fadeOut(); //despues de transcurridos los 3 segundos se desvanecera
        }, 1000);
        */
};





// ------------------- API SUNSET ----------------------------------------
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
*/

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
  datetime.html(date.format('MMMM Do YYYY, H:mm:ss a'));
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

// API LUNAR para obtener el tipo de lunas durante la

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
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}
document.addEventListener('DOMContentLoaded', function() { 
  var configMoon = {
    lang: 'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
    month: new Date().getMonth() + 1, // 1  - 12
    year: new Date().getFullYear(),
    size: 100, // pixels
    lightColor: '#FFFF88', // CSS color
    shadeColor: 'rgba(0,0,0,0.5)', // CSS color
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



