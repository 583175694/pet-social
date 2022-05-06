/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-06 14:08:41
 * @Desc: 聊天列表
 */

import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from '@fower/react-native';
import NavBar from '../components/nav-bar';
import { RenderContactItem, RenderDrawerItem, RenderTitleItem } from '../components/nav-bar-menu';
import Colors from '../utils/colors';
import { applyRoom } from '../api/store/room/apply-room';

export default function Chats({ navigation }) {
  return (
    <SafeAreaView>
      <NavBar
        titleItem={() => RenderTitleItem('Chats')}
        leftItem={() => RenderDrawerItem({ navigation })}
        rightItem={() => RenderContactItem({ navigation })}
      />
      {new Array(10).fill(null).map((res) => {
        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ChatRoom')}>
            <View row toCenterY p-16 borderBottom-1 borderColor={Colors.border}>
              <Image w-56 h-56 rounded-56 mr-16 source={require('../assets/avatar_default.png')} />
              <View flex-1 column>
                <Text text-12 color={Colors.title} mb-4>
                  Catherine Henderson
                </Text>
                <Text text-10 color={Colors.title} numberOfLines={1}>
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsc.
                </Text>
              </View>
              <View>
                <Text ml-16 text-10 color={Colors.title}>
                  1h
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}
