const express = require('express')

const Database = require('better-sqlite3')

const server = express()

const db = Database('../database/db.sqlite')
server.use(express.json())




server.get('/', (req, res) => {
    res.send('Servidor Funcionando')
})


server.get('/links', (req, res) => {
    const links = db.prepare('SELECT * FROM links').all()
    res.json(links)
})

server.post('/links', (req, res) => {
    const { titulo, url } = req.body
    db.prepare('INSERT INTO links (titulo, url) VALUES (?, ?)').run(titulo, url)
    res.json({mensagem: 'Link criado com sucesso!' })
})

server.delete('/links/:id', (req, res) => {
    const { id } = req.params
    db.prepare('DELETE FROM links WHERE id = ?').run(id)
    res.json({mensagem: 'Link foi deleteado' })
})

server.put('/links/:id', (req, res) => {
    const { id } = req.params
    const { titulo, url} = req.body
    db.prepare('UPDATE links SET titulo = ?, url = ? WHERE id = ?').run(titulo, url, id)
    res.json({mensagem: 'Link foi atualizado' })
})





server.listen(3000, () => {
    console.log('Server is on!')
})

