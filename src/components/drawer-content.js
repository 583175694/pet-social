/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-05 22:12:52
 * @Desc: 模板
 */

import React, { useRef, useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from '@fower/react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../utils/colors';
import { authRegister } from '../api/store/login/auth-register';
import { resetSplash } from './stack-navigator';
import { authLogout } from '../api/store/login/auth-logout';
import Context from '../compositions/useRedux';
import { getTimeAgo } from '../utils/get-time-ago';

export default function DrawerContent({ navigation }) {
  const { state } = useContext(Context);
  const [user, setUser] = useState(null);

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
      navigation: 'Chats',
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

  async function drawerHandle(item) {
    if (item.title === 'Sign Out') {
      await authLogout();
      navigation.dispatch(resetSplash);
    } else {
      navigation.navigate(item.navigation);
    }
  }

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  return (
    <DrawerContentScrollView>
      {user && user !== null && (
        <View row toCenterY mt-16 borderBottom-1 borderColor={Colors.border} pb-32>
          <Image
            w-56
            h-56
            rounded-56
            ml-16
            source={user.userVO.iconUrl ? { uri: user.userVO.iconUrl } : require('../assets/avatar_default.png')}
          />
          <View ml-16>
            <Text mb-8 text-16 color={Colors.title}>
              {user.userVO.name}
            </Text>
            <Text text-12 color={Colors.subtitle}>
              {getTimeAgo(user.userVO.createTime)}
            </Text>
          </View>
        </View>
      )}
      {drawerList.map((item, index) => {
        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => drawerHandle(item)} key={index}>
            <View row h-64 toCenterY>
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
