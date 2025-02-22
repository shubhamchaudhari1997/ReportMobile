import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation<any>();
  const nav = () => {
    navigation.navigate('ButtomTabs');
  };
  return (
    <View>
      <Text>Profile</Text>
      <Text onPress={nav}>Back to Bottom Tabs</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
