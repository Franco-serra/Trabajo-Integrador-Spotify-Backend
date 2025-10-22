const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usar las mismas variables de entorno que tu database.js
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectModule: require('mysql2'), // Important: usar mysql2
        port: process.env.DB_PORT || 3306,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        timezone: '-03:00',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Importar modelos
const Artista = require('./Artista')(sequelize, Sequelize);
const Pais = require('./Pais')(sequelize, Sequelize);
const Discografica = require('./Discografica')(sequelize, Sequelize);
const Album = require('./Album')(sequelize, Sequelize);
const Cancion = require('./Cancion')(sequelize, Sequelize);
const Genero = require('./Genero')(sequelize, Sequelize);
const CancionGenero = require('./CancionGenero')(sequelize, Sequelize);
const FormaPago = require('./FormaPago')(sequelize, Sequelize);
const TipoUsuario = require('./TipoUsuario')(sequelize, Sequelize);
const Usuario = require('./Usuario')(sequelize, Sequelize);
const DatosPagoUsuario = require('./DatosPagoUsuario')(sequelize, Sequelize);
const Pago = require('./Pago')(sequelize, Sequelize);
const Playlist = require('./Playlist')(sequelize, Sequelize);
const PlaylistCancion = require('./PlaylistCancion')(sequelize, Sequelize);
const Suscripcion = require('./Suscripcion')(sequelize, Sequelize);

// Definir relaciones
// Artista - Album
Artista.hasMany(Album, { foreignKey: 'artista_id' });
Album.belongsTo(Artista, { foreignKey: 'artista_id' });

// Pais - Discografica
Pais.hasMany(Discografica, { foreignKey: 'pais_id' });
Discografica.belongsTo(Pais, { foreignKey: 'pais_id' });

// Discografica - Album
Discografica.hasMany(Album, { foreignKey: 'discografica_id' });
Album.belongsTo(Discografica, { foreignKey: 'discografica_id' });

// Album - Cancion
Album.hasMany(Cancion, { foreignKey: 'album_id',
    as: 'canciones' });
Cancion.belongsTo(Album, { foreignKey: 'album_id' });

// Cancion - Genero (Muchos a muchos)
Cancion.belongsToMany(Genero, {
    through: CancionGenero,
    foreignKey: 'cancion_id',
    otherKey: 'genero_id'
});
Genero.belongsToMany(Cancion, {
    through: CancionGenero,
    foreignKey: 'genero_id',
    otherKey: 'cancion_id'
});

// Pais - Usuario
Pais.hasMany(Usuario, { foreignKey: 'pais_id' });
Usuario.belongsTo(Pais, { foreignKey: 'pais_id' });

// TipoUsuario - Usuario
TipoUsuario.hasMany(Usuario, { foreignKey: 'tipo_usuario_id' });
Usuario.belongsTo(TipoUsuario, { foreignKey: 'tipo_usuario_id' });

// Usuario - DatosPagoUsuario
Usuario.hasMany(DatosPagoUsuario, { foreignKey: 'usuario_id' });
DatosPagoUsuario.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// FormaPago - DatosPagoUsuario
FormaPago.hasMany(DatosPagoUsuario, { foreignKey: 'forma_pago_id' });
DatosPagoUsuario.belongsTo(FormaPago, { foreignKey: 'forma_pago_id' });

Usuario.hasMany(Pago, { foreignKey: 'usuario_id',as: 'Pagos'});
Pago.belongsTo(Usuario, { foreignKey: 'usuario_id',as: 'Usuario'});

// FormaPago - Pago
FormaPago.hasMany(Pago, { foreignKey: 'forma_pago_id' });
Pago.belongsTo(FormaPago, { foreignKey: 'forma_pago_id' });

// Usuario - Playlist
Usuario.hasMany(Playlist, { foreignKey: 'usuario_id' });
Playlist.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Playlist - Cancion (Muchos a muchos)
Playlist.belongsToMany(Cancion, {
    through: PlaylistCancion,
    foreignKey: 'playlist_id',
    otherKey: 'cancion_id'
});
Cancion.belongsToMany(Playlist, {
    through: PlaylistCancion,
    foreignKey: 'cancion_id',
    otherKey: 'playlist_id'
});

// Usuario - Suscripcion
Usuario.hasMany(Suscripcion, { foreignKey: 'usuario_id' });
Suscripcion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// TipoUsuario - Suscripcion
TipoUsuario.hasMany(Suscripcion, { foreignKey: 'tipo_usuario_id' });
Suscripcion.belongsTo(TipoUsuario, { foreignKey: 'tipo_usuario_id' });

module.exports = {
    sequelize,
    Artista,
    Pais,
    Discografica,
    Album,
    Cancion,
    Genero,
    CancionGenero,
    FormaPago,
    TipoUsuario,
    Usuario,
    DatosPagoUsuario,
    Pago,
    Playlist,
    PlaylistCancion,
    Suscripcion
};