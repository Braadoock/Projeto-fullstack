const express = require('express')

const Database = require('better-sqlite3')

const cors = require('cors')

const server = express()

const { authRoutes } = require('./auth')
const { autenticarToken } = require('./middleware')

const db = Database('../database/db.sqlite')
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        )
    `)
try { db.exec(`ALTER TABLE users ADD COLUMN nome TEXT`) } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN email TEXT`) } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN telefone TEXT`) } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN endereco TEXT`) } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN data_nascimento TEXT`) } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN genero TEXT`) } catch {}
server.use(express.json())

server.use(cors())
server.use('/auth', authRoutes(db))


server.get('/', (req, res) => {
    res.send('Servidor Funcionando')
})


server.get('/links', autenticarToken, (req, res) => {
    const links = db.prepare('SELECT * FROM links').all()
    res.json(links)
})

server.get('/links/publicados', autenticarToken, (req, res) => {
    const links = db.prepare('SELECT * FROM links WHERE publicado = 1').all()
    res.json(links)
})

server.post('/links', autenticarToken, (req, res) => {
    const { titulo, url, publicado } = req.body
    db.prepare('INSERT INTO links (titulo, url, publicado) VALUES (?, ?, ?)').run(titulo, url, publicado)
    res.json({mensagem: 'Link criado com sucesso!' })
})

server.delete('/links/:id', autenticarToken, (req, res) => {
    const { id } = req.params
    db.prepare('DELETE FROM links WHERE id = ?').run(id)
    res.json({mensagem: 'Link foi deleteado' })
})

server.put('/links/:id', autenticarToken, (req, res) => {
    const { id } = req.params
    const { titulo, url, publicado} = req.body
    db.prepare('UPDATE links SET titulo = ?, url = ?, publicado = ? WHERE id = ?').run(titulo, url, publicado, id)
    res.json({mensagem: 'Link foi atualizado' })
})





server.listen(3000, () => {
    console.log('Server is on!')
})

