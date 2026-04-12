const Empleado = require('../models/Empleado');

class EmpleadoService {
  static async getAllEmpleados() {
    return await Empleado.getAll();
  }

  static async getEmpleadoById(id) {
    const empleado = await Empleado.getById(id);
    if (!empleado) {
      throw { statusCode: 404, message: 'Empleado no encontrado' };
    }
    return empleado;
  }

  static async createEmpleado(data) {
    const { nombre, puesto, salario, fechaContratacion } = data;
    
    if (!nombre || !puesto || salario === undefined) {
      throw { statusCode: 400, message: 'Nombre, puesto y salario son requeridos' };
    }

    if (salario < 0) {
      throw { statusCode: 400, message: 'El salario no puede ser negativo' };
    }

    const id = await Empleado.create(data);
    return { id, ...data };
  }

  static async updateEmpleado(id, data) {
    await this.getEmpleadoById(id);
    
    if (data.salario !== undefined && data.salario < 0) {
      throw { statusCode: 400, message: 'El salario no puede ser negativo' };
    }

    const affectedRows = await Empleado.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el empleado' };
    }
    
    return await this.getEmpleadoById(id);
  }

  static async partialUpdateEmpleado(id, data) {
    await this.getEmpleadoById(id);
    
    const affectedRows = await Empleado.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el empleado' };
    }
    
    return await this.getEmpleadoById(id);
  }

  static async deleteEmpleado(id) {
    await this.getEmpleadoById(id);
    
    const affectedRows = await Empleado.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar el empleado' };
    }
    
    return { message: 'Empleado eliminado exitosamente' };
  }

  static async getEmpleadosByPosicion(posicion) {
    return await Empleado.getByPosicion(posicion);
  }
}

module.exports = EmpleadoService;
