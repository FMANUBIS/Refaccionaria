const db = require('../config/db');

exports.getArticulos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Articulos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener artículos');
  }
};

exports.getEmpleados = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Empleados');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener empleados');
  }
};

exports.getProveedores = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Proveedores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener proveedores');
  }
};

exports.getAlmacenes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Almacenes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener almacenes');
  }
};

exports.getVentas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Ventas');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener ventas');
  }
};

exports.getDetalleVenta = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM DetalleVenta');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener detalle venta');
  }
};

exports.getClientes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Clientes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener clientes');
  }
};
