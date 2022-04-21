/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-21 16:51:53
 * @Desc: 用户中心
 */

import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from '@fower/react-native';
import { Animated } from 'react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../components/custom-tab-bar';
import MomentBtn from '../components/moment-btn';
import { RenderDrawerItem, RenderEditItem, RenderTitleItem } from '../components/nav-bar-menu';
import Context from '../compositions/useRedux';
import { getTimeAgo } from '../utils/get-time-ago';
import { getPublishArticleList } from '../api/store/user/publish-article-list';
import { getAccount } from '../utils/storage';
import { getLikeArticleList } from '../api/store/user/like-article-list';

// 用户信息
function RenderProfile() {
  const [user, setUser] = useState(null);
  const { state } = useContext(Context);

  const stats = useRef(['MOMENTS', 'FOLLOWERS', 'FOLLOWING']).current;
  const [statsCounter, setStatsCounter] = useState(['0', '0', '0']);

  useEffect(() => {
    setUser(state.user);
    const userStatis = [
      state.user.userStatisticsVO.publishArticleCounter,
      state.user.userStatisticsVO.fansCounter,
      state.user.userStatisticsVO.attentionCounter,
    ];
    setStatsCounter(userStatis);
  }, [state.user]);

  return (
    <View>
      {user && (
        <>
          <View row toCenterY mt-16>
            <Image
              w-56
              h-56
              rounded-56
              ml-16
              source={user.userVO.iconUrl ? { uri: user.userVO.iconUrl } : require('../assets/avatar_default.png')}
            />
            <View ml-16>
              <Text mb-8 text-16 color={Colors.title}>
                {user.userVO.name}
              </Text>
              <Text text-12 color={Colors.subtitle}>
                {getTimeAgo(user.userVO.createTime)}
              </Text>
            </View>
          </View>
          <View borderTop-1 borderBottom-1 borderColor={Colors.border} toCenterY column p-16 mt-16>
            <Text text-10 color={Colors.title}>
              About
            </Text>
            <Text text-10 color={Colors.title} mt-16>
              {user.userVO.signature || '此人很懒，什么都没有留下'}
            </Text>
          </View>
          <View borderBottom-1 borderColor={Colors.border} toCenterY column p-16>
            <Text text-10 color={Colors.title} mb-16>
              Stats
            </Text>
            <View row toBetween>
              {stats.map((res, index) => (
                <View column key={index}>
                  <Text text-12 color={Colors.red} mb-4>
                    {statsCounter[index]}
                  </Text>
                  <Text text-12 color={Colors.title}>
                    {res}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

// 朋友圈
function RenderMoments({ navigation }) {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    const getFetch = async () => {
      try {
        const results = await getPublishArticleList({ account: await getAccount(), pageNum: 1, pageSize: 10 });
        setMoments(results.data.dataList);
      } catch (e) {}
    };
    getFetch();
  }, []);

  return (
    <View>
      <View row flexWrap toLeft>
        {moments.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              mb-16
              ml-16
              onPress={() => navigation.navigate('FeedDetail', { id: item.id })}
              key={index}
            >
              <Image
                w-104
                h-104
                rounded-4
                source={
                  item.publishBannerFileList.length
                    ? { uri: item.publishBannerFileList[0].url }
                    : require('../assets/img_lazy_l.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// 我点赞的
function RenderLikes({ navigation }) {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    const getFetch = async () => {
      try {
        const results = await getLikeArticleList({ account: await getAccount(), pageNum: 1, pageSize: 2 });
        setMoments(results.data.dataList);
      } catch (e) {}
    };
    getFetch();
  }, []);
  return (
    <View>
      <View row flexWrap toLeft>
        {moments.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              mb-16
              ml-16
              onPress={() => navigation.navigate('FeedDetail', { id: item.id })}
              key={index}
            >
              <Image
                w-104
                h-104
                rounded-4
                source={
                  item.publishBannerFileList.length
                    ? { uri: item.publishBannerFileList[0].url }
                    : require('../assets/img_lazy_l.png')
                }
              />
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
        titleItem={() => RenderTitleItem('Profile')}
        leftItem={() => RenderDrawerItem({ navigation })}
        rightItem={() => RenderEditItem({ navigation })}
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
