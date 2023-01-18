/* Imports */
import { renderDiv } from './render-utils.js';
/* Get DOM Elements */
const goblinsKilled = document.getElementById('goblins-defeated');
const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');
const goblinsEl = document.querySelector('.goblins-container');
const playerHealthEl = document.getElementById('player-hp');
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
        goblinEl.addEventListener('click', () => {
            if (Math.random() > 0.5) {
                goblin.health--;
                alert(`Your attack on ${goblin.name} was successful`);
                displayGoblins();
            } else {
                alert(`You attacked ${goblin.name} and missed`);
            }

            if (Math.random() > 0.8) {
                playerHP--;
                alert(`${goblin.name} landed a counter attack`);
            } else {
                alert(`${goblin.name} attempted a counter attack and missed`);
            }
            playerHealthEl.textContent = playerHP;
        });

        goblinsEl.append(goblinEl);
    }
}

// (don't forget to call any display functions you want to run on page load!)
displayGoblins();
