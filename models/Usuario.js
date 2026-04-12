const db = require('../config/db');
const crypto = require('crypto');

class Usuario {
  static hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derivedKey}`;
  }

  static verifyPassword(password, passwordHash) {
    if (!passwordHash || !passwordHash.includes(':')) return false;
    const [salt, key] = passwordHash.split(':');
    const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derivedKey, 'hex'));
  }

  static async create(data) {
    const { nombre, email, password, role = 'usuario' } = data;
    const passwordHash = Usuario.hashPassword(password);
    const [result] = await db.query(
      'INSERT INTO Usuarios (nombre, email, passwordHash, role) VALUES (?, ?, ?, ?)',
      [nombre, email, passwordHash, role]
    );
    return result.insertId;
  }

  static async getByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT idUsuario, nombre, email, role, createdAt FROM Usuarios WHERE idUsuario = ?', [id]);
    return rows[0];
  }
}

module.exports = Usuario;
