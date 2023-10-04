
import 'react-native-gesture-handler'
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/Home';
import DoctorScreen from './screens/Doctor';
import SignUpScreen from './screens/SignUo';
import SignInScreen from './screens/SignIn';
import ProfileScreen from './screens/Profile';

const Stack=createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor:'#007bff',
      },
      headerTintColor:'#fff',
     headerTitleAlign:'center'
    }}
    >
      <Stack.Screen
       name='Home'
       component={HomeScreen}
       options={{headerShown:false}}
      />
      <Stack.Screen
       name='Doctors'
       component={DoctorScreen}
      options={{
        title:'الأطباء'
      }}
      />
      <Stack.Screen 
      name='SignUp'
      component={SignUpScreen}
      options={{
        title:'حساب جديد'
      }}
      />
      <Stack.Screen 
      name='SignIn'
      component={SignInScreen}
      options={{
        title:'تسجيل الدخول'
      }}
      />
      <Stack.Screen 
       name='Profile'
       component={ProfileScreen}
       options={{
        title:'الملف الشخصي '
       }
       }
      />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

