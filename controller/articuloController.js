const ArticuloService = require('../service/ArticuloService');

exports.getAll = async (req, res, next) => {
  try {
    const articulos = await ArticuloService.getAllArticulos();
    res.status(200).json({
      success: true,
      data: articulos,
      count: articulos.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articulo = await ArticuloService.getArticuloById(id);
    res.status(200).json({
      success: true,
      data: articulo
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const articulo = await ArticuloService.createArticulo(req.body);
    res.status(201).json({
      success: true,
      message: 'Artículo creado exitosamente',
      data: articulo
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articulo = await ArticuloService.updateArticulo(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Artículo actualizado exitosamente',
      data: articulo
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articulo = await ArticuloService.partialUpdateArticulo(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Artículo actualizado parcialmente',
      data: articulo
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ArticuloService.deleteArticulo(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getByProveedor = async (req, res, next) => {
  try {
    const { id_proveedor } = req.params;
    const articulos = await ArticuloService.getArticulosByProveedor(id_proveedor);
    res.status(200).json({
      success: true,
      data: articulos,
      count: articulos.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getByAlmacen = async (req, res, next) => {
  try {
    const { id_almacen } = req.params;
    const articulos = await ArticuloService.getArticulosByAlmacen(id_almacen);
    res.status(200).json({
      success: true,
      data: articulos,
      count: articulos.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getBajoStock = async (req, res, next) => {
  try {
    const articulos = await ArticuloService.getArticulosPorStock();
    res.status(200).json({
      success: true,
      message: 'Artículos con bajo stock (< 10)',
      data: articulos,
      count: articulos.length
    });
  } catch (error) {
    next(error);
  }
};
