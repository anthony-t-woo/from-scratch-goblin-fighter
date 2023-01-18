/* Imports */
import { renderDiv } from './render-utils.js';
/* Get DOM Elements */
const goblinsKilled = document.getElementById('goblins-defeated');
const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');
const goblinsEl = document.querySelector('.goblins-container');
/* State */
let playerHP = 10;
// Starter Goblins
const goblins = [
    { name: 'Drew', health: 4 },
    { name: 'Korbin', health: 3 },
    { name: 'Lisa', health: 4 },
    { name: 'Dave', health: 2 },
];

/* Events */

/* Display Functions */
function displayGoblins() {
    goblinsEl.textContent = '';
    for (let goblin of goblins) {
        const goblinEl = renderDiv(goblin);
        goblinsEl.append(goblinEl);
    }
    console.log(goblinsEl);
}

// (don't forget to call any display functions you want to run on page load!)
displayGoblins();
