/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 18:23:02
 * @Desc: 模板
 */

import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from '@fower/react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../utils/colors';

export default function DrawerContent({ navigation }) {
  const drawerList = useRef([
    {
      title: 'Feed',
      icon: require('../assets/icon_feed.png'),
      navigation: 'Feed',
    },
    {
      title: 'My Profile',
      icon: require('../assets/icon_user.png'),
      navigation: 'Profile',
    },
    {
      title: 'Chats',
      icon: require('../assets/icon_bubbles.png'),
    },
    {
      title: 'Saved by me',
      icon: require('../assets/icon_arrow_down.png'),
    },
    {
      title: 'Settings',
      icon: require('../assets/icon_settings.png'),
    },
    {
      title: 'About Momento',
      icon: require('../assets/icon_info.png'),
    },
    {
      title: 'Sign Out',
      icon: require('../assets/icon_signout.png'),
    },
  ]).current;
  return (
    <DrawerContentScrollView>
      <View row toCenterY mt-16 borderBottom-1 borderColor={Colors.border} pb-32>
        <Image w-56 h-56 rounded-56 ml-16 source={require('../assets/avatar1.png')} />
        <View ml-16>
          <Text mb-8 text-16 color={Colors.title}>
            Melissa Berry
          </Text>
          <Text text-12 color={Colors.subtitle}>
            10 mins ago
          </Text>
        </View>
      </View>
      {drawerList.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.navigation, { initial: false })}
          >
            <View row h-64 toCenterY key={index}>
              <Image w-16 h-16 ml-16 mr-8 source={item.icon} />
              <Text text-14 color={Colors.title}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
}
