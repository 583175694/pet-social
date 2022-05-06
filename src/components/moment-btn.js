/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-06 15:13:19
 * @Desc: 模板
 */

import React from 'react';
import { TouchableOpacity, Image } from '@fower/react-native';

export default function MomentBtn({ navigation, refresh }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MomentCreate', { refresh })}>
      <Image absolute bottom-32 right-16 w-56 h-56 source={require('../assets/icon_camera.png')} />
    </TouchableOpacity>
  );
}
