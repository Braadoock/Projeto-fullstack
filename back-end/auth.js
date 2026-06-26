const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'minha_chave_secreta_123';
const router = express.Router();

function authRoutes(db) {
    router.post('/register', (req, res) => {
      const { username, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);
      try {
        db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hash);
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
      } catch (err) {
        res.status(400).json({ error: 'Usuário já existe' });
      }
    })

    router.post('/login', (req, res) => {
      const { username, password } = req.body;
      const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const senhaCorreta = bcrypt.compareSync(password, user.password);
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h'});
      res.json({ token });
    })
    
    return router;

  }

  module.exports = { authRoutes, SECRET };