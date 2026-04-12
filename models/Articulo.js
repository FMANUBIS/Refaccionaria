/*este js se encarga de manejar la logica de negocio de los articulos, es decir,
 las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los articulos en la base de datos. */
const db = require('../config/db');

class Articulo {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Articulos');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Articulos WHERE idArticulo = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { marca, modelo, descripcion, precioCompra, precioVenta, existencia, stockMinimo, stockMaximo, idProveedor, idAlmacen } = data;
    const [result] = await db.query(
      'INSERT INTO Articulos (marca, modelo, descripcion, precioCompra, precioVenta, existencia, stockMinimo, stockMaximo, idProveedor, idAlmacen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [marca, modelo, descripcion, precioCompra, precioVenta, existencia, stockMinimo, stockMaximo, idProveedor, idAlmacen]
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
      `UPDATE Articulos SET ${fields.join(', ')} WHERE idArticulo = ?`,
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
      `UPDATE Articulos SET ${fields.join(', ')} WHERE idArticulo = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM Articulos WHERE idArticulo = ?', [id]);
    return result.affectedRows;
  }

  static async getByProveedor(idProveedor) {
    const [rows] = await db.query('SELECT * FROM Articulos WHERE idProveedor = ?', [idProveedor]);
    return rows;
  }

  static async getByAlmacen(idAlmacen) {
    const [rows] = await db.query('SELECT * FROM Articulos WHERE idAlmacen = ?', [idAlmacen]);
    return rows;
  }
}

module.exports = Articulo;
