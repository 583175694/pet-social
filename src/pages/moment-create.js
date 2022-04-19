/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-18 21:53:59
 * @Desc: 发布文章
 */

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView } from '@fower/react-native';
import Colors from '../utils/colors';
import { publishArticle } from '../api/store/article/publish-article';
import * as ImagePicker from 'react-native-image-picker';
import NavBar from '../components/nav-bar';
import { upload } from '../api/store/upload/upload';
const includeExtra = true;

function RenderInput({ state, setState, placeholder, icon }) {
  return (
    <View minH-48 pt-12 pb-12 toCenterY>
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
      <Image w-20 h-20 source={require('../assets/icon_return.png')} />
    </TouchableOpacity>
  );
}

function RenderRightItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-20 source={require('../assets/icon_close.png')} />
    </TouchableOpacity>
  );
}

export default function MomentCreate({ navigation }) {
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [tag, setTag] = useState('');
  const [photos, setPhotos] = useState([]);
  const [limit, setLimit] = useState(4);
  const [response, setResponse] = useState(null);

  const actions = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: limit,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  };

  async function onPublish() {
    const formData = new FormData();
    const file = { uri: photos[0].uri, type: 'multipart/form-data', name: 'image.png' };
    formData.append('file', file);

    console.log(formData);

    const results = await upload(formData);

    await publishArticle(results.data.id, content);
    if (results.message === 'success') {
      navigation.goBack();
    }
  }

  const onButtonPress = (type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setPhotos);
    } else {
      ImagePicker.launchImageLibrary(options, (value) => {
        if (value && value.assets) {
          setPhotos([...photos, ...value.assets]);
          setLimit(limit - value.assets.length);
        }
      });
    }
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <SafeAreaView relative flex={1}>
      <NavBar
        titleItem={() => RenderTitleItem()}
        leftItem={() => RenderLeftItem({ navigation })}
        rightItem={() => RenderRightItem()}
      />
      <ScrollView flex={1} mt-16 column>
        <View row flexWrap>
          {photos.map((item, index) => {
            return <Image w-103 h-103 rounded-4 ml-16 mb-16 source={{ uri: item.uri }} />;
          })}
          {limit > 0 && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => onButtonPress(actions.type, actions.options)}>
              <Image w-103 h-103 rounded-4 ml-16 source={require('../assets/img_lazy_l.png')} />
            </TouchableOpacity>
          )}
          {response !== null && <Image w-343 h-343 rounded-4 ml-16 source={{ uri: response }} />}
        </View>
        <RenderInput
          state={content}
          setState={setContent}
          placeholder="Add Caption"
          icon={require('../assets/icon_expression.png')}
        />
        <View w="100%" h-1 bg={Colors.border} />
        <RenderInput state={tag} setState={setTag} placeholder="Tag people" icon={require('../assets/icon_plus.png')} />
        <View w="100%" h-1 bg={Colors.border} />
        <RenderInput
          state={address}
          setState={setAddress}
          placeholder="Add Location"
          icon={require('../assets/icon_location.png')}
        />
      </ScrollView>
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

const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 9,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
