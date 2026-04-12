const Cliente = require('../models/Cliente');

class ClienteService {
  static async getAllClientes() {
    return await Cliente.getAll();
  }

  static async getClienteById(id) {
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      throw { statusCode: 404, message: 'Cliente no encontrado' };
    }
    return cliente;
  }

  static async getClienteByEmail(email) {
    if (!email) {
      throw { statusCode: 400, message: 'Email de cliente es requerido' };
    }
    return await Cliente.getByEmail(email);
  }

  static async createCliente(data) {
    const { nombre, email, telefono, direccion } = data;
    
    if (!nombre || !email) {
      throw { statusCode: 400, message: 'Nombre y email son requeridos' };
    }

    const existente = await Cliente.getByEmail(email);
    if (existente) {
      throw { statusCode: 400, message: 'El email ya está registrado' };
    }

    const id = await Cliente.create(data);
    return { idCliente: id, ...data };
  }

  static async updateCliente(id, data) {
    await this.getClienteById(id);
    
    if (data.email) {
      const existente = await Cliente.getByEmail(data.email);
      if (existente && existente.idCliente !== id) {
        throw { statusCode: 400, message: 'El email ya está registrado' };
      }
    }

    const affectedRows = await Cliente.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el cliente' };
    }
    
    return await this.getClienteById(id);
  }

  static async partialUpdateCliente(id, data) {
    await this.getClienteById(id);
    
    const affectedRows = await Cliente.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el cliente' };
    }
    
    return await this.getClienteById(id);
  }

  static async deleteCliente(id) {
    await this.getClienteById(id);
    
    const affectedRows = await Cliente.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar el cliente' };
    }
    
    return { message: 'Cliente eliminado exitosamente' };
  }
}

module.exports = ClienteService;
