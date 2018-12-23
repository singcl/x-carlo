async function onload() {
    // Call the function that was exposed in Node
    const data = await env();

    const table = document.getElementById('table');
    const fragment = document.createDocumentFragment();

    for (let type in data) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');

        td1.textContent = type;
        td2.textContent = data[type];

        tr.appendChild(td1);
        tr.appendChild(td2);

        fragment.appendChild(tr);
    }

    table.appendChild(fragment);
}
