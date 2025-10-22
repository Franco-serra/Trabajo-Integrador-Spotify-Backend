# 🎵 Documentación - Trabajo Integrador Spotify Backend

## 📋 Índice
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Modelo de Datos](#modelo-de-datos)
5. [API REST - Endpoints](#api-rest---endpoints)
6. [Instalación y Configuración](#instalación-y-configuración)
7. [Uso de la API](#uso-de-la-api)
8. [Ejercicios Adicionales](#ejercicios-adicionales)
9. [Validaciones y Seguridad](#validaciones-y-seguridad)
10. [Testing](#testing)
11. [Despliegue](#despliegue)

---

## 📖 Descripción del Proyecto

**Spotify Backend** es una API REST completa para una plataforma de streaming musical desarrollada con **Node.js**, **Express** y **MySQL**. El proyecto implementa un modelo relacional robusto que simula las funcionalidades principales de Spotify, incluyendo gestión de usuarios, artistas, álbumes, canciones, playlists, suscripciones y pagos.

### 🎯 Objetivos del Proyecto
- Implementar un modelo de datos relacional correcto y normalizado
- Desarrollar endpoints REST bien documentados y validados
- Aplicar buenas prácticas de seguridad (hasheo de contraseñas, validaciones)
- Implementar consultas complejas con JOINs para análisis de datos
- Manejar errores de forma consistente y profesional

### ✨ Características Principales
- **Autenticación segura** con bcrypt para hasheo de contraseñas
- **Modelo relacional completo** con 15+ entidades interconectadas
- **API RESTful** con 40+ endpoints documentados
- **Validaciones robustas** para prevenir errores comunes
- **Consultas avanzadas** con JOINs complejos para análisis
- **Soft delete** para playlists y usuarios
- **Manejo de pagos** con métodos seguros (tarjetas enmascaradas)

---

## 🏗️ Arquitectura y Tecnologías

### Stack Tecnológico
- **Backend**: Node.js + Express.js
- **Base de Datos**: MySQL 8.0+
- **ORM**: Sequelize
- **Autenticación**: bcrypt
- **Validación**: Express validators
- **Documentación**: Swagger/OpenAPI
- **Testing**: REST Client (VS Code)

### Arquitectura del Sistema
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   Database      │
│   (Cliente)     │◄──►│   (Express)     │◄──►│   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Controllers   │
                       │   (Lógica)      │
                       └─────────────────┘
```

### Patrones de Diseño Implementados
- **MVC (Model-View-Controller)**: Separación clara de responsabilidades
- **Repository Pattern**: Abstracción de acceso a datos con Sequelize
- **Middleware Pattern**: Manejo de requests y responses
- **Error Handling**: Manejo centralizado de errores

---

## 📁 Estructura del Proyecto

```
Trabajo-Integrador-Spotify-Backend/
├── 📄 package.json              # Dependencias y scripts
├── 📄 server.js                 # Punto de entrada del servidor
├── 📄 api.http                  # Archivo de pruebas REST Client
├── 📄 env.example               # Variables de entorno de ejemplo
├── 📄 readme.md                 # Documentación original
├── 📄 DOCUMENTACION.md          # Esta documentación
├── 📁 src/
│   ├── 📄 app.js                # Configuración de Express
│   ├── 📁 config/
│   │   └── 📄 database.js       # Configuración de MySQL
│   ├── 📁 models/               # Modelos Sequelize (15 archivos)
│   │   ├── 📄 index.js          # Configuración de relaciones
│   │   ├── 📄 Usuario.js        # Modelo de usuarios
│   │   ├── 📄 Artista.js        # Modelo de artistas
│   │   ├── 📄 Album.js          # Modelo de álbumes
│   │   ├── 📄 Cancion.js        # Modelo de canciones
│   │   ├── 📄 Playlist.js       # Modelo de playlists
│   │   ├── 📄 Suscripcion.js    # Modelo de suscripciones
│   │   ├── 📄 Pago.js           # Modelo de pagos
│   │   └── ...                  # Otros modelos
│   ├── 📁 controllers/          # Controladores (10 archivos)
│   │   ├── 📄 usuariosController.js
│   │   ├── 📄 artistasController.js
│   │   ├── 📄 albumesController.js
│   │   ├── 📄 cancionesController.js
│   │   ├── 📄 playlistsController.js
│   │   ├── 📄 suscripcionesController.js
│   │   ├── 📄 pagosController.js
│   │   └── 📄 vistasController.js
│   ├── 📁 routes/               # Rutas de la API (10 archivos)
│   │   ├── 📄 index.js          # Router principal
│   │   ├── 📄 usuarios.js
│   │   ├── 📄 artistas.js
│   │   ├── 📄 albumes.js
│   │   ├── 📄 canciones.js
│   │   ├── 📄 playlists.js
│   │   ├── 📄 suscripciones.js
│   │   ├── 📄 pagos.js
│   │   └── 📄 vistas.js
│   ├── 📁 data/                 # Datos de prueba
│   │   ├── 📄 Datos_Spotify.json
│   │   └── 📄 Datos_Spotify.xlsx
│   ├── 📁 docs/                 # Documentación adicional
│   │   └── 📄 swagger.yaml
│   └── 📁 SQL/                  # Scripts SQL
│       ├── 📄 spotyfy-2.0.sql
│       └── 📄 spotyfy-2.0.png
└── 📁 node_modules/             # Dependencias
```

---

## 🗄️ Modelo de Datos

### Entidades Principales

#### 👤 Usuarios
- **usuario**: Información personal, credenciales, ubicación
- **pais**: Países disponibles
- **tipo_usuario**: Tipos de suscripción (free, standard, premium)

#### 🎵 Contenido Musical
- **artista**: Información de artistas
- **discografica**: Discográficas y sellos
- **album**: Álbumes musicales
- **cancion**: Canciones individuales
- **genero**: Géneros musicales
- **cancion_genero**: Relación N:M entre canciones y géneros

#### 📋 Playlists y Reproducción
- **playlist**: Playlists de usuarios
- **playlist_cancion**: Relación N:M entre playlists y canciones

#### 💳 Suscripciones y Pagos
- **suscripcion**: Suscripciones de usuarios
- **metodo_pago**: Métodos de pago de usuarios
- **pago**: Registro de pagos realizados

### Diagrama de Relaciones
```
Usuario ──┐
          ├── Playlist ──┐
          │              ├── PlaylistCancion ── Cancion
          │              └── Suscripcion
          │
          ├── DatosPagoUsuario ── Pago
          │
          └── Pais

Cancion ──┐
          ├── Album ──┐
          │          ├── Artista
          │          └── Discografica ── Pais
          │
          └── CancionGenero ── Genero
```

### Constraints y Validaciones
- **Email único** en usuarios
- **Duración en segundos** (INT) para canciones
- **UNIQUE (artista, título)** para álbumes
- **Soft delete** coherente en playlists
- **Tarjetas enmascaradas** sin CVC
- **Fechas válidas** en suscripciones

---

## 🌐 API REST - Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### 📊 Resumen de Endpoints

| Recurso | GET | POST | PUT | DELETE | Total |
|---------|-----|------|-----|--------|-------|
| Usuarios | 3 | 1 | 1 | 1 | 6 |
| Artistas | 2 | 1 | 0 | 0 | 3 |
| Álbumes | 3 | 1 | 0 | 0 | 4 |
| Canciones | 2 | 1 | 1 | 1 | 5 |
| Géneros | 1 | 1 | 0 | 0 | 2 |
| Playlists | 2 | 1 | 1 | 1 | 5 |
| Suscripciones | 1 | 1 | 0 | 0 | 2 |
| Métodos de Pago | 1 | 1 | 0 | 0 | 2 |
| Pagos | 1 | 1 | 0 | 0 | 2 |
| Vistas | 2 | 0 | 0 | 0 | 2 |
| **TOTAL** | **18** | **9** | **3** | **3** | **33** |

### 🔍 Endpoints Detallados

#### 👤 Usuarios (`/usuarios`)
```http
GET    /usuarios                    # Listar usuarios (paginado)
GET    /usuarios/:id                # Obtener usuario por ID
GET    /usuarios/password-vencidas  # Usuarios con password >90 días
POST   /usuarios                    # Crear usuario
PUT    /usuarios/:id                # Actualizar usuario
DELETE /usuarios/:id                # Eliminar usuario (soft delete)
PUT    /usuarios/restore/:id        # Restaurar usuario eliminado
```

#### 🎤 Artistas (`/artistas`)
```http
GET    /artistas                    # Listar artistas
GET    /artistas/:id                # Obtener artista por ID
GET    /artistas/paginados          # Listar con paginación
POST   /artistas                    # Crear artista
```

#### 💿 Álbumes (`/albumes`)
```http
GET    /albumes                     # Listar álbumes
GET    /albumes/:id                 # Obtener álbum por ID
GET    /albumes/artista/:id         # Álbumes por artista
GET    /albumes/:id/canciones       # Canciones de un álbum
POST   /albumes                     # Crear álbum
```

#### 🎵 Canciones (`/canciones`)
```http
GET    /canciones                   # Listar canciones (con filtros)
GET    /canciones/:id               # Obtener canción por ID
POST   /canciones                   # Crear canción
PUT    /canciones/:id               # Actualizar canción
POST   /canciones/:id/generos       # Asociar género a canción
DELETE /canciones/:id/generos/:id  # Desasociar género de canción
```

#### 🎼 Géneros (`/generos`)
```http
GET    /generos                     # Listar géneros
POST   /generos                     # Crear género
```

#### 📋 Playlists (`/playlists`)
```http
GET    /playlists                   # Listar playlists
GET    /playlists/:id               # Obtener playlist por ID
POST   /playlists                   # Crear playlist
PUT    /playlists/:id               # Actualizar playlist
POST   /playlists/:id/canciones     # Agregar canción a playlist
DELETE /playlists/:id/canciones/:id # Quitar canción de playlist
```

#### 💳 Suscripciones (`/suscripciones`)
```http
GET    /suscripciones/:id           # Obtener suscripción por ID
POST   /suscripciones               # Crear suscripción
```

#### 💰 Métodos de Pago (`/metodos-pago`)
```http
GET    /metodos-pago                # Listar métodos de pago
POST   /metodos-pago                # Crear método de pago
```

#### 💸 Pagos (`/pagos`)
```http
GET    /pagos                       # Listar pagos (con filtros)
POST   /pagos                       # Registrar pago
```

#### 📊 Vistas Avanzadas (`/vistas`)
```http
GET    /vistas/canciones-populares-por-pais      # Ejercicio 1
GET    /vistas/ingresos-por-artista-discografica # Ejercicio 2
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos
- **Node.js** 16+ 
- **MySQL** 8.0+
- **npm** o **yarn**

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Franco-Serra/Trabajo-Integrador-Spotify-Backend.git
cd Trabajo-Integrador-Spotify-Backend
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus datos
nano .env
```

**Contenido del archivo `.env`:**
```env
# Base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=spotify
DB_PORT=3306

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Configurar Base de Datos
```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE spotify;
exit

# Ejecutar script SQL
mysql -u tu_usuario -p spotify < src/SQL/spotyfy-2.0.sql
```

### 5. Iniciar el Servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

### 6. Verificar Instalación
```bash
# Test del servidor
curl http://localhost:3000

# Test de base de datos
curl http://localhost:3000/test-db

# Test de modelos
curl http://localhost:3000/models-status
```

---

## 🚀 Uso de la API

### Ejemplos de Uso

#### 1. Crear un Usuario
```http
POST /api/v1/usuarios
Content-Type: application/json

{
  "nombre_completo": "Juan Pérez",
  "email": "juan@example.com",
  "password": "MiPassword123",
  "fecha_nac": "1990-05-15",
  "sexo": "M",
  "cp": "1000",
  "id_pais": 1,
  "tipo_usuario_actual": 1
}
```

#### 2. Crear un Artista
```http
POST /api/v1/artistas
Content-Type: application/json

{
  "nombre_artista": "Coldplay",
  "imagen": "https://example.com/coldplay.jpg"
}
```

#### 3. Crear un Álbum
```http
POST /api/v1/albumes
Content-Type: application/json

{
  "nombre_album": "Parachutes",
  "artista_id": 1,
  "discografica_id": 1,
  "imagen_portada": "https://example.com/parachutes.jpg",
  "anio_lanzamiento": 2000
}
```

#### 4. Crear una Canción
```http
POST /api/v1/canciones
Content-Type: application/json

{
  "nombre_cancion": "Yellow",
  "duracion_min": 266,
  "album_id": 1
}
```

#### 5. Crear una Playlist
```http
POST /api/v1/playlists
Content-Type: application/json

{
  "nombre_playlist": "Mis Favoritas",
  "usuario_id": 1
}
```

### Filtros y Parámetros

#### Paginación
```http
GET /api/v1/usuarios?page=1&limit=10
```

#### Filtros de Canciones
```http
GET /api/v1/canciones?genero=Rock&albumId=1&artistaId=1
```

#### Filtros de Pagos
```http
GET /api/v1/pagos?usuarioId=1&desde=2024-01-01&hasta=2024-12-31
```

### ⚠️ Información Importante sobre IDs

**IMPORTANTE**: Debido a pruebas y desarrollo, los IDs disponibles en la base de datos son:

- **`discografica_id`**: IDs disponibles del **227 al 282** (56 discográficas)
- **`album_id`**: IDs disponibles del **17 al 39** (23 álbumes)

**Ejemplo de uso correcto:**
```http
POST /api/v1/albumes
Content-Type: application/json

{
  "nombre_album": "Mi Nuevo Álbum",
  "artista_id": 1,
  "discografica_id": 231,  // ✅ ID válido (227-282)
  "imagen_portada": "https://example.com/album.jpg",
  "anio_lanzamiento": 2024
}
```

**Ejemplo de uso incorrecto:**
```http
POST /api/v1/albumes
Content-Type: application/json

{
  "nombre_album": "Mi Nuevo Álbum",
  "artista_id": 1,
  "discografica_id": 1,  // ❌ ID no disponible (fuera del rango 227-282)
  "imagen_portada": "https://example.com/album.jpg",
  "anio_lanzamiento": 2024
}
```

**💡 Tip**: Siempre verifica los IDs disponibles antes de crear relaciones. Puedes consultar los IDs existentes con:
```http
GET /api/v1/albumes        # Ver álbumes disponibles
GET /api/v1/artistas       # Ver artistas disponibles
```

---

## 🎯 Ejercicios Adicionales

### Ejercicio 1: Canciones Populares por País
**Endpoint**: `GET /vistas/canciones-populares-por-pais`

**Objetivo**: Mostrar las canciones más reproducidas agrupadas por país de origen de los usuarios.

**Datos incluidos**:
- `nombre_cancion`
- `nombre_artista` 
- `nombre_album`
- `nombre_pais`
- `total_reproducciones`
- `apariciones_en_playlists`

**JOINs requeridos**:
```sql
cancion → album → artista
playlist_cancion → playlist → usuario → pais
```

### Ejercicio 2: Ingresos por Artista y Discográfica
**Endpoint**: `GET /vistas/ingresos-por-artista-discografica`

**Objetivo**: Analizar los ingresos generados por cada combinación artista-discográfica.

**Datos incluidos**:
- `nombre_artista`
- `nombre_discografica`
- `nombre_pais_discografica`
- `total_ingresos`
- `cantidad_suscripciones_activas`
- `total_canciones`
- `promedio_reproducciones`

**JOINs requeridos**:
```sql
pago → suscripcion → usuario → playlist → cancion → album → artista/discografica → pais
```

---

## 🔒 Validaciones y Seguridad

### Validaciones Implementadas

#### ✅ Usuarios
- Email único y obligatorio
- Password mínimo 6 caracteres
- Hasheo con bcrypt (salt rounds: 10)
- Actualización de `fecha_ult_mod_password` al cambiar password

#### ✅ Canciones
- Duración en segundos (INT > 0)
- Validación de álbum existente
- No duplicación de datos

#### ✅ Álbumes
- UNIQUE (artista, título)
- Validación de artista y discográfica existentes

#### ✅ Playlists
- Soft delete coherente
- Si `estado='eliminada'` → `fecha_eliminada` NOT NULL
- Si `estado='activa'` → `fecha_eliminada` NULL

#### ✅ Métodos de Pago
- Sin CVC almacenado
- Tarjeta enmascarada (últimos 4 dígitos)
- Múltiples métodos por usuario

#### ✅ Suscripciones
- `fecha_renovacion > fecha_inicio`
- UNIQUE (usuario, fecha_inicio)

### Códigos de Error
- **400**: Datos faltantes o inválidos
- **401**: No autorizado
- **403**: Prohibido
- **404**: Recurso no encontrado
- **409**: Conflicto de unicidad
- **422**: Estructura semánticamente inválida
- **500**: Error interno del servidor

### Respuestas de Error
```json
{
  "success": false,
  "error": "Descripción del error",
  "details": "Detalles específicos del error"
}
```

---

## 🧪 Testing

### Archivo de Pruebas
El proyecto incluye `api.http` con todas las pruebas necesarias:

```http
### Test básico del servidor
GET http://localhost:3000

### Test de base de datos
GET http://localhost:3000/test-db

### Test de modelos
GET http://localhost:3000/models-status
```

### Casos de Prueba Incluidos

#### ✅ Casos Positivos
- Crear usuarios, artistas, álbumes, canciones
- Listar con filtros y paginación
- Actualizar y eliminar recursos
- Asociar géneros a canciones
- Gestionar playlists y suscripciones

#### ❌ Casos Negativos
- Datos faltantes o inválidos
- Emails duplicados
- Fechas inválidas en suscripciones
- Soft delete sin fecha
- Referencias a recursos inexistentes
- **IDs fuera de rango** (discografica_id fuera de 227-282, album_id fuera de 17-39)

### ⚠️ Consideraciones Importantes para Testing

**Rangos de IDs válidos:**
- **Discográficas**: IDs del 227 al 282
- **Álbumes**: IDs del 17 al 39

**Ejemplos de testing con IDs correctos:**
```http
# ✅ Crear álbum con discográfica válida
POST /api/v1/albumes
{
  "nombre_album": "Test Album",
  "artista_id": 1,
  "discografica_id": 231,  // ID válido (227-282)
  "anio_lanzamiento": 2024
}

# ✅ Agregar canción a álbum válido
POST /api/v1/canciones
{
  "nombre_cancion": "Test Song",
  "duracion_min": 180,
  "album_id": 25  // ID válido (17-39)
}
```

### Ejecutar Pruebas
1. Abrir `api.http` en VS Code
2. Instalar extensión "REST Client"
3. Ejecutar cada request individualmente
4. Verificar respuestas y códigos de estado

---

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
NODE_ENV=production
PORT=3000
DB_HOST=tu-servidor-mysql
DB_USER=usuario-prod
DB_PASSWORD=password-seguro
DB_NAME=spotify_prod
CORS_ORIGIN=https://tu-dominio.com
```

### Scripts de Producción
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Consideraciones de Seguridad
- Usar HTTPS en producción
- Configurar CORS apropiadamente
- Implementar rate limiting
- Monitorear logs de errores
- Backup regular de base de datos

---

## 📚 Recursos Adicionales

### Documentación
- [README original](readme.md)
- [Swagger/OpenAPI](src/docs/swagger.yaml)
- [Scripts SQL](src/SQL/spotyfy-2.0.sql)

### Datos de Prueba
- [Datos JSON](src/data/Datos_Spotify.json)
- [Datos Excel](src/data/Datos_Spotify.xlsx)

### Herramientas Recomendadas
- **VS Code** con extensión REST Client
- **Postman** para testing avanzado
- **MySQL Workbench** para gestión de BD
- **Sequelize CLI** para migraciones

---

## 🤝 Contribución

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: agregar o modificar tests
```

### Flujo de Trabajo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m "feat: agregar nueva funcionalidad"`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Franco Serra**
- GitHub: [@Franco-Serra](https://github.com/Franco-Serra)
- Email: frankmourice28@gmail.com

---

## 🆘 Soporte

Si tienes problemas o preguntas:

1. **Revisa la documentación** en este archivo
2. **Consulta los comentarios** en el código
3. **Usa los datos de prueba** incluidos
4. **Verifica la configuración** de base de datos
5. **Abre un issue** en GitHub

---


