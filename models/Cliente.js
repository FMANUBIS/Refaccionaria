/*este js se encarga de manejar la logica de negocio de los clientes, es decir,
  las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los clientes en la base de datos. */
const db = require('../config/db');

class Cliente {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Clientes');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Clientes WHERE idCliente = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, email, telefono, direccion, rfc } = data;
    const [result] = await db.query(
      'INSERT INTO Clientes (nombre, email, telefono, direccion, rfc) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, telefono, direccion, rfc]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    
    Object.keys(data).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    });
    
    values.push(id);
    const [result] = await db.query(
      `UPDATE Clientes SET ${fields.join(', ')} WHERE idCliente = ?`,
      values
    );
    return result.affectedRows;
  }

  static async partialUpdate(id, data) {
    const fields = [];
    const values = [];
    
    Object.keys(data).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    });
    
    values.push(id);
    const [result] = await db.query(
      `UPDATE Clientes SET ${fields.join(', ')} WHERE idCliente = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM Clientes WHERE idCliente = ?', [id]);
    return result.affectedRows;
  }

  static async getByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Clientes WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Cliente;
