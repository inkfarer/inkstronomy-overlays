const bigTextValue = nodecg.Replicant("bigTextValue");
const breakFlavorText = nodecg.Replicant("breakFlavorText");

function disableButtons() {
    if (bigTextValue.value == "testStream") {
        toggleBigTextTest.disabled = true;
        toggleBigTextQQ.disabled = false;
    } else if (bigTextValue.value == "quazarQ") {
        toggleBigTextTest.disabled = false;
        toggleBigTextQQ.disabled = true;
    } else {
        toggleBigTextTest.disabled = false;
        toggleBigTextQQ.disabled = false;
    }
}

breakFlavorText.on("change", (newValue) => { breakFlavorInput.value = newValue; });

breakFlavorInput.addEventListener('change', (event) => { breakFlavorText.value = event.target.value; });

bigTextValue.on("change", () => { disableButtons(); });

toggleBigTextTest.onclick = () => {
    bigTextValue.value = "testStream";
};

toggleBigTextQQ.onclick = () => {
    bigTextValue.value = "quazarQ";
};