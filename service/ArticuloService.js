const Articulo = require('../models/Articulo');

class ArticuloService {
  static async getAllArticulos() {
    return await Articulo.getAll();
  }

  static async getArticuloById(id) {
    const articulo = await Articulo.getById(id);
    if (!articulo) {
      throw { statusCode: 404, message: 'Artículo no encontrado' };
    }
    return articulo;
  }

  static async createArticulo(data) {
    const { marca, modelo, descripcion, precioCompra, precioVenta, existencia, stockMinimo, stockMaximo, idProveedor, idAlmacen } = data;
    
    if (!marca || !modelo || !descripcion || !precioCompra || !precioVenta || existencia === undefined) {
      throw { statusCode: 400, message: 'Faltan campos requeridos' };
    }
    
    if (precioCompra < 0 || precioVenta < 0 || existencia < 0) {
      throw { statusCode: 400, message: 'Los precios y existencia no pueden ser negativos' };
    }

    const id = await Articulo.create(data);
    return { idArticulo: id, ...data };
  }

  static async updateArticulo(id, data) {
    await this.getArticuloById(id); // Verifica que exista
    
    const affectedRows = await Articulo.update(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el artículo' };
    }
    
    return await this.getArticuloById(id);
  }

  static async partialUpdateArticulo(id, data) {
    await this.getArticuloById(id);
    
    const affectedRows = await Articulo.partialUpdate(id, data);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo actualizar el artículo' };
    }
    
    return await this.getArticuloById(id);
  }

  static async deleteArticulo(id) {
    await this.getArticuloById(id);
    
    const affectedRows = await Articulo.delete(id);
    if (affectedRows === 0) {
      throw { statusCode: 500, message: 'No se pudo eliminar el artículo' };
    }
    
    return { message: 'Artículo eliminado exitosamente' };
  }

  static async getArticulosByProveedor(idProveedor) {
    return await Articulo.getByProveedor(idProveedor);
  }

  static async getArticulosByAlmacen(idAlmacen) {
    return await Articulo.getByAlmacen(idAlmacen);
  }

  static async getArticulosPorStock() {
    const articulos = await Articulo.getAll();
    return articulos.filter(a => a.stock < 10).sort((a, b) => a.stock - b.stock);
  }
}

module.exports = ArticuloService;
