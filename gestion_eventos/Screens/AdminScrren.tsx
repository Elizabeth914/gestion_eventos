import React, { useState, useEffect } from 'react';
import { Button,View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity,FlatList,TextInput,KeyboardAvoidingView,ScrollView} from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'

import { useNavigation } from '@react-navigation/native';
import { fetchData,postData } from '../models/user_models';
// Para el tab
import { TabView, TabBar } from 'react-native-tab-view';
import StackScreen from './StackScreen';
// Dimensiones de la pantalla
const initialLayout = { width: Dimensions.get('window').width };
//Para ingresarlo en Firebase
import { FIREBASE_AUTH } from '../models/configfirebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';

const AdminScreen = ({route}:any) =>{
    const navigation:any = useNavigation();
    const { userEmail } = route?.params || {};
    const [loading, setLoading] = useState(true);
    const [dataOrganizadores, setDataOrganizadores] = useState(null);
    const [dataEstadisticas, setdataEstadisticas] = useState(null);
    const [dataEventos, setDataEventos] = useState(null);
    const [iduser,setIduser] = useState(null);
    const [selected, setSelected] = useState('');
    //Para los usuarios
      const [usuario,setUsuario] = useState('');
      const [email, setEmail] = useState(''); //Constante que almacenará los datos del correo
      const [password, setPassword] = useState('');//Constante que almacenará los datos de la contraseña
      const [direccion,setDireccion] = useState('');
      const [telefono,setTelefono] = useState('');
      const [tipousuario,setTipousuario] = useState('');
    //Para los eventos
    const [nombre_evento,setNombre_evento] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [detalle, setDetalle] = useState('');
    const [direccionE, setDireccionE] = useState('');
    const [fecha_evento, setFecha_evento] = useState('');
    const [hora_inicio, setHora_inicio] = useState('');
    const [hora_fin, setHora_fin] = useState('');
    //Para el reloj
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [index, setIndex] = useState(0); // Índice activo de la pestaña
    const [routes] = useState([
      { key: 'first', title: 'Organizadores' },
      { key: 'second', title: 'Eventos' },
      { key: 'third', title: 'Estadisticas' },
    ]);

    useEffect(() =>{
      getOrganizadores();
      getEventos();
      getIdUser();
      getEstadisticas();
    });

    const getOrganizadores = async () => {
      try {
        const result = await fetchData('userJ'); // Llama a la API
        //console.log("resultado id", result);
        setDataOrganizadores(result); // Asume que `result` es un arreglo            
      } catch (error) {
        console.error('Error 1:', error);
      } finally {
        setLoading(false);
      }
    }
    const getEstadisticas = async () => {
      try {
        const result = await fetchData('eventosEstadistica'); // Llama a la API
        //console.log("resultado id", result);
        setdataEstadisticas(result); // Asume que `result` es un arreglo            
      } catch (error) {
        console.error('Error 1:', error);
      } finally {
        setLoading(false);
      }
    }
    const getEventos = async () => {
      try {
        const result = await fetchData('eventos'); // Llama a la API
        //console.log("resultado", result);
        setDataEventos(result); // Asume que `result` es un arreglo            
      } catch (error) {
        console.error('Error 2:', error);
      } finally {
        setLoading(false);
      }
    }; 
    const getIdUser = async () => {
      try {
        const result = await fetchData('userid/' + userEmail); // Llama a la API
        //console.log("resultado id", result[0].id_usuario);
        setIduser(result[0].id_usuario); // Asume que `result` es un arreglo            
      } catch (error) {
        console.error('Error 3:', error);
      } finally {
        setLoading(false);
      }
    };

    const handlePress = (id:any) => {
      navigation.navigate('EventDetails', { itemId: id, userid: iduser });
    };
    const tipoUsuario = [
      {label: 'Administrador', value : 1},
      {label: 'Organizador', value : 2},
      {label: 'Usuario', value : 3}
    ];

  
    const renderItem = item => {
      return (
        <View style={styles.itemS}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        </View>
      );
    };
    const singup = async() =>{
        if (!email || !password) {
          alert('Por favor, complete todos los campos');//Validando campos
          return;
        }

        setLoading(true);
        try {
          //Se manda la peticion para poder ingresar el correo a firebase
          const response = await createUserWithEmailAndPassword(auth, email, password);
          //console.log(response);
          //En caso de ser exitoso manda un alert con el siguiente mensaje
          alert('Suscripcion Exitosa');
          userSubmit();
        } catch (error: any) {
          //En caso de error mostrarlo
          //console.log(error);
          alert('Registro fallido: Intentelo más tarde');
        } finally {
          setLoading(false);
        }      
    }
      const userSubmit = async () => {
        const usuarioData = {
          "id_usuario": 0,
          "usuario": usuario,
          "correo": email,
          "contrasena": password,
          "direccion": direccion,
          "telefono": telefono,
          "tipo_usuario": tipousuario[0]
        };
        console.log('Evento creado:', usuarioData);
        try {
          const result = await postData('user', usuarioData); // Crea un nuevo recurso
          console.log('Created:', result);
          navigation.navigate('StackScreen',{userEmail:email});
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const ingresarEvento = async () =>{
      const dataEvento =   {
        "id_evento": 0,
        "nombre_evento": nombre_evento,
        "organizador": iduser,
        "detalle": detalle,
        "direccion": direccionE,
        "fecha_evento": fecha_evento,
        "hora_inicio": hora_inicio,
        "hora_fin": hora_fin
      }
      try {
        const result = await postData('eventos', dataEvento); // Crea un nuevo recurso
        console.log('Created:', result);
        navigation.navigate('StackScreen',{userEmail:email});
      } catch (error) {
        console.error('Error:', error);
      }      
    }
    const renderScene = ({ route }: any) => {
        switch (route.key) {
          case 'first':
            return (
              <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                      <View style={styles.container}>
                        {/* Formulario */}
                        <View>
                          <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Usuario</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="juanito95"
                            onChangeText={(text) => setUsuario(text)}
                          />
                        </View>
                        <View>
                          <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>E-mail</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="udb@dominio.com"
                            onChangeText={(text) => setEmail(text)}
                          />
                        </View>
                        <View>
                          <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Password</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="password"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                          />
                        </View>
                        <View>
                          <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Dirección</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="colonia manguito verde, soyapango"
                            onChangeText={(text) => setDireccion(text)}
                          />
                        </View>
                        <View>
                          <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Telefono</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="2257-7777"
                            onChangeText={(text) => setTelefono(text)}
                          />
                        </View>
                        <MultiSelect
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={tipoUsuario}
                          labelField="label"
                          valueField="value"
                          placeholder="Select item"
                          value={tipousuario}
                          search
                          searchPlaceholder="Search..."
                          onChange={item => {
                            setTipousuario(item);
                          }}
                          renderLeftIcon={() => (
                            <AntDesign
                              style={styles.icon}
                              color="black"
                              name="Safety"
                              size={20}
                            />
                          )}
                          renderItem={renderItem}
                          renderSelectedItem={(item, unSelect) => (
                            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                              <View style={styles.selectedStyle}>
                                <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                <AntDesign color="black" name="delete" size={17} />
                              </View>
                            </TouchableOpacity>
                          )}
                        />                        
                        <TouchableOpacity style={styles.button}>
                          <Text onPress={singup} style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>
                            Registrar
                          </Text>
                        </TouchableOpacity>

                        {/* Lista */}
                        <Text style={styles.title}>Usuarios:</Text>
                        {dataOrganizadores && dataOrganizadores.length > 0 ? (
                          <FlatList
                            data={dataOrganizadores}
                            keyExtractor={(item) => item.Id}
                            renderItem={({ item }) => (
                              <View style={styles.item}>
                                <Text style={styles.itemText}>Usuario: {item.Usuario}</Text>
                                <Text style={styles.itemText}>Rol: {item.Rol}</Text>
                                <Text style={styles.itemText}>Correo: {item.Correo}</Text>
                              </View>
                            )}
                          />
                        ) : (
                          <Text>No hay datos disponibles</Text>
                        )}
                      </View>
                </ScrollView>
              </KeyboardAvoidingView>
            );
          case 'second':
            return (
              <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">                  
                <View style={styles.container}>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Nombre del Evento</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Gran Baile"
                        onChangeText={(text) => setNombre_evento(text)}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Detalle del evento</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Invitados Especiales"
                        onChangeText={(text) => setDetalle(text)}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Dirección del evento</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Parque de la segunda etapa "
                        onChangeText={(text) => setDireccionE(text)}
                      />
                    </View>                     
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Fecha del evento</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="dd-mm-yyy"
                        onChangeText={(text) => setFecha_evento(text)}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Hora Inicio del evento</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="hh:mm"
                        onChangeText={(text) => setHora_inicio(text)}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Hora fin del evento</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="hh:mm"
                        onChangeText={(text) => setHora_fin(text)}
                      />
                    </View>
                    <TouchableOpacity style={styles.button}>
                          <Text onPress={ingresarEvento} style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>
                            Ingresar evento
                          </Text>
                        </TouchableOpacity>                                                                                                                                    
                    <Text style={styles.title}>Eventos:</Text>
                    {dataEventos && dataEventos.length > 0 ? ( // Asegúrate de que data no sea null
                      <FlatList
                        data={dataEventos}
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
                </ScrollView>
              </KeyboardAvoidingView>              
            );
          case 'third':
            return (
              <View style={styles.container}>
                <Text style={styles.title}>Asistencia:</Text>
                {dataEventos && dataEventos.length > 0 ? ( // Asegúrate de que data no sea null
                  <FlatList
                    data={dataEstadisticas}
                    keyExtractor={(item) => item.id_evento}
                    renderItem={({ item }) => (
                      <View style={styles.item}>
                        <Text style={styles.itemText}>Name: {item.nombre_evento}</Text>
                        <Text style={styles.itemText}>Asistencia: {item.total_asistentes}</Text>
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
          default:
            return null;
        }
      };

    return(
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
}
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
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  itemS: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  }
});
export default AdminScreen;