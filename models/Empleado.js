/*este js se encarga de manejar la logica de negocio de los empleados, es decir,
 las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los empleados en la base de datos. */

const db = require('../config/db');

class Empleado {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Empleados');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Empleados WHERE idEmpleado = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, puesto, salario, fechaContratacion, telefono, email } = data;
    const [result] = await db.query(
      'INSERT INTO Empleados (nombre, puesto, salario, fechaContratacion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, puesto, salario, fechaContratacion, telefono, email]
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
      `UPDATE Empleados SET ${fields.join(', ')} WHERE idEmpleado = ?`,
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
      `UPDATE Empleados SET ${fields.join(', ')} WHERE idEmpleado = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM Empleados WHERE idEmpleado = ?', [id]);
    return result.affectedRows;
  }

  static async getByPosicion(posicion) {
    const [rows] = await db.query('SELECT * FROM Empleados WHERE posicion = ?', [posicion]);
    return rows;
  }
}

module.exports = Empleado;
