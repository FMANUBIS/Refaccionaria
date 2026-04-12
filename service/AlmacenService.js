/*este js se encarga de la logica de negocio, es decir, 
de procesar los datos antes de enviarlos a la base de datos o a los controladores. 
Aqui se pueden agregar validaciones, transformaciones, etc. Es una capa intermedia entre los controladores y los modelos.*/
const Almacen = require('../models/Almacen');

class AlmacenService {
  static async getAllAlmacenes() {
    return await Almacen.getAll();
  }

  static async getAlmacenById(id) {
    const almacen = await Almacen.getById(id);
    if (!almacen) {
      throw { statusCode: 404, message: 'Almacén no encontrado' };
    }
    return almacen;
  }

  static async createAlmacen(data) {
    const { nombre, ubicacion, capacidad } = data;
    
    if (!nombre || !ubicacion || capacidad === undefined) {
      throw { statusCode: 400, message: 'Nombre, ubicación y capacidad son requeridos' };
    }

    if (capacidad <= 0) {
      throw { statusCode: 400, message: 'La capacidad debe ser mayor a 0' };
    }

    const id = await Almacen.create(data);
    return { id, ...data };
  }

  static async updateAlmacen(id, data) {
    await this.getAlmacenById(id);
    
    if (data.capacidad !== undefined && data.capacidad <= 0) {
      throw { statusCode: 400, message: 'La capacidad debe ser mayor a 0' };
    }

    const affectedRows = await Almacen.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el almacén' };
    }
    
    return await this.getAlmacenById(id);
  }

  static async partialUpdateAlmacen(id, data) {
    await this.getAlmacenById(id);
    
    const affectedRows = await Almacen.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el almacén' };
    }
    
    return await this.getAlmacenById(id);
  }

  static async deleteAlmacen(id) {
    await this.getAlmacenById(id);
    
    const affectedRows = await Almacen.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar el almacén' };
    }
    
    return { message: 'Almacén eliminado exitosamente' };
  }
}

module.exports = AlmacenService;
