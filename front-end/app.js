


let linkEditandoId = null





function buscarlinks() {
    fetch('http://localhost:3000/links')
        .then(resposta => resposta.json())
        .then(links => {
            const div = document.getElementById('lista-links')
            div.innerHTML = ''
            links.forEach(link => {
                div.innerHTML += `
                    <div class="card">
                        <h2>${link.titulo}</h2>
                        <p>${link.url}</p>
                         <button class="btn-excluir" onclick="excluirLink(${link.id})">Excluir</button>
                         <button class="btn-editar" onclick="editarLink(${link.id}, '${link.titulo}', '${link.url}')">Editar</button>
                    </div>    
                `
            })
        
        })
}

function excluirLink(id) {
    fetch('http://localhost:3000/links/' + id, {
        method: 'DELETE'
    })
    .then(() => buscarlinks())
}

function salvarLink() {
    const titulo = document.getElementById('titulo').value
    const url = document.getElementById('url').value 

    if (linkEditandoId) {
        fetch('http://localhost:3000/links/' + linkEditandoId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ titulo, url })
        })
        .then(() => {
            linkEditandoId = null
            buscarlinks()
        })

    } else {

    fetch('http://localhost:3000/links/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ titulo, url })
    })
    .then(() => buscarlinks())
    }
}


function editarLink(id, titulo, url) {
    linkEditandoId = id
    document.getElementById('titulo').value = titulo
    document.getElementById('url').value = url

}

function toggleTema() {
    document.body.classList.toggle('light-mode')
}







buscarlinks()
