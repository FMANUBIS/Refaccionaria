/* este js se encarga de manejar la logica de negocio de las ventas, es decir,
 las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las ventas en la base de datos. */
const db = require("../config/db");

class Venta {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM Ventas");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM Ventas WHERE idVenta = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { idCliente, idEmpleado, fecha, total, formaPago } = data;
    const [result] = await db.query(
      "INSERT INTO Ventas (idCliente, idEmpleado, fecha, total, formaPago) VALUES (?, ?, ?, ?, ?)",
      [idCliente, idEmpleado, fecha, total, formaPago]
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
      `UPDATE Ventas SET ${fields.join(", ")} WHERE idVenta = ?`,
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
      `UPDATE Ventas SET ${fields.join(", ")} WHERE idVenta = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM Ventas WHERE idVenta = ?", [id]);
    return result.affectedRows;
  }

  static async getByCliente(idCliente) {
    const [rows] = await db.query("SELECT * FROM Ventas WHERE idCliente = ?", [idCliente]);
    return rows;
  }

  static async getByEmpleado(idEmpleado) {
    const [rows] = await db.query("SELECT * FROM Ventas WHERE idEmpleado = ?", [idEmpleado]);
    return rows;
  }
}

module.exports = Venta;
