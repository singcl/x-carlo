async function onload() {
    const data = await systeminfo();
    const grids = document.getElementById('grids');
    const blur = new Set(['serial', 'uuid', 'sku', 'hostname']);
    const keys = Object.keys(data).sort();
    for (const type of keys) {
        const info = data[type];
        const placeholder = createChild(grids, 'div', 'grid-placeholder');
        const grid = createChild(placeholder, 'div', 'grid');
        createChild(grid, 'div', 'header').textContent = type;
        const infos = Object.keys(info).sort();
        for (const key of infos) {
            if (typeof info[key] === 'object') continue;
            createChild(grid, 'div').textContent = key;
            const value = createChild(grid, 'div', 'value');
            value.textContent = info[key];
            if (blur.has(key)) value.classList.add('blur');
        }
    }
    document.body.style.opacity = 1;
}

function createChild(parent, tag, className) {
    const elem = document.createElement(tag);
    if (className) elem.className = className;
    parent.appendChild(elem);
    return elem;
}
