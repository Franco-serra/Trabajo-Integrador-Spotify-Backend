const { Genero } = require('../models')


const createGenero = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                message: 'El nombre del género es requerido'
            });
        }

        const newGenero = await Genero.create({ 
            nombre_genero: nombre.trim() 
        });

        res.status(201).json({
            message: 'Género creado exitosamente',
            genero: newGenero
        });

    } catch (error) {
        console.error('Error al crear género:', error);


        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: 'Ya existe un género con ese nombre'
            });
        }

        res.status(500).json({
            message: 'Error al crear género',
            error: error.message
        });
    }
}

const getAllGeneros = async (req, res) => {
    try {
        const generos =  await Genero.findAll();
        res.status(200).json(generos);
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        res.status(500).json({ message: 'Error al obtener géneros' });
    }
}

module.exports = {
    getAllGeneros,
    createGenero
}