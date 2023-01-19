/* Imports */
import { renderDiv, renderPlayer } from './render-utils.js';
/* Get DOM Elements */
const goblinsDefeatedEl = document.getElementById('goblins-defeated');
const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');
const goblinsEl = document.querySelector('.goblins-container');
const playerStatsEl = document.querySelector('.player-div');
const fighterImageEl = document.getElementById('fighter-image');
/* State */
let player = { HP: 10, attack: 11, defense: 4 };
let goblinsDefeated = 0;
let attacksLanded = 0;
let totalAttacks = 0;
let counterattacksLanded = 0;

// Starter Goblins
const goblins = [
    { name: 'Drew', health: 4, attack: 8, defense: 2 },
    { name: 'Korbin', health: 3, attack: 8, defense: 4 },
    { name: 'Lisa', health: 4, attack: 10, defense: 3 },
    { name: 'Dave', health: 2, attack: 9, defense: 3 },
];

/* Events */
nameButton.addEventListener('click', () => {
    const newGoblin = {
        name: nameInput.value || `Goober #${Math.ceil(Math.random() * 100)}`,
        health: Math.ceil(Math.random() * 7),
        attack: 8 + Math.floor(Math.random() * 6),
        defense: 2 + Math.floor(Math.random() * 2),
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
            if (player.HP < 1) {
                alert(
                    'Player has succumbed to the goblin attacks and can not go on fighting. Refresh page to play again'
                );
                return;
            }

            if (goblin.health > 0) {
                totalAttacks++;
                if (Math.random() < (player.attack / goblin.defense) * 0.1) {
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

                if (Math.random() < (goblin.attack / player.defense) * 0.1) {
                    player.HP--;
                    counterattacksLanded++;
                    playerStatsEl.textContent = '';
                    displayPlayerStats();
                    alert(`${goblin.name} landed a counter attack`);
                    if (player.HP == 0) {
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
        });
        goblinsEl.append(goblinEl);
    }
}
function displayPlayerStats() {
    const playerRendering = renderPlayer(player);
    playerStatsEl.append(playerRendering);
}

// (don't forget to call any display functions you want to run on page load!)
displayGoblins();
displayPlayerStats();
