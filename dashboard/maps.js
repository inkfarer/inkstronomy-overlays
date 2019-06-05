const mapCount = nodecg.Replicant('mapCount', { defaultValue: 7});
const splatMaps = nodecg.Replicant('splatMaps');
const splatModes = nodecg.Replicant('splatModes');
const mapWinners = nodecg.Replicant('mapWinners', {defaultValue: [0, 0, 0, 0, 0, 0, 0]});
// mapWinners: 0 - Match isn't over yet, 1 - Alpha wins, 2 - Bravo wins
const finalScores = nodecg.Replicant('finalScores', {defaultValue: ["", "", "", "", "", "", ""]});
const selectedMaps = nodecg.Replicant('selectedMaps', {defaultValue: ["", "", "", "", "", "", ""]});
const selectedModes = nodecg.Replicant('selectedModes', {defaultValue: ["", "", "", "", "", "", ""]});
const mapHidden = nodecg.Replicant('mapHidden');

mapShow.onclick = () => {
    mapHidden.value = false;
};

mapHide.onclick = () => {
    mapHidden.value = true;
};
mapHidden.on('change', (newValue, OldValue) => {
    if (newValue) {
        mapHide.disabled = true;
        mapShow.disabled = false;
    } else {
        mapShow.disabled = true;
        mapHide.disabled = false;
    }
});

show3Maps.onclick = () => {
    mapCount.value = 3;
};
show5Maps.onclick = () => {
    mapCount.value = 5;
};
show7Maps.onclick = () => {
    mapCount.value = 7;
};

/*NodeCG.waitForReplicants(finalScores, selectedMaps, selectedModes).then(() => {
    for (i=1; i <= 7; i++) {
        updateFinalScoreDisplay(i);
        updateMapDisplay(i);
        updateModeDisplay(i);
    }
})*/

mapWinners.on('change', (newValue, OldValue) => {
    for (i=1; i <= 7; i++) {
        disableWinButtons(i);
    }
});

finalScores.on('change', (newValue, OldValue) => {
    for (i=1; i <= 7; i++) {
        updateFinalScoreDisplay(i);
    }
});

selectedMaps.on('change', (newValue, OldValue) => {
    for (i=1; i <= 7; i++) {
        updateMapDisplay(i);
    }
});

selectedModes.on('change', (newValue, OldValue) => {
    for (i=1; i <= 7; i++) {
        updateModeDisplay(i);
    }
});

function updateMapsModesRep() {
    for (i=1; i <= 7; i++) {
        setMode(i);
        setMap(i);
    }
}

function resetWins() {
    for (i=1; i <= 7; i++) {
        setNotOver(i);
    }
}

function updateModeDisplay(number) {
    var modeS = document.getElementById("modeSelect" + number);
    modeS.value = selectedModes.value[number-1];
}

function setMode(number) {
    var modeS = document.getElementById("modeSelect" + number);
    selectedModes.value[number-1] = modeS.value;
}

function updateMapDisplay(number) {
    var mS = document.getElementById("mapSelect" + number);
    mS.value = selectedMaps.value[number-1];
}

function setMap(number) {
    var mS = document.getElementById("mapSelect" + number);
    selectedMaps.value[number-1] = mS.value;
}

function updateFinalScoreDisplay(number) {
    var mSI = document.getElementById("matchScoreInput" + number);
    mSI.value = finalScores.value[number-1];
}

function setFinalScore(number) {
    var mSI = document.getElementById("matchScoreInput" + number);
    finalScores.value[number-1] = mSI.value;
}

function setAlphaWin(number) {
    mapWinners.value[number-1] = 1;
}

function setBravoWin(number) {
    mapWinners.value[number-1] = 2;
}

function setNotOver(number) {
    mapWinners.value[number-1] = 0;
}

function disableWinButtons(number) {
    var matchNOB = document.getElementById("matchNotOverButton" + number);
    var alphaWB = document.getElementById("alphaWinButton" + number);
    var bravoWB = document.getElementById("bravoWinButton" + number);
    if (mapWinners.value[number-1] == 0) {
        matchNOB.disabled = true;
        alphaWB.disabled = false;
        bravoWB.disabled = false;
    } else if (mapWinners.value[number-1] == 1) {
        alphaWB.disabled = true;
        matchNOB.disabled = false;
        bravoWB.disabled = false;
    } else if (mapWinners.value[number-1] == 2) {
        bravoWB.disabled = true;
        matchNOB.disabled = false;
        alphaWB.disabled = false;
    }
}

function disableButtons() {
    if (mapCount.value == 3) {
        show3Maps.disabled = true;
        show5Maps.disabled = false;
        show7Maps.disabled = false;
    } else if (mapCount.value == 5) {
        show3Maps.disabled = false;
        show5Maps.disabled = true;
        show7Maps.disabled = false;
    } else { // assume that the value is 7
        show3Maps.disabled = false;
        show5Maps.disabled = false;
        show7Maps.disabled = true;
    }
}

function updateMapSelectText() {
    if (mapCount.value == 3) {
        mapSelectNumber1.innerText = "1 (Not shown)";
        mapSelectNumber2.innerText = "2 (Not shown)";
        mapSelectNumber6.innerText = "6 (Not shown)";
        mapSelectNumber7.innerText = "7 (Not shown)";
    } else if (mapCount.value == 5) {
        mapSelectNumber7.innerText = "7 (Not shown)";
        mapSelectNumber1.innerText = "1 (Not shown)";
        mapSelectNumber2.innerText = "2";
        mapSelectNumber6.innerText = "6";
    } else {
        mapSelectNumber7.innerText = "7";
        mapSelectNumber1.innerText = "1";
        mapSelectNumber2.innerText = "2";
        mapSelectNumber6.innerText = "6";
    }
}

mapCount.on('change', (newValue, OldValue) => {
    disableButtons();
    updateMapSelectText();
});

splatMaps.value = ["We don't know.",
"Ancho-V Games",
"Arowana Mall",
"Blackbelly Skatepark",
"Camp Triggerfish",
"Goby Arena",
"Humpback Pump Track",
"Inkblot Art Academy",
"Kelp Dome",
"MakoMart",
"Manta Maria",
"Moray Towers",
"Musselforge Fitness",
"New Albacore Hotel",
"Piranha Pit",
"Port Mackerel",
"Shellendorf Institute",
"Shifty Station",
"Snapper Canal",
"Starfish Mainstage",
"Sturgeon Shipyard",
"The Reef",
"Wahoo World",
"Walleye Warehouse"];

splatModes.value = ["???",
"Clam Blitz",
"Tower Control",
"Rainmaker",
"Splat Zones",
"Turf War"];
