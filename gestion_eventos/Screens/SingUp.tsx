import React ,{useState}from 'react';
import {Image, Text,StyleSheet, View, ScrollView, TouchableOpacity, TextInput,Button} from 'react-native';
import {BlurView} from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {postData}from '../models/user_models';
//Para ingresarlo en Firebase
import { FIREBASE_AUTH } from '../models/configfirebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';

const uri ='https://w.wallhaven.cc/full/kx/wallhaven-kxoqdm.jpg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SingUpScreen = () =>{
    const [usuario,setUsuario] = useState('');
    const [email, setEmail] = useState(''); //Constante que almacenará los datos del correo
    const [password, setPassword] = useState('');//Constante que almacenará los datos de la contraseña
    const [direccion,setDireccion] = useState('');
    const [telefono,setTelefono] = useState('');
    const [loading, setLoading] = useState(false); //verificamos el estado si esta o no logeado
    const auth = FIREBASE_AUTH; //llamamos el componente para la autenticacion
    const navigation:any = useNavigation(); //Utilizamos el navigation para moverse entre vistas

  //Registrar nuevo usuario
  const signUp = async () => {
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
  };
  
  const userSubmit = async () => {
    const usuarioData = {
        "id_usuario": 0,
        "usuario": usuario,
        "correo": email,
        "contrasena": password,
        "direccion": direccion,
        "telefono": telefono,
        "tipo_usuario": 3
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
                        <Text style={{fontSize:30,fontWeight:'400', color:'black'}}>Registro</Text>
                        <View >
                            <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>Usuario </Text>
                            <TextInput style={styles.input} placeholder='juanito95' onChangeText={(text) => setUsuario(text)}></TextInput>
                        </View>
                        <View>
                            <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>E-mail </Text>
                            <TextInput style={styles.input} placeholder='udb@dominio.com' onChangeText={(text) => setEmail(text)}></TextInput>
                        </View>
                        <View>
                            <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>Password </Text>
                            <TextInput style={styles.input} placeholder='password' secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>
                        </View>
                        <View>
                            <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>Dirección </Text>
                            <TextInput style={styles.input} placeholder='colonia manguito verde, soyapango' onChangeText={(text) => setDireccion(text)}></TextInput>
                        </View>
                        <View>
                            <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>Telefono </Text>
                            <TextInput style={styles.input} placeholder='2257-7777' onChangeText={(text) => setTelefono(text)}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Text onPress={signUp} style={{fontSize:17, fontWeight:'400', color:'white'}}>Sing Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonG}>
                            <MaterialCommunityIcons name="google" size={24} color="white" />
                        <Text style={styles.textG}>Sign in with Google</Text>
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
        height:570,
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
    },
    buttonG: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4285F4",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    textG: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "bold",
    },
});
export default SingUpScreen;