export const articleHome = {
  code: 0,
  message: 'success',
  data: {
    pageNum: 1,
    pageSize: 5,
    total: 20,
    dataList: [
      {
        articleServiceVO: {
          id: 1,
          publishTime: '',
          publishBannerFileList: [
            {
              id: 1,
              name: 'banner',
              size: 'xx',
              url: 'https://images.dog.ceo/breeds/newfoundland/n02111277_7225.jpg',
            },
          ],
        },
        userSearchVO: {
          account: '',
          name: 'Melissa Berry',
          iconUrl:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.crcz.com%2Fallimg%2F201912%2F27%2F1577459321110815.jpg&refer=http%3A%2F%2Fimg.crcz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652761693&t=6d00dc9ef1ee40c9170772c117b99a8e',
        },
      },
      {
        articleServiceVO: {
          id: 2,
          publishTime: '',
          publishBannerFileList: [
            {
              id: 1,
              name: 'banner',
              size: 'xx',
              url: 'https://images.dog.ceo/breeds/bulldog-boston/n02096585_3697.jpg',
            },
          ],
        },
        userSearchVO: {
          account: '',
          name: 'Gerald Gutierrez',
          iconUrl:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.crcz.com%2Fallimg%2F201912%2F27%2F1577459321825478.jpg&refer=http%3A%2F%2Fimg.crcz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652761693&t=ccb48f66db9afa494abc6511472eefd8',
        },
      },
      {
        articleServiceVO: {
          id: 3,
          publishTime: '',
          publishBannerFileList: [
            {
              id: 1,
              name: 'banner',
              size: 'xx',
              url: 'https://images.dog.ceo/breeds/pug/n02110958_14311.jpg',
            },
          ],
        },
        userSearchVO: {
          account: '',
          name: 'Bartholomew',
          iconUrl:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F1a2302969006x167989968b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652761693&t=8c8463a37840cb0e75a1073ff22c46ee',
        },
      },
    ],
  },
};

export const articleDetail = {
  code: 0,
  message: 'success',
  data: {
    articleVO: {
      id: 1,
      userId: 2,
      publishTime: 'xxx',
      publishBannerFileList: [
        {
          id: 1,
          name: 'xxx',
          size: '',
          url: 'https://images.dog.ceo/breeds/pug/n02110958_14311.jpg',
        },
        {
          id: 1,
          name: 'xxx',
          size: '',
          url: 'https://images.dog.ceo/breeds/stbernard/n02109525_3531.jpg',
        },
        {
          id: 1,
          name: 'xxx',
          size: '',
          url: 'https://images.dog.ceo/breeds/hound-blood/n02088466_4169.jpg',
        },
      ],
      publishContent:
        "Consider… YOU. In all time before now and in all time to come, there has never been and will never be anyone just like you. You are unique in the entire history and future of the universe. Wow! Stop and think about that. You're better than one in a million, or a billion, or a gazillion…",
      updateTime: '60 mins ago',
    },
    articleStatisticsVO: {
      articleId: 1,
      likeUserCounter: 156,
      shareUserCounter: 89,
      commentCounter: 615,
    },
    userSearchVO: {
      account: 'xxx',
      name: 'Gerald Gutierrez',
      iconUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.crcz.com%2Fallimg%2F201912%2F27%2F1577459321110815.jpg&refer=http%3A%2F%2Fimg.crcz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652761693&t=6d00dc9ef1ee40c9170772c117b99a8e',
    },
  },
};
