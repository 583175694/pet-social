/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 16:45:51
 * @Desc: 模板
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from '@fower/react-native';
import NavBar from '../components/nav-bar';
import Colors from '../utils/colors';

function RenderTitleItem() {
  return (
    <Text color={Colors.title} text-16>
      My Feed
    </Text>
  );
}

function RenderLeftItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.openDrawer()}>
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

export default function ProfileEdit(props) {
  const { navigation } = props;
  const [nickname, setNickname] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [describe, setDescribe] = useState();

  return (
    <SafeAreaView flex={1} column toCenterX>
      <NavBar titleItem={() => RenderTitleItem()} leftItem={() => RenderLeftItem({ navigation })} />
      <View w-311 mt-16>
        <Text text-12 color={Colors.title}>
          Hey! We need few details from you before you start sharing on Momento
        </Text>
      </View>
      <View mt-40>
        <RenderInput state={nickname} setState={setNickname} placeholder="William Franklin" />
        <RenderInput
          state={birthday}
          setState={setBirthday}
          placeholder="July 1, 1990"
          icon={require('../assets/icon_calendar.png')}
        />
        <RenderInput state={gender} setState={setGender} placeholder="Male" />
        <RenderInput
          state={address}
          setState={setAddress}
          placeholder="Atlanta, CA"
          icon={require('../assets/icon_location.png')}
        />
        <RenderInput
          state={describe}
          setState={setDescribe}
          placeholder="So strongly and metaphysically did I conceive of"
        />
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <View w-311 h-48 rounded-8 toCenter mt-8 bg={Colors.red}>
          <Text text-14 color={Colors.white}>
            Save
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
