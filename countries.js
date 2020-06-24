"use strict";

function handleResponse( res ){
    console.log("success", res );
    return res.json();
}

function handleError( err ){
    console.error( "fetch error", err );
    document.querySelector("#country").innerHTML = `
      <span style='color:tomato'>Error loading data.</span>`;
}

function handleData( data ){
    const region = data[0].region;
    const subregion = data[0].subregion;
    const capital = data[0].capital;
    const population = data[0].population;
    const name = data[0].name;
    const language = data[0].languages[0].name;
    const currency = data[0].currencies[0].name;
    const flag = data[0].flag;

    document.querySelector("#flag").innerHTML = `
      <img src=${flag} alt=${name} />`;

    document.querySelector("#country").innerHTML = `
      <p>${name} belongs to the region of ${region} and specifically to the ${subregion}.</p>
      <p>The capital of ${name} is ${capital} and ${name} has ${population} population. </p>
      <p>The national language is ${language} and the currency is ${currency}. </p>`;

    const lat = data[0].latlng[0];
    const long = data[0].latlng[1];

    document.querySelector("#map").innerHTML = "";
    
    let map = new ol.Map({
        target: 'map',
        layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
        ],
        view: new ol.View({
        center: ol.proj.fromLonLat([long, lat]),
          zoom: 6
         })
      });
}

function myApp(){
  const form = document.querySelector("form");

  form.addEventListener("submit", function(e){
      e.preventDefault();
      document.querySelector("#country").innerHTML = `
        <img src="load.gif" alt="load"/>`;
      const input = document.querySelector("#country_name");
      const countryName = input.value.toLowerCase().trim();
      const URL = "https://restcountries.eu/rest/v2/name/" + countryName;

      fetch( URL )
      .then( handleResponse )
      .then( handleData )
      .catch( handleError );
  });
}    

window.addEventListener("DOMContentLoaded", myApp);
