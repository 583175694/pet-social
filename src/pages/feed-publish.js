import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from '@fower/react-native';
import { Alert, Platform } from 'react-native';

export default class FeedPublish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localPhoOption: [], // 存储本地文件路径，用户本地展示图片
    };
  }

  // 添加图片 点击
  handleAddPicCheck() {
    // console.warn('添加图片------check')
    const { localPhoOption } = this.state;
    const { props } = this;
    const that = this;
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 720,
      maxHeight: 1280,
      aspectX: 2,
      aspectY: 1,
      quality: 1,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'PickLocalImg', // 存储本地地址
      },
    };

    ImagePicker.console.logImagePicker(options, async (res) => {
      if (res.didCancel) {
        console.log('User cancelled photo picker');
      } else if (res.error) {
        // 用户选择不授权时，提醒以下信息
        console.log('ImagePicker Error: ', res.error);
        if (res.error.indexOf('Camera permissions not granted') > -1) {
          Alert.alert(('提示信息', 'APP需要使用相机，请打开相机权限允许APP使用'), [
            {
              text: '设置',
              onPress: () => {
                // Linking.openURL('app-settings:').catch((err) => console.log('error', err));
              },
            },
            {
              text: '取消',
            },
          ]);
        }
        if (res.error.indexOf('Photo library permissions not granted') > -1) {
          Alert.alert('提示信息', 'APP需要使用相册，请打开相册权限允许APP使用', [
            {
              text: '设置',
              onPress: () => {
                // Linking.openURL('app-settings:').catch((err) => console.log('error', err));
              },
            },
            {
              text: '取消',
            },
          ]);
        }
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        // 用户授权并选择照片/拍照后，调用接口
        let source; // 保存选中的图片
        if (Platform.OS === 'android') {
          source = res.uri;
        } else {
          source = res.uri.replace('file://', '');
        }
        const formData = new FormData();
        // 文件类型根据对应的后端接口改变！！！
        const file = { uri: source, type: 'multipart/form-data', name: res.fileName };
        formData.append('file', file);
        const params = {
          formData,
        };
      }
    });
  }

  render() {
    const { state } = this;
    return (
      <View>
        <Text>添加图片</Text>
        <View>
          {/* 显示上传后的照片 */}
          {state.localPhoOption.length
            ? state.localPhoOption.map((item, index) => this.renderPicItem(item, index))
            : null}
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleAddPicCheck()}>
            {/* 点击此图，调用上传图片，一般此图是个➕号 的样子*/}
            <Image source={require('../assets/img_lazy_l.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 返回增加的图片
  renderPicItem(item, index) {
    return (
      <View key={index}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={{ uri: item }} />
        </TouchableOpacity>
      </View>
    );
  }
}
