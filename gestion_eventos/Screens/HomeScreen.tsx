import React, {useState}from 'react';
import {Image, Text,StyleSheet, View, ScrollView, TouchableOpacity, TextInput,Button} from 'react-native';
import {BlurView} from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
//Para el Login con Firebase
import { FIREBASE_AUTH } from '../models/configfirebase';
import { signInWithEmailAndPassword} from 'firebase/auth';

import { fetchData } from '../models/user_models';

const uri ='https://w.wallhaven.cc/full/kx/wallhaven-kxoqdm.jpg';

const HomeScreen = () =>{
    const [email, setEmail] = useState(''); //Constante que almacenará los datos del correo
    const [password, setPassword] = useState('');//Constante que almacenará los datos de la contraseña
    const [loading, setLoading] = useState(false); //verificamos el estado si esta o no logeado
    const [rol, setRol] = useState(null);
    const auth = FIREBASE_AUTH; //llamamos el componente para la autenticacion

    const navigation:any = useNavigation();

    const signIn = async () => {
        if (!email || !password) {
          alert('Por favor, complete todos los campos'); // validamos que los campos no esten vacíos
          return;
        }
        setLoading(true); //seteamos true
        try {
          //realizammos la peticion a firebase junto con el correo y la contraseña
          const response = await signInWithEmailAndPassword(auth, email, password);

            // Obtener el rol del usuario desde la API
            const userRol = await getRol(); 

            // Validar el rol y navegar
            if (userRol === 'Administrador'){
                navigation.navigate('AdminScreen', { userEmail: email });
            }else if (userRol === 'Organizador') {
                navigation.navigate('OrganizadorScreen', { userEmail: email });
            } else {
                navigation.navigate('StackScreen', { userEmail: email });
            }

        } catch (error: any) {
          //console.log(error);
          //En caso de error mostrarlo
          alert('Usuario o Contraseña Incorrecta');
        } finally {
          setLoading(false);
        }
      };

      const getRol = async () => {
        try {
            const result = await fetchData('userJ/' + email); // Llamar a la API
            console.log("Resultado del Rol:", result);
    
            // Verificar que el resultado es un arreglo con datos
            if (Array.isArray(result) && result.length > 0) {
                return result[0].Rol; // Devolver directamente el rol
            } else {
                //console.error('Respuesta inesperada de la API:', result);
                throw new Error('Error al obtener el rol del usuario');
            }
        } catch (error) {
            console.error('Error en getRol:', error);
            alert('No se pudo obtener el rol del usuario');
            throw error; // Volver a lanzar el error para manejarlo en signIn
        }
    };
    return(
            <View style={styles.container}>
                <Image source={{uri}} style={[styles.image, StyleSheet.absoluteFill]}/>  
                <ScrollView contentContainerStyle = {{
                    flex:1,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    <BlurView intensity={100}>
                        <View style={styles.login}>
                            <Text style={{fontSize:30,fontWeight:'400', color:'black'}}>Bienvenido</Text>
                            <View >
                                <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>E-mail </Text>
                                <TextInput style={styles.input} placeholder='udb@dominio.com' onChangeText={(text) => setEmail(text)}></TextInput>
                            </View>
                            <View>
                                <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>Password </Text>
                                <TextInput style={styles.input} placeholder='password' secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text onPress={signIn} style={{fontSize:17, fontWeight:'400', color:'white'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </ScrollView>
            </View>       
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems : 'center',
        justifyContent:'center'
    },
    image:{
        width:'100%',
        height: '100%',
        resizeMode:'cover'
    },
    login:{
        width:350,
        height:500,
        borderColor:'#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding:10,
        alignItems:'center'
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
    }
});
export default HomeScreen;