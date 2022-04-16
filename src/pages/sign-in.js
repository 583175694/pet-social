/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 18:38:56
 * @Desc: 模板
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import { CommonActions } from '@react-navigation/native';

const resetAction = CommonActions.reset({
  index: 1,
  routes: [{ name: 'Home' }],
});

function RenderTitleItem() {
  return (
    <Text color={Colors.title} text-16>
      Sign In
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

export default function SignIn({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView flex={1} column toCenterX>
      <NavBar titleItem={() => RenderTitleItem()} leftItem={() => RenderLeftItem({ navigation })} />
      <View w-311 mt-81 mb-64>
        <Text text-12 color={Colors.title} opacity-80>
          Type in your Mobile Number and Password you chose for Momento and click Go to Feed
        </Text>
      </View>
      <RenderInput state={phone} setState={setPhone} placeholder="Mobile Number" />
      <RenderInput state={password} setState={setPassword} placeholder="Password" />
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch(resetAction)}>
        <View w-311 h-48 toCenter bg={Colors.red} rounded-8 row mt-8>
          <Text color={Colors.white} text-14>
            Sign In
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text text-14 color={Colors.red} mt-80>
          Can’t Sign In? Reset Password
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
