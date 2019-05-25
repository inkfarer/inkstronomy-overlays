const nowPlaying = nodecg.Replicant("nowPlaying");
const nowPlayingText = document.getElementById("nowPlaying");
const manualsong = nodecg.Replicant("manualSong");
const mSongEnabled = nodecg.Replicant("mSongEnabled", {defaultValue: false});
const songHidden = nodecg.Replicant("songHidden");

nowPlaying.on("change", (newValue, oldValue) => {
    if (nowPlaying.value.artist === undefined && nowPlaying.value.song === undefined) {
        nowPlayingText.innerText = "Nothing appears to be playing at the moment.\n\nEnable manual song input, perhaps?";
    } else {
        nowPlayingText.innerText = nowPlaying.value.artist + " - " + nowPlaying.value.song;
    }
});

/*manualcheck.addEventListener('change', (event) => {
    if (manualcheck.checked) {
        mSongEnabled.value = true;
    } else {
        mSongEnabled.value = false;
    }
});*/

songinput.addEventListener('change', (event) => {
    manualsong.value = songinput.value;
});

manualsong.on("change", (newValue, oldValue) => {
    songinput.value = newValue;
});

songHidden.on('change', (newValue, OldValue) => {
    if (newValue) {
        hideM.disabled = true;
        showM.disabled = false;
    } else {
        showM.disabled = true;
        hideM.disabled = false;
    }
});

showM.onclick = () => {
    songHidden.value = false;
};

hideM.onclick = () => {
    songHidden.value = true;
};