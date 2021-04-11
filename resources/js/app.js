
require('jquery');
require('./bootstrap');
require('./bootstrap.min.js');

$( document ).ready(function() {

  var APP_URL = window.Laravel.APP_URL;
  console.log($(location).attr('hostname'));
  var DP_SERVER_URL = 'http://localhost:8080';
  if($(location).attr('hostname') == "10.0.2.2"){
    DP_SERVER_URL = 'http://10.0.2.2:8080';
  }
  var APP_CSRF = window.Laravel.csrfToken;

  var lat = 24.748344;
  var long = 46.640382;
  var timestamp = 1616975430;
  var color = "huechange-r";

  var listOfOLocations = [];

  // 1,24.748344,46.640382,1616975430
  // 2,24.748038,46.639142,1616975470
  // 3,24.745975,46.634870,1616975510

  var mymap = L.map('mapid').setView([lat, long], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVuZXJhaCIsImEiOiJja216ZDQ4ZjQwY3BjMnV0NzBmanRuMGJxIn0.68MXA1IoAt3gxv16LB4mGQ'
  }).addTo(mymap);

  $('#generate-rand').click(function(){
    var num = $('#number').val();
    color = "huechange-r";
    for (i = 0; i < num; i++) {
      var singleLoc = {};
      singleLoc['id'] = generateID(6);
      singleLoc['lat'] = getRandomInRange(24.74, 24.79, 6);
      singleLoc['long'] = getRandomInRange(46.64, 46.74, 6);
      singleLoc['timestamp'] = Math.floor(Date.now() / 1000) + Math.floor(Math.random()*(99-10+1)+10);
      singleLoc['anonymity_policy'] = 'basic';
      listOfOLocations.push(singleLoc);
      addMarker(singleLoc, color, true);
    }
    addTRClickListener();
  });

  $('#add-loc').click(function(){
    var lt = $('#lat').val();
    var ln = $('#long').val();
    var singleLoc = {};
    singleLoc['id'] = generateID(6);
    singleLoc['lat'] = lt;
    singleLoc['long'] = ln;
    color = "huechange-r";
    singleLoc['timestamp'] = Math.floor(Date.now() / 1000);
    singleLoc['anonymity_policy'] = 'strong';
    listOfOLocations.push(singleLoc);
    addMarker(singleLoc, color, true);
    addTRClickListener();
  });

  function generateID(n){
    var add = 1,
    max = 12 - add;

    if (n > max) {
      return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

  function addMarker(obj, color, exact){

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXVuZXJhaCIsImEiOiJja216ZDQ4ZjQwY3BjMnV0NzBmanRuMGJxIn0.68MXA1IoAt3gxv16LB4mGQ'
    }).addTo(mymap);

    var marker = L.marker([obj['lat'], obj['long']]).addTo(mymap);
    var desc = "";
    if(exact){
      desc = "<b>Exact Location</b>";
      marker._icon.id = obj['id'];
    } else {
      desc = "<b>Perturbed Location</b>";
      marker._icon.id = obj['id'] + "p";
    }
    marker.bindPopup(desc+"<br>ID: "+obj['id']+"<br>Lat: "+obj['lat']+"<br>Long: "+obj['long']);
    marker._icon.classList.add(color);
    $('#log tbody').append("<tr class='"+ obj['id'] +"'><td>" + obj['id'] + "</td><td>"+ obj['lat'] +"</td><td>"
    + obj['long'] + "</td><td>"+ obj['timestamp'] +"</td><td>" + (exact? "None": ((obj['anonymity_policy'] == 'K')?"K-anonymity":(obj['anonymity_policy'] == 'L'? "Laplacian":"Gaussian"))) + "</td></tr>");

  }

  function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }

  $('#go-hide').click(function(){

    // if(listOfOLocations.length > 0){
    //   $("#go-reset").prop("disabled", true);
    //   $("#generate-rand").prop("disabled", true);
    //   $("#add-loc").prop("disabled", true);
    // }

    var mech = $('#mech').val();
    listOfOLocations.forEach(function(item, index, arr){
      console.log(item['id']);
      console.log(item['lat']);
      console.log(item['long']);
      console.log(item['timestamp']);
      sendRequest(item['id'], item['lat'], item['long'], item['timestamp'], mech);
    });

  });

  $('#go-reset').click(function(){
    $('#log tbody').empty();
    listOfOLocations = [];
    mymap.eachLayer(function (layer) {
      mymap.removeLayer(layer);
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXVuZXJhaCIsImEiOiJja216ZDQ4ZjQwY3BjMnV0NzBmanRuMGJxIn0.68MXA1IoAt3gxv16LB4mGQ'
    }).addTo(mymap);
  });

  function sendRequest(id, lat, long, timestamp, mech){

    $.ajax({
      type : 'post',
      url : DP_SERVER_URL + '/K-anonymity-DP-Server/AnonymityServlet',
      data:
      {
        "_token": APP_CSRF,
        'id': id,
        'latitude': lat,
        'longitude': long,
        'timestamp': timestamp,
        'mech': mech,
        'anonymity_policy': 'basic'
      },
      success: function(data, textStatus, request){
        console.log(request.getAllResponseHeaders());
        console.log(data);
        color = "huechange-g";
        var singleLoc = {};
        singleLoc['id'] = data.id;
        singleLoc['anonymity_policy'] = data.policy;
        singleLoc['lat'] = data.latitude;
        singleLoc['long'] = data.longitude;
        singleLoc['timestamp'] = Math.floor(Date.now() / 1000);
        addMarker(singleLoc, color, false);
        addTRClickListener();
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
      }
    });
  }

  function addTRClickListener(){
    $('#log tr').click(function () {
      var id = "#"+ $(this).children()[0].innerText;
      var classid = "."+ $(this).children()[0].innerText;
      var policy = $(this).children()[4].innerText;
      if(policy == "None"){
        $(id).focus();
        $(id).click();
      } else {
        $(id + "p").focus();
        $(id + "p").click();
      }
      $(classid).parent().children().css({"backgroundColor": "white","color":"black"});
      $(classid).css({"backgroundColor":"#419ad6d6","color":"white"});
    });
  }


});
