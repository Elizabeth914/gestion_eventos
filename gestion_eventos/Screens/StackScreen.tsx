import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import { fetchData } from '../models/user_models';
import { useNavigation } from '@react-navigation/native';

const StackScreen = ({route}:any) =>{
    const { userEmail } = route?.params || {};
    //console.log(userEmail);
    const navigation:any = useNavigation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [iduser,setIduser] = useState(null);

    useEffect(() => {
      const getIdUser = async () => {
        try {
          const result = await fetchData('userid/' + userEmail); // Llama a la API
          //console.log("resultado id", result[0].id_usuario);
          setIduser(result[0].id_usuario); // Asume que `result` es un arreglo            
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
      const loadData = async () => {
        try {
          const result = await fetchData('eventos'); // Llama a la API
          //console.log("resultado", result);
          setData(result); // Asume que `result` es un arreglo            
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };      
      loadData();
      getIdUser();
    }, []);
  
    if (loading) {
      return <ActivityIndicator />;
    }

    const handlePress = (id:any) => {
      navigation.navigate('EventDetails', { itemId: id, userid: iduser });
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Proximos Eventos:</Text>
          {data && data.length > 0 ? ( // Asegúrate de que data no sea null
            <FlatList
              data={data}
              keyExtractor={(item) => item.id_evento}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>Name: {item.nombre_evento}</Text>
                  <Text style={styles.itemText}>Detalle: {item.detalle}</Text>
                  <TouchableOpacity style={styles.appButtonContainer} onPress={() => handlePress(item.id_evento)}>
                    <Text style={styles.appButtonText}>Ver</Text>
                  </TouchableOpacity>                  
                </View>
              )}  
            />
            
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
        </View>
    );
  };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
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
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },    
    appButtonText: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }  
});

export default StackScreen;