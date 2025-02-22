import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

type Orientation = 'portrait' | 'landscape';

type DimensionType = {
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xLarge: number;
  };
  customSize: (value: number) => number;

  screenHeight: number;
  screenWidth: number;
  orientation: Orientation;
};

const dimensions = React.createContext<DimensionType>({
  fontSize: {
    large: 0,
    medium: 0,
    small: 0,
    xLarge: 0,
  },
  customSize: (value) => 0,
  screenHeight: 0,
  screenWidth: 0,
  orientation: 'portrait',
});

const {width: initailWidth, height: initailHeight} = Dimensions.get('window');

const getXLarge = (width: number, height: number) => {
  height = width > height ? width : height;
  if (height < 700) {
    return 18;
  }
  return 20;
};

const getLarge = (width: number, height: number) => {
  height = width > height ? width : height;
  if (height < 700) {
    return 16;
  }
  return 18;
};

const getMedium = (width: number, height: number) => {
  height = width > height ? width : height;
  if (height < 700) {
    return 14;
  }
  return 16;
};

const getSmall = (width: number, height: number) => {
  height = width > height ? width : height;
  if (height < 700) {
    return 12;
  }
  return 14;
};

const DimensionProvider: React.FC<{}> = ({children}) => {
  const [xLargeFont, setXLargeFont] = useState(
    getXLarge(initailWidth, initailHeight),
  );
  const [largeFont, setLargeFont] = useState(
    getLarge(initailWidth, initailHeight),
  );
  const [mediumFont, setMediumFont] = useState(
    getMedium(initailWidth, initailHeight),
  );
  const [smallFont, setSmallFont] = useState(
    getSmall(initailWidth, initailHeight),
  );
  const [screenHeight, setScreenHeight] = useState(initailHeight);
  const [screenWidth, setScreenWidth] = useState(initailWidth);
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  useEffect(() => {
    Dimensions.addEventListener('change', (newDimensions) => {
      const {width, height} = newDimensions.window;
      setXLargeFont(getXLarge(initailWidth, initailHeight));
      setLargeFont(getLarge(initailWidth, initailHeight));
      setMediumFont(getMedium(initailWidth, initailHeight));
      setSmallFont(getSmall(initailWidth, initailHeight));

      setScreenHeight(height);
      setScreenWidth(width);
      setOrientation(width < height ? 'portrait' : 'landscape');
    });
  }, []);

  const getCustomSize = (value: number) => {
    if (screenHeight < 700) {
      value -= 2;
    }
    if (screenHeight < 800) {
      value -= 2;
    }
    return value;
  };

  return (
    <dimensions.Provider
      value={{
        fontSize: {
          xLarge: xLargeFont,
          large: largeFont,
          medium: mediumFont,
          small: smallFont,
        },
        customSize: getCustomSize,
        screenHeight,
        screenWidth,
        orientation,
      }}>
      {children}
    </dimensions.Provider>
  );
};

export {dimensions};

export default DimensionProvider;
