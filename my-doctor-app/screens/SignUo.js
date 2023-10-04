import React ,{useState,useEffect} from "react";
import * as Location from 'expo-location';
import {ScrollView , KeyboardAvoidingView ,View ,Text ,Platform} from 'react-native';
import CheckBox from "expo-checkbox";
import styles from "./styles/authStyles";
import ScreenTitle from "../components/ScreenTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import axios from '../config/axios';
import { SIGNUP_URL } from "../config/urls";
function SignUpScreen(props){
    const [formData ,setFormData]=useState({
        name:'',email:'',password:'',speialization:'',phone:'',address:'',workingHours:'',
        userType:false,location:null
    });
    const [location ,setLocation]=useState(null);
    const [isLoading ,setLoading]=useState(false);
    const [alert ,setAlert]=useState({message:null ,type:''});
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setAlert({message:null})
        },2000);
        return ()=>clearTimeout(timer);
    },[alert.message]);

    useEffect(() => {
        (async () => {
          try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
          } catch (error) {
            console.log(error);
          }
        })();
      }, []);
      
    const validate=()=>{
        const {name ,email ,password ,speialization,address,workingHours,phone,userType}=formData;
       let validationErrors=[];
       let pass=true;
       if(!name){
        validationErrors.push('الرجاء ادخال الاسم');
        pass=false
       }
       if(!password){
        validationErrors.push('الرجاء ادخال كلمة المرور');
        pass=false
       }
       if(!email){
        validationErrors.push('الرجاء ادخال البريد الالكتروني ');
        pass=false
       }
       if(userType){
        if(!speialization){
            validationErrors.push('الرجاء ادخال التخصص');
            pass=false
           }
           if(!address){
            validationErrors.push('الرجاء ادخال العنوان ');
            pass=false
           }
           if(!workingHours){
            validationErrors.push('الرجاء ادخال ساعات العمل');
            pass=false
            if(!phone){
                validationErrors.push('الرجاء ادخال رقم الهاتف');
                pass=false
               }
           }
       }
       if(validationErrors.length>0){
        setAlert({message:validationErrors ,type:'danger'})
       }
       return pass;
    }
    const changeFormedata=(key,value)=>{
        setFormData({...formData ,[key]:value})
    }
 
    const {name ,email ,password ,speialization,address,workingHours,phone,userType}=formData;
  
    const  _signUp=()=>{
        if(!validate()) return;
        (async ()=>{
            const {name ,email ,password ,speialization,address,workingHours,phone,userType}=formData;
            const body={
                name,
                email,
                password,
                userType:userType ? 'doctor':'normal',
                speialization,
                address,
                workingHours,
                phone,
                location:{
                     latitude: location ? location.coords.latitude : null,
                     longitude: location ? location.coords.longitude : null,
                }
            }
            try{
                setLoading(true);
              const response= axios.post(SIGNUP_URL,body);
              setFormData({
                name:'',
                email:'',
                password:'',
                speialization:'',
                address:'',
                phone:'',
                workingHours:'',
                location:null,
                userType:false
            });
            setLoading(false);
            props.navigation.navigate('SignIn');
            }catch(e){
               setAlert({message:e.response.data.message ,type:'danger'})
               setLoading(false);
            }            
        })();
    }
        return(
    <ScrollView contentContainerStyle={{paddingVertical:40}}>
         <Loader title='جاري انشاء حساب جديد' loading={isLoading} ></Loader>
         <Alert messages={alert.message} type={alert.type}></Alert>
         <View style={styles.container}>
            <ScreenTitle title='انشاء حساب جديد ' icon='md-person-add'></ScreenTitle>
          <KeyboardAvoidingView behavior="padding" enabled>
              <Input 
              placeholder='الاسم'
              value={name}
              onChangeText={(text)=>changeFormedata('name',text)}
              ></Input>
              <Input
               placeholder='البريد الالكتروني '
               value={email}
               onChangeText={(text)=>changeFormedata('email',text)}
              ></Input>
              <Input secureTextEntry
               placeholder='كلمة المرور '
               value={password}
               onChangeText={(text)=>changeFormedata('password',text)}
               ></Input>
             <View style={styles.checBoxContainer}>
             <CheckBox style={styles.checkbox} 
             value={userType}
             onValueChange={()=>changeFormedata('userType',!userType)}
             />
             <Text style={styles.checkboxLabel} >طبيب</Text>
             </View>
             {userType && (
             <React.Fragment>
                <Input placeholder='التخصص'
                value={speialization}
                onChangeText={(text)=>changeFormedata('speialization',text)}
                ></Input>
                <Input placeholder='ساعات العمل '
                value={workingHours}
                onChangeText={(text)=>changeFormedata('workingHours',text)}
                ></Input>
                <Input placeholder='العنوان'
                value={address}
                onChangeText={(text)=>changeFormedata('address',text)}
                ></Input>
                <Input placeholder='الهاتف'
                value={phone}
                onChangeText={(text)=>changeFormedata('phone',text)}
                ></Input>
            </React.Fragment>
             )}
             <Button text='انشاء حساب'
             onPress={_signUp}
             > </Button>
          </KeyboardAvoidingView>
        </View>
   </ScrollView>
    )
}

export default SignUpScreen;