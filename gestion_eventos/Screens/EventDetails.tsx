import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity,FlatList,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchData,postData } from '../models/user_models';

// Para el rating
import { Rating } from 'react-native-ratings';

// Para el tab
import { TabView, TabBar } from 'react-native-tab-view';

// Dimensiones de la pantalla
const initialLayout = { width: Dimensions.get('window').width };

// Componentes para las pestañas
const EventDetails = ({ route }: any) => {
  const { itemId } = route.params;
  const { userid } = route.params;
  const [data, setData] = useState(null);//Para la Informacion del evento
  const [calificacion,setCalificacion] = useState(null);// para las calificaciones del evento
  const [comentario,setComentario] = useState(null);// para los comentarios del evento
  const [asistencia,setAsistencia] = useState(null);// para los comentarios del evento
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataPromedio, setDatapromedio] = useState(null);
  const [dataComentario, setDatacomentario] = useState('');
  const navigation: any = useNavigation();

  const loadData = async () => {
    try {
      const result = await fetchData(`eventos/${itemId}`); // Llama a la API
      //console.log('resultado', result);
      setData(result[0]); // Accede al primer objeto del arreglo
      setLoading(false); // Marcar como cargado
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  const loadCalificacion = async () => {
      try {
          const result = await fetchData(`calificacionJ/${itemId}`); // Llama a la API
          //console.log('resultado', result);
          setCalificacion(result); // Accede al  objeto del arreglo
          setLoading(false); // Marcar como cargado
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
  }
  
  const loadComentario = async () => {
      try {
          const result = await fetchData(`comentariosJ/${itemId}`); // Llama a la API
          //console.log('resultado', result);
          setComentario(result); // Accede al  objeto del arreglo
          setLoading(false); // Marcar como cargado
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
  }
  const loadVotacion = async () =>{
    try {
      const result = await fetchData(`promedio/${itemId}`); // Llama a la API
      //console.log('resultado', result[0]);
      setDatapromedio(result[0]); // Accede al  objeto del arreglo
      setLoading(false); // Marcar como cargado
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  }

  const loadAsistencia = async () =>{
    try {
      const result = await fetchData(`asistenciaU/${itemId}`); // Llama a la API
      //console.log('resultado', result[0]);
      setAsistencia(result); // Accede al  objeto del arreglo
      setLoading(false); // Marcar como cargado
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  }
  // Generar estrellas según la calificación
  const renderStars = (calificacion:any) => {
    return '★'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
  };

  useEffect(() => {
    loadData();
    loadCalificacion();
    loadComentario();
    loadVotacion();
    loadAsistencia();
  }, [itemId]); // Incluimos itemId como dependencia para recargar los datos si cambia

  const [index, setIndex] = useState(0); // Índice activo de la pestaña
  const [routes] = useState([
    { key: 'first', title: 'Información' },
    { key: 'second', title: 'Calificación' },
    { key: 'third', title: 'Comentarios' },
  ]);
  const calificar = async ()=>{
    const calificacionData = {
        "id_calificacion" : 0,
        "id_evento" : itemId,
        "id_usuario" : userid,
        "calificacion" : rating
      }
  try {
    const result = await postData('calificacion', calificacionData); // Crea un nuevo recurso
    loadCalificacion();
    loadVotacion();
    console.log('Created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const comentar = async ()=>{
    const comentarioData = {
        "id_comentario" : 0,
        "id_evento" : itemId,
        "id_usuario" : userid,
        "comentario" : dataComentario
      }
  try {
    console.log(comentarioData);
    const result = await postData('comentarios', comentarioData); // Crea un nuevo recurso
    loadComentario();
    console.log('Created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  }  

  const asistir = async ()=>{
    const asistenciaData = {
        "id_asistencia" : 0,
        "id_evento" : itemId,
        "id_usuario" : userid,
      }
  try {
    console.log(asistenciaData);
    const result = await postData('asistencia', asistenciaData); // Crea un nuevo recurso
    loadAsistencia();
    console.log('Created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  }
  // Definir las rutas dinámicas
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return (
          <View style={[styles.scene, { backgroundColor: '#8174A0' }]}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={{backgroundColor:'white'}}>
                <Text style={{fontSize:18}}>{data?.nombre_evento}</Text>
                <Text>Fecha: {data?.fecha_evento}</Text>
                <Text>Hora inicio: {data?.hora_inicio} - Hora fin: {data?.hora_fin}</Text>
                <Text>Dirección: {data?.direccion}</Text>
                <Text>Detalle: {data?.detalle}</Text>
                <TouchableOpacity style={styles.buttonC} onPress={asistir}>
                  <Text style={styles.buttonText}>Asistir</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={{textAlign:'center'}}>Asistiran al evento:</Text>
            {asistencia && asistencia.length > 0 ? ( // Asegúrate de que data no sea null
                <FlatList
                data={asistencia}
                keyExtractor={(item) => item.usuario}
                renderItem={({ item }) => (
                    <View style={styles.itemC}>
                    <Text style={styles.itemText} >Usuario: {item.usuario}</Text>             
                    </View>
                )} 
                />
                
            ) : (
                <Text>No hay Asistencias</Text>
            )}             
          </View>
        );
      case 'second':
        return (
          <View style={[styles.scenetwo, { backgroundColor: '#AB4459' }]}>
            <Rating
              showRating
              onFinishRating={setRating}
              ratingColor="#AB4459"
              ratingBackgroundColor="#AB4459"
            />
            <TouchableOpacity style={styles.button}>
                <Text onPress={calificar} style={{fontSize:17, fontWeight:'400', color:'white'}}>Calificar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Calificacion promedio: {parseFloat(dataPromedio?.promedio.toFixed(1))} / Votantes: {dataPromedio?.votantes}</Text>
            {calificacion && calificacion.length > 0 ? ( // Asegúrate de que data no sea null
                <FlatList
                data={calificacion}
                keyExtractor={(item) => item.Id}
                renderItem={({ item }) => (
                    <View style={styles.itemC}>
                    <Text style={styles.itemText}>Usuario: {item.Usuario} {renderStars(item.Calificaciones)}</Text>             
                    </View>
                )} 
                />
                
            ) : (
                <Text>No hay Calificaciones</Text>
            )}            
          </View>
        );
      case 'third':
        return (
          <View style={[styles.scene]}>
          <Text style={styles.titleC}>Enviar un Comentario</Text>
          <TextInput
            style={styles.inputC}
            placeholder="Escribe tu comentario"
            placeholderTextColor="#B0C4DE"
            onChangeText={(text) => setDatacomentario(text)}
            value={dataComentario}
          />
          <TouchableOpacity style={styles.buttonC} onPress={comentar}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>Comentarios del evento:</Text>
          {comentario && comentario.length > 0 ? (
            <FlatList
              data={comentario}
              keyExtractor={(item) => item.Id}
              renderItem={({ item }) => (
                <View style={styles.itemC}>
                  <Text style={styles.itemUser}>Usuario: {item.Usuario}</Text>
                  <Text style={styles.itemTextC}>{item.Comentario}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noComments}>No hay comentarios</Text>
          )}
        </View>
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#EABE6C' }}
          style={{ backgroundColor: '#891652' }}
          labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,

  },
  scenetwo: {
    flex: 1,
  },
  button:{
    width:250,
    height:40,
    borderRadius:10,
    backgroundColor:'#00CFEB90',
    alignItems:'center',
    justifyContent: 'center',
    marginVertical:10,
    borderColor:'#fff',
    borderWidth:1,
    marginLeft:"18%"
 },
 title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor:'white'
  },
  itemText: {
    fontSize: 14,
  },
  input:{
    width:250,
    height:40,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    marginVertical:10,
    backgroundColor:'#ffffff90',
    marginBottom:20
  },
  titleC: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555555',
    marginTop: 20,
    marginBottom: 10,
  },
  inputC: {
    height: 50,
    borderColor: '#78B3CE',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  buttonC: {
    backgroundColor: '#78B3CE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemC: {
    backgroundColor: '#EAF4FA',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderColor: '#78B3CE',
    borderWidth: 1,
  },
  itemUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
  itemTextC: {
    fontSize: 16,
    color: '#333333',
    marginTop: 5,
  },
  noComments: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EventDetails;