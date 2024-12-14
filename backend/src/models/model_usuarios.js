import con from './server.js';
import mysql from 'mysql2';

// Crear la conexión
const connection = mysql.createConnection(con);

// Crear el objeto usuarios
const usuarios = {};
/*const usuarioData = {
    id_usuario: 0,
    usuario: "",
    correo: "",
    contrasena: "",
    direccion: "",
    telefono: "",
    tipo_usuario:
}*/
// Definir el método getUsuarios
usuarios.getUsuarios = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM usuarios', (err, rows) => {
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

usuarios.getUsuarioId = (usuarioData,callback) => {
    if (connection) {
        connection.query("SELECT * FROM usuarios WHERE correo = '" + usuarioData.correo + "'", (err, rows) => {
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

usuarios.insertUsuarios = (usuarioData,callback) => {
    if (connection){
        connection.query('INSERT INTO usuarios SET ?', usuarioData, function(error, result){
            if(error){
                throw error;
            }else{
                //devolvemos el id del usuario insertado
                callback(null, result.insertId);
            }
        });
    }
}

usuarios.updateUsuarios = (usuarioData,callback) =>{
    if (connection){    
        var update = 'UPDATE usuarios SET usuario = ' + connection.escape(usuarioData.usuario) + ',correo=' + connection.escape(usuarioData.correo) + ',contrasena=' + connection.escape(usuarioData.contrasena) + ',direccion=' + connection.escape(usuarioData.direccion) + ',telefono=' + connection.escape(usuarioData.telefono) + 'WHERE id_usuario = ' + usuarioData.id_usuario;
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

usuarios.deleteUsuarios = (usuarioData, callback) =>{
    if (connection){
        var deleteU = 'DELETE FROM usuarios WHERE id_usuario = ' + connection.escape(usuarioData.id_usuario);
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

usuarios.getUsuariosJoin = (callback) => {
    if (connection) {
        connection.query('select id_usuario as Id, usuario as Usuario,correo as Correo, tipo as Rol from usuarios INNER JOIN tipo_usuario ON usuarios.tipo_usuario = tipo_usuario.id_tipo;', (err, rows) => {
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

usuarios.getUsuariosJoinId = (usuarioData,callback) => {
    if (connection) {
        connection.query("select id_usuario as Id, usuario as Usuario,correo as Correo, tipo as Rol from usuarios INNER JOIN tipo_usuario ON usuarios.tipo_usuario = tipo_usuario.id_tipo WHERE usuarios.correo = '"+ usuarioData.correo +"'", (err, rows) => {
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
// Exportar el objeto usuarios
export default usuarios;