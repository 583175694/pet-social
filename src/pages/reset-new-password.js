/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-21 16:54:48
 * @Desc: 重置密码 - 输入新密码
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
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

export default function ResetNewPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <SafeAreaView flex={1} column toCenterX>
      <NavBar
        titleItem={() => RenderTitleItem('reset new password')}
        leftItem={() => RenderReturnItem({ navigation })}
      />
      <View w-311 mt-81 mb-64>
        <Text text-12 color={Colors.title} opacity-80>
          A strong password has combination of letter and numbers and special characters like $,!,%, etc.
        </Text>
      </View>
      <RenderInput state={password} setState={setPassword} placeholder="New Password" />
      <RenderInput state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" />
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.popToTop()}>
        <View w-311 h-48 toCenter bg={Colors.red} rounded-8 row mt-8>
          <Text color={Colors.white} text-14>
            Save
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
