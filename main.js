"use strict";
const searchButton = document.getElementById("searchButton");
const input = document.getElementById("inputField");
const placesList = document.getElementById("places");
const modifierBox = document.getElementById("modifierBox");
const numberOfResultsText = document.getElementById("numberOfResults");
const oblastSelector = document.getElementById("oblastSelector");
const typeSelector = document.getElementById("typeSelector");
const clearButton = document.getElementById("clearButton");

searchButton.addEventListener("click", () => {
    if (placesList.childElementCount !== 0) {
        Array.from(placesList.childNodes).forEach((e) => e.remove());
    }

    for (const place of places) {
        const placeName = place.name.toLowerCase();
        const inputValue = input.value.toLowerCase();
        let checkName = false;
        switch (modifierBox.value) {
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
                checkOblast =
                    place.oblast_name === "обл. " + oblastSelector.value;
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
            listEntry.textContent = `${place.type} ${place.name} (${place.oblast_name})`;
            placesList.append(listEntry);
        }
    }
    // prettier-ignore
    numberOfResultsText.textContent = placesList.childElementCount === 1 ? `1 резултат` : `${placesList.childElementCount} резултата`;
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

clearButton.addEventListener("click", () => {
    oblastSelector.value = "all";
    typeSelector.value = "all";
    modifierBox.value = "startsWith";
    input.value = "";
    numberOfResultsText.textContent = "";
    Array.from(placesList.childNodes).forEach((e) => e.remove());
});
