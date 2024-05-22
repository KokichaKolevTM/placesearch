"use strict";

searchButton.addEventListener("click", () => {
    if (placesList.childElementCount > 0) {
        placesList.innerHTML = "";
    }

    for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const placeName = place.name.toLowerCase();
        const inputValue = input.value.toLowerCase();

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
                checkOblast = place.oblast_name === oblastSelector.value;
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
            let checkDuplicate = true;
            if (displayDuplicates.checked) {
                checkDuplicate =
                    i === places.length - 1
                        ? placeName === places[i - 1].name.toLowerCase()
                        : placeName === places[i + 1].name.toLowerCase() ||
                          placeName === places[i - 1].name.toLowerCase();
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
                assembledString += ` (обл. ${place.oblast_name})`;
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

    const percentOfTotal = ((placesList.childElementCount / places.length) * 100).toFixed(2);
    numberOfResults.textContent += ` (${percentOfTotal}% в страната`;

    if (oblastSelector.value != "all") {
        const percentOfOblast = (
            (placesList.childElementCount /
                places.filter((e) => e.oblast_name === oblastSelector.value).length) *
            100
        ).toFixed(2);
        numberOfResults.textContent += `, ${percentOfOblast}% в областта`;
    }
    if (obshtinaSelector.value != "all") {
        const percentOfObshtina = (
            (placesList.childElementCount /
                places.filter(
                    (e) =>
                        e.oblast_name === oblastSelector.value &&
                        e.obshtina_name === obshtinaSelector.value
                ).length) *
            100
        ).toFixed(2);
        numberOfResults.textContent += `, ${percentOfObshtina}% в общината`;
    }
    numberOfResults.textContent += ")";
});

input.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "Enter") {
        searchButton.click();
    } 
    // else if (
        // /^[a-zA-Z`\[\]\\]$/.test(event.key) &&
        // event.ctrlKey === false &&
        // event.altKey === false &&
        // event.metaKey === false
    // ) {
        // input.value += keyMatches[event.key.toLowerCase()];
        // event.preventDefault();
    // }
});

oblastSelector.addEventListener("change", () => {
    obshtinaSelector.innerHTML = "<option value='all'>Всички общини</option>";
    if (oblastSelector.value === "all") {
        return;
    }
    const obshtinas = new Set(
        places
            .filter((place) => place.oblast_name === oblastSelector.value)
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
