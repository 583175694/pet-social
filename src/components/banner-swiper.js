import React from 'react';
import Swiper from 'react-native-swiper';
import { Image } from '@fower/react-native';

export default function BannerSwiper({ list }) {
  if (!list || list.length === 0) {
    return <Image w-343 h-343 rounded-4 source={require('../assets/img_lazy_l.png')} />;
  }

  return (
    <Swiper showsButtons={false} showsPagination={false}>
      {list.map((item) => {
        return <Image w-343 h-343 source={{ uri: item.url }} resizeMode="cover" key={item.id} />;
      })}
    </Swiper>
  );
}
