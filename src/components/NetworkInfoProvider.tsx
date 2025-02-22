import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Icon} from '@rneui/base';
import {COLORS} from '../theme';
import {networkError} from '../constant/images';

type NetworkProps = {
  // isConnected:boolean
};

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const NetworkInfoProvider: React.FC<NetworkProps> = props => {
  const [isConnected, setIsConnected] = useState(true);
  const [refreshPress, setRefreshPress] = useState(false);
  const [firstLogin, setFirstLogin] = useState(0);

  useEffect(() => {
    const unSubScribe = NetInfo.addEventListener((ele: any) => {
      setIsConnected(ele?.isConnected);
      setFirstLogin(val => val + 1);
    });

    return () => {
      unSubScribe();
    };
  }, [refreshPress]);

  return (
    <Modal transparent statusBarTranslucent visible={!isConnected}>
      <View style={styles.modalContainer}>
        <View style={styles.mainContainer}>
          <Image
            source={{uri: networkError}}
            style={{height: 200, width: WIDTH / 1.5}}
          />
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle}>No internet connection</Text>
            <Icon
              size={20}
              color={COLORS.secondaryColorLight}
              name={'wifi-off'}
              type={'Feather'}
            />
          </View>
          <Pressable
            style={styles.refreshButton}
            onPress={() => setRefreshPress(!refreshPress)}>
            <Text style={{color: COLORS.primaryColor, fontWeight: 'bold'}}>
              Refresh
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default NetworkInfoProvider;
const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    padding: 20,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    paddingVertical: 10,
    fontSize: 18,
    alignSelf: 'center',
    color: COLORS.secondaryColorLight,
    marginRight: 10,
  },
  refreshButton: {
    backgroundColor: COLORS.accentColor,
    padding: 10,
    borderRadius: 10,
    width: WIDTH / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
