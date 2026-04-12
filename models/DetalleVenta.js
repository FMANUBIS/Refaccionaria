/*este js se encarga de manejar la logica de negocio de los detalles de venta, es decir,
 las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los detalles de venta en la base de datos. */

const db = require('../config/db');

class DetalleVenta {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM DetalleVenta');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM DetalleVenta WHERE idDetalle = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { idVenta, idArticulo, cantidad, precioUnitario, subtotal } = data;
    const [result] = await db.query(
      'INSERT INTO DetalleVenta (idVenta, idArticulo, cantidad, precioUnitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [idVenta, idArticulo, cantidad, precioUnitario, subtotal]
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
      `UPDATE DetalleVenta SET ${fields.join(', ')} WHERE idDetalle = ?`,
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
      `UPDATE DetalleVenta SET ${fields.join(', ')} WHERE idDetalle = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM DetalleVenta WHERE idDetalle = ?', [id]);
    return result.affectedRows;
  }

  static async getByVenta(idVenta) {
    const [rows] = await db.query('SELECT * FROM DetalleVenta WHERE idVenta = ?', [idVenta]);
    return rows;
  }

  static async getByArticulo(idArticulo) {
    const [rows] = await db.query('SELECT * FROM DetalleVenta WHERE idArticulo = ?', [idArticulo]);
    return rows;
  }
}

module.exports = DetalleVenta;
