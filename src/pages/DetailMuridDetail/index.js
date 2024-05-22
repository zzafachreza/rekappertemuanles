import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { MyDimensi, colors, fonts } from '../../utils'
import axios from 'axios'
import { MYAPP, apiURL } from '../../utils/localStorage'
import moment from 'moment'


export default function DetailMuridDetail({ navigation, route }) {
  const item = route.params;
  console.log(item);
  const [data, setData] = useState([]);
  const [kirim, setKirim] = useState({
    tanggal_bayar: moment().format('YYYY-MM-DD'),
  })

  useEffect(() => {
    __getTransaction();
  }, [])

  const __getTransaction = () => {
    axios.post(apiURL + 'murid_detail', {
      fid_murid: route.params.id
    }).then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
      {/* HEADER */}
      <MyHeader judul="Detail Murid" onPress={() => navigation.goBack()} />

      {/* MAIN CONTENT */}
      <ScrollView>
        <View style={{
          padding: 10,
        }}>
          <View style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.primary,
            paddingBottom: 10,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[800],
              fontSize: MyDimensi / 4
            }}>Nama Murid</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: MyDimensi / 4
            }}>{item.nama_murid}</Text>
          </View>

          <FlatList data={data} renderItem={({ item, index }) => {
            return (
              <View style={{
                marginVertical: 10,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: item.status == 'Close' ? colors.border : colors.white,
                borderColor: colors.primary,
              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>Status Sesi</Text>
                  <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{item.status}</Text>
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>Status Bayar</Text>
                  <Text style={{
                    color: item.bayar == 'Lunas' ? colors.success : colors.black,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{item.bayar}</Text>
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>Tanggal Bayar</Text>
                  <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{item.tanggal_bayar == '0000-00-00' ? '-' : moment().format('DD MMMM YYYY')}</Text>
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>Jumlah pertemuan</Text>
                  <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{item.jumlah}</Text>
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>Jumlah Sudah Hadir</Text>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 3
                  }}>{item.hadir}</Text>
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>Sisa Pertemuan</Text>
                  <Text style={{
                    color: colors.primary,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{item.sisa}</Text>
                </View>
                {item.bayar != 'Lunas' &&
                  <View style={{
                    padding: 10,
                    borderWidth: 1,
                    marginVertical: 10,
                    borderRadius: 10,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <MyCalendar onDateChange={x => {
                        setKirim({
                          ...kirim,
                          tanggal_bayar: x
                        })
                      }} label="Tanggal Bayar" />
                    </View>
                    <MyGap jarak={10} />
                    <MyButton title="Update Bayar" onPress={() => {
                      Alert.alert(MYAPP, 'Apakah kamu yakin akan update data ini ?', [
                        { text: 'TIDAK' },
                        {
                          text: 'UPDATE BAYAR',
                          onPress: () => {
                            axios.post(apiURL + 'update_bayar', {
                              tanggal_bayar: kirim.tanggal_bayar,
                              id_sesi: item.id
                            }).then(res => {
                              console.log(res.data);
                              __getTransaction();
                            })
                          }
                        }
                      ])
                    }} />



                  </View>
                }

                {parseFloat(item.sisa) == 0 && item.status !== 'Close' &&
                  <MyButton title="Buat Sesi Baru" onPress={() => {
                    Alert.alert(MYAPP, 'Apakah kamu yakin akan perpanjang sesi ?', [
                      { text: 'TIDAK' },
                      {
                        text: 'PERPANJANG SESI',
                        onPress: () => {

                          axios.post(apiURL + 'tambah_sesi', {
                            fid_murid: item.fid_murid,
                            jumlah: item.jumlah,
                            id_sesi: item.id
                          }).then(res => {
                            console.log(res.data);
                            __getTransaction();
                          })
                        }
                      }
                    ])
                  }} />}
              </View>
            )
          }} />
        </View>
      </ScrollView>
    </View>
  )
}