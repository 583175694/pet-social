/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 16:13:15
 * @Desc: 模板
 */

import React from 'react';
import { TouchableOpacity, Image } from '@fower/react-native';

export default function MomentBtn({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MomentCreate')}>
      <Image absolute bottom-32 right-16 w-56 h-56 source={require('../assets/icon_camera.png')} />
    </TouchableOpacity>
  );
}
