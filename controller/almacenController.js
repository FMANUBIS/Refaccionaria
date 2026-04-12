/* este controlador se encarga de manejar las solicitudes relacionadas con los almacenes, 
como obtener todos los almacenes, obtener un almacén por ID, crear un nuevo almacén,
 actualizar un almacén existente, actualizar parcialmente un almacén y eliminar un almacén.
  Cada función del controlador utiliza el servicio de AlmacenService para realizar las operaciones
   correspondientes y enviar una respuesta JSON con el resultado de la operación. En caso de error,
    se pasa el error al siguiente middleware de manejo de errores utilizando `next(error)`. */
const AlmacenService = require('../service/AlmacenService');

exports.getAll = async (req, res, next) => {
  try {
    const almacenes = await AlmacenService.getAllAlmacenes();
    res.status(200).json({
      success: true,
      data: almacenes,
      count: almacenes.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const almacen = await AlmacenService.getAlmacenById(id);
    res.status(200).json({
      success: true,
      data: almacen
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const almacen = await AlmacenService.createAlmacen(req.body);
    res.status(201).json({
      success: true,
      message: 'Almacén creado exitosamente',
      data: almacen
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const almacen = await AlmacenService.updateAlmacen(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Almacén actualizado exitosamente',
      data: almacen
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const almacen = await AlmacenService.partialUpdateAlmacen(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Almacén actualizado parcialmente',
      data: almacen
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await AlmacenService.deleteAlmacen(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
