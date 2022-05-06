/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-06 15:12:36
 * @Desc: 首页 - 文章列表
 */

import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from '@fower/react-native';
import { useRequest } from 'ahooks';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import MomentBtn from '../components/moment-btn';
import { getArticleList } from '../api/store/article/get-article-list';
import { getAccount, getAuthorization } from '../utils/storage';
import { getTimeAgo } from '../utils/get-time-ago';
import { RenderDrawerItem, RenderSearchItem, RenderTitleItem } from '../components/nav-bar-menu';
import Context from '../compositions/useRedux';
import { getUser } from '../api/store/user/get-user-info';

// 获取用户信息
function useFetchUser() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const getFetch = async () => {
      try {
        // 获取用户信息
        const user = JSON.parse(await getAccount());
        const userRes = await getUser(user.account);
        dispatch({ type: 'setState', payload: { user: userRes.data } });
      } catch (e) {}
    };

    getFetch();
  }, [dispatch]);

  return { feed: state.feed };
}

// 获取文章信息
export function useFetchData({ setFeed }) {
  const [pageNum, setPageNum] = useState(1);
  const pageSize = useRef(10).current;
  const { data, error, loading, run } = useRequest(() => getArticleList({ pageNum, pageSize }));

  useEffect(() => {
    if (!loading) {
      setFeed(data.data.dataList);
    }
  }, [data, loading, setFeed]);

  return { error, loading, run };
}

export default function Feed({ navigation }) {
  const [feed, setFeed] = useState([]);
  const { error, loading, run } = useFetchData({ setFeed });
  useFetchUser();

  if (error) {
    return (
      <View flex={1} toCenter>
        <Text>failed to load</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View flex={1} toCenter>
        <Text>loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView flex={1} bg={Colors.white} relative>
      <NavBar
        titleItem={() => RenderTitleItem('My Feed')}
        leftItem={() => RenderDrawerItem({ navigation })}
        rightItem={() => RenderSearchItem()}
      />
      <ScrollView>
        {feed.map((item, index) => {
          // banner
          const bannerList = item.articleServiceVO.publishBannerFileList;
          // avatar
          const avatar = item.userSearchVO.iconUrl;
          // time ago
          const timeAgo = getTimeAgo(item.articleServiceVO.publishTime);
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('FeedDetail', {
                  id: item.articleServiceVO.id,
                })
              }
              key={item.articleServiceVO.id}
            >
              <View row mt-16 pl-16 flexWrap>
                {bannerList &&
                  bannerList.map((res) => {
                    return (
                      <Image
                        w-108
                        h-108
                        rounded-4
                        mr-8
                        mb-8
                        source={bannerList.length !== 0 ? { uri: res.url } : require('../assets/img_lazy.png')}
                        key={res.id}
                      />
                    );
                  })}
              </View>
              <View row toCenterY p-16 pt-8>
                <Image
                  w-32
                  h-32
                  rounded-32
                  source={avatar ? { uri: avatar } : require('../assets/avatar_default.png')}
                />
                <View ml-8>
                  <Text mb-4 text-12 color={Colors.title}>
                    {item.userSearchVO.name}
                  </Text>
                  <Text text-10 color={Colors.subtitle}>
                    {timeAgo}
                  </Text>
                </View>
                <View flex={1} toCenterY toRight>
                  <Image w-20 h-18 rounded-32 mr-6 source={require('../assets/icon_heart_active.png')} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <MomentBtn navigation={navigation} refresh={run} />
    </SafeAreaView>
  );
}
