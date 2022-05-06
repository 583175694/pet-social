import React from 'react';
import { Text, TouchableOpacity, Image } from '@fower/react-native';
import Colors from '../utils/colors';

// 导航栏
export function RenderTitleItem(title) {
  return (
    <Text color={Colors.title} text-16>
      {title}
    </Text>
  );
}

// 抽屉按钮
export function RenderDrawerItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.openDrawer()}>
      <Image w-20 h-20 source={require('../assets/icon_list.png')} />
    </TouchableOpacity>
  );
}

// 搜索按钮
export function RenderSearchItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-20 source={require('../assets/icon_search.png')} />
    </TouchableOpacity>
  );
}

// 返回按钮
export function RenderReturnItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <Image w-20 h-20 source={require('../assets/icon_return.png')} />
    </TouchableOpacity>
  );
}

// 更多按钮
export function RenderMoreItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-5 source={require('../assets/icon_more.png')} />
    </TouchableOpacity>
  );
}

// 关闭按钮
export function RenderCloseItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-20 source={require('../assets/icon_close.png')} />
    </TouchableOpacity>
  );
}

// 编辑按钮
export function RenderEditItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ProfileEdit')}>
      <Image w-20 h-20 source={require('../assets/icon_note.png')} />
    </TouchableOpacity>
  );
}

// 联系人按钮
export function RenderContactItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Contact')}>
      <Image w-20 h-20 source={require('../assets/icon_contact.png')} />
    </TouchableOpacity>
  );
}
