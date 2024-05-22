import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { fonts } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'

export default function TambahMurid({ navigation }) {
  const backPage = () => {
    navigation.goBack();
  }

  const [kirim, setKirim] = useState({
    nama_murid: '',
    pertemuan: 4,
    biaya: '',

  });

  const sendServer = () => {
    console.log(kirim);
    axios.post(apiURL + 'insert_murid', kirim).then(res => {
      console.log(res.data);
      if (res.data.status == 200) {
        showMessage({
          type: 'success',
          message: res.data.message
        });
        navigation.goBack();
      }
    })
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: "white"
    }}>

      <MyHeader judul="Tambah Murid" onPress={backPage} />




      {/* MAIN INPUT */}
      <ScrollView>
        <View style={{
          padding: 10,

        }}>

          {/* NAMA MURID */}
          <View>
            <MyGap jarak={10} />
            <MyInput label="Nama Murid" onChangeText={x => {
              setKirim({
                ...kirim,
                nama_murid: x
              })
            }} />
          </View>



          {/* TANGGAL MULAI */}

          <MyGap jarak={10} />

          {/* PILIH SESI */}

          <MyPicker value={kirim.pertemuan} onValueChange={x => {
            setKirim({
              ...kirim,
              pertemuan: x
            })
          }} label="Pilih Pertemuan berapa kali / sesi" data={[
            { label: '4x', value: 4 },
            { label: '8x', value: 8 },
            { label: '5x', value: 5 },
            { label: '10x', value: 10 },
          ]} />



          <MyGap jarak={10} />

          {/* PILIH SESI */}

          <MyInput label="Input Biaya" keyboardType='number-pad' onChangeText={x => {
            setKirim({
              ...kirim,
              biaya: x
            })
          }} />



          <MyGap jarak={20} />
          <MyButton title="Simpan" onPress={sendServer} />

        </View>
      </ScrollView>
    </View>
  )
}