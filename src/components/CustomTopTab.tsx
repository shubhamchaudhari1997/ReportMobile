import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../theme';
import CTSmallButton from './CTSmallButton';

type CustomTopTabProps = {
  tabs: {title: string; index: number}[];
  activeIndex: number;
  onTabChange?: (index: number) => void;
  touchDisabled?: boolean;
  changeStyle?: boolean;
};

const CustomTopTab: React.FC<CustomTopTabProps> = ({
  tabs,
  activeIndex,
  onTabChange = () => null,
  touchDisabled = false,
  changeStyle = false,
}) => {
  return (
    <View style={[changeStyle ? styles.tabContainer : styles.container]}>
      {tabs.map(tab => (
        <CTSmallButton
          disabled={touchDisabled}
          key={tab.index}
          title={tab.title}
          onPress={() => onTabChange(tab.index)}
          active={activeIndex === tab.index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    backgroundColor: COLORS.primaryColor,
    padding: 5,
    borderRadius: 30,
    elevation: 3,
    marginVertical: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginHorizontal: 30,
    backgroundColor: COLORS.primaryColor,
    padding: 5,
    borderRadius: 30,
    // elevation: 3,
    marginVertical: 3,
  },
});

export default memo(CustomTopTab);
