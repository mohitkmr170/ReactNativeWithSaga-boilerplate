import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Shadow from './Shadow';
import {hexToHsl, hslToHex} from './utils';
import LinearGradient from 'react-native-linear-gradient';
import {MetricSizes} from '@/Themes';

const NeuView = (props: any) => {
  const {
    color = '#444444',
    width = 100,
    height = 100,
    radius = 0,
    children,
    customLightShadow = {},
    customDarkShadow = {},
    customInsetLightShadow = {},
    customInsetDarkShadow = {},
    customGradient,
    borderRadius = 0,
    inset,
    convex,
    concave,
    style = {},
    containerStyle,
    noShadow,
  } = props;

  const {h, s, l} = hexToHsl(color);
  const light = '#FFFFFF'; //hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5)
  const dark = '#D1D9E6';
  const mid = hslToHex(h, s, l - 5 < 0 ? 0 : l - 5);

  const lightSetting = {
    width,
    height,
    blur: MetricSizes.ms20,
    spread: 0,
    borderRadius,
    radius,
    color: inset ? '#D1D9E6' : light,
    offsetX: inset ? -2 : -MetricSizes.ms5,
    offsetY: inset ? -2 : -MetricSizes.ms5,
    opacity: 1,
    ...customLightShadow,
  };

  const darkSetting = {
    width,
    height,
    blur: MetricSizes.ms13,
    spread: 0,
    radius,
    color: inset ? light : '#D1D9E6',
    borderRadius,
    offsetX: inset ? 2 : MetricSizes.ms5,
    offsetY: inset ? 2 : MetricSizes.ms5,
    opacity: 0.45,
    ...customDarkShadow,
  };

  const insetLightSetting = {
    width,
    height,
    blur: MetricSizes.ms10,
    spread: 0,
    borderRadius,
    radius,
    color: '#D1D9E6',
    offsetX: -3,
    offsetY: -3,
    opacity: 1,
    ...customInsetDarkShadow,
  };

  const insetDarkSetting = {
    width: width + 2,
    height: height + 2,
    blur: MetricSizes.ms10,
    spread: 1,
    radius,
    color: light,
    borderRadius,
    offsetX: 0,
    offsetY: 0,
    opacity: 1,
    ...customInsetLightShadow,
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    view: {
      width,
      height,
      borderRadius,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const renderComposed = children => {
    if (concave) {
      return (
        <>
          <LinearGradient
            colors={customGradient ? customGradient : [mid, light]}
            useAngle={true}
            angle={145}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{
              borderRadius,
            }}>
            <View
              style={{
                ...styles.view,
                ...containerStyle,
                backgroundColor: 'transparent',
              }}>
              {children}
            </View>
          </LinearGradient>
        </>
      );
    }

    if (convex) {
      return (
        <>
          <LinearGradient
            colors={customGradient ? customGradient.reverse() : [light, mid]}
            useAngle={true}
            angle={145}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{
              borderRadius,
            }}>
            <View
              style={{
                ...styles.view,
                ...containerStyle,
                backgroundColor: 'transparent',
              }}>
              {children}
            </View>
          </LinearGradient>
        </>
      );
    }

    return (
      <>
        <View
          style={{
            ...styles.view,
            ...containerStyle,
          }}>
          {children}
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}>
      {!noShadow && (
        <>
          <Shadow setting={inset ? insetDarkSetting : lightSetting} />
          <Shadow setting={inset ? insetLightSetting : darkSetting} />
        </>
      )}
      {renderComposed(children)}
    </View>
  );
};

NeuView.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  radius: PropTypes.number,
  customLightShadow: PropTypes.object,
  customDarkShadow: PropTypes.object,
  borderRadius: PropTypes.number,
  customGradient: PropTypes.array,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  inset: PropTypes.bool,
  convex: PropTypes.bool,
  concave: PropTypes.bool,
  noShadow: PropTypes.bool,
};

export default NeuView;
