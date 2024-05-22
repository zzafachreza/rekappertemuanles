import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar, MyCalendarSecond } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';

export default function Register({ navigation }) {

    


    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        level: 'IBU',
        posyandu: "Kasih ibu 15",
        desa: "Kertamulya",
        kecamatan: "Padalarang",
        nama_lengkap: '',
        telepon: '',
        nama_anak: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        jenis_kelamin: 'Laki-laki',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama lengkap ibu',
            });
        }

        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {



            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    }


                });
        }
    };



    return (
        
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: colors.white,
                  
                    position: 'relative',
                    
                    
                }}>

                <View style={{flex:1,}}>
                   <ImageBackground source={require('../../assets/bgimglogin.png')} style={{
                    flex:1,
                    height:'100%',
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center'
                   }}>
                        <Image source={require('../../assets/nikmatour.png')} style={{
                                     marginTop: 10,
          width: windowWidth / 1.9,
          height: windowWidth / 1.9,
          resizeMode: 'contain'
                        }}/>
                   </ImageBackground> 
                </View>

                {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                    <View style={{
                        paddingHorizontal: 0,
                    }}>
                        <Text style={{
                            fontSize: MyDimensi / 2.5,
                            fontFamily: fonts.primary[600],
                            color: colors.black,
                            textAlign:'center'
                        }}>REGISTER</Text>
                        <Text style={{
                            fontSize: MyDimensi / 4,
                            fontFamily: fonts.primary[400],
                            color: colors.primary,
                            marginBottom: 10,
                        }}>Silahkan daftar agar bisa login</Text>

                            {/* NAMA LENGKAP */}
                            <MyInput label='Nama Lengkap' iconname='person' placeholder='Nama Lengkap'/>
                            <MyGap jarak={20}/>

                            {/* USERNAME */}
                            <MyInput label='Username' iconname='person' placeholder='Username'/>
                            <MyGap jarak={20}/>

                            {/* NOMOR TELEPON */}
                            <MyInput label='Nomor Telephone' iconname='call' placeholder='Nomor Telephone'/>
                            <MyGap jarak={20}/>

                            
                            {/* ALAMAT */}
                            <MyInput label='Alamat' iconname='home' placeholder='Alamat Lengkap'/>
                            <MyGap jarak={20}/>

                                 
                            {/* TANGGAL LAHIR */}
                            <MyCalendarSecond label='Tanggal Lahir' placeholder='Tanggal Lahir' iconname='calendar'/>
                            <MyGap jarak={20}/>
                        {/*INPUT KATA SANDI */}
                        <MyInput
                            placeholder="Kata Sandi..."
                            label="Kata Sandi"
                            iconname="lock-closed"
                            value={data.password}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    password: value,
                                })
                            }
                        />

                   
                        {/* INPUT KATA SANDI ULANG */}
                        <MyGap jarak={20} />
                        <MyInput
                            borderColor={sama ? colors.primary : colors.danger}
                            borderWidth={sama ? 1 : 1}
                            placeholder="Masukan ulang kata sandi"
                            label="Masukan ulang kata sandi"
                            iconname="lock-closed"
                            secureTextEntry
                            value={data.repassword}
                            onChangeText={value => {

                                if (value !== data.password) {
                                    setSama(false)
                                } else {
                                    setSama(true)
                                }

                                setData({
                                    ...data,
                                    repassword: value,
                                })
                            }

                            }
                        />
                    </View>
                    <MyGap jarak={20} />




                    {!loading &&
                        <>
                            <MyButton


                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                        </>
                    }

                    <MyGap jarak={10} />
                    {loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator color={colors.primary} size="large" />
                    </View>}
                </ScrollView>

            </ScrollView>

    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
        position:'relative',
        backgroundColor:colors.primary,
     borderTopRightRadius:50,
     borderTopLeftRadius:50,

    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
