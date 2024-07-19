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
const heightSelector = $("#mainHeightSelector");
const numberOfResults = $("#numberOfResults");
const placesList = $("#placesList");
const displayOblast = $("#displayOblast");
const displayType = $("#displayType");
const displayWiki = $("#displayWiki");
const displayDuplicates = $("#displayDuplicates");

// const oblasts = new Set(places.map((place) => place.oblast_name).toSorted());
