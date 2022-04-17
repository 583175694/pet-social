/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 18:37:51
 * @Desc: 用户中心
 */

import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from '@fower/react-native';
import { Animated } from 'react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../components/custom-tab-bar';
import MomentBtn from '../components/moment-btn';

function RenderTitleItem() {
  return (
    <Text color={Colors.title} text-16>
      Profile
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

function RenderRightItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ProfileEdit')}>
      <Image w-20 h-20 source={require('../assets/icon_note.png')} />
    </TouchableOpacity>
  );
}

// 用户信息
function RenderProfile() {
  const [stats, setStats] = useState([
    {
      title: 'MOMENTS',
      value: 8,
    },
    {
      title: 'FOLLOWERS',
      value: 16,
    },
    {
      title: 'FOLLOWING',
      value: 34,
    },
  ]);

  return (
    <View>
      <View row toCenterY mt-16>
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
      <View borderTop-1 borderBottom-1 borderColor={Colors.border} toCenterY column p-16 mt-16>
        <Text text-10 color={Colors.title}>
          About
        </Text>
        <Text text-10 color={Colors.title} mt-16>
          So strongly and metaphysically did I conceive of my situation then, that while ear.
        </Text>
      </View>
      <View borderBottom-1 borderColor={Colors.border} toCenterY column p-16>
        <Text text-10 color={Colors.title} mb-16>
          Stats
        </Text>
        <View row toBetween>
          {stats.map((res) => (
            <View column>
              <Text text-12 color={Colors.red} mb-4>
                {res.value}
              </Text>
              <Text text-12 color={Colors.title}>
                {res.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// 朋友圈
function RenderMoments({ navigation }) {
  return (
    <View>
      <View row flexWrap toLeft>
        {new Array(16).fill(0).map(() => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              mb-16
              ml-16
              onPress={() => navigation.navigate('FeedDetail', { id: 2 })}
            >
              <Image w-104 h-104 rounded-4 source={require('../assets/img_lazy_l.png')} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// 我点赞的
function RenderLikes({ navigation }) {
  return (
    <View>
      <View row flexWrap toLeft>
        {new Array(8).fill(0).map(() => {
          return (
            <TouchableOpacity activeOpacity={0.8} mb-16 ml-16 onPress={() => navigation.navigate('FeedDetail')}>
              <Image w-104 h-104 rounded-4 source={require('../assets/img_lazy_l.png')} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function Profile(props) {
  const { navigation } = props;
  const [activeTab, setActiveTab] = useState(0);
  const tabs = useRef(['MOMENTS', 'LIKES']).current;
  const horiScroll = useRef(new Animated.Value(activeTab)).current;

  function onTabChanged(tabIndex) {
    if (tabIndex === activeTab) {
      return;
    }
    setActiveTab(tabIndex);
  }
  return (
    <SafeAreaView flex={1} relative>
      <NavBar
        titleItem={() => RenderTitleItem()}
        leftItem={() => RenderLeftItem({ navigation })}
        rightItem={() => RenderRightItem({ navigation })}
      />
      <ScrollView>
        <RenderProfile />
        <ScrollableTabView
          flex={1}
          renderTabBar={() => (
            <CustomTabBar
              isMulti={true}
              activeTab={activeTab}
              tabs={tabs}
              scrollValue={horiScroll}
              goToPage={onTabChanged}
            />
          )}
          locked={false}
          scrollWithoutAnimation={false}
          prerenderingSiblingsNumber={3}
          onScroll={(offset) => {
            horiScroll.setValue(offset);
          }}
        >
          <RenderMoments tabLabel="MOMENTS" navigation={navigation} />
          <RenderLikes tabLabel="LIKES" navigation={navigation} />
        </ScrollableTabView>
      </ScrollView>
      <MomentBtn navigation={navigation} />
    </SafeAreaView>
  );
}
