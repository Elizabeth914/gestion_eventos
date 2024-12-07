import { Router } from 'express';
import eventosModel from '../models/model_eventos.js';
const router = Router();

router.get('/eventos', (req,res)=>{
    eventosModel.getEventos((error,data) => {
        if(error){
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

// Ruta para obtener un evento por ID
router.get('/eventos/:id', (req, res) => {
    const id = req.params; // Obtén el parámetro "id" de la URL

    eventosModel.getEventoById(id, (error, data) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        if (!data) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.status(200).json(data);
    });
});

router.post('/eventos', (req,res) => {
    var eventosData = {
        id_evento: 0,        
        nombre_evento: req.body.nombre_evento,
        organizador: req.body.organizador,
        detalle: req.body.detalle,
        direccion: req.body.direccion,
        fecha_evento: req.body.fecha_evento,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin
    }
    eventosModel.insertEvento(eventosData, (error,data) => {
        if(error){
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.put('/eventos', (req,res) => {
    var eventosData = {
        id_evento: req.body.id_evento,        
        nombre_evento: req.body.nombre_evento,
        organizador: req.body.organizador,
        detalle: req.body.detalle,
        direccion: req.body.direccion,
        fecha_evento: req.body.fecha_evento,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin
    }
    eventosModel.uptadeEvento(eventosData, (error,data) => {
        if(error){
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.delete('/eventos', (req,res) =>{
    var eventoData = {
        id_evento:req.body.id_evento
    }
    eventosModel.deleteEvento(eventoData,(error,data) =>{
        //si el usuario se ha eliminado correctamente mostramos un mensaje
        if(data.mensaje){
            res.status(200).json(data);
        }else{
            res.status(500).json({"mensaje":"Error"});
        }
    });
});
export default router;