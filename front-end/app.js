function buscarlinks() {
    fetch('http://localhost:3000/links')
        .then(resposta => resposta.json())
        .then(links => {
            const div = document.getElementById('lista-links')
            div.innerHTML = ''
            links.forEach(link => {
                div.innerHTML += `
                    <div>
                        <h2>${link.titulo}<h2>
                        <p>${link.url}<p>
                         <button onclick="excluirLink(${link.id})">Excluir</button>
                         <button onclick="editarLink(${link.id})">Editar</button>
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
    fetch('http://localhost:3000/links/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ titulo, url })
    })
    .then(() => buscarlinks())
}







buscarlinks()
