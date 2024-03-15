"use strict";
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const input = document.getElementById("inputField");
const modifierSelector = document.getElementById("modifierSelector");
const oblastSelector = document.getElementById("oblastSelector");
const typeSelector = document.getElementById("typeSelector");
const obshtinaSelector = document.getElementById("obshtinaSelector");
const numberOfResults = document.getElementById("numberOfResults");
const placesList = document.getElementById("places");
const displayOblast = document.getElementById("displayOblast");
const displayType = document.getElementById("displayType");
const displayWiki = document.getElementById("displayWiki");
const displayDuplicates = document.getElementById("displayDuplicates");

searchButton.addEventListener("click", () => {
    if (placesList.childElementCount > 0) {
        placesList.innerHTML = "";
    }

    for (let i = 0; i < places.length; i++) {
        const place = places[i];
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

        let checkObshtina = false;
        switch (obshtinaSelector.value) {
            case "all":
                checkObshtina = true;
                break;
            default:
                checkObshtina = place.obshtina_name === obshtinaSelector.value;
                break;
        }

        if (checkType && checkName && checkOblast && checkObshtina) {
            let checkDuplicate = false;
            if (displayDuplicates.checked) {
                const check =
                    i + 1 === places.length
                        ? placeName === places[i - 1].name.toLowerCase()
                        : placeName === places[i + 1].name.toLowerCase() ||
                          placeName === places[i - 1].name.toLowerCase();
                if (check) {
                    checkDuplicate = true;
                }
            } else {
                checkDuplicate = true;
            }

            if (!checkDuplicate) {
                continue;
            }

            const listEntry = document.createElement("li");
            let assembledString = "";
            if (displayType.checked) {
                assembledString += `${place.type} `;
            }
            assembledString += place.name;
            if (displayOblast.checked) {
                assembledString += ` (${place.oblast_name})`;
            }
            listEntry.textContent = assembledString;
            if (displayWiki.checked) {
                listEntry.innerHTML += `<a href="https://bg.wikipedia.org/wiki/${place.name}" target="_blank"><img src="wikipedia.ico"></a>`;
            }
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

oblastSelector.addEventListener("change", () => {
    obshtinaSelector.innerHTML = "<option value='all'>Всички общини</option>";
    if (oblastSelector.value === "all") {
        return;
    }
    const obshtinas = new Set(
        places
            .filter((place) => place.oblast_name === "обл. " + oblastSelector.value)
            .map((place) => place.obshtina_name)
    );
    for (const obshtina of obshtinas) {
        const option = document.createElement("option");
        option.textContent = obshtina;
        obshtinaSelector.append(option);
    }
});

clearButton.addEventListener("click", () => {
    input.value = "";
    for (const select of document.querySelectorAll("#searchBox select[id]")) {
        select.value = select.firstElementChild.value;
    }
    obshtinaSelector.innerHTML = "<option value='all'>Всички общини</option>";
    for (const checkBox of document.querySelectorAll("#searchBox input[type='checkbox']")) {
        checkBox.checked = checkBox.attributes.checked ? true : false;
    }
    for (const el of document.querySelectorAll("#results > *")) {
        el.innerHTML = "";
    }
});
