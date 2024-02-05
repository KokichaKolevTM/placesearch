"use strict";
const searchButton = document.querySelector("#searchButton");
const input = document.querySelector("#inputField");
const placesList = document.querySelector("#places");
const modifierBox = document.querySelector("#modifierBox");
const numberOfResultsText = document.querySelector("#numberOfResults");

searchButton.addEventListener("click", () => {
    if (placesList.childElementCount !== 0) {
        Array.from(placesList.childNodes).forEach((e) => e.remove());
    }

    let checkCondition = "";
    switch (modifierBox.value) {
        case "startsWith":
            checkCondition = ".startsWith(input.value.toLowerCase())";
            break;
        case "endsWith":
            checkCondition = ".endsWith(input.value.toLowerCase())";
            break;
        case "contains":
            checkCondition = ".includes(input.value.toLowerCase())";
            break;
        case "match":
            checkCondition = " === input.value.toLowerCase()";
            break;
    }

    let numberOfResults = 0;
    for (const place of places) {
        if (eval(`place.name.toLowerCase()${checkCondition}`) === true) {
            const listEntry = document.createElement("li");
            listEntry.textContent = `${place.type} ${place.name} (${place.oblast_name})`;
            placesList.append(listEntry);
            numberOfResults++;
        }
    }
    // prettier-ignore
    numberOfResultsText.textContent = numberOfResults === 1 ? `1 резултат` : `${numberOfResults} резултата`;
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
