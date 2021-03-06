/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-21 16:54:03
 * @Desc: 注册
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import { authRegister } from '../api/store/login/auth-register';
import { RenderReturnItem, RenderTitleItem } from '../components/nav-bar-menu';

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

export default function Register({ navigation }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function onProceed() {
    const results = await authRegister({
      account,
      password,
    });
    if (results.message === 'success') {
      navigation.popToTop();
    }
  }

  return (
    <SafeAreaView flex={1} column toCenterX>
      <NavBar titleItem={() => RenderTitleItem('register')} leftItem={() => RenderReturnItem({ navigation })} />
      <View w-311 mt-16 mb-40>
        <Text text-12 color={Colors.title} opacity-80>
          Fill in the required details and click Proceed. Fields marked * are mandatory
        </Text>
      </View>
      <RenderInput state={account} setState={setAccount} placeholder="Mobile Number" />
      <RenderInput state={password} setState={setPassword} placeholder="Password" />
      <RenderInput state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" />
      <Text w-311 text-14 color={Colors.title} opacity-80>
        <Text>By Creating Account, you are automatically accepting all the </Text>
        <Text color={Colors.red}>Terms & Conditions</Text>
        <Text>related to Momento</Text>
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={onProceed}>
        <View w-311 h-48 toCenter bg={Colors.red} rounded-8 row mt-40>
          <Text color={Colors.white} text-14>
            Proceed
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
