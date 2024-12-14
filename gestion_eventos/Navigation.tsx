import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

//Screens
import HomeScreen from "./Screens/HomeScreen";
import SettingScreen from "./Screens/SettingScreen";
import StackScreen from "./Screens/StackScreen";
import SingUpScreen from "./Screens/SingUp";
import EventDetails from "./Screens/EventDetails";
import AdminScreen from "./Screens/AdminScrren";
import OrganizadorScreen from "./Screens/OrganizadorScreen";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RootStack  = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'purple',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                   tabBarLabel:'Login',
                   tabBarIcon:({color,size}) => (
                    <MaterialCommunityIcons name="login" size={size} color={color} />
                   ),
                   headerShown:false,
                }}
                />
            <Tab.Screen
                name="SingUpScreen"
                component={SingUpScreen}
                options={{
                    tabBarLabel:'Sing Up',
                    tabBarIcon:({color,size}) => (
                        <MaterialCommunityIcons name="firebase" size={size} color={color} />
                    ),
                    headerShown:false,
                 }}                
                />
        </Tab.Navigator>
    );
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="MainTabs" component={MyTabs} options={{ headerShown: false }} />
                <RootStack.Screen name="StackScreen" component={StackScreen} 
                options={{
                    title:'Eventos',
                    headerStyle: { backgroundColor: '#6200ee' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' }}}
                 />
                <RootStack.Screen name="AdminScreen" component={AdminScreen}
                    options={{
                        title:'Administración',
                        headerStyle: { backgroundColor: '#240A34' },
                        headerTintColor: '#FFEDD8',
                        headerTitleStyle: { fontWeight: 'bold' }}}                
                />
                <RootStack.Screen name="OrganizadorScreen" component={OrganizadorScreen} />
                <RootStack.Screen name="EventDetails" component={EventDetails} 
                options={{
                    title:'Detalle del Evento',
                    headerStyle: { backgroundColor: '#240A34' },
                    headerTintColor: '#FFEDD8',
                    headerTitleStyle: { fontWeight: 'bold' }}}
                 />
            </RootStack.Navigator>            
        </NavigationContainer>
    );
}