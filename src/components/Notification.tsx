import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Notifications = () => {
  const navigation = useNavigation<any>();
  const nav = () => {
    navigation.navigate('ButtomTabs');
  };
  return (
    <View>
      <Text>Notification</Text>
      <Text onPress={nav}>Back to buttom tabs</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
