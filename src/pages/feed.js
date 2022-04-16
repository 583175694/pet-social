/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 16:12:15
 * @Desc: 模板
 */

import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import MomentBtn from '../components/moment-btn';

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
      <Image w-20 h-20 source={require('../assets/icon_list.png')} />
    </TouchableOpacity>
  );
}

function RenderRightItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-20 source={require('../assets/icon_search.png')} />
    </TouchableOpacity>
  );
}

export default function Feed(props) {
  const { navigation } = props;

  return (
    <SafeAreaView flex={1} bg={Colors.white} relative>
      <NavBar
        titleItem={() => RenderTitleItem()}
        leftItem={() => RenderLeftItem({ navigation })}
        rightItem={() => RenderRightItem()}
      />
      <ScrollView pl-16 pr-16>
        {new Array(10).fill(0).map((item, index) => (
          <TouchableOpacity activeOpacity={0.8} w-343 h-210 mb-16 onPress={() => navigation.navigate('FeedDetail')}>
            <Image w-343 h-160 source={require('../assets/img_lazy.png')} />
            <View row toCenterY mt-8>
              <Image w-32 h-32 rounded-32 source={require('../assets/avatar1.png')} />
              <View ml-8>
                <Text mb-4 text-12 color={Colors.title}>
                  Melissa Berry
                </Text>
                <Text text-10 color={Colors.subtitle}>
                  10 mins ago
                </Text>
              </View>
              <View flex={1} toRight>
                <Image w-20 h-18 rounded-32 mr-6 source={require('../assets/icon_heart_active.png')} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <MomentBtn navigation={navigation} />
    </SafeAreaView>
  );
}
