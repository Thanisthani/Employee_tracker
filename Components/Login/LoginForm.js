import React,{useState} from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { PrimaryColor } from '../../constants/Color';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess,loginFailed } from '../../features/authSlice';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
  
const LoginForm = () => {
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState(null);
     // redux state
  const authUser = useSelector((state) => state.auth);

    const LoginScheme = Yup.object().shape({
        email: Yup.string().email('Incorrect email').required('Email must be required'),
        password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required'),
    });

    // handle form submit
    const userSignin = async (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((re) => {
        console.log("Sucessfully log in ");
        dispatch(loginSuccess());
            setLoginError(null);
    })
    .catch((re) => {
        console.log(re + "hi");
        const message = "Please check your email & password !";
        dispatch(loginFailed());
        setLoginError(message);
       
    })
        await console.log(authUser)
    }

  return (
      <View style={styles.wrapper}>
              <Formik
                    initialValues={{ email: '',password:'' }}
                    onSubmit={values => userSignin(values)}
                    validationSchema={LoginScheme}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (

                        <View>
                            {/* EMAIL */}
                            <View >
                                <Text style={styles.label}>Enter your email</Text>
                                <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                              value={values.email}
                              style={[styles.inputfield,{borderColor:errors.email?'#FF0000':'#E3E5E5'}]}
                              placeholder={'email'}
                              placeholderTextColor="#94999C" 
                              textContentType='emailAddress'
                                />
                                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}


                            </View>

                            {/* PASSWORD */}
                            <View >
                                <Text style={styles.label}>Enter your password</Text>
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                              value={values.password}
                              style={[styles.inputfield,{borderColor:errors.password?'#FF0000':'#E3E5E5'}]}
                              placeholder={'password'}
                              placeholderTextColor="#94999C"
                              textContentType='password'
                              secureTextEntry={true}
                          />
                                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}


                            </View>

                            {/* LOGIN IN BTN */}

                            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} >
                                <Text style={styles.btnText}>Login</Text>
                      </TouchableOpacity>
                      
                      {loginError && <View style={styles.loginErr}>
                          <Text style={styles.errorText}>{loginError}</Text>
                      </View>}

                        </View>

                    )}
                </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        // justifyContent:'flex-',
        alignItems:"flex-start"
    },
    label: {
        fontFamily: 'Poppins_500Medium',
        fontSize: RFPercentage(2.5),
        marginTop:hp('2%'),
    },
    inputfield: {
        borderWidth: 1,
        borderRadius: 8,
        // borderColor: '#E3E5E5',
        borderWidth:1,
        padding: 5,
        // marginBottom: hp('2%'),
        marginTop:hp('2%'),
        width: wp('85%'),
        height: hp('7%'),
        fontFamily: 'Poppins_400Regular',
        color: '#94999C',
        fontSize: RFPercentage(2.5),
        paddingLeft:13     
    },
    loginBtn: {
        width: wp('85%'),
        height: hp('7%'),
        backgroundColor: PrimaryColor,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:hp('5%')
    },
    btnText: {
        fontFamily:'Poppins_600SemiBold',
        color: '#ffffff',
        fontSize: RFPercentage(2.5) 
    },
    errorText: {
        fontFamily: 'Poppins_300Light',
        fontSize: RFPercentage(2),
        color: '#FF0000',
        marginTop:0.5 
    },
    loginErr: {
        alignItems: 'center',
        paddingTop:10
    }

});
export default LoginForm