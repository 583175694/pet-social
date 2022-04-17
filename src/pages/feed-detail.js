/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 18:18:51
 * @Desc: 文章详情
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from '@fower/react-native';
import NavBar from '../components/nav-bar';
import Colors from '../utils/colors';
import BannerSwiper from '../components/banner-swiper';
import { getArticleDetail } from '../api/store/article/get-article-detail';
import { getTimeAgo } from '../utils/get-time-ago';
import { getArticleLikes } from '../api/store/article/get-article-likes';
import { getArticleCommits } from '../api/store/article/get-article-commits';
import { publishCommit } from '../api/store/article/publish-commit';
import { giveLike } from '../api/store/article/give-like';

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
function RenderfeedDetail({ article, user, likes }) {
  return (
    <View pl-16 pr-16 mt-8>
      <View row toCenterY>
        <Image
          w-32
          h-32
          rounded-32
          source={user.iconUrl !== null ? { uri: user.iconUrl } : require('../assets/avatar_default.png')}
        />
        <View ml-8>
          <Text mb-4 text-12 color={Colors.title}>
            {user.name}
          </Text>
          <Text text-10 color={Colors.subtitle}>
            {getTimeAgo(article.publishTime)}
          </Text>
        </View>
        <View flex={1} toRight>
          {likes &&
            likes.map((item, index) => {
              return (
                <Image
                  w-24
                  h-24
                  rounded-32
                  mr-8
                  source={item.iconUrl !== null ? { uri: item.iconUrl } : require('../assets/avatar_default.png')}
                />
              );
            })}
        </View>
      </View>
      <View mt-16 w-343 h-343>
        {/* banner */}
        <BannerSwiper list={article.publishBannerFileList} />
      </View>
      <View mt-16>
        <Text text-12 color={Colors.title} opacity-80>
          {article.publishContent}
        </Text>
        <View row mt-16 mb-16>
          <Image w-12 h-16 mr-10 source={require('../assets/icon_location.png')} />
          <Text text-12 color={Colors.title} opacity-80>
            Guangdong Shenzhen
          </Text>
        </View>
      </View>
    </View>
  );
}

// 统计信息
function RenderStat({ statistics, setFeedDetailData, articleId }) {
  async function onGiveLike() {
    const results = await giveLike(articleId);
    const detailRes = await getArticleDetail(articleId);
    console.log(results);
    if (results.message === 'success') {
      setFeedDetailData(detailRes.data);
    }
  }
  return (
    <View h-52 borderTop-1 borderBottom-1 borderColor={Colors.border} toCenterY>
      <TouchableOpacity activeOpacity={0.8} onPress={onGiveLike}>
        <View row toCenter w-186>
          <Image w-20 h-20 mr-8 source={require('../assets/icon_heart_default.png')} />
          <Text text-12 color={Colors.title} opacity-80>
            {statistics.likeUserCounter}
          </Text>
        </View>
      </TouchableOpacity>
      <View w-1 h-52 bg={Colors.border} />
      <View row toCenter w-186>
        <Image w-20 h-20 mr-8 source={require('../assets/icon_share.png')} />
        <Text text-12 color={Colors.title} opacity-80>
          {statistics.shareUserCounter}
        </Text>
      </View>
    </View>
  );
}

// 评论列表
function RenderCommitList({ statistics, commits }) {
  return (
    <View pl-16 pr-16 mt-16>
      <View row toBetween>
        <Text text-10 color={Colors.title}>
          {statistics.commentCounter} Comments
        </Text>
        <Text text-10 color={Colors.red}>
          View All
        </Text>
      </View>
      <View mt-16>
        {commits &&
          commits.map((item, index) => {
            return (
              <View column mb-24>
                <View row toCenterY>
                  <Image
                    w-24
                    h-24
                    rounded-24
                    source={item.iconUrl ? { uri: item.iconUrl } : require('../assets/avatar_default.png')}
                  />
                  <Text text-12 color={Colors.title} ml-8>
                    {item.userId}
                  </Text>
                  <View flex={1} toRight>
                    <Text text-10 color={Colors.subtitle}>
                      {getTimeAgo(item.createTime)}
                    </Text>
                  </View>
                </View>
                <View ml-32 mt-3>
                  <Text text-10 color={Colors.title}>
                    {item.content}
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
function RenderCommitInput({ articleId, setFeedCommits }) {
  const [commit, setCommit] = React.useState('');

  async function onPublishCommit() {
    const results = await publishCommit(articleId, commit);
    const commitsRes = await getArticleCommits(articleId, 1, 10);

    if (results.message === 'success') {
      setCommit('');
      setFeedCommits(commitsRes.data);
    }
  }

  return (
    <View h-48 toCenterY pl-16 pr-16>
      <View flex={1}>
        <TextInput
          text-10
          multiline
          numberOfLines={4}
          onChangeText={(text) => setCommit(text)}
          placeholder="Write Comment…."
          placeholderTextColor={Colors.subtitle}
          value={commit}
          editable
          maxLength={800}
        />
      </View>
      <Image w-20 h-20 rounded-20 ml-16 mr-14 source={require('../assets/icon_expression.png')} />
      <TouchableOpacity activeOpacity={0.8} onPress={onPublishCommit}>
        <Image w-32 h-32 rounded-32 source={require('../assets/icon_input.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default function FeedDetail(props) {
  const { navigation, route } = props;
  const [feedDetailData, setFeedDetailData] = useState(null);
  const [feedLikes, setFeedLikes] = useState([]);
  const [feedCommits, setFeedCommits] = useState([]);
  const articleId = useRef(route.params.id).current;

  useEffect(() => {
    async function dataFetch() {
      const detailRes = await getArticleDetail(articleId);
      if (detailRes.message === 'success') {
        setFeedDetailData(detailRes.data);
      }
      const likesRes = await getArticleLikes(articleId);
      if (likesRes.message === 'success') {
        setFeedLikes(likesRes.data);
      }

      const commitsRes = await getArticleCommits(articleId, 1, 10);
      if (commitsRes.message === 'success') {
        setFeedCommits(commitsRes.data);
      }
    }
    dataFetch();
  }, [articleId]);

  return (
    <SafeAreaView flex={1}>
      <NavBar
        titleItem={() => RenderTitleItem()}
        leftItem={() => RenderLeftItem({ navigation })}
        rightItem={() => RenderRightItem()}
      />
      {feedDetailData === null ? (
        <View />
      ) : (
        <ScrollView>
          <RenderfeedDetail
            article={feedDetailData.articleVO}
            user={feedDetailData.userSearchVO}
            likes={feedLikes.dataList}
          />
          <RenderStat
            statistics={feedDetailData.articleStatisticsVO}
            articleId={articleId}
            setFeedDetailData={setFeedDetailData}
          />
          <RenderCommitList statistics={feedDetailData.articleStatisticsVO} commits={feedCommits.dataList} />
        </ScrollView>
      )}
      <RenderCommitInput articleId={articleId} setFeedCommits={setFeedCommits} />
    </SafeAreaView>
  );
}
