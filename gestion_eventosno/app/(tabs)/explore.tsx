import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator,StyleSheet, Image, FlatList, Button, TextInput} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { fetchData,postData } from '../models/user_models';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const evento = {}
  const [id_evento, setId_evento] = useState('');
  const [nombre_evento, setNombre_evento] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [detalle, setDetalle] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha_evento, setFecha_Evento] = useState('');
  const [hora_inicio, setHora_inicio] = useState('');
  const [hora_final, setHora_fin] = useState('');


  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData('eventos'); // Llama a la API
        setData(result); // Asume que `result` es un arreglo
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    const evento = {
        "id_evento": id_evento,
        "nombre_evento": nombre_evento,
        "organizador": organizador,
        "detalle": detalle,
        "direccion": direccion,
        "fecha_evento": fecha_evento,
        "hora_inicio": hora_inicio,
        "hora_fin": hora_final
    };
    console.log('Evento creado:', evento);
    try {
      const result = await postData('eventos', evento); // Crea un nuevo recurso
      console.log('Created:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
      >
<View style={styles.container}>
      <Text style={styles.title}>Formulario de Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del Evento"
        value={id_evento}
        onChangeText={setId_evento} // Actualiza el estado directamente
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del Evento"
        value={nombre_evento}
        onChangeText={setNombre_evento}
      />

      <TextInput
        style={styles.input}
        placeholder="Organizador"
        value={organizador}
        onChangeText={setOrganizador}
      />

      <TextInput
        style={styles.input}
        placeholder="Detalle"
        value={detalle}
        onChangeText={setDetalle}
      />

      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha del Evento (YYYY-MM-DD)"
        value={fecha_evento}
        onChangeText={setFecha_Evento}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora de Inicio (HH:MM)"
        value={hora_inicio}
        onChangeText={setHora_inicio}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora Final (HH:MM)"
        value={hora_final}
        onChangeText={setHora_fin}
      />

      <Button title="Guardar Evento" onPress={handleSubmit} />
    </View>        
      <View style={styles.container}>
      <Text style={styles.title}>Listado de Items:</Text>
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id_evento}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>ID: {item.id_evento}</Text>
                <Text style={styles.itemText}>Name: {item.nombre_evento}</Text>
                <Text style={styles.itemText}>
                  Status: {item.detalle}
                </Text>
              </View>
            )}
            nestedScrollEnabled // Habilita el desplazamiento anidado
          />
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
    </View>      
    </ParallaxScrollView>  
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  itemText: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
export default App;