import { Router } from 'express';
import asistenciaModel from '../models/model_asistencia.js';
const router = Router();

//Raiz
router.get('/asistencia', (req, res) => {
    asistenciaModel.getAsistencia((error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.get('/asistenciaU/:id', (req, res) => {
    const id = req.params; // Obtén el parámetro "id" de la URL
    asistenciaModel.getAsistenciaU(id,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.post('/asistencia', (req, res) => {
    var asistenciaData = {
        id_usuario: 0,
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario
    }
    asistenciaModel.insertAsistencia(asistenciaData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Insertado");
    });
});

router.delete('/asistencia', (req, res) => {
    var asistenciaData = {
        id_usuario: 0,
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario
    }
    asistenciaModel.deleteAsistencia(asistenciaData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Insertado");
    });
});

export default router;