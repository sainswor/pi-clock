
var mode = 'clock';
var countDownTime = '2020-07-19T00:00:00';
var burnProtect = true;
const replaceZeroWith = 'O';
var lastmode = '';
var lastViewWidth;
var lastHour;
var inBedAfter = "19:45"; //7:45 PM -- this will be OVERWRITTEN by the value in 'config.json' if it is present
var inBedBefore = "7:15"; //7:15 AM -- this will be OVERWRITTEN by the value in 'config.json' if it is present
var nightColor = 'rgb(77, 64, 0)';
var dayColor = 'rgb(225, 185, 50)';  
var phraseMode = true; //true for phrase mode, false for date - set this in 'config.json'
const phrases = [
    "TIME FOR SLEEP", "TIME FOR SLEEP", "TIME FOR SLEEP",
    "GO BACK TO SLEEP", "GO BACK TO SLEEP", 
    "TOO EARLY TO GET UP", "TOO EARLY TO GET UP",
    "GOOD MORNING", "8 AM", "9 AM", "10 AM", "11 AM", "Noon", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
    "GOOD NIGHT", "GOOD NIGHT", 
    "SLEEP WELL",  
    "QUIET TIME", "QUIET TIME" 
];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function showTime() {
    var timer = 1000;

    // Just hardcode a future date for testing

    var now = new Date();
    var ms = now.getMilliseconds();

    if (mode != lastmode) {
        lastmode = mode;
        lastViewWidth = 0;
    }

    if (mode == 'clock') {

        var h = now.getHours();
        var m = now.getMinutes();
        var friendlyH = (h > 12) ? h-12 : h;
        m = (m < 10) ? "0" + m : m;
        if (burnProtect) {
            var offset = Math.sin(m / 60 * 2 * Math.PI) * 6 + 47;
            $('#TextContainer').css('top', offset + '%');
        }
    }
    else if (mode == 'timer') {
        var timeOver = 0;

        var distance = new Date(countDownTime).getTime() - now.getTime();
        if (distance < 0) {
            distance = Math.floor(Math.abs(distance) / 1000);
            timeOver = 1;
        }
        else {
            distance = Math.ceil(distance / 1000);
        }

        h = Math.floor(distance / (60 * 60));
        m = Math.floor((distance % (60 * 60)) / 60);
        s = distance % 60;

        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        document.getElementById("sign").innerText = timeOver ? "+" : "-";

        if (h != lastHour) {
            lastHour = h;

            if (h == 0) {
                $('#hour').css('display', 'none');
                $('#hoursep').css('display', 'none');
                $('#sec').css('font-size', '120%');
            }
            else {
                $('#hour').css('display', 'inline');
                $('#hoursep').css('display', 'inline');
                $('#sec').css('font-size', '100%');
            }

            lastViewWidth = 0;
        }
    }
    const morning = inBedBefore.split(":");
    const night = inBedAfter.split(":");

    const timeString = (friendlyH+":"+m).replace(/0/g, replaceZeroWith);
    const dateString = dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate();
    var msgString = "";
    if (phraseMode) {
        msgString = phrases[h];
    } else {
        msgString = dateString;
    }
    var displayString = "";
    if (((h < morning[0]) || ((h == morning[0]) && (m < morning[1]))) || (((h == night[0]) && (m >= night[1])) || (h > night[0]))) {
        document.getElementById("time").style.color = nightColor;
        displayString = msgString;
    } else {
        document.getElementById("time").style.color = dayColor;
        displayString = timeString;        
    }
   
    document.getElementById("time").innerText = displayString;

    // Trying to do something clever here to ensure we update the time roughly within
    // 100ms of the turn of the second

    if (ms < 990) {
        timer = 1000 - ms;
    }
    else {
        timer = 10;
    }

    setTimeout(showTime, timer);

    //setTimeout(resizeText, 50);
    resizeText(displayString);
}

function resizeText(displayString) {
    
    var textSize = 500;
    var maxTextHeight = $(window).height() - 64;
    var maxTextWidth = $(window).width() - 64;
    var textHeight;
    var textWidth;

    do {
        $('#time').css('font-size', textSize);
        textHeight = $('#time').height();
        textWidth  = $('#time').width();
        textSize = textSize - 1;
    } while (textHeight > maxTextHeight || textWidth > maxTextWidth && fontSize > 3);
    $('#TextCell').css('visibility', 'visible');
}

$.getJSON("config.json", function(data) {
    if ('mode' in data) {
        mode = data.mode;
        if ('countDownTime' in data && data.mode == 'timer') {
            countDownTime = data.countDownTime;
        }
    }
    if ('burnProtect' in data) {
        burnProtect = data.burnProtect;
    }
    if ('inBedAfter' in data) {
        inBedAfter = data.inBedAfter;
    }
    if ('inBedBefore' in data) {
        inBedBefore = data.inBedBefore;
    }
    if ('phrase' in data) {
        phraseMode = data.phrase;
    }
    if ('dayColor' in data) {
        dayColor = data.dayColor;
    }
    if ('nightColor' in data) {
        nightColor = data.nightColor;
    }
});

