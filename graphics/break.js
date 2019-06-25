const message = nodecg.Replicant('message');
const mapHidden = nodecg.Replicant('mapHidden');
const nowPlaying = nodecg.Replicant("nowPlaying");
const manualsong = nodecg.Replicant("manualSong");
const mSongEnabled = nodecg.Replicant("mSongEnabled");
const songHidden = nodecg.Replicant("songHidden");
const mapCount = nodecg.Replicant('mapCount');
const selectedMaps = nodecg.Replicant('selectedMaps', {defaultValue: ["", "", "", "", "", "", ""]});
const finalScores = nodecg.Replicant('finalScores', {defaultValue: ["", "", "", "", "", "", ""]});
const mapWinners = nodecg.Replicant('mapWinners', {defaultValue: [0, 0, 0, 0, 0, 0, 0]});
const teamAname = nodecg.Replicant('teamAname');
const teamBname = nodecg.Replicant('teamBname');
var MapsTL = new TimelineMax();
var WinnersTL = new TimelineMax();
var mapNameToImagePath = {"Ancho-V Games": "stages/S2_Stage_Ancho-V_Games.png",
"Arowana Mall":"stages/S2_Stage_Arowana_Mall.png",
"Blackbelly Skatepark":"stages/S2_Stage_Blackbelly_Skatepark.png",
"Camp Triggerfish":"stages/S2_Stage_Camp_Triggerfish.png",
"Goby Arena":"stages/S2_Stage_Goby_Arena.png",
"Humpback Pump Track":"stages/S2_Stage_Humpback_Pump_Track.png",
"Inkblot Art Academy":"stages/S2_Stage_Inkblot_Art_Academy.png",
"Kelp Dome":"stages/S2_Stage_Kelp_Dome.png",
"MakoMart":"stages/S2_Stage_MakoMart.png",
"Manta Maria":"stages/S2_Stage_Manta_Maria.png",
"Moray Towers":"stages/S2_Stage_Moray_Towers.png",
"Musselforge Fitness":"stages/S2_Stage_Musselforge_Fitness.png",
"New Albacore Hotel":"stages/S2_Stage_New_Albacore_Hotel.png",
"Piranha Pit":"stages/S2_Stage_Piranha_Pit.png",
"Port Mackerel":"stages/S2_Stage_Port_Mackerel.png",
"Shellendorf Institute":"stages/S2_Stage_Shellendorf_Institute.png",
"Shifty Station":"stages/S2_Stage_Shifty_Station.png",
"Snapper Canal":"stages/S2_Stage_Snapper_Canal.png",
"Starfish Mainstage":"stages/S2_Stage_Starfish_Mainstage.png",
"Sturgeon Shipyard":"stages/S2_Stage_Sturgeon_Shipyard.png",
"The Reef":"stages/S2_Stage_The_Reef.png",
"Wahoo World":"stages/S2_Stage_Wahoo_World.png",
"Walleye Warehouse":"stages/S2_Stage_Walleye_Warehouse.png",
"We don't know.":"question-mark.png",
"":"question-mark.png"};
const selectedModes = nodecg.Replicant('selectedModes', {defaultValue: ["", "", "", "", "", "", ""]});
var mapImageDisplays = ["mapLeft3Display", "mapLeft2Display", "mapLeft1Display", "mapMiddleDisplay", "mapRight1Display", "mapRight2Display", "mapRight3Display"];
var mapNameTexts = ["mapLeft3NameText", "mapLeft2NameText", "mapLeft1NameText", "mapMiddleNameText", "mapRight1NameText", "mapRight2NameText", "mapRight3NameText"];
var modeTexts = ["mapLeft3ModeText", "mapLeft2ModeText", "mapLeft1ModeText", "mapMiddleModeText", "mapRight1ModeText", "mapRight2ModeText", "mapRight3ModeText"];
var winnerDisplays = ["mapLeft3WinnerDisplay", "mapLeft2WinnerDisplay", "mapLeft1WinnerDisplay", "mapMiddleWinnerDisplay", "mapRight1WinnerDisplay", "mapRight2WinnerDisplay", "mapRight3WinnerDisplay"];
var scoreDisplays = ["mapLeft3ScoreDisplay", "mapLeft2ScoreDisplay", "mapLeft1ScoreDisplay", "mapMiddleScoreDisplay", "mapRight1ScoreDisplay", "mapRight2ScoreDisplay", "mapRight3ScoreDisplay"];
var winnerTexts = ["mapLeft3WinnerText", "mapLeft2WinnerText", "mapLeft1WinnerText", "mapMiddleWinnerText", "mapRight1WinnerText", "mapRight2WinnerText", "mapRight3WinnerText"];

mapWinners.on('change', (newValue, OldValue) => {
    updateWinners();
});

teamAname.on('change', (newValue, OldValue) => {
    updateWinners();
});

teamBname.on('change', (newValue, OldValue) => {
    updateWinners();
});

finalScores.on('change', (newValue, OldValue) => {
    updateFinalScores();
});

//i use "i-1" a staggering amount of times in this code... please don't get mad
//at least it works haha
function updateWinners() {
    for (i=1; i <= 7; i++) {
        var wT = document.getElementById(winnerTexts[i-1]);
        var wD = document.getElementById(winnerDisplays[i-1]);
        var sD = document.getElementById(scoreDisplays[i-1]);
        if (mapWinners.value[i-1] == 1) {
            wT.innerText = teamAname.value;
            sD.innerText = finalScores.value[i-1];
            showWinner(sD, wD);
        } else if (mapWinners.value[i-1] == 2) {
            wT.innerText = teamBname.value;
            sD.innerText = finalScores.value[i-1];
            showWinner(sD, wD);
        } else if (mapWinners.value[i-1] == 0) {
            hideWinner(sD, wD);
        }
    }
}

function updateFinalScores() {
    for (i=1; i <= 7; i++) {
        var sD = document.getElementById(scoreDisplays[i-1]);
        sD.innerText = finalScores.value[i-1];
    }
}

function hideWinner(element1, element2) {
    if (element1.style.top == "" && element2.style.top == "" || element1.style.top == "120px" && element2.style.top == "0px") {
        TweenMax.to([element2], 1, {ease: Power2.easeInOut, top: -155});
        TweenMax.to([element1], 1, {ease: Power2.easeInOut, top: -35});
    }
}

function showWinner(element1, element2) {
    if (element1.style.top == "" && element2.style.top == "" || element1.style.top == "-35px" && element2.style.top == "-155px") {
        TweenMax.to([element2], 1, {ease: Power2.easeInOut, top: 0});
        TweenMax.to([element1], 1, {ease: Power2.easeInOut, top: 120});
    }
}

selectedMaps.on('change', (newValue, OldValue) => {
    updateMaps();
});

function updateMaps() {
    for (i=1; i <= 7; i++) {
        var MI = document.getElementById(mapImageDisplays[i-1]);
        var NT = document.getElementById(mapNameTexts[i-1]);
        MI.src = mapNameToImagePath[selectedMaps.value[i-1]];
        NT.innerHTML = selectedMaps.value[i-1];
    }
}

selectedModes.on('change', (newValue, OldValue) => {
    updateModes();
});

function updateModes() {
    for (i=1; i <= 7; i++) {
        var mT = document.getElementById(modeTexts[i-1]);
        mT.text = selectedModes.value[i-1];
    }
}

mapHidden.on('change', (newValue) => {
    if (mapCount.value == 3) {
        animate3Maps(newValue);
        animBG(newValue);
    } else if (mapCount.value == 5) {
        animate5Maps(newValue);
        animBG(newValue);
    } else {
        animate7Maps(newValue);
        animBG(newValue);
    }
    if (newValue == false) {
        pageLoadFunction();
    }
});

function pageLoadFunction() {
    if (mapHidden.value == false) {
        var opacity = 1;
    } else {
        var opacity = 0;
    }
    if (mapCount.value == 5) {
        transition7to5(opacity);
    }
    else if (mapCount.value == 3) {
        transition7to3(opacity);
    }
}

mapCount.on('change', (newValue, oldValue) => {
    if (mapHidden.value == false) {
        var opacity = 1;
    } else {
        var opacity = 0;
    }
    if (newValue == 5 && oldValue == 7) {
        transition7to5(opacity);
    }
    else if (newValue == 7 && oldValue == 5) {
        transition5to7(opacity);
    }
    else if (newValue == 7 && oldValue == 3) {
        transition3to7(opacity);
    }
    else if (newValue == 3 && oldValue == 7) {
        transition7to3(opacity);
    }
    else if (newValue == 5 && oldValue == 3) {
        transition3to5(opacity);
    }
    else if (newValue == 3 && oldValue == 5) {
        transition5to3(opacity);
    }
});

//I DO NOT KNOW IF THIS WAS A GOOD IDEA
//it's very animated alright

function transition5to3() {
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, left: 100}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, right: 100, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 295, delay: -0.4}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut, left: 755, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 295, delay: -0.7}))
    MapsTL.add(TweenMax.to([".mapContainer", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {width: 400, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":390}, width: 400, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: 390, fontSize: "2.9em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: 390, fontSize: "1.9em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: -340, ease: Power2.easeInOut, delay: -0.7}));
}

function transition3to5(opacity) {
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 465, onStart: function() {
        mapLeft2Container.style.left = "100px";
        mapRight2Container.style.right = "100px";
    }}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut, left: 805, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 465, delay: -0.7}))
    MapsTL.add(TweenMax.to([".mapContainer", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {width: 300, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":290}, width: 300, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: 290, fontSize: "2.4em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: 290, fontSize: "1.9em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: -385, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {left: 125, opacity: opacity, delay: -0.15}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {right: 125, delay: -0.7, opacity: opacity}));
}

function transition7to3() {
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {ease: Power2.easeInOut,ease: Power2.easeInOut, left: 100, opacity: 0}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {ease: Power2.easeInOut, right: 100, opacity: 0, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, left: 340, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, right: 340, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 295, delay: -0.4}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut, left: 755, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 295, delay: -0.7}))
    MapsTL.add(TweenMax.to([".mapContainer", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {width: 400, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":390}, width: 400, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: 390, fontSize: "2.9em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: 390, fontSize: "1.9em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: -340, ease: Power2.easeInOut, delay: -0.7}));
}

function transition3to7(opacity) {
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut,left: 605, onStart: function() {
        mapLeft2Container.style.left = "340px";
        mapRight2Container.style.right = "340px";
    }}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut,left: 845, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut,right: 605, delay: -0.7}))
    MapsTL.add(TweenMax.to([".mapContainer", ".modeText", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {ease: Power2.easeInOut,width: 220, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: 210, fontSize: "2em", ease: Power2.easeInOut, delay: -0.7}));
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: 210, fontSize: "1.75em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: -425, ease: Power2.easeInOut, delay: -0.7}));
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":210}, width: 220, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {left: 365, opacity: opacity, delay: -0.15}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {right: 365, opacity: opacity, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {left: 125, opacity: opacity, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {right: 125, opacity: opacity, delay: -0.7}));
}

function transition7to5() {
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {ease: Power2.easeInOut,ease: Power2.easeInOut, left: 100, opacity: 0}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {ease: Power2.easeInOut, right: 100, opacity: 0, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut, left: 125, delay: -0.4}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 465, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut,left: 805, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 465, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut, right: 125, delay: -0.7}))
    MapsTL.add(TweenMax.to([".mapContainer", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {width: 300, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":290}, width: 300, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: 290, fontSize: "2.4em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: 290, fontSize: "1.9em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: -385, ease: Power2.easeInOut, delay: -0.7}));
    
}

function transition5to7(opacity) {
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut,left: 365}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut,left: 605, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut,left: 845, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut,right: 605, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut,right: 365, delay: -0.7}))
    MapsTL.add(TweenMax.to([".mapContainer", ".modeText", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {ease: Power2.easeInOut,width: 220, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: 210, fontSize: "2em", ease: Power2.easeInOut, delay: -0.7}));
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: 210, fontSize: "1.75em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: -425, ease: Power2.easeInOut, delay: -0.7}));
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":210}, width: 220, ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {left: 125, opacity: opacity, delay: -0.15}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {right: 125, opacity: opacity, delay: -0.7}));
}

function animate3Maps(bool) {
    var animSpeed = 1;
    var animDelay = -0.8;
    if (bool) {
        MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapLeft3Container", 0, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapRight3Container", 0, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapLeft2Container", 0, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapRight2Container", 0, {ease: Power2.easeIn, top: -500, opacity: 0}));
    } else {
        animBG(false);
        MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {top: 53, opacity: 1, delay: -0.2}))
        MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapLeft3Container", 0, {ease: Power2.easeIn, top: 53}))
        MapsTL.add(TweenMax.to("#mapRight3Container", 0, {ease: Power2.easeIn, top: 53}))
        MapsTL.add(TweenMax.to("#mapLeft2Container", 0, {ease: Power2.easeIn, top: 53}))
        MapsTL.add(TweenMax.to("#mapRight2Container", 0, {ease: Power2.easeIn, top: 53}));
        hideContainers();
    }
}

function animate5Maps(bool) {
    var animSpeed = 0.9;
    var animDelay = -0.75;
    if (bool) {
        MapsTL.add(TweenMax.to("#mapLeft2Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight2Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapLeft3Container", 0, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapRight3Container", 0, {ease: Power2.easeIn, top: -500, opacity: 0}));
    } else {
        animBG(false);
        MapsTL.add(TweenMax.to("#mapLeft2Container", animSpeed, {top: 53, opacity: 1, delay: -0.2}))
        MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight2Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapLeft3Container", 0, {ease: Power2.easeIn, top: 53}))
        MapsTL.add(TweenMax.to("#mapRight3Container", 0, {ease: Power2.easeIn, top: 53}));
    }
}

function animate7Maps(bool) {
    var animSpeed = 0.8;
    var animDelay = -0.7;
    if (bool) {
        MapsTL.add(TweenMax.to("#mapLeft3Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0}))
        MapsTL.add(TweenMax.to("#mapLeft2Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight2Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight3Container", animSpeed, {ease: Power2.easeIn, top: -500, opacity: 0, delay: animDelay}));
    } else {
        animBG(false);
        MapsTL.add(TweenMax.to("#mapLeft3Container", animSpeed, {top: 53, opacity: 1, delay: -0.2}))
        MapsTL.add(TweenMax.to("#mapLeft2Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight2Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}))
        MapsTL.add(TweenMax.to("#mapRight3Container", animSpeed, {top: 53, opacity: 1, delay: animDelay}));
        
    }
}

function animBG(bool) {
    if (bool) {
        MapsTL.add(TweenMax.to(["#backgroundIMG", "#stars"], 0.6, {ease: Power2.easeIn, top: -1080, delay: -0.05}))
        MapsTL.add(TweenMax.to("#text1", 0.6, {ease: Power2.easeIn, top: -1025, delay: -0.6}))
        MapsTL.add(TweenMax.to("#text1Line", 0.6, {ease: Power2.easeIn, top: -920, delay: -0.6}));
    } else {
        MapsTL.add(TweenMax.to(["#backgroundIMG", "#stars"], 0.8, {ease: Power2.easeOut, top: 0}))
        MapsTL.add(TweenMax.to("#text1", 0.8, {ease: Power2.easeOut, top: 55, delay: -0.8}))
        MapsTL.add(TweenMax.to("#text1Line", 0.8, {ease: Power2.easeOut, top: 160, delay: -0.8}))
    }
}

function hideContainers() {
    
}

function songTextAnim(newText) {
    var songTimeline = new TimelineMax();
    songTimeline.add(TweenMax.to("#song", 0.5, {opacity: 0, ease: Power2.easeIn, onComplete: function() {
        song.text = newText;
    }}))
    .add(TweenMax.to("#song", 0.5, {opacity: 1}));
} 

function updateSongText() {
    if (mSongEnabled.value) {
        songTextAnim("♫ " + manualsong.value + " ♫");
    } else {
        if (nowPlaying.value.artist === undefined && nowPlaying.value.song === undefined) {
            songTextAnim("♫ Nothing appears to be playing at the moment. ♫");
        } else {
            songTextAnim("♫ " + nowPlaying.value.artist + " - " + nowPlaying.value.song + " ♫");
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
        TweenMax.to("#musicBG", 0.5, { opacity: 0 });
    } else {
        TweenMax.to("#musicBG", 0.5, { opacity: 1 });
    }
});