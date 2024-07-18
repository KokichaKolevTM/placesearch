"use strict";

searchButton.addEventListener("click", () => {
    while (placesList.childElementCount > 1) {
        placesList.lastChild.remove();
    }

    let matchedNumber = 0;
    for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const placeName = place.name.toLowerCase();
        const inputValue = input.value.toLowerCase();

        let checkType;
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

        let checkName;
        switch (modifierSelector.value) {
            case "startsWith":
                checkName = placeName.startsWith(inputValue);
                break;
            case "endsWith":
                checkName = placeName.endsWith(inputValue);
                break;
            case "includes":
                checkName = placeName.includes(inputValue);
                break;
            case "matches":
                checkName = placeName === inputValue;
                break;
            case "regex":
                checkName = new RegExp(input.value, "i").test(placeName);
                break;
        }

        let checkOblast;
        switch (oblastSelector.value) {
            case "all":
                checkOblast = true;
                break;
            default:
                checkOblast = place.oblast_name === oblastSelector.value;
                break;
        }

        let checkObshtina;
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

            placesList.removeAttribute("style");
            const placeEntry = document.createElement("tr");

            const No = document.createElement("td");
            No.classList.add("number");
            No.textContent = ++matchedNumber;
            placeEntry.append(No);

            ["type", "name", "obshtina_name", "oblast_name", "height"].forEach((key) => {
                const col = document.createElement("td");
                col.textContent = place[key];
                col.classList.add(key);
                placeEntry.append(col);
            });

            const wikiLink = document.createElement("td");
            wikiLink.classList.add("wiki_link");
            const anchor = document.createElement("a");
            anchor.href = `https://bg.wikipedia.org/wiki/${place.name}`;
            anchor.target = "_blank";

            const img = document.createElement("img");
            img.src = "wikipedia.png";
            anchor.append(img);

            wikiLink.append(anchor);
            placeEntry.append(wikiLink);

            placesList.append(placeEntry);
        }
    }

    if (matchedNumber === 0 && placesList.style.display !== "none") {
        placesList.style.display = "none";
    }

    numberOfResults.textContent =
        matchedNumber === 1 ? "1 резултат" : `${matchedNumber} резултата`;

    const percentOfTotal = ((matchedNumber / places.length) * 100).toFixed(2);
    numberOfResults.textContent += ` (${percentOfTotal}% в страната`;

    if (oblastSelector.value !== "all") {
        const percentOfOblast = (
            (matchedNumber /
                places.filter((e) => e.oblast_name === oblastSelector.value).length) *
            100
        ).toFixed(2);
        numberOfResults.textContent += `, ${percentOfOblast}% в областта`;
    }
    if (obshtinaSelector.value !== "all") {
        const percentOfObshtina = (
            (matchedNumber /
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
    if (event.key === "Enter") {
        searchButton.click();
    } else if (
        /^[a-zA-Z`\[\]\\]$/.test(event.key) &&
        event.ctrlKey === false &&
        event.altKey === false &&
        event.metaKey === false &&
        modifierSelector.value !== "regex"
    ) {
        input.value += keyMatches[event.key.toLowerCase()];
        event.preventDefault();
    }
});

oblastSelector.addEventListener("change", () => {
    while (obshtinaSelector.childElementCount > 1) {
        obshtinaSelector.lastChild.remove();
    }

    if (oblastSelector.value === "all") {
        return;
    }

    const obshtinas = new Set(
        places
            .filter((place) => place.oblast_name === oblastSelector.value)
            .map((place) => place.obshtina_name)
            .toSorted()
    );
    for (const obshtina of obshtinas) {
        const option = document.createElement("option");
        option.textContent = obshtina;
        obshtinaSelector.append(option);
    }
});

clearButton.addEventListener("click", () => {
    input.value = "";
    for (const select of $$("#searchBox select[id]")) {
        select.value = select.firstElementChild.value;
    }

    while (obshtinaSelector.childElementCount > 1) {
        obshtinaSelector.lastChild.remove();
    }

    for (const checkBox of $$("#searchBox input[type='checkbox']")) {
        checkBox.checked = Boolean(checkBox.attributes.checked);
    }

    numberOfResults.textContent = "";
    while (placesList.childElementCount > 1) {
        placesList.lastChild.remove();
    }
    placesList.style.display = "none";
});
