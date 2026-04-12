const Venta = require('../models/Venta');
const DetalleVenta = require('../models/DetalleVenta');

class VentaService {
  static async getAllVentas() {
    return await Venta.getAll();
  }

  static async getVentaById(id) {
    const venta = await Venta.getById(id);
    if (!venta) {
      throw { statusCode: 404, message: 'Venta no encontrada' };
    }
    const detalles = await DetalleVenta.getByVenta(id);
    return { ...venta, detalles };
  }

  static async createVenta(data) {
    const { idCliente, fecha, total } = data;
    const idEmpleado = data.idEmpleado ? data.idEmpleado : null;
    
    if (idCliente === undefined || total === undefined) {
      throw { statusCode: 400, message: 'Cliente y total son requeridos' };
    }

    if (total < 0) {
      throw { statusCode: 400, message: 'El total no puede ser negativo' };
    }

    const id = await Venta.create({ ...data, idEmpleado });
    return { id, idCliente, idEmpleado, fecha, total, formaPago: data.formaPago };
  }

  static async updateVenta(id, data) {
    await this.getVentaById(id);
    
    if (data.total !== undefined && data.total < 0) {
      throw { statusCode: 400, message: 'El total no puede ser negativo' };
    }

    const affectedRows = await Venta.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar la venta' };
    }
    
    return await this.getVentaById(id);
  }

  static async partialUpdateVenta(id, data) {
    await this.getVentaById(id);
    
    const affectedRows = await Venta.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar la venta' };
    }
    
    return await this.getVentaById(id);
  }

  static async deleteVenta(id) {
    await this.getVentaById(id);
    
    // Eliminar detalles primero
    const detalles = await DetalleVenta.getByVenta(id);
    for (const detalle of detalles) {
      await DetalleVenta.delete(detalle.idDetalle);
    }
    
    const affectedRows = await Venta.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar la venta' };
    }
    
    return { message: 'Venta eliminada exitosamente' };
  }

  static async getVentasByCliente(idCliente) {
    return await Venta.getByCliente(idCliente);
  }

  static async getVentasByEmpleado(idEmpleado) {
    return await Venta.getByEmpleado(idEmpleado);
  }

  static async getVentasPorRango(fechaInicio, fechaFin) {
    const ventas = await Venta.getAll();
    return ventas.filter(v => {
      const fecha = new Date(v.fecha_venta);
      return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
    });
  }
}

module.exports = VentaService;
