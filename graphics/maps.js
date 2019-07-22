const message = nodecg.Replicant('message');
const mapHidden = nodecg.Replicant('mapHidden');
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
"":"question-mark.png",
"Skipper Pavilion":"stages/S2_Stage_Skipper_Pavilion.png"};
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

mapHidden.on('change', (newValue, oldValue) => {
    animHideShowMaps(newValue, oldValue);
});

mapCount.on('change', (newValue, oldValue) => {
    if (oldValue != undefined) { transitionXtoY(newValue, oldValue); }
    else { pageLoadFunction(); }
});

function pageLoadFunction() {
    if (mapCount.value == 5) { transitionXtoY(5, 7); }
    else if (mapCount.value == 3) { transitionXtoY(3, 7); }
}

function transitionXtoY(newValue, oldValue) {
    var styleOpac2, styleLR2, styleLR1, styleLRMid, delay2, delay3, animWidth, animWidthPic, animOldPos;
    var delay = -0.7;
    var delayHide = -0.4;
    var delayShow = -0.15;
    var ease = "Power2.easeInOut";
    var ease2 = "Power2.easeOut";
    //probably an awful way to do this
    //set animation parameters
    if (newValue == 3) {
        animWidth = 400;
        animWidthPic = -340;
        styleLR1 = 295;
        styleLRMid = 755;
        delay2 = delayHide;
        styleOpac2 = 0;
    } else if (newValue == 5) {
        styleLR1 = 465;
        styleLRMid = 805;
        animWidthPic = -385;
        animWidth = 300;
        styleLR2 = 125;
    } else if (newValue == 7) {
        styleLRMid = 845;
        styleLR1 = 605;
        animWidth = 220;
        animWidthPic = -425;
    }
    if (newValue == 5 && oldValue == 7) {
        styleOpac2 = 1;
        styleLR2 = 125;
        delay2 = delay;
        delay3 = delayHide;
        ease2 = "Power2.easeInOut";
    } else if (newValue == 7 && oldValue == 5) {
        delay2 = delay;
        delay3 = delayShow;
    } else if (newValue == 7 && oldValue == 3) {
        animOldPos = "340px";
        delay2 = 0;
        delay3 = delay;
        styleLR2 = 365;
    } else if (newValue == 3 && oldValue == 7) {
        styleLR2 = 340;
        delay3 = delay;
    } else if (newValue == 5 && oldValue == 3) {
        animOldPos = "100px";
        delay2 = 0;
    } else if (newValue == 3 && oldValue == 5) {
        styleLR2 = 100;
        delay3 = 0;
    }
    //actual animation happens somewhere over here
    if (oldValue > newValue) {
        //reduce the amount of containers
        if (oldValue == 7) { moveContainers3(0, 100, ease2, 0, delay); }
        moveContainers2(styleOpac2, styleLR2, ease2, delay3, delay);
        moveContainers1Mid(styleLR1, styleLRMid, ease, delay, delay2);
        animSetWidths(animWidth, animWidthPic, ease);
        MapsTL.to({}, 0.1, {delay: -0.1, onComplete: function() {
            nodecg.sendMessage("transitionComplete");
        }});
    } else {
        //increase
        if (oldValue == 3) {
            MapsTL.to({}, 0.1, {delay: -0.1, onComplete: function() {
                mapLeft2Container.style.left = animOldPos;
                mapRight2Container.style.right = animOldPos;
            }});
        }
        if (oldValue == 5) { moveContainers2(1, 365, ease, 0, delay); }
        moveContainers1Mid(styleLR1, styleLRMid, ease, delay, delay2);
        animSetWidths(animWidth, animWidthPic, ease);
        if (oldValue == 3) { moveContainers2(1, styleLR2, ease2, delayShow, delay); }
        if (newValue == 7) { moveContainers3(1, 125, ease2, delay3, delay); }
        MapsTL.to({}, 0.1, {delay: -0.1, onComplete: function() {
            nodecg.sendMessage("transitionComplete");
        }});
    }
}

function moveContainers3(opacity, leftRight, ease, delay1, delay2) {
    MapsTL.to("#mapLeft3Container", 0.7, {ease: ease, left: leftRight, opacity: opacity, delay: delay1})
    MapsTL.to("#mapRight3Container", 0.7, {ease: ease, right: leftRight, opacity: opacity, delay: delay2});
}

function moveContainers2(opacity, leftRight, ease, delay1, delay2) {
    MapsTL.to("#mapLeft2Container", 0.7, {ease: ease, left: leftRight, opacity: opacity, delay: delay1})
    MapsTL.to("#mapRight2Container", 0.7, {ease: ease, right: leftRight, opacity: opacity, delay: delay2});
}

function moveContainers1Mid(leftRight, positionMid, ease, delay, delay2) {
    MapsTL.to("#mapLeft1Container", 0.7, {ease: ease, left: leftRight, delay: delay2})
    MapsTL.to("#mapMiddleContainer", 0.7, {ease: ease, left: positionMid, delay: delay})
    MapsTL.to("#mapRight1Container", 0.7, {ease: ease, right: leftRight, delay: delay});
}

function animSetWidths(width, imageRight, ease) {
    var width2 = width - 10;
    //var ease = "Power2.easeInOut";
    MapsTL.to([".mapContainer", ".modeText", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {ease: ease,width: width, delay: -0.7})
    MapsTL.to(".mapNameText", 0.7, {width: width2, fontSize: "2em", ease: ease, delay: -0.7})
    MapsTL.to(".mapWinnerText", 0.7, {width: width2, fontSize: "1.75em" , ease: ease, delay: -0.7})
    MapsTL.to(".mapImage", 0.7, {right: imageRight, ease: ease, delay: -0.7})
    MapsTL.to(".modeText", 0.7, {attr:{"max-width":width2}, width: width, ease: ease, delay: -0.7});
}

//THE animation that plays when you hide or show maps
function animHideShowMaps(bool, bool2) {
    var elements3 = ["mapLeft3Container", "mapRight3Container", "mapLeft2Container", "mapRight2Container"];
    var elements5 = ["mapLeft3Container", "mapRight3Container"];
    var animSpeed, animDelay1, animDelay2, animDelay3, styleTop, styleOpac, animEase;
    if (mapCount.value == 3) {
        //set animation parameters if there are three maps shown
        animSpeed = 1;
        animDelay1 = 0;
        animDelay2 = 0;
        animDelay3 = -0.8;
        //hide elements that should not be shown... just in case
        for (i = 0; i < elements3.length; i++) {
            document.getElementById(elements3[i]).style.opacity = "0";
        }
    } else if (mapCount.value == 5) {
        //animation params if there are five maps
        animSpeed = 0.9;
        animDelay1 = 0;
        animDelay2 = -0.75;
        animDelay3 = -0.75;
        for (i = 0; i < elements5.length; i++) {
            document.getElementById(elements5[i]).style.opacity = "0";
        }
    } else {
        //params if 7 maps (presumably)
        animSpeed = 0.8;
        animDelay1 = -0.7;
        animDelay2 = -0.7;
        animDelay3 = -0.7;
    }
    if (bool) {
        //parameters if the animation is supposed to be hiding the maps
        styleTop = -400;
        styleOpac = 0;
        animEase = "Power2.easeIn";
    } else {
        //if we're showing the maps
        styleTop = 53;
        styleOpac = 1;
        animEase = "Power2.easeOut";
        //check so this doesn't run on page load for some reason
        if (bool2 !== undefined) {
            //so no elements are in positions we don't expect them to be in
            for (i = 0; i < elements3.length; i++) {
                document.getElementById(elements3[i]).style.top = "-500px";
                document.getElementById(elements3[i]).style.opacity = "0";
            }
        }
        //make the background descend from the heavens
        MapsTL.add(TweenMax.to(["#backgroundIMG", "#stars"], 0.8, {ease: Power2.easeOut, top: 0}))
        MapsTL.add(TweenMax.to("#text1", 0.8, {ease: Power2.easeOut, top: 55, delay: -0.8}))
        MapsTL.add(TweenMax.to("#text1Line", 0.8, {ease: Power2.easeOut, top: 160, delay: -0.8}))
        //make everything visible
        containersDiv.style.opacity = "1";
    } // here comes the actual animation!
    if (mapCount.value == 7) { MapsTL.add(TweenMax.to("#mapLeft3Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac})); }
    if (mapCount.value == 7 || mapCount.value == 5) { MapsTL.add(TweenMax.to("#mapLeft2Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay1})); }
    MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay2}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3}))
    MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3}));
    if (mapCount.value == 7 || mapCount.value == 5) { MapsTL.add(TweenMax.to("#mapRight2Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3})); }
    if (mapCount.value == 7) { MapsTL.add(TweenMax.to("#mapRight3Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3})); }
    // and the aftermath
    if (bool) {
        // if we're hiding, make the background go up
        MapsTL.add(TweenMax.to(["#backgroundIMG", "#stars"], 0.6, {ease: Power2.easeIn, top: -1080, delay: -0.05}))
        MapsTL.add(TweenMax.to("#text1", 0.6, {ease: Power2.easeIn, top: -1025, delay: -0.6}))
        MapsTL.add(TweenMax.to("#text1Line", 0.6, {ease: Power2.easeIn, top: -920, delay: -0.6}));
        // after the animation is done (why the blank tween is here) change opacities so nothing unexpectedly gets shown
        MapsTL.add(TweenMax.to({}, 0.1, {delay: -0.1, onComplete: function() {
            containersDiv.style.opacity = "0";
        }}));
    } else {
        MapsTL.add(TweenMax.to({}, 0.1, {delay: -0.1, onComplete: function() {
            // change positions so no elements are where we don't expect them to be, just in case
            for (i = 0; i < elements3.length; i++) {
                document.getElementById(elements3[i]).style.top = "53px";
            }
        }}));
    }
}
