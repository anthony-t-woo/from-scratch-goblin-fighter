export function renderDiv(object) {
    const div = document.createElement('div');
    const nameEl = document.createElement('p');
    const emojiEl = document.createElement('p');
    const healthEl = document.createElement('p');
    const attackEl = document.createElement('p');
    const defenseEl = document.createElement('p');

    nameEl.textContent = object.name;
    healthEl.textContent = `HP: ${object.health}`;
    attackEl.textContent = `Atk: ${object.attack}`;
    defenseEl.textContent = `Def: ${object.defense}`;

    div.classList.add('goblin');

    if (object.health > 0) {
        emojiEl.textContent = '😈';
    } else {
        emojiEl.textContent = '💀';
    }

    div.append(nameEl, emojiEl, healthEl, attackEl, defenseEl);
    return div;
}
