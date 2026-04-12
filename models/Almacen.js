/* este js se encarga de manejar la logica de negocio de los almacenes, es decir,
 las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los almacenes en la base de datos. */
const db = require('../config/db');

class Almacen {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Almacenes');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Almacenes WHERE idAlmacen = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, ubicacion, capacidad } = data;
    const [result] = await db.query(
      'INSERT INTO Almacenes (nombre, ubicacion, capacidad) VALUES (?, ?, ?)',
      [nombre, ubicacion, capacidad]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, ubicacion, capacidad, encargado } = data;
    const [result] = await db.query(
      'UPDATE Almacenes SET nombre = ?, ubicacion = ?, capacidad = ?, encargado = ? WHERE idAlmacen = ?',
      [nombre, ubicacion, capacidad, encargado, id]
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
      `UPDATE Almacenes SET ${fields.join(', ')} WHERE idAlmacen = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM Almacenes WHERE idAlmacen = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Almacen;
