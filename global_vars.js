"use strict";
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const searchButton = $("#searchButton");
const clearButton = $("#clearButton");
const input = $("#inputField");
const modifierSelector = $("#modifierSelector");
const oblastSelector = $("#mainOblastSelector");
const typeSelector = $("#mainTypeSelector");
const obshtinaSelector = $("#mainObshtinaSelector");
const numberOfResults = $("#numberOfResults");
const placesList = $("#placesList");
const displayOblast = $("#displayOblast");
const displayType = $("#displayType");
const displayWiki = $("#displayWiki");
const displayDuplicates = $("#displayDuplicates");

const keyMatches = {
    a: "а",
    b: "б",
    c: "ц",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "х",
    i: "и",
    j: "й",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "ч",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    w: "ш",
    x: "ж",
    y: "ъ",
    z: "з",
    "`": "ю",
    "[": "я",
    "]": "щ",
    "\\": "ь",
};

// const oblasts = new Set(places.map((place) => place.oblast_name).toSorted());
