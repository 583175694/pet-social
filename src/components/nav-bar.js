import React from 'react';
import { SafeAreaView, View } from '@fower/react-native';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function NavBar(props) {
  function renderLeftItem() {
    if (props.leftItem === undefined) {
      return;
    }
    return props.leftItem();
  }

  function renderTitleItem() {
    if (props.titleItem === undefined) {
      return;
    }
    return props.titleItem();
  }

  function renderRightItem() {
    if (props.rightItem === undefined) {
      return;
    }
    return props.rightItem();
  }

  return (
    <View style={styles.container}>
      <View>{renderLeftItem()}</View>

      <View>{renderTitleItem()}</View>

      <View>{renderRightItem()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row', // 按行排列
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
