/**
 * Created by louisguo on 2018/10/31
 */
import React, { Component } from 'react';

import { StyleSheet, View, TouchableOpacity, Text, Animated, ScrollView, Platform, Dimensions } from 'react-native';

import PropTypes from 'prop-types';
import Colors from '../utils/colors';
const ScreenWidth = Dimensions.get('window').width;

const tabWidth = 75;
const tabHeight = 48;
const underlineWidth = 15;
const underlineHeight = 2;

export default class CustomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transAnimX: new Animated.Value(0), // 指示器平移动画
    };
    this.tabsMeasurements = [];
  }

  static propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
    tabNames: PropTypes.array, // 保存Tab名称
  };

  setAnimationValue({ value }) {
    // console.log(`动画值：${value}`);
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.setAnimationValue);
  }

  // 多个tab切换
  renderMultiTab() {
    let underlineOffset = 16;
    if (Platform.OS === 'android') {
      underlineOffset = 25;
    }
    return (
      <ScrollView
        horizontal={true}
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        {/* 所有tab */}
        {this.props.tabs.map((tab, i) => this._renderTab(tab, i))}
        {/* 指示器 */}
        <Animated.View
          style={[
            styles.tabLine,
            {
              transform: [
                {
                  translateX: this.props.scrollValue.interpolate({
                    inputRange: [0, this.props.tabs.length], // 0~tab个数
                    outputRange: [underlineOffset, underlineOffset + this.props.tabs.length * (tabWidth + 16)], // 0~所有tab的总宽度
                  }),
                },
              ],
            },
          ]}
        />
      </ScrollView>
    );
  }

  // 创建tab
  _renderTab(item, index) {
    const color = this.props.activeTab === index ? Colors.title : Colors.subtitle;
    const fontFamily = this.props.activeTab === index ? 'PingFangSC-Medium' : 'PingFangSC-Regular';
    const fontSize = this.props.activeTab === index ? 12 : 10;
    const fontWeight = this.props.activeTab === index ? 'bold' : 'normal';
    const left = 16;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.props.goToPage.bind(this, index)}
        style={styles.tab}
        key={item}
      >
        <View style={[styles.tabItem, { marginLeft: left }]}>
          <Text
            style={{ color, fontFamily, fontSize, fontWeight }}
            onLayout={({ nativeEvent: e }) => this.layout(e, index)}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  layout(e, index) {
    this.tabsMeasurements[index] = e.layout;
  }

  render() {
    return <View style={[styles.tabs, this.props.style]}>{this.renderMultiTab()}</View>;
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    height: tabHeight,
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabLine: {
    position: 'absolute',
    bottom: 12,
    height: underlineHeight,
    width: underlineWidth,
    backgroundColor: Colors.title,
  },
  tabItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: tabWidth,
    height: tabHeight,
  },

  line: {
    position: 'absolute',
    top: tabHeight - 1,
    backgroundColor: Colors.title,
    width: ScreenWidth,
    height: 1,
  },
});
