import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/stack-navigator';
import { setFowerTransform } from './src/utils/view-util';

setFowerTransform();

const theme = {
  colors: {
    background: '#FFFFFF',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
