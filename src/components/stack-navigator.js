import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import FeedDetail from '../pages/feed-detail';
import Feed from '../pages/feed';
import Profile from '../pages/profile';
import ProfileEdit from '../pages/edit-profile';
import MomentCreate from '../pages/moment-create';
import Splash from '../pages/splash';
import SignIn from '../pages/sign-in';
import ResetPassword from '../pages/reset-password';
import ResetNewPassword from '../pages/reset-new-password';
import Register from '../pages/register';
import DrawerContent from './drawer-content';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="FeedDetail" component={FeedDetail} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
      <Stack.Screen name="MomentCreate" component={MomentCreate} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ResetNewPassword" component={ResetNewPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
