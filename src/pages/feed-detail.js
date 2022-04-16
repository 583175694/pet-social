/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-16 14:01:05
 * @Desc: 模板
 */

import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from '@fower/react-native';
import NavBar from '../components/nav-bar';
import Colors from '../utils/colors';

function RenderTitleItem() {
  return (
    <Text color={Colors.title} text-16>
      My Feed
    </Text>
  );
}

function RenderLeftItem({ navigation }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <Image w-11 h-20 source={require('../assets/icon_return.png')} />
    </TouchableOpacity>
  );
}

function RenderRightItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-5 source={require('../assets/icon_more.png')} />
    </TouchableOpacity>
  );
}

// 文案详情
function RenderfeedDetail() {
  return (
    <View pl-16 pr-16 mt-8>
      <View row toCenterY>
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
          {new Array(4).fill(0).map((item, index) => {
            return <Image w-24 h-24 rounded-32 mr-8 source={require('../assets/avatar2.png')} />;
          })}
        </View>
      </View>
      <View toCenterX mt-16>
        <Image w-343 h-343 rounded-4 source={require('../assets/img_lazy_l.png')} />
      </View>
      <View mt-16>
        <Text text-12 color={Colors.title} opacity-80>
          It was a humorously perilous business for both of us. For, before we proceed further
        </Text>
        <View row mt-16 mb-16>
          <Image w-12 h-16 mr-10 source={require('../assets/icon_location.png')} />
          <Text text-12 color={Colors.title} opacity-80>
            10 mins ago
          </Text>
        </View>
      </View>
    </View>
  );
}

// 统计信息
function RenderStat() {
  return (
    <View h-52 borderTop-1 borderBottom-1 borderColor={Colors.border} toCenterY>
      <View row toCenter w-186>
        <Image w-20 h-20 mr-8 source={require('../assets/icon_heart_default.png')} />
        <Text text-12 color={Colors.title} opacity-80>
          214
        </Text>
      </View>
      <View w-1 h-52 bg={Colors.border} />
      <View row toCenter w-186>
        <Image w-20 h-20 mr-8 source={require('../assets/icon_share.png')} />
        <Text text-12 color={Colors.title} opacity-80>
          3
        </Text>
      </View>
    </View>
  );
}

// 评论列表
function RenderCommitList() {
  return (
    <View pl-16 pr-16 mt-16>
      <View row toBetween>
        <Text text-10 color={Colors.title}>
          21 Comments
        </Text>
        <Text text-10 color={Colors.red}>
          View All
        </Text>
      </View>
      <View mt-16>
        {new Array(10).fill(0).map((item, index) => {
          return (
            <View column mb-24>
              <View row toCenterY>
                <Image w-24 h-24 rounded-24 source={require('../assets/avatar1.png')} />
                <Text text-12 color={Colors.title} ml-8>
                  Anthony Newman
                </Text>
                <View flex={1} toRight>
                  <Text text-10 color={Colors.subtitle}>
                    3 mins ago
                  </Text>
                </View>
              </View>
              <View ml-32 mt-3>
                <Text text-10 color={Colors.title}>
                  It was a humorously perilous business for both of us. For, before we proceed further
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// 评论输入框
function RenderCommitInput(props) {
  const [value, setValue] = React.useState('');
  return (
    <View h-48 toCenterY pl-16 pr-16>
      <View flex={1}>
        <TextInput
          text-10
          multiline
          numberOfLines={4}
          onChangeText={(text) => setValue(text)}
          placeholder="Write Comment…."
          placeholderTextColor={Colors.subtitle}
          value={value}
          editable
          maxLength={800}
        />
      </View>
      <Image w-20 h-20 rounded-20 ml-16 mr-14 source={require('../assets/icon_expression.png')} />
      <Image w-32 h-32 rounded-32 source={require('../assets/icon_input.png')} />
    </View>
  );
}

export default function FeedDetail(props) {
  const { navigation } = props;
  return (
    <SafeAreaView flex={1}>
      <NavBar
        titleItem={() => RenderTitleItem()}
        leftItem={() => RenderLeftItem({ navigation })}
        rightItem={() => RenderRightItem()}
      />
      <ScrollView>
        <RenderfeedDetail />
        <RenderStat />
        <RenderCommitList />
      </ScrollView>
      <RenderCommitInput />
    </SafeAreaView>
  );
}
