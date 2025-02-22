import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

import {COLORS} from '../theme';
import {fontsProxima} from '../theme/typography';

type customTopTabButtonProps = {
  name: string;
  onPress: (item: any) => any;
  length: number;
  data: any;
};

const CustomTopTabButton: React.FC<customTopTabButtonProps> = ({
  name,
  onPress,
  length,
  data,
}) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          onPress(name);
        }}>
        <View
          style={[
            styles.button,
            data === name
              ? {backgroundColor: COLORS.new}
              : {
                  backgroundColor: COLORS.primaryColor,
                  borderWidth: 1,
                  borderColor: COLORS.chipe,
                },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={[
                  {
                    fontSize: 14,
                    fontFamily: fontsProxima.bold,
                    color: COLORS.new,
                  },
                  data === name && {
                    color: COLORS.primaryColor,
                  },
                ]}>
                {`${name} ${length || ''}`}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomTopTabButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 0,
  },
});
