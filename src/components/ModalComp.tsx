import {Icon} from '@rneui/themed';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS} from '../theme';
import {fontsProxima} from '../theme/typography';

const {width} = Dimensions.get('screen');

type ModalCompProps = {
  visible: boolean;
  onModalToggle: () => void;
  children: any;
  header: string;
  onRequestClose?: () => void;
  isFixed?: boolean;
  crossvisible?: boolean;
};

const ModalComp = ({
  visible,
  onModalToggle,
  children,
  header,
  onRequestClose,
  isFixed,
  crossvisible,
}: ModalCompProps) => {
  return (
    <Modal
      onRequestClose={isFixed ? onRequestClose : onModalToggle}
      statusBarTranslucent
      transparent
      visible={visible}>
      <KeyboardAvoidingView behavior="padding" style={styles.modalView}>
        <TouchableOpacity
          onPress={isFixed ? onRequestClose : onModalToggle}
          style={{flex: 1}}></TouchableOpacity>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={isFixed ? onRequestClose : onModalToggle}
            style={crossvisible ? styles.iconContainer : styles.headerView}>
            <Text style={styles.header}>{header}</Text>

            {crossvisible ? (
              <View>
                <Icon
                  style={{marginHorizontal: 10}}
                  color={COLORS.danger}
                  onPress={isFixed ? onRequestClose : onModalToggle}
                  size={22}
                  name="cross"
                  type="entypo"></Icon>
              </View>
            ) : (
              <Icon
                style={{marginHorizontal: 10}}
                color={COLORS.secondaryColor}
                onPress={isFixed ? onRequestClose : onModalToggle}
                size={24}
                name="chevron-down"
                type="material-community"></Icon>
            )}
          </TouchableOpacity>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {flex: 1, backgroundColor: COLORS.secondaryColorLight},
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.primaryColor,
    overflow: 'hidden',
    maxHeight: '90%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerView: {
    justifyContent: 'center',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: COLORS.primaryColor,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: fontsProxima.bold,
    color: COLORS.new,
  },
  subHeader: {
    fontSize: 12,
    fontFamily: fontsProxima.regular,
    marginVertical: 2,
    opacity: 0.4,
  },
  header: {
    fontSize: 16,
    fontFamily: fontsProxima.bold,
    paddingVertical: 5,
  },
});

export default React.memo(ModalComp);
