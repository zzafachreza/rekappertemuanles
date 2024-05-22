import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap, MyHeader } from '../../components';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([{ "halaman": "AsupanMpasi", "id": "1", "image": "https://simonev.okeadmin.com/datafoto/a0003ce4349b2c7d4eff29b6d51a37075a774c47.png", "judul": "Asupan  MPASI", "warna": "#FE9A3B33" }, { "halaman": "AsupanAsi", "id": "2", "image": "https://simonev.okeadmin.com/datafoto/4f8b42e79f74f6c6d5a45865b9d5d9ca20a2a33e.png", "judul": "Asupan ASI", "warna": "#FF96A533" }, { "halaman": "StatusGizi", "id": "3", "image": "https://simonev.okeadmin.com/datafoto/43f86c8c8d15892eb4fbbd6466051168022d3918.png", "judul": "Status Gizi", "warna": "#FFA72633" }, { "halaman": "TanyaJawab", "id": "4", "image": "https://simonev.okeadmin.com/datafoto/abf1442b27cc406e0320e251e6ac57ba62d2128a.png", "judul": "Tanya Jawab", "warna": "#FFE29433" }, { "halaman": "Artikel", "id": "5", "image": "https://simonev.okeadmin.com/datafoto/655b4e3a81f3c760a001b1199ccb38aa6c1e63c4.png", "judul": "Artikel", "warna": "#CCE0F133" }, { "halaman": "Video", "id": "6", "image": "https://simonev.okeadmin.com/datafoto/9c25ee17076411e53acbefd97c3a40240642013a.png", "judul": "Video", "warna": "#C92B7433" }, { "halaman": "Resep", "id": "7", "image": "https://simonev.okeadmin.com/datafoto/30eea7e269ad623a515074c7b6ef65680b2bed84.png", "judul": "Resep MPASI", "warna": "#FFCDBC33" }, { "halaman": "Faq", "id": "8", "image": "https://simonev.okeadmin.com/datafoto/87a8a923f8334cde6a8fab507ea83964a76248d1.png", "judul": "FAQ", "warna": "#9CC44533" }, { "halaman": "GameKuis", "id": "9", "image": "https://simonev.okeadmin.com/datafoto/98b60a5ebe438acf92a114070e89ed0a52d11754.png", "judul": "Game Kuis", "warna": "#56D8D833" }]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {


    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });


  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 8,
            color: colors.secondary,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <View style={{
      flex: 1,
      width: "100%",
      height: "100%",

      backgroundColor: colors.white,



    }}>

      {/* HEADERS */}
      <View style={{
        flexDirection: "row",
        backgroundColor: colors.primary,
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-between'


      }}>

        <View style={{
          left: '50%'
        }}>
          <Text style={{
            fontFamily: fonts.primary[800],
            color: "white"

          }}>Selamat Datang di Aplikasi</Text>
          <Text style={{ fontFamily: fonts.primary[400], color: 'white' }}>
            Rekap Pertemuan Les
          </Text>
        </View>

        <View>
          <TouchableNativeFeedback onPress={() => {
            BackHandler.exitApp()
          }} >
            <View style={{ flexDirection: "row", padding: 10, }}>

              <Image source={require('../../assets/logout.png')} style={{
                width: 21, height: 21, tintColor: "white"
              }}
              />
            </View>

          </TouchableNativeFeedback>
        </View>

      </View>

      <ScrollView>
        {/* MAIN CONTRNT */}
        <View style={{ padding: 20, marginTop: '3%' }}>


          {/* MENU 1 */}
          <TouchableNativeFeedback onPress={() => navigation.navigate('TambahMurid')}>
            <View style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'center'


            }}>

              <Image source={require('../../assets/tambahmurid.png')} style={{
                width: 51,
                height: 51,
                left: '50%'
              }} />

              <Text style={{
                color: 'white',
                fontFamily: fonts.primary[600],
                left: '100%',
                fontSize: MyDimensi / 3.5,
                textAlign: "center"
              }}>
                Tambah Murid
              </Text>

            </View>
          </TouchableNativeFeedback>


          <MyGap jarak={20} />

          {/* MENU 2 */}

          <TouchableNativeFeedback onPress={() => navigation.navigate('CeklistHarian')}>
            <View style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'center'


            }}>

              <Image source={require('../../assets/chekclistharian.png')} style={{
                width: 51,
                height: 51,
                left: '50%'
              }} />

              <Text style={{
                color: 'white',
                fontFamily: fonts.primary[600],
                left: '100%',
                fontSize: MyDimensi / 3.5,

              }}>
                Ceklis Harian
              </Text>

            </View>
          </TouchableNativeFeedback>


          <MyGap jarak={20} />


          {/* MENU 3 */}

          <TouchableNativeFeedback onPress={() => navigation.navigate('DetailMurid')}>
            <View style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'center'


            }}>

              <Image source={require('../../assets/detailmurid.png')} style={{
                width: 51,
                height: 51,
                left: '50%'
              }} />

              <Text style={{
                color: 'white',
                fontFamily: fonts.primary[600],
                left: '100%',
                fontSize: MyDimensi / 3.5
              }}>
                Detail Murid
              </Text>

            </View>
          </TouchableNativeFeedback>

        </View>

        <MyGap jarak={20} />
      </ScrollView>

      <View style={{
        marginBottom: '10%',
        alignItems: 'center',

      }}>
        <Image source={require('../../assets/logo.png')} style={{
          width: 81,
          height: 81,
          borderRadius: 10,

        }} />
      </View>


    </View>

  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})