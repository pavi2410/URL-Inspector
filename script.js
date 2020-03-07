const $url = document.querySelector('input')

if (location.hash) {
    const url = location.hash.slice(1) // remove # at the start
    $url.value = url
    update(url)
}

$url.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        update(e.target.value)
    }
})

function update(value) {
    const $thead = document.querySelector('table thead'),
        $tbody = document.querySelector('table tbody')

    if (!$thead.display) {
        $thead.display = 'table-header-group'
    }

    $tbody.innerHTML = ''

    const keys = [
        'hostname',
        'href',
        'origin',
        'pathname',
        'username',
        'password',
        'protocol',
        'port',
        'search',
        'hash'
    ]

    const url = new URL(value)

    keys.filter(k => url[k])
        .forEach(k => insertTableRow($tbody, k, url[k]))
}

function insertTableRow(table, key, value) {
    const row = table.insertRow(-1),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1)

    cell1.textContent = key
    cell2.textContent = value
}
