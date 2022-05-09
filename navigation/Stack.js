import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../components/Detail';

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
