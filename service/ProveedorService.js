const Proveedor = require('../models/Proveedor');

class ProveedorService {
  static async getAllProveedores() {
    return await Proveedor.getAll();
  }

  static async getProveedorById(id) {
    const proveedor = await Proveedor.getById(id);
    if (!proveedor) {
      throw { statusCode: 404, message: 'Proveedor no encontrado' };
    }
    return proveedor;
  }

  static async createProveedor(data) {
    const { nombre, email, telefono, direccion } = data;
    
    if (!nombre || !email) {
      throw { statusCode: 400, message: 'Nombre y email son requeridos' };
    }

    const existente = await Proveedor.getByEmail(email);
    if (existente) {
      throw { statusCode: 400, message: 'El email ya está registrado' };
    }

    const id = await Proveedor.create(data);
    return { id, ...data };
  }

  static async updateProveedor(id, data) {
    await this.getProveedorById(id);
    
    if (data.email) {
      const existente = await Proveedor.getByEmail(data.email);
      if (existente && existente.idProveedor !== id) {
        throw { statusCode: 400, message: 'El email ya está registrado' };
      }
    }

    const affectedRows = await Proveedor.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el proveedor' };
    }
    
    return await this.getProveedorById(id);
  }

  static async partialUpdateProveedor(id, data) {
    await this.getProveedorById(id);
    
    const affectedRows = await Proveedor.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el proveedor' };
    }
    
    return await this.getProveedorById(id);
  }

  static async deleteProveedor(id) {
    await this.getProveedorById(id);
    
    const affectedRows = await Proveedor.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar el proveedor' };
    }
    
    return { message: 'Proveedor eliminado exitosamente' };
  }

  static async getProveedorByEmail(email) {
    return await Proveedor.getByEmail(email);
  }
}

module.exports = ProveedorService;
