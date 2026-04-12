# 🔧 API Refaccionaria — Netlify Functions

API REST adaptada para correr en Netlify Functions (serverless).

---

## 📁 Estructura del proyecto

```
refaccionaria-netlify/
├── netlify/
│   └── functions/
│       └── api.js          ← Función principal (toda la API aquí)
├── config/
│   └── db.js               ← Conexión a MySQL
├── models/                 ← Modelos de la BD
├── service/                ← Lógica de negocio
├── controller/             ← Controladores
├── public/
│   └── index.html          ← Página de inicio
├── netlify.toml            ← Configuración de Netlify
├── package.json
├── .gitignore
└── .env.example
```

---

## 🚀 Pasos para subir a Netlify

### 1. Base de datos en la nube
Tu MySQL está en `127.0.0.1` (local), Netlify no puede conectarse a eso.
Necesitas una base de datos MySQL accesible desde internet. Opciones gratuitas:

- **FreeSQLDatabase.com** → https://www.freesqldatabase.com (gratis, fácil)
- **Railway.app** → https://railway.app (gratis con límite mensual)
- **PlanetScale** → https://planetscale.com

Crea tu base de datos en cualquiera de ellos y apunta los datos de conexión.

### 2. Subir código a GitHub

```bash
git init
git add .
git commit -m "API Refaccionaria para Netlify"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/refaccionaria-api.git
git push -u origin main
```

### 3. Conectar con Netlify

1. Entra a https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** y elige tu repositorio
4. Configuración del deploy:
   - **Build command:** `npm install`
   - **Publish directory:** `public`
5. Click **"Deploy site"**

### 4. Configurar variables de entorno en Netlify

1. Ve a **Site settings** → **Environment variables**
2. Agrega estas variables con los datos de tu BD en la nube:

| Variable      | Valor                        |
|---------------|------------------------------|
| DB_HOST       | host de tu BD en la nube     |
| DB_USER       | usuario de tu BD             |
| DB_PASSWORD   | contraseña de tu BD          |
| DB_NAME       | api_examen                   |
| DB_PORT       | 3306                         |

3. Haz un nuevo deploy desde **Deploys** → **Trigger deploy**

---

## 🌐 Cómo se llaman los endpoints en Netlify

Una vez desplegado, tus endpoints quedan así:

```
https://TU-SITIO.netlify.app/api/articulos
https://TU-SITIO.netlify.app/api/clientes
https://TU-SITIO.netlify.app/api/empleados
... etc
```

---

## ⚠️ Importante

- **No subas el archivo `.env`** — las credenciales van en Netlify como variables de entorno.
- La carpeta `node_modules/` ya está en `.gitignore`, Netlify la instala sola.
