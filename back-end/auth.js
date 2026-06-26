const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'minha_chave_secreta_123';
const router = express.Router();

function authRoutes(db) {
    router.post('/register', (req, res) => {
      const { username, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);
    router.post('/login', (req, res) => {
      const { username, password } = req.body;
    })
      try {
        db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hash);
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
      } catch (err) {
        res.status(400).json({ error: 'Usuário já existe' });
      }

    })

}
