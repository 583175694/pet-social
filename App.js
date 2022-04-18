import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/stack-navigator';
import { setFowerTransform } from './src/utils/view-util';
import { navigationRef } from './src/utils/root-navigation';

import('./src/utils/reactotron-config').then(() => console.log('Reactotron Configured'));

setFowerTransform();

const theme = {
  colors: {
    background: '#FFFFFF',
  },
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
