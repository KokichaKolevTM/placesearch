"use strict";
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const input = document.getElementById("inputField");
const modifierSelector = document.getElementById("modifierSelector");
const oblastSelector = document.getElementById("oblastSelector");
const typeSelector = document.getElementById("typeSelector");
const numberOfResults = document.getElementById("numberOfResults");
const placesList = document.getElementById("places");
const displayOblast = document.getElementById("displayOblast");
const displayType = document.getElementById("displayType");
// const objects = {
//     searchButton: document.getElementById("searchButton"),
//     clearButton: document.getElementById("clearButton"),
//     input: document.getElementById("inputField"),
//     modifierSelector: document.getElementById("modifierSelector"),
//     searchButton: document.getElementById("searchButton"),
//     searchButton: document.getElementById("searchButton"),
//     searchButton: document.getElementById("searchButton"),
// }

searchButton.addEventListener("click", () => {
    if (placesList.childElementCount > 0) {
        Array.from(placesList.childNodes).forEach((e) => e.remove());
    }

    for (const place of places) {
        const placeName = place.name.toLowerCase();
        const inputValue = input.value.toLowerCase();
        let checkName = false;
        switch (modifierSelector.value) {
            case "startsWith":
                checkName = placeName.startsWith(inputValue);
                break;
            case "endsWith":
                checkName = placeName.endsWith(inputValue);
                break;
            case "contains":
                checkName = placeName.includes(inputValue);
                break;
            case "match":
                checkName = placeName === inputValue;
                break;
            case "regex":
                checkName = new RegExp(input.value, "gi").test(placeName);
                break;
        }

        let checkOblast = false;
        switch (oblastSelector.value) {
            case "all":
                checkOblast = true;
                break;
            default:
                checkOblast = place.oblast_name === "обл. " + oblastSelector.value;
                break;
        }

        let checkType = false;
        switch (typeSelector.value) {
            case "all":
                checkType = true;
                break;
            case "cities":
                checkType = place.type === "гр.";
                break;
            case "villages":
                checkType = place.type === "с.";
                break;
            case "monasteries":
                checkType = place.type === "ман.";
                break;
        }

        if (checkType && checkName && checkOblast) {
            const listEntry = document.createElement("li");
            let assembledString = "";
            if (displayType.checked) {
                assembledString += `${place.type} `;
            }
            assembledString += place.name;
            if (displayOblast.checked) {
                assembledString += ` (${place.oblast_name})`;
            }
            listEntry.innerHTML =
                assembledString +
                `<a href="https://bg.wikipedia.org/wiki/${place.name}" target="_blank"><img src="wikipedia.ico"></a>`;
            placesList.append(listEntry);
        }
    }

    numberOfResults.textContent =
        placesList.childElementCount === 1
            ? "1 резултат"
            : `${placesList.childElementCount} резултата`;
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

clearButton.addEventListener("click", () => {
    oblastSelector.value = oblastSelector.firstElementChild.value;
    typeSelector.value = typeSelector.firstElementChild.value;
    modifierSelector.value = modifierSelector.firstElementChild.value;
    input.value = "";
    displayOblast.checked = displayOblast.attributes["checked"] ? true : false;
    displayType.checked = displayType.attributes["checked"] ? true : false;
    numberOfResults.textContent = "";
    Array.from(placesList.childNodes).forEach((e) => e.remove());
});
