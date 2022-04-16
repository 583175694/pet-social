import { Dimensions } from 'react-native';
import { Text } from '@fower/react-native';
import { setConfig } from '@fower/core';

export const { width: windowWidth } = Dimensions.get('window');

export function scale(value) {
  // see src/components/ViewUtil scale function
  return (windowWidth / 375) * value;
}

export function setFowerTransform(scaleFunc = scale) {
  /**
   * !important
   * @fower/react-native 只有在使用其导出时才加载(rn 模块机制的问题, 延迟加载？)，导致之前设置的 config 无效
   * @fower/react-native 内部会重置为预设配置, 这里先打印 Text 提前执行再覆盖其配置
   */
  console.log(Text);
  setConfig({
    unit: '', // default none, set empty to make transformUnit work
    transformUnit(value) {
      // console.log('transformUnit', value, typeof value);
      return scaleFunc(value);
    },
  });
}
