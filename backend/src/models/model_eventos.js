import con from './server.js';
import mysql from 'mysql2';

// Crear la conexión
const connection = mysql.createConnection(con);

// Crear el objeto eventos
const eventos = {};

/*
const eventosData = {
    id_evento: 0,        
    nombre_evento:"",
    organizador:1,
    detalle:"",
    direccion:"",
    fecha_evento:"",
    hora_inicio:"",
    hora_fin:""
}
*/

eventos.getEventos = (callback) =>{
    if(connection){
        connection.query("SELECT * FROM eventos",(err,rows) => {
            if (err) {
                callback(err,null);
                return;
            }else{
                callback(null, rows);
            }
        });
    }else{
        callback(new Error('No se pudo establecer la conexión'));
    }
}

eventos.getEventosEstadisticas = (callback) =>{
    if(connection){
        connection.query("SELECT e.id_evento,e.nombre_evento,COUNT(a.id_asistencia) AS total_asistentes FROM eventos e LEFT JOIN asistencia a ON e.id_evento = a.id_evento GROUP BY e.id_evento, e.nombre_evento;",(err,rows) => {
            if (err) {
                callback(err,null);
                return;
            }else{
                callback(null, rows);
            }
        });
    }else{
        callback(new Error('No se pudo establecer la conexión'));
    }
}

eventos.getEventoById = (eventosData,callback) =>{
    if(connection){
        connection.query("SELECT * FROM eventos WHERE id_evento = " + eventosData.id,(err,rows) => {
            if (err) {
                callback(err,null);
                return;
            }else{
                callback(null, rows);
            }
        });
    }else{
        callback(new Error('No se pudo establecer la conexión'));
    }
}

eventos.insertEvento = (eventosData, callback) =>{
    if(connection){
        connection.query("INSERT INTO eventos SET ?", eventosData, (err,result) => {
            if (err) {
                callback(err,null);
                console.log(err);
                return;
            }else{
                callback(null, result.insertId);
            }
        });
    }else{
        callback(new Error('No se pudo establecer la conexión'));
    }
}

eventos.uptadeEvento = (eventosData,callback) => {
    if (connection){    
        var update = 'UPDATE eventos SET nombre_evento = ' + connection.escape(eventosData.nombre_evento) + ',organizador=' + connection.escape(eventosData.organizador) + ',detalle=' + connection.escape(eventosData.detalle) + ',direccion=' + connection.escape(eventosData.direccion) + ',fecha_evento=' + connection.escape(eventosData.fecha_evento) + ' ,hora_inicio = '+ connection.escape(eventosData.hora_inicio) +',hora_fin = ' + connection.escape(eventosData.hora_fin) + 'WHERE id_evento = ' + eventosData.id_evento;
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
}

eventos.deleteEvento = (eventosData,callback) =>{
    if (connection){
        var deleteE = 'DELETE FROM eventos WHERE id_evento = ' + connection.escape(eventosData.id_evento);
        connection.query(deleteE, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, {"mensaje":"Usuario Eliminado"});
            }
        });
    }  
}

// Exportar el objeto eventos
export default eventos;