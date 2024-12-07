import { Router } from 'express';
import comentariosModel from '../models/model_comentarios.js';
const router = Router();

router.get('/comentarios', (req, res) => {
    comentariosModel.getComentarios((error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.get('/comentariosJ/:id', (req, res) => {
    const id = req.params; // Obtén el parámetro "id" de la URL
    comentariosModel.getComentariosJ(id,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.post('/comentarios', (req, res) => {
    var comentariosData = {
        id_comentario: 0,
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario,
        comentario: req.body.comentario
    }
    comentariosModel.insertComentarios(comentariosData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Insertado");
    });
});

router.put('/comentarios', (req, res) => {
    var comentariosData = {
        id_comentario: req.body.id_comentario,
        id_evento: req.body.id_evento,
        id_usuario: req.body.id_usuario,
        comentario: req.body.comentario
    }
    comentariosModel.updateComentarios(comentariosData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Actualizado");
    });
});

router.delete('/comentarios', (req, res) => {
    var comentariosData = {
        id_comentario: req.body.id_comentario,
    }
    comentariosModel.deleteComentario(comentariosData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json("Mensaje: Actualizado");
    });
});
export default router;