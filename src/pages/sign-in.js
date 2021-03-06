/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-06 12:38:28
 * @Desc: 登录
 */

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import { authLogin } from '../api/store/login/auth-login';
import { storeAuthorization, storeAccount } from '../utils/storage';
import { resetAction } from '../components/stack-navigator';
import { getArticleList } from '../api/store/article/get-article-list';
import Context from '../compositions/useRedux';
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

export default function SignIn({ navigation }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  async function onSignIn() {
    const results = await authLogin({
      account,
      password,
    });

    if (results.message === 'success') {
      await storeAuthorization(results.data.token);
      await storeAccount(JSON.stringify(results.data));

      navigation.dispatch(resetAction);
    }
  }

  return (
    <SafeAreaView flex={1} column toCenterX>
      <NavBar titleItem={() => RenderTitleItem('Sign In')} leftItem={() => RenderReturnItem({ navigation })} />
      <View w-311 mt-81 mb-64>
        <Text text-12 color={Colors.title} opacity-80>
          Type in your Mobile Number and Password you chose for Momento and click Go to Feed
        </Text>
      </View>
      <RenderInput state={account} setState={setAccount} placeholder="Mobile Number" />
      <RenderInput state={password} setState={setPassword} placeholder="Password" />
      <TouchableOpacity activeOpacity={0.8} onPress={onSignIn}>
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
