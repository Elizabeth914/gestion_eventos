import con from './server.js';
import mysql from 'mysql2';

// Crear la conexión
const connection = mysql.createConnection(con);

//Crear el objeto comentarios
const comentarios = {};

/*
    const comentariosData = {
        id_comentario:0,
        id_evento:0,
        id_usuario:0,
        comentario:""
    }
*/ 

comentarios.getComentarios = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM comentarios', (err, rows) => {
            if (err) {
                console.error('Error al realizar la consulta: ', err);
                callback(err, null); // Devolver el error al callback
                return;
            }
            //console.log('Resultados: ', rows);
            callback(null, rows); // Devolver los datos al callback
        });
    } else {
        callback(new Error('No se pudo establecer la conexión'), null);
    } 
};

comentarios.getComentariosJ = (comentariosData,callback) => {
    if (connection) {
        connection.query('SELECT id_comentario as Id, eventos.id_evento,nombre_evento as Evento, usuario as Usuario, comentario as Comentario from comentarios INNER JOIN eventos ON comentarios.id_evento = eventos.id_evento JOIN usuarios ON comentarios.id_usuario = usuarios.id_usuario WHERE eventos.id_evento = ' + comentariosData.id, (err, rows) => {
            if (err) {
                console.error('Error al realizar la consulta: ', err);
                callback(err, null); // Devolver el error al callback
                return;
            }
            //console.log('Resultados: ', rows);
            callback(null, rows); // Devolver los datos al callback
        });
    } else {
        callback(new Error('No se pudo establecer la conexión'), null);
    } 
};

comentarios.insertComentarios = (comentariosData, callback) =>{
    if (connection){
        connection.query('INSERT INTO comentarios SET ?', comentariosData, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, result.insertId);
            }
        });
    }    
};

comentarios.updateComentarios = (comentariosData,callback) => {
    if (connection){    
        var update = 'UPDATE comentarios SET comentario = ' + connection.escape(comentariosData.comentario) + 'WHERE id_comentario = ' + comentariosData.id_comentario;
        connection.query(update, function(error, result){
            if(error){
                console.log("Error:" + error);
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, {"mensaje":"Actualizado"});
            }        
        });
    }    
};

comentarios.deleteComentario = (comentariosData,callback) => {
    if (connection){
        var deleteC = 'DELETE FROM comentarios WHERE id_comentario = ' + connection.escape(comentariosData.id_comentario);
        connection.query(deleteC, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, {"mensaje":"Usuario Eliminado"});
            }
        });
    }       
}


export default comentarios;