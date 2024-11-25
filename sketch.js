// Weather Site 

//code = https://openweathermap.org/current = API code 
// Weather Conditions code = https://openweathermap.org/weather-conditions

//code of background setting - given of water drops behind with sun
let raindrops = [];
let fogOpacity = 50; 
let sunX, sunY, sunSize;

function setup() {
  createCanvas(1440,800); //background p5.js water drops 
  sunX = 1000; 
  sunY = 100; 
  sunSize = 100;
  clouds= 100;  
  
  // Create initial raindrops
  for (let i = 0; i < 300; i++) {
    raindrops.push(new Raindrop());

    
  }

  
}

function draw() {
  // Clear the canvas

  background(135, 206, 250); // background color - sky blue 

  //given weather condition functions
  rainEffect();
  sunEffect();
  fogEffect();
  cloudsEffect(); 
 

}

// given rain effect
function rainEffect() {
  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].fall();
    raindrops[i].show();
  }
}

// given sun effect
function sunEffect() {
  noStroke();
  fill(255, 204, 0, 200); // given transparent of sun 
  ellipse(sunX, sunY, sunSize);
}

// fog effect 
function fogEffect() {
  fill(255, 255, 255, fogOpacity); // opacity 
  noStroke();
//   ellipse(width / 2, 855 / 2, 500, 500); 
//   ellipse(width / 2, 855 / 2, 300, 300); 
//   ellipse(width / 2, 855 / 2, 100, 100); 
  fogOpacity = random(40, 60); // opacity for a dynamic effect


ellipse(width / 2, 900 / 2, 50, 50); 
ellipse(1200 / 2, 800 / 2, 30, 30); 
ellipse(1500 / 2, 600 / 2, 100, 100); 
ellipse(1800 / 2, 1000 / 2, 30, 30); 
ellipse(1400 / 2, 1200 / 2, 20, 20); 
ellipse(1100 / 2, 1200 / 2, 35, 35); 
ellipse(1900 / 2, 1250 / 2, 40, 40); 
ellipse(900 / 2, 1300 / 2, 25, 25); 
ellipse(950 / 2, 700 / 2, 15, 15); 
ellipse(1150 / 2, 460 / 2, 25, 25); 
ellipse(850 / 2, 600 / 2, 25, 25); 
ellipse(1850 / 2, 460 / 2, 50, 50); 
ellipse(1850 / 2, 750 / 2, 20, 20); 
ellipse(940 / 2, 940 / 2, 25, 25); 

}

// raindrop class to handle rain
class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50); // drops from the above
    this.length = random(10, 20); // length of each raindrop
    this.speed = random(2, 5); // speed of falling
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, -50); // raindrop to the top if it reaches the bottom
    }
  }

  show() {
    stroke(138, 43, 226); // Purple raindrops
    line(this.x, this.y, this.x, this.y + this.length);
  }
}
 function cloudsEffect () {
   //given clouds - set 1 - left one 
  fill(100,100); 
  ellipse(100,110, 200/2, 100/2); 
  ellipse(60,100, 200/2, 100/2); 
  ellipse(90,75, 200/2, 100/2); 

//given background - grey background 
  fill(300); 
  ellipse(110,110, 200/2, 100/2); 
  ellipse(70,100, 200/2, 100/2); 
  ellipse(100,75, 200/2, 100/2); 


  //clouds - set 2 - middle one 
  fill(100,100); 
  translate(600,10); 
  ellipse(200,115, 160/2, 80/2); 
  ellipse(250,105, 160/2, 80/2); 
  ellipse(210,85, 160/2, 80/2); 

  //given background - grey background 
  fill(300); 
  ellipse(190,110, 160/2, 80/2); 
  ellipse(240,100, 160/2, 80/2); 
  ellipse(200,80, 160/2, 80/2); 


  //clouds - set 3 - right one 
  fill(100,100); 
  translate(600,140); 
  ellipse(120,110, 200/2, 100/2); 
  ellipse(50,100, 200/2, 100/2); 
  ellipse(100,75, 200/2, 100/2); 

  fill(300); 
  ellipse(130,110, 200/2, 100/2); 
  ellipse(60,100, 200/2, 100/2); 
  ellipse(115,80, 200/2, 100/2); 


  //clouds - set 4 - left bottom
  fill(100,100); 
  translate(-960,-80); 
  ellipse(130,120, 180/2, 70/2); 
  ellipse(90,110, 180/2, 70/2); 
  ellipse(110,95, 180/2, 70/2); 

  fill(300); 
  ellipse(120,120, 180/2, 70/2); 
  ellipse(80,110, 180/2, 70/2); 
  ellipse(100,95, 180/2, 70/2); 

  }

///////end of background code///////


///Weather form/// 
const weatherForm = document.querySelector(".weatherForm"); 
const cityInput = document.querySelector(".cityInput"); 
const displayitems = document.querySelector(".displayitems"); 
const apikey = "9aff9ff557fa9efaa3cd7c0d2305a174"; 

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value; 

    if(city){
        try{
          const weatherData = await getWeatherData(city); 
        //   weather data 
        displayWeatherInfo(weatherData); 
        }
        catch(error){
        console.error(error); 
        displayError(error); 
        } 

    }
    else{
      displayError("Opps: Please enter a city again");  
    }
    
    }); 

async function getWeatherData(city){
//passed to the fetch function - code url from webpage - API call = whihc passes the deatils based on city name - live weather//

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`; 

const response = await fetch(apiUrl); 

console.log(response);

//given when response is error 
if(!response.ok){
   throw new Error("Please try again, I couldn't get the weather data because of an issue") 
}
return await response.json(); 
// return the object - weatherlistener 


    
}

function displayWeatherInfo(data){

    //name property and varible - main is property
const {name: city, 
       main:{temp, humidity},  
       weather: [{description, id}]} = data;  //id for weather code 

displayitems.textContent = ""; 
displayitems.style.display = "flex"; 

const cityDisplay = document.createElement("h1"); 
const tempDisplay = document.createElement("p"); 
const humidityDisplay = document.createElement("p"); 
const descDisplay = document.createElement("p"); 
const weatherEmoji = document.createElement("p"); 

cityDisplay.textContent = city;
// tempDisplay.textContent = `${((temp - 273.15)* (9/5) + 32) .toFixed(1)}°C`;
tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;//matches to live/current weather data collects 
humidityDisplay.classList.add("humidityDisplay"); 

cityDisplay.classList.add("cityDisplay"); 
tempDisplay.classList.add("tempDisplay")
humidityDisplay.classList.add("humidityDisplay"); 

humidityDisplay.textContent = `Humidity: ${humidity}%`; 
displayitems.textContent = description;
weatherEmoji.textContent = getWeatherEmoji(id);  //recieve from data 
weatherEmoji.textContent = getWeatherEmoji(id); 

//for every variable should give appendchild in below aswell 
cityDisplay.classList.add("cityDisplay"); 
tempDisplay.classList.add("tempDisplay"); 
humidityDisplay.classList.add("humidityDisplay"); 
descDisplay.classList.add ("descDisplay"); 
weatherEmoji.classList.add("weatherEmoji");  

displayitems.appendChild(cityDisplay); 
displayitems.appendChild(tempDisplay); 
displayitems.appendChild(humidityDisplay); 
displayitems.appendChild(descDisplay); 
displayitems.appendChild(weatherEmoji); 


}

// for emojis = control + command + space bar - it will display based on condition 
function getWeatherEmoji(weatherID) {
    switch(true) {
        
        case (weatherID >= 200 && weatherID < 300): 
            return "⛈️";  // emoji of Thunderstorm
        case (weatherID >= 300 && weatherID < 400): 
            return "🌧️";  // emoji of Rainy
        case (weatherID >= 500 && weatherID < 600): 
            return "🌧️";  // emoji of Rainy
        case (weatherID >= 600 && weatherID < 700): 
            return "❄️";  // emoji of Snow
        case (weatherID >= 700 && weatherID < 800): 
            return "🌫️";  // emoji of Fog
        case (weatherID >= 801 && weatherID < 900): 
            return "☁️";  // emoji of Cloudy
        default: 
            return "❓";  // Unknown weather
    }
}


function displayError(message){

const errorDisplay = document.createElement("p"); 
errorDisplay.textContent = message; 
errorDisplay.classList.add("errorDisplay"); 


displayitems.textContent = ""; //now the display is set to none but the below is setup of display in flex
displayitems.style.display = "flex"; 
displayitems.appendChild(errorDisplay); 
 
}


