const EmpleadoService = require('../service/EmpleadoService');

exports.getAll = async (req, res, next) => {
  try {
    const empleados = await EmpleadoService.getAllEmpleados();
    res.status(200).json({
      success: true,
      data: empleados,
      count: empleados.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoService.getEmpleadoById(id);
    res.status(200).json({
      success: true,
      data: empleado
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const empleado = await EmpleadoService.createEmpleado(req.body);
    res.status(201).json({
      success: true,
      message: 'Empleado creado exitosamente',
      data: empleado
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoService.updateEmpleado(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Empleado actualizado exitosamente',
      data: empleado
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoService.partialUpdateEmpleado(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Empleado actualizado parcialmente',
      data: empleado
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await EmpleadoService.deleteEmpleado(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getByPosicion = async (req, res, next) => {
  try {
    const { posicion } = req.params;
    const empleados = await EmpleadoService.getEmpleadosByPosicion(posicion);
    res.status(200).json({
      success: true,
      data: empleados,
      count: empleados.length
    });
  } catch (error) {
    next(error);
  }
};
