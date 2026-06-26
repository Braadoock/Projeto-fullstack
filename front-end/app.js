


let linkEditandoId = null





function buscarlinks() {
    fetch('http://localhost:3000/links', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
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
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
    .then(() => buscarlinks())
}

function salvarLink() {
    const titulo = document.getElementById('titulo').value
    const url = document.getElementById('url').value 

    if (linkEditandoId) {
        fetch('http://localhost:3000/links/' + linkEditandoId, {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, url })
        })
        .then(() => {
            linkEditandoId = null
            buscarlinks()
        })

    } else {

    fetch('http://localhost:3000/links/', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'},
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

function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
})
    .then(response => response.json())
    .then(dados => {
        localStorage.setItem('token', dados.token)
        document.getElementById('tela-login').style.display = 'none'
        document.getElementById('header').style.display = 'block'
        document.getElementById('main').style.display = 'flex'
        buscarlinks()
    })
}

 const token = localStorage.getItem('token')
       if (token) {
            buscarlinks()
       } else {
           document.getElementById('tela-login').style.display = 'block'
}

function logout() {
    localStorage.removeItem('token')
    document.getElementById('tela-login').style.display = 'block'
    document.getElementById('header').style.display = 'none'
    document.getElementById('main').style.display = 'none'
}
