import React ,{useState ,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ScrollView ,KeyboardAvoidingView, View} from 'react-native'
import axios from '../config/axios';
import { SIGNIN_URL } from "../config/urls";
import Input from "../components/Input";
import Button from "../components/Button";
import ScreenTitle from "../components/ScreenTitle";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import styles from "./styles/authStyles";

function SignInScreen(props){
    const [email,setEmail]=useState('');
    const [password ,setPassword]=useState('');
    const [isLoading ,setLoading]=useState(false);
    const [alert ,setAlert]=useState({messages:null,type:''});

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setAlert({messages:null})
        },2000);
        return ()=>clearTimeout(timer);
    },[alert.messages]);

    const changeEmailHandler=(value)=>{
       setEmail(value.trim());
    }
    const changePasswordHandler=(value)=>{
       setPassword(value.trim());
    }
    
    const validate=()=>{
       let validationErrors=[];
       let pass=true;
      
       if(!password){
        validationErrors.push('الرجاء ادخال كلمة المرور');
        pass=false
       }
       if(!email){
        validationErrors.push('الرجاء ادخال البريد الالكتروني ');
        pass=false
       }
       if(validationErrors.length>0){
        setAlert({message:validationErrors ,type:'danger'})
       }
       return pass;
    }

   const _signIn=()=>{
    (async()=>{
    if(!validate())return;
    setLoading(true);

    try{
     const response = await axios.post(SIGNIN_URL,{email,password});
     setLoading(false);
     setPassword('');
     setEmail('');
     AsyncStorage.setItem('accessToken',response.data.accessToken);
     props.navigation.navigate('Profile');
    }
    catch(e){
      setLoading(false);
      setAlert({messages:e.response.data.message ,type:'danger'});
    }
    })();
   }

    return(
      
         <ScrollView contentContainerStyle={{paddingVertical:40}}>
         <View style={styles.container}>
           <Loader title='جاري انشاء حساب جديد' loading={isLoading} ></Loader>
           <Alert messages={alert.messages} type={alert.type}></Alert>
           <ScreenTitle title='تسجيل الدخول ' icon='md-log-in'></ScreenTitle>
            <KeyboardAvoidingView behavior="padding" enabled>
                <Input 
                placeholder='البريد الالكتروني '
                value={email}
                onChangeText={changeEmailHandler}
                />
                <Input 
                placeholder='كلمة المرور'
                value={password}
                onChangeText={changePasswordHandler}
                secureTextEntry
                />
                <Button text='دخول' onPress={_signIn} />
            </KeyboardAvoidingView>
         </View>
        </ScrollView>

    )
}

export default SignInScreen;



