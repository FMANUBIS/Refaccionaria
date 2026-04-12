/*este js se encarga de manejar la logica de negocio de los proveedores, es decir,
 las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los proveedores en la base de datos. */
const db = require('../config/db');

class Proveedor {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Proveedores');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, email, telefono, direccion, rfc } = data;
    const [result] = await db.query(
      'INSERT INTO Proveedores (nombre, email, telefono, direccion, rfc) VALUES (?, ?, ?, ?, ?)',
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
      `UPDATE Proveedores SET ${fields.join(', ')} WHERE idProveedor = ?`,
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
      `UPDATE Proveedores SET ${fields.join(', ')} WHERE idProveedor = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM Proveedores WHERE idProveedor = ?', [id]);
    return result.affectedRows;
  }

  static async getByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Proveedores WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Proveedor;
