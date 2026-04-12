const DetalleVenta = require('../models/DetalleVenta');

class DetalleVentaService {
  static async getAllDetalles() {
    return await DetalleVenta.getAll();
  }

  static async getDetalleById(id) {
    const detalle = await DetalleVenta.getById(id);
    if (!detalle) {
      throw { statusCode: 404, message: 'Detalle de venta no encontrado' };
    }
    return detalle;
  }

  static async createDetalle(data) {
    const { idVenta, idArticulo, cantidad, precioUnitario, subtotal } = data;
    
    if (!idVenta || !idArticulo || cantidad === undefined || precioUnitario === undefined) {
      throw { statusCode: 400, message: 'Todos los campos son requeridos' };
    }

    if (cantidad <= 0 || precioUnitario < 0) {
      throw { statusCode: 400, message: 'Cantidad debe ser mayor a 0 y precio no puede ser negativo' };
    }

    const id = await DetalleVenta.create(data);
    return { id, ...data };
  }

  static async updateDetalle(id, data) {
    await this.getDetalleById(id);
    
    if (data.cantidad !== undefined && data.cantidad <= 0) {
      throw { statusCode: 400, message: 'Cantidad debe ser mayor a 0' };
    }

    const affectedRows = await DetalleVenta.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el detalle' };
    }
    
    return await this.getDetalleById(id);
  }

  static async partialUpdateDetalle(id, data) {
    await this.getDetalleById(id);
    
    const affectedRows = await DetalleVenta.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el detalle' };
    }
    
    return await this.getDetalleById(id);
  }

  static async deleteDetalle(id) {
    await this.getDetalleById(id);
    
    const affectedRows = await DetalleVenta.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar el detalle' };
    }
    
    return { message: 'Detalle eliminado exitosamente' };
  }

  static async getDetallesByVenta(idVenta) {
    return await DetalleVenta.getByVenta(idVenta);
  }

  static async getDetallesByArticulo(idArticulo) {
    return await DetalleVenta.getByArticulo(idArticulo);
  }
}

module.exports = DetalleVentaService;
