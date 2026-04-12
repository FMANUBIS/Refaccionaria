const VentaService = require('../service/VentaService');

exports.getAll = async (req, res, next) => {
  try {
    const ventas = await VentaService.getAllVentas();
    res.status(200).json({
      success: true,
      data: ventas,
      count: ventas.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const venta = await VentaService.getVentaById(id);
    res.status(200).json({
      success: true,
      data: venta
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const venta = await VentaService.createVenta(req.body);
    res.status(201).json({
      success: true,
      message: 'Venta creada exitosamente',
      data: venta
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const venta = await VentaService.updateVenta(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Venta actualizada exitosamente',
      data: venta
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const venta = await VentaService.partialUpdateVenta(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Venta actualizada parcialmente',
      data: venta
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await VentaService.deleteVenta(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getByCliente = async (req, res, next) => {
  try {
    const { id_cliente } = req.params;
    const ventas = await VentaService.getVentasByCliente(id_cliente);
    res.status(200).json({
      success: true,
      data: ventas,
      count: ventas.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getByEmpleado = async (req, res, next) => {
  try {
    const { id_empleado } = req.params;
    const ventas = await VentaService.getVentasByEmpleado(id_empleado);
    res.status(200).json({
      success: true,
      data: ventas,
      count: ventas.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getVentasPorFecha = async (req, res, next) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren parámetros: fechaInicio y fechaFin'
      });
    }
    const ventas = await VentaService.getVentasPorRango(fechaInicio, fechaFin);
    res.status(200).json({
      success: true,
      data: ventas,
      count: ventas.length
    });
  } catch (error) {
    next(error);
  }
};
