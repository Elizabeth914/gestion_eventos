import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index.js';
import usuarios from './routes/route_usuarios.js';
import eventos from './routes/route_eventos.js';
import comentarios from './routes/route_comentarios.js'
import calificacion from './routes/route_calificacion.js';
import asistencia from './routes/route_asistencia.js'
const app = express();


app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);
app.use(morgan('dev'))
app.use(bodyParser.json());

app.use(indexRoutes);
app.use(usuarios);//Acceder al Endpoint para usuarios
app.use(eventos);//Acceder al Endpoint para eventos
app.use(comentarios);//Acceder al Endpoint para comentarios
app.use(calificacion);//Acceder al Endpoint para calificacion
app.use(asistencia);//Acceder al Endpoint para asistencia

app.listen(app.get('port'),()=>{
    console.log(`Server Listening on port ${app.get('port')}`);
});
