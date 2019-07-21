const nowPlaying = nodecg.Replicant("nowPlaying");
const manualsong = nodecg.Replicant("manualSong");
const mSongEnabled = nodecg.Replicant("mSongEnabled");
const songHidden = nodecg.Replicant("songHidden");
const bigTextValue = nodecg.Replicant("bigTextValue");
const breakFlavorText = nodecg.Replicant("breakFlavorText");
var ignoreMe = measureText("this is here to hopefully fix a bug i've been seeing every now and then, not sure if it fixes anything");

function updateSongText() {
    if (mSongEnabled.value) {
        textAnim(manualsong.value, "song", "musicBG");
    } else {
        if (nowPlaying.value.artist === undefined && nowPlaying.value.song === undefined) {
            textAnim("Nothing appears to be playing at the moment.", "song", "musicBG");
        } else {
            textAnim(nowPlaying.value.artist + " - " + nowPlaying.value.song, "song", "musicBG");
        }
    }
}

nowPlaying.on("change", (newValue, oldValue) => {
    if (newValue !== oldValue && !mSongEnabled.value) {
        updateSongText();
    }
});

manualsong.on("change", (newValue, oldValue) => {
    if (newValue !== oldValue && mSongEnabled.value) {
        updateSongText();
    }
});

mSongEnabled.on("change", (newValue, oldValue) => {
    if (newValue !== oldValue) {
        updateSongText();
    }
});

songHidden.on("change", (newValue, oldValue) => {
    if (newValue) {
        TweenMax.to(["#musicBG", "#musicIcon"], 0.5, { opacity: 0 });
    } else {
        TweenMax.to(["#musicBG", "#musicIcon"], 0.5, { opacity: 1 });
    }
});

function measureText(text, font, fontSize) {
    measurer.style.fontFamily = font;
    measurer.style.fontSize = fontSize;
    measurer.innerHTML = text;
    return measurer.getBoundingClientRect().width;
}

function textAnim(newText, element, BGelement) {
    var calcWidth;
    if (newText == "") {
        calcWidth = 0;
    } else {
        calcWidth = measureText(newText, "'Montserrat', sans-serif", "2.8em") + 10;
    }
    var songTimeline = new TimelineMax();
    songTimeline.add(TweenMax.to("#" + element, 0.5, {bottom: -65, ease: Power2.easeIn, onComplete: function() {
        document.getElementById(element).text = newText;
        document.getElementById(element).style.bottom = "65px";
    }}))
    .add(TweenMax.to("#" + BGelement, 0.5, {ease: Expo.easeInOut, width: calcWidth}))
    .add(TweenMax.to("#" + element, 0.5, {bottom: 1}));
}

bigTextValue.on("change", (newValue, oldValue) => {
    if (newValue == "testStream") {
        span1.innerText = "test";
        span2.innerText = "stream";
    } else if (newValue == "quazarQ") {
        span1.innerText = "quazar";
        span2.innerText = "quads";
    } 
});

breakFlavorText.on("change", (newValue) => { 
    textAnim(newValue, "brbText", "smallTextBG");
});

var socialTexts = ["Twitter: @inkstronomy",
"Discord: discord.gg/ssNA68Q",
"Instagram: @_inkstronomy_",
"Tumblr: inkstronomy.tumblr.com"];

var socialIcons = ["logoTwitterBlack.png",
"logoDiscordCrop.png",
"logoIG.png",
"logoTumblr.png"];

function startSocialSlides() {
    for(i = 0; i < socialIcons.length; i++) {
        addSocialAnim(i);
    }
}

var socialTL = new TimelineMax();
function addSocialAnim(number) {
    var calcWidth;
    calcWidth = measureText(socialTexts[number], "'Montserrat', sans-serif", "2.8em") + 10;
    socialTL.add(TweenMax.to("#socialText", 0.5, {bottom: -65, ease: Power2.easeIn, onComplete: function() {
        socialText.text = socialTexts[number];
        socialText.style.bottom = "65px";
    }}))
    .add(TweenMax.to("#socialLogo", 0.5, {opacity: 0, ease: Power2.easeIn, onComplete: function() {
        socialLogo.src = socialIcons[number];
    }}))
    .add(TweenMax.to("#socialBG", 0.5, {ease: Expo.easeInOut, width: calcWidth}))
    .add(TweenMax.to("#socialText", 0.5, {bottom: 1}))
    .add(TweenMax.to("#socialLogo", 0.5, {ease: Expo.easeInOut, opacity: 1, delay: -0.5}))
    .add(TweenMax.to({}, 10, {}));
    if (number == socialIcons.length - 1) {
        socialTL.to({}, 0.01, {delay: -0.01, onComplete: function() {startSocialSlides()}});
    }
}

window.onload = function() {
    startSocialSlides();
}