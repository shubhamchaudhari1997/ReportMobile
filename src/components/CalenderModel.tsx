import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../theme';
import {fontsProxima} from '../theme/typography';
import {Icon} from './Icons';
import DTSelector from './DTSelector';
import moment from 'moment';
import getFormatedDate from '../utils/dateHandler';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

type CalenderModelProps = {
  isModalVisible: boolean;
  onSubmit: () => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  backgroundColor?: string;
};
const CalenderModel: React.FC<CalenderModelProps> = ({
  isModalVisible,
  onSubmit,
  setIsModalVisible,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  backgroundColor,
}) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const translateY = useRef(new Animated.Value(300)).current; // Start modal from below the screen
  const opacity = useRef(new Animated.Value(0)).current; // Start with 0 opacity
  useEffect(() => {
    animateModal(isModalVisible);
  }, [isModalVisible]);
  //Animation Code For  CalenderModel
  const animateModal = (show: boolean) => {
    if (show) {
      // Animate modal in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate modal out
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 300,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  const closeModel=()=>{
    // setLocalStartDate(startDate)
    // setLocalEndDate(endDate)
    setIsModalVisible(!isModalVisible);
  }
  const submitHandler=()=>{
    setStartDate(localStartDate);
    setEndDate(localEndDate);
    onSubmit();

  }
  return (
    <View>
      <Modal transparent statusBarTranslucent visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.SubContainer,
              {
                transform: [{translateY}], // Slide up animation
                opacity: opacity, // Fade animation
              },
            ]}>
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle}>
                {'Select Start And End Date'}
              </Text>
              <Icon
                type="MaterialCommunityIcons"
                name="close"
                onPress={()=>closeModel()}
                style={{
                  fontSize: 20,
                  color: COLORS.danger_900,
                  marginHorizontal: 5,
                  marginLeft: 25,
                  // alignSelf: 'flex-end',
                }}
              />
            </View>
            <View style={{width: 300, flexDirection: 'column'}}>
              <DTSelector
                // minDate={new Date()}
                maxDate={new Date(localEndDate)}
                label="Start date *"
                onChangeText={newDate => {
                  setLocalStartDate(getFormatedDate(newDate, 'YYYY-MM-DD'));
                }}
                value={localStartDate}
                placeholder="Select Start date *"
                mode="date"
              />
              <DTSelector
                // minDate={new Date()}
                minDate={new Date(localStartDate)}
                maxDate={new Date()}
                label="End date *"
                onChangeText={newDate => {
                  setLocalEndDate(getFormatedDate(newDate, 'YYYY-MM-DD'));
                }}
                value={localEndDate}
                placeholder="Select End date*"
                mode="date"
              />
            </View>
            <TouchableOpacity
              onPress={() => submitHandler()}
              style={[styles.submitButton, {backgroundColor}]}
              disabled={startDate && endDate ? false : true}>
              <Text style={{color: COLORS.primaryColor, fontWeight: 'bold'}}>
                {'Submit'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default CalenderModel;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubContainer: {
    padding: 20,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: fontsProxima.regular,
    paddingVertical: 10,
    fontSize: 18,
    alignSelf: 'center',
  },
  submitButton: {
    // backgroundColor: COLORS.accentColor,
    padding: 10,
    borderRadius: 10,
    width: WIDTH / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
