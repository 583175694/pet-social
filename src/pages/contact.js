/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-05 22:23:17
 * @Desc: 联系人
 */

import React from 'react';
import { View, Text, SafeAreaView } from '@fower/react-native';
import NavBar from '../components/nav-bar';
import { RenderDrawerItem, RenderSearchItem, RenderTitleItem } from '../components/nav-bar-menu';

export default function Contact({ navigation }) {
  return (
    <SafeAreaView>
      <NavBar
        titleItem={() => RenderTitleItem('My Feed')}
        leftItem={() => RenderDrawerItem({ navigation })}
        rightItem={() => RenderSearchItem({ navigation })}
      />
      <Text>Template</Text>
    </SafeAreaView>
  );
}
