export function renderDiv(object) {
    const div = document.createElement('div');
    const nameEl = document.createElement('p');
    const emojiEl = document.createElement('p');
    const healthEl = document.createElement('p');

    nameEl.textContent = object.name;
    healthEl.textContent = object.health;

    div.classList.add('goblin');

    if (object.health > 0) {
        emojiEl.textContent = '😈';
    } else {
        emojiEl.textContent = '💀';
    }

    div.append(nameEl, emojiEl, healthEl);
    return div;
}
