const ClienteService = require('../service/ClienteService');

exports.getAll = async (req, res, next) => {
  try {
    const clientes = await ClienteService.getAllClientes();
    res.status(200).json({
      success: true,
      data: clientes,
      count: clientes.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await ClienteService.getClienteById(id);
    res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    next(error);
  }
};

exports.getByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const cliente = await ClienteService.getClienteByEmail(email);
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
    }
    res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const cliente = await ClienteService.createCliente(req.body);
    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: cliente
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await ClienteService.updateCliente(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: cliente
    });
  } catch (error) {
    next(error);
  }
};

exports.partialUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await ClienteService.partialUpdateCliente(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Cliente actualizado parcialmente',
      data: cliente
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ClienteService.deleteCliente(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
