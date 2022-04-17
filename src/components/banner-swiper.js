import React from 'react';
import Swiper from 'react-native-swiper';
import { Image } from '@fower/react-native';
import { StyleSheet } from 'react-native';

export default function BannerSwiper({ list }) {
  if (!list || list.length === 0) {
    return <Image w-343 h-343 rounded-4 source={require('../assets/img_lazy_l.png')} />;
  }

  return (
    <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
      {list.map((item) => {
        return <Image w-343 h-343 source={{ uri: item.url }} resizeMode="cover" />;
      })}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
