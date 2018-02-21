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
$('.today').on('click', function(){
    $('.today').addClass('hidden');
    $('.anyDay').addClass('hidden');
    $('#todayInfo').removeClass('hidden');


});
$('.anyDay').on('click', function(){
  $('.today').addClass('hidden');
    $('.anyDay').addClass('hidden');
    $('.inputDate').removeClass('hidden');
    $('#searchWithDate').removeClass('hidden');
})
function initialize1() {
            var input = document.getElementById('searchTextField');
            var autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                var lat = place.geometry.location.lat();
                var long = place.geometry.location.lng();
               
                //alert('latitude'+' '+lat+','+ 'longitude'+' '+long);
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
console.log(sunrise);
/*var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
document.write(utc);*/

// Para cambiar a hora local el sunrise
let utcTime = sunrise;
let utcText = moment(utcTime,'HH:mm').format("HH:mm");

let local = moment.utc(utcTime,'HH:mm').local().format("HH:mm A");

let localTime1 = local;//setting local time
let utc = moment(localTime1,'hh:mm A').utc().format("HH:mm");


console.log(localTime1);
 //Para cambiar a hora local el sunset
let utcTime2 = sunset;
let utcText2 = moment(utcTime2,'HH:mm').format("HH:mm");

let local2 = moment.utc(utcTime2,'HH:mm').local().format("HH:mm");

let localTime2 = local2;//setting local time
let utc2 = moment(localTime2,'hh:mm A').utc().format("HH:mm");




    $('#info').empty();
    $('#info').append(`
        <div class='row text-center'>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunrise-512.png' class = 'icons'>
            <h4>Sunrise Time<h4>
            <h2>${localTime1}<h2>
          </div>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunset-512.png' class ='icons'>
            <h4>Sunset Time<h4>
            <h2>${localTime2} PM<h2>
          </div>
        </div>
        <div class='row'>
        <div class='col-xs-12 text-center'>
            <h2 class='dayLength'>Day length: ${lengthDay}</h2>
        <div>
        <div>`)

})
//})

 });
        }
//Función para fecha y hora corriendo continuamente, con momentjs.
var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('.currentTime')
    update();
    setInterval(update, 1000);
});




//fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2018-02-20`)
  google.maps.event.addDomListener(window, 'load', initialize1); 
 


function initialize() {

 var input = document.getElementById('searchWithDate');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var place = autocomplete.getPlace();
  var lat = place.geometry.location.lat();
  var long = place.geometry.location.lng();
               
  //alert('latitude'+' '+lat+','+ 'longitude'+' '+long);
  document.getElementById('city3').value = place.name;
  document.getElementById('cityLat3').value = place.geometry.location.lat();
  document.getElementById('cityLng3').value = place.geometry.location.lng();


 $("#date").change(function(){
   let myDate = $(this).val();
   console.log(myDate);


fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${myDate}`)
 .then((response)=>{
    return response.json();
  })
  .then((data) =>{
    console.log(data);

let sunrise =data.results.sunrise;
let sunset = data.results.sunset;
let lengthDay = data.results.day_length;
// Para cambiar a hora local el sunrise
let utcTime = sunrise;
let utcText = moment(utcTime,'HH:mm').format("HH:mm");

let local = moment.utc(utcTime,'HH:mm').local().format("HH:mm A");

let localTime1 = local;//setting local time
let utc = moment(localTime1,'hh:mm A').utc().format("HH:mm");


console.log(localTime1);
 //Para cambiar a hora local el sunset
let utcTime2 = sunset;
let utcText2 = moment(utcTime2,'HH:mm').format("HH:mm");

let local2 = moment.utc(utcTime2,'HH:mm').local().format("HH:mm");

let localTime2 = local2;//setting local time
let utc2 = moment(localTime2,'hh:mm A').utc().format("HH:mm");


$('#info2').empty();
    $('#info2').append(`
        <div class='row text-center'>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunrise-512.png' class = 'icons'>
            <h4>Sunrise Time<h4>
            <h2>${localTime1}<h2>
          </div>
          <div class='col-xs-6 color-wall'>
          <img src='assets/images/sunset-512.png' class ='icons'>
            <h4>Sunset Time<h4>
            <h2>${localTime2} PM<h2>
          </div>
        </div>
        <div class='row'>
        <div class='col-xs-12 text-center'>
            <h2 class='dayLength'>Day length: ${lengthDay}</h2>
        <div>
        <div>`)


  })

  });
})

}
google.maps.event.addDomListener(window, 'load', initialize);





