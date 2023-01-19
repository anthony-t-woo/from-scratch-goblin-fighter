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
            // qualifies if player has enough HP to proceed
            if (player.HP < 1) {
                alert(
                    'Player has succumbed to the goblin attacks and can not go on fighting. Refresh page to play again'
                );
                return;
            }
            // player attacks as long as goblin is still alive - chance of hit is based on attack/defense ratio
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
                // goblin counterattack and success is based on attack/defense ratio
                if (Math.random() < (goblin.attack / player.defense) * 0.1) {
                    player.HP--;
                    counterattacksLanded++;
                    displayPlayerStats();
                    alert(`${goblin.name} landed a counter attack`);
                    if (player.HP === 0) {
                        alert(
                            `GAME OVER: You have been defeated by the goblin army. ${goblinsDefeated} were vanquished by your hands. You waged ${totalAttacks} attacks and landed ${attacksLanded} blows. The goblins managed to hit you back ${counterattacksLanded} times`
                        );
                        fighterImageEl.src = './assets/skeleton.png';
                    }
                } else {
                    alert(`${goblin.name} attempted a counter attack and missed`);
                }
                // small chance to bump hp by one
                if (Math.random() > 0.95) {
                    player.HP++;
                    alert('You found a berry and are now feeling nourished +1 hp');
                    displayPlayerStats();
                }
                // small chance for bump in defense or in attack
                if (Math.random() > 0.75) {
                    // let randNum = Math.random();
                    // let bump = randNum.toFixed(2);
                    if (Math.random() > 0.5) {
                        player.attack = player.attack + 0.25;
                        alert('You are fired up and increased your attack');
                    } else {
                        player.defense = player.defense + 0.25;
                        alert('You are fired up and increased your defense');
                    }
                    displayPlayerStats();
                }
            } else {
                alert(`${goblin.name} has already been defeated`);
                return;
            }
        });
        goblinsEl.append(goblinEl);
    }
}
// clear and show player stats - refreshes values on call
function displayPlayerStats() {
    playerStatsEl.textContent = '';
    const playerRendering = renderPlayer(player);
    playerStatsEl.append(playerRendering);
}

// (don't forget to call any display functions you want to run on page load!)
displayGoblins();
displayPlayerStats();
