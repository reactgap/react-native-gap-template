import { moderateScale as moderateScaleSize } from 'react-native-size-matters';

export function moderateScale(number: number, factor?: number): number {
  return moderateScaleSize(number, factor);
}
