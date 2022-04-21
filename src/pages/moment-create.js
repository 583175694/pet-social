/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-21 14:53:53
 * @Desc: 发布文章
 */

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView } from '@fower/react-native';
import Colors from '../utils/colors';
import { publishArticle } from '../api/store/article/publish-article';
import * as ImagePicker from 'react-native-image-picker';
import NavBar from '../components/nav-bar';
import { upload } from '../api/store/upload/upload';
import Context from '../compositions/useRedux';
import { RenderTitleItem, RenderReturnItem, RenderCloseItem } from '../components/nav-bar-menu';
import { getArticleList } from '../api/store/article/get-article-list';
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

export default function MomentCreate({ navigation }) {
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [tag, setTag] = useState('');
  const [photos, setPhotos] = useState([]);
  const [limit, setLimit] = useState(4);
  const [response, setResponse] = useState(null);
  const { state, dispatch } = useContext(Context);

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

  // 上传文件
  async function onUpdate(photo) {
    console.log(photo);
    try {
      const formData = new FormData();
      const file = { uri: photo.uri, type: 'multipart/form-data', name: 'image.png' };
      formData.append('file', file);

      return await upload(formData);
    } catch (error) {}
  }

  // 发布文章
  async function onPublish() {
    try {
      Promise.all(photos.map(async (item) => await onUpdate(item)))
        .then((res) => {
          return res.map((e) => e.data.id);
        })
        .then(async (res) => {
          const publishRes = await publishArticle(res, content);
          if (publishRes.message === 'success') {
            const results = await getArticleList({ pageNum: 1, pageSize: 10 });
            dispatch({ type: 'setState', payload: { feed: results.data.dataList } });

            navigation.goBack();
          }
        });
    } catch (error) {}
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
        leftItem={() => RenderReturnItem({ navigation })}
        rightItem={() => RenderCloseItem()}
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

// const actions = [
//   {
//     title: 'Take Image',
//     type: 'capture',
//     options: {
//       saveToPhotos: true,
//       mediaType: 'photo',
//       includeBase64: false,
//       includeExtra,
//     },
//   },
//   {
//     title: 'Select Image',
//     type: 'library',
//     options: {
//       maxHeight: 200,
//       maxWidth: 200,
//       selectionLimit: 9,
//       mediaType: 'photo',
//       includeBase64: false,
//       includeExtra,
//     },
//   },
//   {
//     title: 'Take Video',
//     type: 'capture',
//     options: {
//       saveToPhotos: true,
//       mediaType: 'video',
//       includeExtra,
//     },
//   },
//   {
//     title: 'Select Video',
//     type: 'library',
//     options: {
//       selectionLimit: 0,
//       mediaType: 'video',
//       includeExtra,
//     },
//   },
//   {
//     title: 'Select Image or Video\n(mixed)',
//     type: 'library',
//     options: {
//       selectionLimit: 0,
//       mediaType: 'mixed',
//       includeExtra,
//     },
//   },
// ];
