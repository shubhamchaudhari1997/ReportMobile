import React from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../theme';
import {Icon} from './Icons';

type CustomApproveRejectButton = {
  item: any;
  label?: string;
  isPendingStatus: boolean;
  isRejected: boolean;
  isCardLoading?: boolean;
  onChangeStatus: (item: any, status?: string) => void;
};

const CustomApproveRejectButton: React.FC<CustomApproveRejectButton> = ({
  item,
  label,
  isPendingStatus,
  isRejected,
  isCardLoading,
  onChangeStatus,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.secondaryColorLight}}>
        {label ? label + ':' : null}
      </Text>
      {isCardLoading ? (
        <ActivityIndicator
          color={COLORS.new}
          style={{paddingLeft: 5}}
          size={'small'}></ActivityIndicator>
      ) : (
        <View style={styles.subContainer}>
          {isPendingStatus ? (
            <>
              <Icon
                type="FontAwesome"
                name="check-circle"
                color={COLORS.greenLightShade}
                onPress={() => onChangeStatus(item, 'Rejected')}
                size={22}
              />
              <Icon
                type="FontAwesome"
                name="times-circle"
                color={COLORS.danger}
                onPress={() => onChangeStatus(item, 'Approve')}
                size={22}
              />
            </>
          ) : (
            <View style={styles.switchContainer}>
              <TouchableOpacity
                style={[
                  styles.switch,
                  isRejected ? styles.switchDisable : styles.switchEnabled,
                ]}
                onPress={() => onChangeStatus(item)}>
                <Animated.View
                  style={[
                    styles.thumb,
                    {
                      transform: [{translateX: isRejected ? 29 : -1}],
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomApproveRejectButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 0.3,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 0.2,
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    width: 50,
    height: 20,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  switchEnabled: {
    backgroundColor: COLORS.greenLightShade,
  },
  switchDisable: {
    backgroundColor: COLORS.danger,
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 10.5,
    backgroundColor: COLORS.primaryColor,
  },
});
