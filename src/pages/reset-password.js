/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 16:53:35
 * @Desc: 模板
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';

function RenderTitleItem() {
  return (
    <Text color={Colors.title} text-16>
      Reset Password
    </Text>
  );
}

function RenderLeftItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <Image w-20 h-20 source={require('../assets/icon_return.png')} />
    </TouchableOpacity>
  );
}

function RenderInput({ state, setState, placeholder, icon }) {
  return (
    <View w-311 h-48 rounded-8 border-1 borderColor={Colors.border} toCenterY mb-32>
      <TextInput
        text-10
        ml-16
        w-248
        multiline
        numberOfLines={4}
        onChangeText={(text) => setState(text)}
        placeholder={placeholder}
        placeholderTextColor={Colors.subtitle}
        value={state}
        editable
        maxLength={800}
      />
      <View flex={1} toRight mr-18>
        <Image opacity-50 w-20 h-20 source={icon} />
      </View>
    </View>
  );
}

export default function ResetPassword({ navigation }) {
  const [phone, setPhone] = useState('');
  return (
    <SafeAreaView flex={1} column toCenterX>
      <NavBar titleItem={() => RenderTitleItem()} leftItem={() => RenderLeftItem({ navigation })} />
      <View w-311 mt-81 mb-64>
        <Text text-12 color={Colors.title} opacity-80>
          No Problem! Just give in your Email ID and we will send you a link to reset your password
        </Text>
      </View>
      <RenderInput state={phone} setState={setPhone} placeholder="Mobile Number" />
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ResetNewPassword')}>
        <View w-311 h-48 toCenter bg={Colors.red} rounded-8 row mt-8>
          <Text color={Colors.white} text-14>
            Send Link
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
