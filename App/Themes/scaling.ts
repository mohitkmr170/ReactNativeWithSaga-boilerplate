import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters/extend';

export default {
  hs: (value: number) => {
    return scale(value);
  },
  vs: (value: number) => {
    return verticalScale(value);
  },
  ms: (value: number, factor: number = 0.5) => {
    return moderateScale(value, factor);
  },
};
