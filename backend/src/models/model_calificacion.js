import con from './server.js';
import mysql from 'mysql2';

// Crear la conexión
const connection = mysql.createConnection(con);

//Crear el objeto comentarios
const calificacion = {};

/*
    const comentariosData = {
        id_comentario:0,
        id_evento:0,
        id_usuario:0,
        calificacion:""
    }
*/ 

calificacion.getCalificacion = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM calificacion', (err, rows) => {
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

calificacion.getPromedio = (comentariosData,callback) => {
    if (connection) {
        connection.query('SELECT SUM(calificacion)/count(*) as promedio, count(*) as votantes FROM calificacion WHERE id_evento = '+comentariosData.id, (err, rows) => {
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

calificacion.getCalificacionJ = (comentariosData,callback) => {
    if (connection) {
        connection.query('SELECT id_calificacion as Id, eventos.id_evento ,nombre_evento as Evento, usuario as Usuario, calificacion as Calificaciones from calificacion INNER JOIN eventos ON calificacion.id_evento = eventos.id_evento JOIN usuarios ON calificacion.id_usuario = usuarios.id_usuario WHERE calificacion.id_evento = ' + comentariosData.id, (err, rows) => {
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

calificacion.insertCalificacion = (comentariosData, callback) =>{
    if (connection){
        connection.query('INSERT INTO calificacion SET ?', comentariosData, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, result.insertId);
            }
        });
    }    
};

calificacion.updateCalificacion = (comentariosData,callback) => {
    if (connection){    
        var update = 'UPDATE calificacion SET calificacion = ' + connection.escape(comentariosData.calificacion) + 'WHERE id_calificacion = ' + comentariosData.id_calificacion;
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

calificacion.deleteCalificacion = (comentariosData,callback) => {
    if (connection){
        var deleteC = 'DELETE FROM calificacion WHERE id_calificacion = ' + connection.escape(comentariosData.id_calificacion);
        connection.query(deleteC, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, {"mensaje":"Calificacion Eliminado"});
            }
        });
    }       
}


export default calificacion;