import { Router } from 'express';
import usuariosModel from '../models/model_usuarios.js';
const router = Router();

//Raiz
router.get('/user', (req, res) => {
    usuariosModel.getUsuarios((error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});
router.get('/userJ', (req, res) => {
    usuariosModel.getUsuariosJoin((error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.get('/userJ/:correo', (req, res) => {
    const correo = req.params;
    usuariosModel.getUsuariosJoinId(correo,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.get('/userid/:correo', (req, res) => {
    const correo = req.params; // Obtén el parámetro "id" de la URL
    usuariosModel.getUsuarioId(correo,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(data);
    });
});

router.post('/user', (req, res) => {
    var usuarioData = {
        id_usuario: 0,
        usuario: req.body.usuario,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        tipo_usuario:req.body.tipo_usuario
    }
    usuariosModel.insertUsuarios(usuarioData,(error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error al insertar usuarios' });
        }
        res.status(200).json(data);
    });
});

router.put('/user', (req,res) =>{
    var usuarioData = {
        id_usuario: req.body.id_usuario,
        usuario: req.body.usuario,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        tipo_usuario:req.body.tipo_usuario        
    }
    usuariosModel.updateUsuarios(usuarioData,(error,data) =>{
        //si el usuario se ha actualizado correctamente mostramos un mensaje
        if(data.mensaje){
            res.status(200).json(data);
        }else{
            res.status(500).json({"mensaje":"Error"});
        }
    });
});

router.delete('/user', (req,res) =>{
    var usuarioData = {
        id_usuario:req.body.id_usuario
    }
    usuariosModel.deleteUsuarios(usuarioData,(error,data) =>{
        //si el usuario se ha eliminado correctamente mostramos un mensaje
        if(data.mensaje){
            res.status(200).json(data);
        }else{
            res.status(500).json({"mensaje":"Error"});
        }
    });
});

export default router;