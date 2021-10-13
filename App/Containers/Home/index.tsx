import React from 'react';
import {View, Text} from 'react-native';
import {Header} from '@/Components';
import {styles} from './styles';

export const HomeScreen = () => {
  return (
    <View style={styles.parentContainer}>
      <Header />
      <View style={styles.mainContainer}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
};
