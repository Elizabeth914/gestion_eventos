import con from './server.js';
import mysql from 'mysql2';

const connection = mysql.createConnection(con);

const asistencia ={};

/*
    const asistenciaData = {
        id_asistencia: 0,
        id_evento: 0,
        id_usuario: 0
    }
*/

asistencia.getAsistencia = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM asistencia', (err, rows) => {
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
}

asistencia.getAsistenciaU = (asistenciaData,callback) => {
    if (connection) {
        connection.query('SELECT usuario FROM asistencia INNER JOIN usuarios ON usuarios.id_usuario = asistencia.id_usuario WHERE id_evento = ' + asistenciaData.id, (err, rows) => {
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
}

asistencia.insertAsistencia = (asistenciaData,callback) =>{
    if (connection){
        connection.query('INSERT INTO asistencia SET ?', asistenciaData, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, result.insertId);
            }
        });
    } 
}

asistencia.deleteAsistencia = (asistenciaData,callback) => {
    if (connection){
        var deleteU = 'DELETE FROM asistencia WHERE id_usuario = ' + connection.escape(asistenciaData.id_usuario) +' AND id_evento = ' + connection.escape(asistenciaData.id_evento);
        connection.query(deleteU, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, {"mensaje":"Usuario Eliminado"});
            }
        });
    } 
}

export default asistencia;