import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import {MetricSizes} from '@/Themes';
import {NavigationContainerName} from '@/Utils';

export function Header(props: any) {
  const route = useRoute();

  const renderLeftItem = () => {
    switch (_.get(route, 'name', '')) {
      case NavigationContainerName.HomeScreen:
        return (
          <TouchableOpacity>
            <Icon name="arrow-back" size={MetricSizes.ms28} />
          </TouchableOpacity>
        );
      default:
        return <View style={{height: 48, width: 48}} />;
    }
  };

  const renderCenterItem = () => {
    switch (_.get(route, 'name', '')) {
      default:
        return <View style={{height: 48, width: 48}} />;
    }
  };

  const renderRightItem = () => {
    switch (_.get(route, 'name', '')) {
      default:
        return <View style={{height: 48, width: 48}} />;
    }
  };

  return (
    <>
      <View style={{...styles.parentContainer, ...props.customStyles}}>
        {renderLeftItem()}
        {renderCenterItem()}
        {renderRightItem()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: MetricSizes.ms16,
  },
});
