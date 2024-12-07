import { Router } from 'express';
import calificacionModel from '../models/model_calificacion.js';
const router = Router();

router.get('/calificacion', (req, res) => {
    calificacionModel.getCalificacion((error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.get('/promedio/:id', (req, res) => {
    const id = req.params; // Obtén el parámetro "id" de la URL
    calificacionModel.getPromedio(id,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.get('/calificacionJ/:id', (req, res) => {
    const id = req.params; // Obtén el parámetro "id" de la URL

    calificacionModel.getCalificacionJ(id,(error, data) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        res.status(200).json(data);
    });
});

router.post('/calificacion', (req, res) => {
    var calificacionData = {
        id_calificacion: 0,
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario,
        calificacion: req.body.calificacion
    }
    calificacionModel.insertCalificacion(calificacionData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Insertado");
    });
});

router.put('/calificacion', (req, res) => {
    var calificacionData = {
        id_calificacion: req.body.id_calificacion,
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario,
        comentario: req.body.comentario
    }
    calificacionModel.updateCalificacion(calificacionData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Actualizado");
    });
});

router.delete('/calificacion', (req, res) => {
    var calificacionData = {
        id_calificacion: req.body.id_calificacion,
    }
    calificacionModel.deleteComentario(calificacionData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Actualizado");
    });
});
export default router;