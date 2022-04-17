/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 17:47:13
 * @Desc: 首页 - 文章列表
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from '@fower/react-native';
import Colors from '../utils/colors';
import NavBar from '../components/nav-bar';
import MomentBtn from '../components/moment-btn';
import { articleHome } from '../api/mock/article';
import { getArticleList } from '../api/store/article/get-article-list';
import { getAuthorization } from '../utils/storage';
import { getTimeAgo } from '../utils/get-time-ago';

function RenderTitleItem() {
  return (
    <Text color={Colors.title} text-16>
      My Feed
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

function RenderRightItem() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image w-20 h-20 source={require('../assets/icon_search.png')} />
    </TouchableOpacity>
  );
}

export default function Feed(props) {
  const { navigation } = props;
  const [articles, setArticles] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = useRef(10).current;

  useEffect(() => {
    const getFetch = async () => {
      try {
        // console.log(await getAuthorization());
        const results = await getArticleList({ pageNum, pageSize });
        setArticles(results.data.dataList);
      } catch (e) {
        // error reading value
      }
    };
    getFetch();
  }, [pageNum, pageSize]);

  return (
    <SafeAreaView flex={1} bg={Colors.white} relative>
      <NavBar
        titleItem={() => RenderTitleItem()}
        leftItem={() => RenderLeftItem({ navigation })}
        rightItem={() => RenderRightItem()}
      />
      <ScrollView pl-16 pr-16>
        {articles.map((item, index) => {
          // banner
          const bannerList = item.articleServiceVO.publishBannerFileList;
          // avatar
          const avatar = item.userSearchVO.iconUrl;
          // time ago
          const timeAgo = getTimeAgo(item.articleServiceVO.publishTime);
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              w-343
              h-210
              mb-16
              onPress={() => navigation.navigate('FeedDetail', { id: item.articleServiceVO.id })}
            >
              <Image
                w-343
                h-160
                rounded-4
                source={bannerList.length !== 0 ? { uri: bannerList[0] } : require('../assets/img_lazy.png')}
              />
              <View row toCenterY mt-8>
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
                <View flex={1} toRight>
                  <Image w-20 h-18 rounded-32 mr-6 source={require('../assets/icon_heart_active.png')} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <MomentBtn navigation={navigation} />
    </SafeAreaView>
  );
}
