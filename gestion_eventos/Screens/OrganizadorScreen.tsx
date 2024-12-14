import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
const OrganizadorScreen = () =>{
    const navigation:any = useNavigation();
    return(
        <View>
            <Text style={{
                fontSize: 30,
                textAlign: 'center',
                marginTop: '20%'
            }}>
                <TouchableOpacity>
                    <Text onPress={()=>{navigation.navigate('StackScreen');}} style={{fontSize:17, fontWeight:'400', color:'black'}}>Organizador</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}

export default OrganizadorScreen;