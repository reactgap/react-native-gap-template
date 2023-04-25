import React from 'react';
import FastImage, { ImageStyle, ResizeMode, Source } from 'react-native-fast-image';

interface Props {
  image: string | any | Source;
  style: ImageStyle | any;
  resizeMode: ResizeMode;
  prefixUrl: string;
}

const CacheImage = (props: Props) => {
  const { image, style, resizeMode = FastImage.resizeMode.contain, prefixUrl } = props;

  switch (typeof image) {
    case 'string':
      return (
        <FastImage
          {...{ style }}
          source={{
            uri: image,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={resizeMode}
        />
      );
    case 'object':
      const { fileId } = image || {};
      const url = `${prefixUrl}/${fileId}`;
      const source = {
        uri: url,
        headers: {},
      };
      return <FastImage {...{ style, source }} resizeMode={resizeMode} />;
    default:
      return null;
  }
};

export default CacheImage;
