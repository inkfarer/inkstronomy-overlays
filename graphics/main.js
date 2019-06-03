const teamAscore = nodecg.Replicant('teamAscore', {defaultValue: 0});
const teamBscore = nodecg.Replicant('teamBscore', {defaultValue: 0});
const stage = nodecg.Replicant('stage');
const scHidden = nodecg.Replicant('scHidden');
const canvas = document.getElementById("scCanvas");
const ctx = scCanvas.getContext('2d');
const teamAname = nodecg.Replicant('teamAname');
const teamBname = nodecg.Replicant('teamBname');
const socialHandles = nodecg.Replicant('socialHandles', {defaultValue: new Array()});
var socialTL = new TimelineMax();
const teamAcolor = nodecg.Replicant('teamAcolor');
const teamBcolor = nodecg.Replicant('teamBcolor');

ctx.beginPath();
ctx.rect(0, 0, 400, 120);
ctx.fillStyle = "#222222";
ctx.fill();
ctx.beginPath();
ctx.rect(400, 0, 50, 120);
ctx.fillStyle = "#0e0e0e";
ctx.fill();
ctx.beginPath();
ctx.rect(0, 0, 450, 30);
ctx.fillStyle = "#151515";
ctx.fill();
ctx.beginPath();
/*ctx.lineWidth = 3;
ctx.strokeStyle = "#0e0e0e";
ctx.moveTo(5, 75);
ctx.lineTo(400, 75);
ctx.stroke();*/

stage.on('change', (newValue, oldValue) => {
    staged.text = newValue;
});

teamAscore.on('change', (newValue, oldValue) => {
    teamAscoreDisplay.innerText = newValue;
});

teamBscore.on('change', (newValue, oldValue) => {
    teamBscoreDisplay.innerText = newValue;
});

scHidden.on('change', (newValue, oldValue) => {
    var scTL = new TimelineMax();
    if (newValue) {
        scTL.add(TweenMax.to("#scoreboardContents", 0.75, { ease: Power2.easeIn, left: -500}));
        scTL.add(TweenMax.to("#omegaline", 0.5, {ease: Power2.easeInOut, height: 0, top: 60}));
    } else {
        scTL.add(TweenMax.to("#omegaline", 0.5, {ease: Power2.easeInOut, height: 120, top: 0}));
        scTL.add(TweenMax.to("#scoreboardContents", 0.75, { ease: Power2.easeOut, left: 5}));
    }
});

teamAname.on('change', (newValue, oldValue) => {
    teamAnameDisplay.text = newValue;
});

teamBname.on('change', (newValue, oldValue) => {
    teamBnameDisplay.text = newValue;
});

function addSocialTL(number) {
    socialTL.add(TweenMax.to("#socialNotifText", 0.3, {opacity: 0, onComplete: function() {
        socialNotifText.innerText = socialHandles.value[number];
    }}));
    socialTL.add(TweenMax.to("#socialNotifText", 0.3, {opacity: 1}));
    socialTL.add(TweenMax.to({}, 1, {}));
}

nodecg.listenFor('showSocialsAnim', message => {
    socialNotifText.innerText = socialHandles.value[0];
    socialTL.add(TweenMax.to("#socialNotifLine", 0.5, {ease: Power2.easeInOut,height: 100, top: 0}));
    socialTL.add(TweenMax.to("#socialNotifDiv", 0.75, {ease: Power2.easeOut,left: 5}));
    socialTL.add(TweenMax.to({}, 1, {}));
    for(i=1;i<socialHandles.value.length;i++) {
        if (socialHandles.value[i] != "") {
            addSocialTL(i);
        }
    }
    socialTL.add(TweenMax.to("#socialNotifDiv", 0.75, {ease: Power2.easeIn,left: -400}));
    socialTL.add(TweenMax.to("#socialNotifLine", 0.5, {ease: Power2.easeInOut,height: 0, top: 50}));
});

var colorNameToHex = {
    "Light Blue":"#0199B8",
    "Purple":"#9208B2",
    "Yellow":"#BBC905",
    "Pink":"#CB0856",
    "Orange":"#FB5C03",
    "Turquoise":"#0CAE6E",
    "Sky Blue":"#007EDC",
    "Mustard":"#CE8003",
    "Default pink":"#f02d7d",
    "Default green":"#19D719"
}

teamAcolor.on('change', (newValue, oldValue) => {
    TweenMax.to("#teamAcolorDisplay", 0.5, {backgroundColor: colorNameToHex[newValue]});
});

teamBcolor.on('change', (newValue, oldValue) => {
    TweenMax.to("#teamBcolorDisplay", 0.5, {backgroundColor: colorNameToHex[newValue]});
});