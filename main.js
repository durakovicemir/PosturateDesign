//Global Variables
var allBtns = document.querySelectorAll("button");
var stopCamFlag = false;

window.onload = function() {
    var button = document.getElementById("toggleCam");
    var camera = document.getElementById("bg");
    var toggleSwitch = document.getElementById("mySwitch");
    button.innerHTML = "Show Preview";
    camera.style.display = "none";
    toggleSwitch.checked = true;
    timerForWorkOver = true;
    document.getElementById("startStop").innerHTML = "Start Work";
    timeVal = resetTime;
    btnStrSto = false;
    resetFlag = false;
    stopCamFlag = false;
};

//toggleCode:

document.getElementById("toggleCam").addEventListener("click", function(e){
    togglePreview(e);
},false);

// .click = function() {
//     togglePreview()};

function togglePreview(e) {
    console.log(e);
    e.stopPropagation();
    //e.preventDefault();
    stopCamFlag = false;
    var button = document.getElementById("toggleCam");
    var camera = document.getElementById("bg");
    console.log("Cecking if camera is there: ", camera.style.display);
    console.log("Here!!");

    if (camera.style.display == "none") {
        console.log("End Preview Shown");
        loadPython();
        button.innerHTML = "End Preview";
        camera.style.display = "block";
    } 
    else {
        console.log("Show Preview Shown");
        vidOff();
        button.innerHTML = "Show Preview";
        camera.style.display = "none";
    }
    return true;
}

// async function vidOn()
// {
//     //getMedia({audio: true, video: true});
//     // Get access to the camera!
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         // Not adding `{ audio: true }` since we only want video now
//         let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//         video.srcObject = stream;
//     }
// }

function vidOff() {
    // window.localStream = stream;
    // localStream.getVideoTracks()[0].stop();
    // stream.getTracks().forEach(function(track) {
    //     track.stop();
    //   });
    // var camera = document.querySelector("#bg");
    // camera.src = " ";
    // camera.style.display = "none";
    stopCamFlag = true;
    loadPython();
}


////////////////////////////////////////////////////

//Timer
//Reset Timer Vars 
let resetTime = 100;

//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//Define vars to hold display value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Define var to hold set interval function
let interval = null;

//Define a stop timer
let timeVal = resetTime;

//stopwatch status
let status = "stopped";
let timerForWorkOver = false;
let btnStrSto = false;
let resetFlag = false;

function stopWatch(){
    resetFlag = false;
    console.log(timeVal);
    seconds++;
    if(seconds/60 == 1){
        seconds = 0;
        minutes++;
        if(minutes/60 == 1){
            minutes = 0;
            hours++;
            
        }
    }
    if(seconds < 10){
        displaySeconds = "0"+seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }
    if(minutes < 10){
        displayMinutes = "0"+minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }
    if(hours < 10){
        displayHours = "0"+hours.toString();
    }
    else{
        displayHours = hours;
    }
    if(minutes >= timeVal){
        if(timeVal == "00" || timeVal == 0 || timeVal == 60){
            if(hours > 0){
                timerToggle();
            }
        }
        else{
            timerToggle();
        }
    }

    document.getElementById("displayTimer").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

function timerToggle(){
    window.clearInterval(interval);
    if(timerForWorkOver){
        timerForWorkOver = false;
        document.getElementById("startStop").innerHTML = "Start Break";
        status = "stopped";
    }
    else{
        timerForWorkOver = true;
        document.getElementById("startStop").innerHTML = "Start Work";
        status = "stopped";
    }
}

function startStop(){
    btnStrSto = true;
    console.log("Clicked");
    console.log(status);
    if(status == "stopped"){
        console.log("Yep");
        var timer = document.getElementById("timerContent");
        timer.style.maxHeight = "200px";
        timerChange();
        interval = window.setInterval(stopWatch, 5);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";
    }
    else{
        console.log("Nope");
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }
    btnStrSto = false;
}

function timeZero(){
    console.log("TimeZero Now!!");
    displayHours = "00";
    displayMinutes = "00";
    displaySeconds = "00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("startStop").innerHTML = "Start";
    status = "stopped";
}

function reset()
{
    var timer = document.getElementById("timerContent");
    timer.style.maxHeight = "0px";
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    status = "stopped";
    document.getElementById("displayTimer").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start Work";
    document.getElementById("timeLabel").innerHTML = "Work Timer: ";
    timerForWorkOver = true;
    timeVal = resetTime;
    btnStrSto = false;
    resetFlag = true;
    console.log("############### RESET CALLED ################");
}

function timerChange(){
    var select = document.getElementById('breakFreq');
    var value = select.options[select.selectedIndex].value;
    //var select2 = document.getElementById('breakTimer');
    var breakLen = document.getElementById('breekTimer');
    //var value2 = select2.options[select2.selectedIndex].value;
    var value3 = breakLen.value;
    var timerLabel = document.getElementById("timeLabel");
    console.log("LOOK##########################");
    console.log(timerForWorkOver);
    console.log("StopTimer = ");
    console.log(value);
    //console.log("BreakTimer = ");
    //console.log(value2);
    console.log("Check Label: ");
    console.log(timerLabel.innerHTML);
    console.log("Reset Flag: ", resetFlag);
    console.log(breakLen.value);
    if(timerForWorkOver){
        if(value == "noTime"){
            timeVal = resetTime;            
        }
        else{
            if((timerLabel.innerHTML == "Break Timer: ") && (btnStrSto)){
                if(!resetFlag){
                    console.log("Label To Work!");
                    timerLabel.innerHTML = "Work Timer: ";
                }
                console.log("YAAAAAAAAAYYYYYY I AM SWITCHING!!!");
                timeZero();
            }
            timeVal = value;
        }
    }
    else{
        if(value == "noTime"){
            timeVal = resetTime;
        }
        else{
            if((timerLabel.innerHTML == "Work Timer: ") && (btnStrSto)){
                if(!resetFlag){
                    console.log("Label To Break!");
                    timerLabel.innerHTML = "Break Timer: ";
                }
                console.log("YIPPPPPPEEEEEEE I AM SWITCHING!!!");
                timeZero();
            }
            //timeVal = value2;
            timeVal = value3;
        }
    }
}
//////////////////////////////////////////

//Enable/Disable buttons
document.getElementById("mySwitch").addEventListener('change', function() {
    allBtns = document.querySelectorAll("button");
    if (this.checked) {
      console.log("Checkbox is checked..");
      console.log(allBtns);
      for(let b=0; b < allBtns.length; b++){
        console.log(allBtns[b].disabled);
        allBtns[b].disabled = false;
      }
    } 
    else {
      console.log("Checkbox is not checked..");
      console.log(allBtns);
      for(let b=0; b < allBtns.length; b++){
        console.log(allBtns[b].disabled);
        allBtns[b].disabled = true;
      }
    }
});
///////////////////////    

//Calling Server 

function loadPython() {
    var img = document.getElementById("bg");
    console.log("Sending request for feed");
    if(stopCamFlag){
        img.src = " ";
        img.style.display = "none";
    }
    else{
        const xhttp = new XMLHttpRequest(); 
        //img.src = "http://127.0.0.1:5000/cali_feed";
        img.src= 'http://localhost:5000/video_feed?area=41616&x=225&y=116&x1=429&y1=320'
    }
  }

//Event Listeners:

//document.getElementById("toggleCam").addEventListener("click", function(e){ e.stopPropagation(); e.preventDefault(); console.log(e); togglePreview(); });

document.getElementById("startStop").addEventListener("click", startStop);

document.getElementById("reset").addEventListener("click", reset);

document.getElementById("breakFreq").addEventListener("change", timerChange);

document.getElementById("breakTimer").addEventListener("change", timerChange);

document.getElementById("breekTimer").addEventListener("keyup", function(e) { if (e.code === "Enter"){ timerChange(); } });




//////////////////////////////////////////////////////////////////////////////////////////////////
