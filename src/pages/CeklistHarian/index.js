import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyCalendar, MyHeader, MyInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
export default function ({ navigation, route }) {
  const item = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tanggal, setTanggal] = useState(moment().format('YYYY-MM-DD'))

  const getDataTransaksi = (x = tanggal) => {
    // setLoading(true);
    axios.post(apiURL + 'murid_cek', {
      tanggal: x,
    }).then(res => {
      console.log(res.data);
      setData(res.data);
      setTMP(res.data)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getDataTransaksi();
  }, []);

  const __renderItem = ({ item }) => {
    return (



      <TouchableWithoutFeedback onPress={() => {
        console.log({
          fid_murid: item.id,
          tanggal: tanggal,
        });
        if (item.cek > 0) {
          Alert.alert(MYAPP, 'Apakah kamu akan batalkan ceklis ini ?', [
            { text: 'TIDAK' },
            {
              text: 'YA',
              onPress: () => {
                axios.post(apiURL + 'murid_hadir_delete', {
                  fid_murid: item.id,
                  tanggal: tanggal,
                }).then(res => {
                  console.log(res.data);
                  getDataTransaksi();
                })
              }
            }
          ])
        } else {
          axios.post(apiURL + 'murid_hadir', {
            fid_murid: item.id,
            tanggal: tanggal,
          }).then(res => {
            console.log(res.data);
            getDataTransaksi();
            if (res.data.status == 404) {
              showMessage({
                type: 'danger',
                message: res.data.message
              })
            } else {
              showMessage({
                type: 'success',
                message: res.data.message
              })
            }

          })
        }
      }}>
        <View style={{
          marginBottom: 10,
          width: '100%',
          alignItems: 'center',
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: item.cek > 0 ? colors.border : colors.white,
          borderWidth: 1,
          borderColor: colors.primary,
          padding: 10,
          flexDirection: 'row'
        }}>

          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              fontSize: MyDimensi / 4
            }}>{item.nama_murid}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
              fontSize: MyDimensi / 4
            }}>Jumlah pertemuan {item.pertemuan}x</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
              fontSize: MyDimensi / 4
            }}>Sudah {parseFloat(item.hadir)}x pertemuan</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
              fontSize: MyDimensi / 4
            }}>Sisa pertemuan {parseFloat(item.sisa)}</Text>
          </View>
          <View style={{
          }}>

            <Icon type='ionicon' name={item.cek > 0 ? 'checkmark-circle' : 'checkmark-circle-outline'} color={item.cek > 0 ? colors.success : colors.primary} />
          </View>
        </View>
      </TouchableWithoutFeedback>



    )
  }

  const [key, setKey] = useState('');
  const [TMP, setTMP] = useState({});
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>

      <MyHeader judul="Ceklis Harian" onPress={() => navigation.goBack()} />



      {!loading &&
        <View style={{
          flex: 1,
          paddingHorizontal: 20,
        }}>

          <View style={{
            marginBottom: 10,
          }}>
            <MyCalendar value={tanggal} onDateChange={x => {
              setTanggal(x);
              getDataTransaksi(x);
            }} label="Tanggal Kehadiran" />
          </View>


          <View style={{
            position: 'relative'
          }}>
            {key.length > 0 &&

              <TouchableWithoutFeedback onPress={() => {
                setKey(''); setData(TMP);
              }}>
                <View style={{
                  position: 'absolute',
                  zIndex: 99,
                  top: 10,
                  right: 10,
                }}>
                  <Icon type='ionicon' name='close' color={colors.secondary} />
                </View>
              </TouchableWithoutFeedback>}
            <View style={{
              position: 'absolute',
              top: 10,
              left: 10,
            }}>
              <Icon type='ionicon' name='search' color={colors.primary} />
            </View>
            <TextInput value={key} onChangeText={x => {
              setKey(x);
              if (x.length > 0) {
                let TMPSrc = data.filter(i => i.nama_murid.toLowerCase().indexOf(x.toLowerCase()) > -1);
                if (TMPSrc.length > 0) {
                  setData(TMPSrc);
                }
              } else {
                setData(TMP);
              }
            }} placeholder='Pencarian . . .' style={{
              height: 45,
              borderWidth: 1,
              marginBottom: 10,
              borderRadius: 30,
              paddingLeft: 40,
              borderColor: colors.primary,
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 4
            }} />
          </View>
          <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

        </View>
      }
      {loading &&
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color={colors.primary} />

        </View>
      }



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})