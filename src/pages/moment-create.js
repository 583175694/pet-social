/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 18:31:53
 * @Desc: 发布文章
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import { publishArticle } from '../api/store/article/publish-article';

function RenderInput({ state, setState, placeholder, icon }) {
  return (
    <View h-48 toCenterY>
      <TextInput
        text-10
        ml-16
        w-248
        multiline
        numberOfLines={4}
        onChangeText={(text) => setState(text)}
        placeholder={placeholder}
        placeholderTextColor={Colors.subtitle}
        value={state}
        editable
        maxLength={800}
      />
      <View flex={1} toRight mr-18>
        <Image opacity-50 w-20 h-20 source={icon} />
      </View>
    </View>
  );
}

export default function MomentCreate({ navigation }) {
  const [content, setContent] = useState();
  const [address, setAddress] = useState();

  async function onPublish() {
    const results = await publishArticle(content);
    console.log(results);
    if (results.message === 'success') {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView relative flex={1}>
      <View toCenterX mt-16 column>
        <Image w-343 h-343 rounded-4 source={require('../assets/img_lazy_l.png')} />
        <RenderInput
          state={content}
          setState={setContent}
          placeholder="Add Caption"
          icon={require('../assets/icon_expression.png')}
        />
        <View w="100%" h-1 bg={Colors.border} />
        <RenderInput
          state={address}
          setState={setAddress}
          placeholder="Add Location"
          icon={require('../assets/icon_location.png')}
        />
      </View>
      <View row absolute bottom-32 left-16>
        <TouchableOpacity activeOpacity={0.8}>
          <View w-164 h-48 toCenter border-1 borderColor={Colors.red} rounded-8 row>
            <Image w-20 h-17 mr-8 source={require('../assets/icon_cloud.png')} />
            <Text color={Colors.red} text-14>
              Save
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onPublish}>
          <View w-164 h-48 toCenter bg={Colors.red} rounded-8 row ml-16>
            <Image w-20 h-20 mr-8 source={require('../assets/icon_cursor.png')} />
            <Text color={Colors.white} text-14>
              Post
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
