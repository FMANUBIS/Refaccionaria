const ProveedorService = require('../service/ProveedorService');

exports.getAll = async (req, res, next) => {
  try {
    const proveedores = await ProveedorService.getAllProveedores();
    res.status(200).json({
      success: true,
      data: proveedores,
      count: proveedores.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedor = await ProveedorService.getProveedorById(id);
    res.status(200).json({
      success: true,
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const proveedor = await ProveedorService.createProveedor(req.body);
    res.status(201).json({
      success: true,
      message: 'Proveedor creado exitosamente',
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedor = await ProveedorService.updateProveedor(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Proveedor actualizado exitosamente',
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedor = await ProveedorService.partialUpdateProveedor(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Proveedor actualizado parcialmente',
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProveedorService.deleteProveedor(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const proveedor = await ProveedorService.getProveedorByEmail(email);
    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};
