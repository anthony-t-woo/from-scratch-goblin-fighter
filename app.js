/* Imports */
import { renderDiv } from './render-utils.js';
/* Get DOM Elements */
const goblinsDefeatedEl = document.getElementById('goblins-defeated');
const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');
const goblinsEl = document.querySelector('.goblins-container');
const playerHealthEl = document.getElementById('player-hp');
const fighterImageEl = document.getElementById('fighter-image');
/* State */
let playerHP = 10;
let goblinsDefeated = 0;
let attacksLanded = 0;
let totalAttacks = 0;
let counterattacksLanded = 0;

// Starter Goblins
const goblins = [
    { name: 'Drew', health: 4 },
    { name: 'Korbin', health: 3 },
    { name: 'Lisa', health: 4 },
    { name: 'Dave', health: 2 },
];

/* Events */
nameButton.addEventListener('click', () => {
    const newGoblin = {
        name: nameInput.value || `Goober #${Math.ceil(Math.random() * 100)}`,
        health: Math.ceil(Math.random() * 7),
    };
    goblins.push(newGoblin);
    nameInput.value = '';
    displayGoblins();
});

/* Display Functions */
function displayGoblins() {
    goblinsEl.textContent = '';
    for (let goblin of goblins) {
        const goblinEl = renderDiv(goblin);
        goblinEl.addEventListener('click', () => {
            if (playerHP < 1) {
                alert(
                    'Player has succumbed to the goblin attacks and can not go on fighting. Refresh page to play again'
                );
                return;
            }

            if (goblin.health > 0) {
                totalAttacks++;
                if (Math.random() > 0.5) {
                    goblin.health--;
                    attacksLanded++;
                    alert(`Your attack on ${goblin.name} was successful`);
                    if (goblin.health === 0) {
                        goblinsDefeated++;
                        goblinsDefeatedEl.textContent = goblinsDefeated;
                        alert(`${goblin.name} has been defeated`);
                        displayGoblins();
                        return;
                    }
                    displayGoblins();
                } else {
                    alert(`You attacked ${goblin.name} and missed`);
                }

                if (Math.random() > 0.7) {
                    playerHP--;
                    counterattacksLanded++;
                    alert(`${goblin.name} landed a counter attack`);
                    if (playerHP == 0) {
                        alert(
                            `GAME OVER: You have been defeated by the goblin army. You waged ${totalAttacks} attacks and landed ${attacksLanded} blows. The goblins managed to hit you back ${counterattacksLanded} times`
                        );
                        fighterImageEl.src = './assets/skeleton.png';
                    }
                } else {
                    alert(`${goblin.name} attempted a counter attack and missed`);
                }
            } else {
                alert(`${goblin.name} has already been defeated`);
            }

            playerHealthEl.textContent = playerHP;
        });

        goblinsEl.append(goblinEl);
    }
}

// (don't forget to call any display functions you want to run on page load!)
displayGoblins();
