/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 16:14:31
 * @Desc: 闪屏
 */

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import { getAuthorization } from '../utils/storage';
import { resetAction } from '../components/stack-navigator';

export default function Splash({ navigation }) {
  useEffect(() => {
    async function fetchData() {
      const results = await getAuthorization();
      if (results) {
        navigation.dispatch(resetAction);
      }
    }
    fetchData();
  }, [navigation]);

  return (
    <SafeAreaView flex={1} column toCenterX>
      <Image w-79 h-96 mt-100 source={require('../assets/img_splash.png')} />
      <Text text-36 color={Colors.title} mt-40 fontWeight="500">
        MOMENTS
      </Text>
      <Text w-279 text-12 color={Colors.title} mt-32>
        Momento is a social app that lets you share your moments with friends
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SignIn')}>
        <View w-311 h-48 toCenter bg={Colors.red} rounded-8 row mt-79>
          <Text color={Colors.white} text-14>
            Sign In
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text text-14 color={Colors.red} mt-80>
          Create New Account
        </Text>
      </TouchableOpacity>
      <View absolute bottom-16>
        <Text text-10 color={Colors.title}>
          © 2017 Momento Inc.
        </Text>
      </View>
    </SafeAreaView>
  );
}
