var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var currentdate = new Date(); 
var seconds = currentdate.getSeconds() - 1;
var minutes = currentdate.getMinutes();
var hours = currentdate.getHours();
var millisecond = currentdate.getMilliseconds();
var degree = "0";
var x = 0;
var y = 0;
var fulltime = "";

var apiKey = "c6f6859ae1938c858319a7b8cd7bc179"; 
var inputVal = "Neuss";
var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
var weather = {};
var temp_min = 0;
var temp_max = 0;



//Size of canvas
var width = 1400;
var height = 700;


//update time function
function updateTime() {
  currentdate = new Date(); 
  seconds = currentdate.getSeconds();
  minutes = currentdate.getMinutes();
  hours = currentdate.getHours();
  millisecond = currentdate.getMilliseconds();
  return seconds, minutes, hours, millisecond;
}

//make hours/minutes/seconds below 10 appear with a 0 in front
function calculateCorrectNumberPattern(n){
  return n < 10 ? `0${n}` : n;
}

//put the temperature in () when in the negatives
function calctempbrackets(n) {
  return n < 0 ? `(${n})` : n;
}

//get wheather JSON
async function updateWeather(){
  weather = await (await fetch(url)).json();
  temp_min = weather.main.temp_min;
  temp_max = weather.main.temp_max;
  return temp_min, temp_max;
}

function init(){
  updateWeather();
  setInterval('draw()', 1000);
  setInterval('updateWeather()', 60000);
}



//Draw function
function draw() {
  //Reset Canvas
  ctx.fillStyle = "#121212";
  ctx.strokeStyle= "#3c2551";
  ctx.beginPath();
  ctx.fillRect(0, 0, width, height);
  ctx.fill();

  //make the more dark background circle
  ctx.beginPath();
  ctx.arc((width/2), (height/2), ((height/100)*40), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc((width/2), (height/2), ((height/100)*35), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc((width/2), (height/2), ((height/100)*30), 0, 2 * Math.PI);
  ctx.stroke();
  
  //Call update time function
  updateTime()

  //formatting cricles
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#BB86FC";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#BB86FC";

  // make new circle (Seconds)
  ctx.beginPath();
  ctx.arc((width/2), (height/2), ((height/100)*40), 1.5 * Math.PI, ((seconds/30) * Math.PI) + 1.5 * Math.PI);
  ctx.stroke();

  // make new circle (minutes)
  ctx.beginPath();
  ctx.arc((width/2), (height/2), ((height/100)*35), 1.5 * Math.PI, ((minutes/30) * Math.PI) + 1.5 * Math.PI);
  ctx.stroke();

  // make new circle (hours)
  ctx.beginPath();
  ctx.arc((width/2), (height/2), ((height/100)*30), 1.5 * Math.PI, ((hours/12) * Math.PI) + 1.5 * Math.PI);
  ctx.stroke();

  //Text in the middle
  ctx.font = "50px Roboto Mono";
  ctx.fillStyle = "#BB86FC";
  ctx.textAlign = "center";

  ctx.fillText(calculateCorrectNumberPattern(hours) + ":" +   calculateCorrectNumberPattern(minutes) + ":" + calculateCorrectNumberPattern(seconds), (width/2), (height/2 + 25));

  //Degree text formatting
  ctx.font = "37px Roboto Mono";
  ctx.fillStyle = "#5effbf";
  ctx.textAlign = "center";
  


  //temp text
  ctx.fillText(`${Math.round(weather.main.temp * 10) / 10}°C`, (width/2), (height/2 - (0 + (25 + 37))));
  ctx.fillText(`${Math.round(weather.main.temp_min)*10/10}°C-${Math.round(weather.main.temp_max)*10/10}°C`, (width/2), (height/2 + - 25));
  return seconds
}