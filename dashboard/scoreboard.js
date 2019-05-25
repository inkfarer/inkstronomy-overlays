const teamAscore = nodecg.Replicant('teamAscore', {defaultValue: 0});
const teamBscore = nodecg.Replicant('teamBscore', {defaultValue: 0});
const stage = nodecg.Replicant('stage');
const scHidden = nodecg.Replicant('scHidden');
const teamAname = nodecg.Replicant('teamAname');
const teamBname = nodecg.Replicant('teamBname');
const nextTeamAname = nodecg.Replicant('nextTeamAname');
const nextTeamBname = nodecg.Replicant('nextTeamBname');
const splatColors = nodecg.Replicant('splatColors');
const teamAcolor = nodecg.Replicant('teamAcolor');
const teamBcolor = nodecg.Replicant('teamBcolor');

teamAscore.on('change', (newValue, oldValue) => {
    teamAdisplay.value = newValue;
});

teamBscore.on('change', (newValue, oldValue) => {
    teamBdisplay.value = newValue;
});

teamAdisplay.addEventListener('change', (event) => {
    teamAscore.value = Number(event.target.value);
});

teamBdisplay.addEventListener('change', (event) => {
    teamBscore.value = Number(event.target.value);
});

teamAplus.onclick = () => {
    teamAscore.value = Number(teamAscore.value) + 1;
};

teamAmin.onclick = () => {
    teamAscore.value = Number(teamAscore.value) - 1;
};

teamBplus.onclick = () => {
    teamBscore.value = Number(teamBscore.value) + 1;
};

teamBmin.onclick = () => {
    teamBscore.value = Number(teamBscore.value) - 1;
};

stageInput.addEventListener('change', (event) => {
    stage.value = event.target.value;
});

stage.on('change', (newValue, oldValue) => {
    stageInput.value = newValue;
});

nmBegin.onclick = () => {
    teamAscore.value = 0;
    teamBscore.value = 0;
    teamAname.value = nextTeamAinput.value;
    teamBname.value = nextTeamBinput.value;
    nextTeamAinput.value = "";
    nextTeamBinput.value = "";
};

showSC.onclick = () => {
    scHidden.value = false;
};

hideSC.onclick = () => {
    scHidden.value = true;
};

teamAname.on('change', (newValue, oldValue) => {
    teamAinput.value = newValue;
});

teamBname.on('change', (newValue, oldValue) => {
    teamBinput.value = newValue;
});

teamAinput.addEventListener('change', (event) => {
    teamAname.value = event.target.value;
});

teamBinput.addEventListener('change', (event) => {
    teamBname.value = event.target.value;
});

nextTeamAname.on('change', (newValue, oldValue) => {
    nextTeamAinput.value = newValue;
});

nextTeamBname.on('change', (newValue, oldValue) => {
    nextTeamBinput.value = newValue;
});

nextTeamAinput.addEventListener('change', (event) => {
    nextTeamAname.value = event.target.value;
});

nextTeamBinput.addEventListener('change', (event) => {
    nextTeamBname.value = event.target.value;
});

teamAcolor.on('change', (newValue, oldValue) => {
    colorSelectA.value = newValue;
});

teamBcolor.on('change', (newValue, oldValue) => {
    colorSelectB.value = newValue;
});

function updateColors() {
    teamAcolor.value = colorSelectA.value;
    teamBcolor.value = colorSelectB.value;
}

scHidden.on('change', (newValue, OldValue) => {
    if (newValue) {
        hideSC.disabled = true;
        showSC.disabled = false;
    } else {
        showSC.disabled = true;
        hideSC.disabled = false;
    }
});

splatColors.value = ["Light Blue",
"Purple",
"Yellow",
"Pink",
"Orange",
"Turquoise",
"Sky Blue",
"Mustard"]