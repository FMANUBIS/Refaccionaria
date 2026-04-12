const DetalleVentaService = require('../service/DetalleVentaService');

exports.getAll = async (req, res, next) => {
  try {
    const detalles = await DetalleVentaService.getAllDetalles();
    res.status(200).json({
      success: true,
      data: detalles,
      count: detalles.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detalle = await DetalleVentaService.getDetalleById(id);
    res.status(200).json({
      success: true,
      data: detalle
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const detalle = await DetalleVentaService.createDetalle(req.body);
    res.status(201).json({
      success: true,
      message: 'Detalle creado exitosamente',
      data: detalle
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detalle = await DetalleVentaService.updateDetalle(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Detalle actualizado exitosamente',
      data: detalle
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detalle = await DetalleVentaService.partialUpdateDetalle(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Detalle actualizado parcialmente',
      data: detalle
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await DetalleVentaService.deleteDetalle(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getByVenta = async (req, res, next) => {
  try {
    const { id_venta } = req.params;
    const detalles = await DetalleVentaService.getDetallesByVenta(id_venta);
    res.status(200).json({
      success: true,
      data: detalles,
      count: detalles.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getByArticulo = async (req, res, next) => {
  try {
    const { id_articulo } = req.params;
    const detalles = await DetalleVentaService.getDetallesByArticulo(id_articulo);
    res.status(200).json({
      success: true,
      data: detalles,
      count: detalles.length
    });
  } catch (error) {
    next(error);
  }
};
