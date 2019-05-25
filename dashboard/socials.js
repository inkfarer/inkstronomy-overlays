const elementsCount = nodecg.Replicant('elementsCount');
const socialHandles = nodecg.Replicant('socialHandles', {defaultValue: new Array()});
var counter = 0;

NodeCG.waitForReplicants(socialHandles).then(() => {
    updateSocialInputs();
})

//socialHandles.value = [""];

function updateSocialInputs() {
    var socialInputs = document.getElementsByClassName("socialInput");
    for (i=0;i<socialInputs.length;i++) {
        if (socialHandles.value[i] == undefined) {
            socialHandles.value[i] = "";
            console.log("test");
        } else {
            socialInputs[i].value = socialHandles.value[i];
            console.log("test lmao");
        }
    }
}

elementsCount.on('change', (newValue, oldValue) => {
    if (newValue <= 0) {
        removeBox.disabled = true;
        showSocials.disabled = true;
    } else {
        removeBox.disabled = false;
        showSocials.disabled = false;
    }

    if (newValue > oldValue || oldValue == undefined) {
        while (counter != elementsCount.value) {
            addInput();
        }
    } else if (newValue < oldValue) {
        removeInput();
    }
});

/*messageInput.addEventListener('change', (event) => {
    message.value = event.target.value;
});*/

function addElementButton() {
    elementsCount.value++;
}

function addInput() {
    var element = document.createElement("paper-input");
    counter++;
    element.label = "User " + counter;
    element.classList.add("socialInput");
    element.id = counter;
    element.addEventListener('change', (event) => {
        socialHandles.value[element.id - 1] = event.target.value;
    });
    document.body.append(element);
}

function removeElementButton() {
    elementsCount.value--;
}

function removeInput() {
    counter--;
    var socialInputs = document.getElementsByClassName("socialInput");
    var last = socialInputs[socialInputs.length-1];
    socialHandles.value.pop();
    last.remove();
}

function sendAnimMessage() {
    nodecg.sendMessage('showSocialsAnim');
}