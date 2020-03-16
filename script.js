const $url = document.querySelector('input');

if (location.hash) {
    const url = location.hash.slice(1); // remove # at the start
    $url.value = url;
    update(url)
}

$url.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        update(e.target.value)
    }
});

function update(value) {
    const url = new URL(value);

    const keys = [
        'protocol',
        'hostname',
        'origin',
        'href',
        'username',
        'password',
        'pathname',
        'port',
        'hash'
    ];

    const props = keys.reduce((o, k) => url[k] ? {...o, [k]: url[k]} : o, {});

    props.search = {
        head: ["Key", "Value"],
        body: {}
    };

    url.searchParams.forEach((v, k) => props.search.body[k] = v);

    const content = {
        head: ["Property", "Value"],
        body: props
    };

    const $content = document.getElementById('content');
    $content.innerHTML = '';
    createTable($content, content)
}


function createTable(parent, {head, body}) {
    const table = document.createElement('table'),
        thead = table.createTHead(),
        tbody = table.createTBody();

    const row = thead.insertRow();

    for (let name of head) {
        row.insertCell().textContent = name
    }

    for (let [key, value] of Object.entries(body)) {
        const row = tbody.insertRow();
        row.insertCell().textContent = key;

        if (value instanceof Object) {
            createTable(row, value)
        } else {
            row.insertCell().textContent = value
        }
    }

    parent.appendChild(table)
}
