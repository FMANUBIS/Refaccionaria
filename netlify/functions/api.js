// netlify/functions/api.js
// Este archivo adapta tu API Express para correr como Netlify Function serverless

const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();

// Importar controladores
const almacenController    = require('../../controller/almacenController');
const articuloController   = require('../../controller/articuloController');
const clienteController    = require('../../controller/clienteController');
const empleadoController   = require('../../controller/empleadoController');
const proveedorController  = require('../../controller/proveedorController');
const ventaController      = require('../../controller/ventaController');
const detalleVentaController = require('../../controller/detalleVentaController');
const Usuario              = require('../../models/Usuario');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS — permite que cualquier frontend consulte la API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ─── RUTAS BASE ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🔧 API Refaccionaria corriendo en Netlify Functions',
    version: '1.0.0',
    endpoints: [
      '/api/articulos', '/api/clientes', '/api/empleados',
      '/api/proveedores', '/api/almacenes', '/api/ventas',
      '/api/detalle-ventas', '/api/auth'
    ]
  });
});

// ─── ARTÍCULOS ───────────────────────────────────────────────────────────────
app.get('/api/articulos',                         articuloController.getAll);
app.get('/api/articulos/bajo-stock/lista',        articuloController.getBajoStock);
app.get('/api/articulos/proveedor/:id_proveedor', articuloController.getByProveedor);
app.get('/api/articulos/almacen/:id_almacen',     articuloController.getByAlmacen);
app.get('/api/articulos/:id',                     articuloController.getById);
app.post('/api/articulos',                        articuloController.create);
app.put('/api/articulos/:id',                     articuloController.update);
app.patch('/api/articulos/:id',                   articuloController.partialUpdate);
app.delete('/api/articulos/:id',                  articuloController.delete);

// ─── CLIENTES ────────────────────────────────────────────────────────────────
app.get('/api/clientes',                clienteController.getAll);
app.get('/api/clientes/email/:email',   clienteController.getByEmail);
app.get('/api/clientes/:id',            clienteController.getById);
app.post('/api/clientes',               clienteController.create);
app.put('/api/clientes/:id',            clienteController.update);
app.patch('/api/clientes/:id',          clienteController.partialUpdate);
app.delete('/api/clientes/:id',         clienteController.delete);

// ─── EMPLEADOS ───────────────────────────────────────────────────────────────
app.get('/api/empleados',                    empleadoController.getAll);
app.get('/api/empleados/posicion/:posicion', empleadoController.getByPosicion);
app.get('/api/empleados/:id',                empleadoController.getById);
app.post('/api/empleados',                   empleadoController.create);
app.put('/api/empleados/:id',                empleadoController.update);
app.patch('/api/empleados/:id',              empleadoController.partialUpdate);
app.delete('/api/empleados/:id',             empleadoController.delete);

// ─── PROVEEDORES ─────────────────────────────────────────────────────────────
app.get('/api/proveedores',                proveedorController.getAll);
app.get('/api/proveedores/email/:email',   proveedorController.getByEmail);
app.get('/api/proveedores/:id',            proveedorController.getById);
app.post('/api/proveedores',               proveedorController.create);
app.put('/api/proveedores/:id',            proveedorController.update);
app.patch('/api/proveedores/:id',          proveedorController.partialUpdate);
app.delete('/api/proveedores/:id',         proveedorController.delete);

// ─── ALMACENES ───────────────────────────────────────────────────────────────
app.get('/api/almacenes',       almacenController.getAll);
app.get('/api/almacenes/:id',   almacenController.getById);
app.post('/api/almacenes',      almacenController.create);
app.put('/api/almacenes/:id',   almacenController.update);
app.patch('/api/almacenes/:id', almacenController.partialUpdate);
app.delete('/api/almacenes/:id', almacenController.delete);

// ─── VENTAS ──────────────────────────────────────────────────────────────────
app.get('/api/ventas',                        ventaController.getAll);
app.get('/api/ventas/fecha/rango',            ventaController.getVentasPorFecha);
app.get('/api/ventas/cliente/:id_cliente',    ventaController.getByCliente);
app.get('/api/ventas/empleado/:id_empleado',  ventaController.getByEmpleado);
app.get('/api/ventas/:id',                    ventaController.getById);
app.post('/api/ventas',                       ventaController.create);
app.put('/api/ventas/:id',                    ventaController.update);
app.patch('/api/ventas/:id',                  ventaController.partialUpdate);
app.delete('/api/ventas/:id',                 ventaController.delete);

// ─── DETALLE VENTAS ──────────────────────────────────────────────────────────
app.get('/api/detalle-ventas',                         detalleVentaController.getAll);
app.get('/api/detalle-ventas/venta/:id_venta',         detalleVentaController.getByVenta);
app.get('/api/detalle-ventas/articulo/:id_articulo',   detalleVentaController.getByArticulo);
app.get('/api/detalle-ventas/:id',                     detalleVentaController.getById);
app.post('/api/detalle-ventas',                        detalleVentaController.create);
app.put('/api/detalle-ventas/:id',                     detalleVentaController.update);
app.patch('/api/detalle-ventas/:id',                   detalleVentaController.partialUpdate);
app.delete('/api/detalle-ventas/:id',                  detalleVentaController.delete);

// ─── AUTH ────────────────────────────────────────────────────────────────────
const ADMIN_EMAILS = ['admin@autopartes.mx', 'carlosdiaz@admin.com'];
const isAdminEmail = (email) => {
  if (!email) return false;
  const lower = email.toLowerCase();
  return ADMIN_EMAILS.includes(lower) || lower.endsWith('@admin.com');
};

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ success: false, message: 'Nombre, correo y contraseña son obligatorios.' });

    const existing = await Usuario.getByEmail(email);
    if (existing)
      return res.status(409).json({ success: false, message: 'El correo ya está registrado.' });

    const role = isAdminEmail(email) ? 'admin' : 'usuario';
    const insertId = await Usuario.create({ nombre, email, password, role });

    res.status(201).json({ success: true, user: { idUsuario: insertId, nombre, email, role } });
  } catch (error) { next(error); }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Correo y contraseña son obligatorios.' });

    const user = await Usuario.getByEmail(email);
    if (!user || !Usuario.verifyPassword(password, user.passwordHash))
      return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos.' });

    res.status(200).json({
      success: true,
      user: { idUsuario: user.idUsuario, nombre: user.nombre, email: user.email, role: user.role }
    });
  } catch (error) { next(error); }
});

// ─── MANEJO DE ERRORES ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta no encontrada: ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  res.status(status).json({ success: false, message: err.message || 'Error interno del servidor' });
});

// Exportar como Netlify Function
module.exports.handler = serverless(app);
