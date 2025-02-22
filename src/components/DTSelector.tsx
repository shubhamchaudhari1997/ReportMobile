import {Icon} from '../components/Icons';
import {COLORS} from '../constant/colors';
import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {fontsProxima} from '../theme/typography';
import CDText from './core/CDText';
// import { fontsProxima } from '';

type BlurType = (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

type DTSelectorIProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string, originalDate?: any) => void;
  editable?: boolean;
  label: string;
  error?: any;
  mode?: 'date' | 'time' | 'datetime';
  maxDate?: any;
  minDate?: any;
  testID?: string;
};

const DTSelector: React.FC<DTSelectorIProps> = React.memo(
  ({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    mode,
    maxDate,
    minDate,
    editable = true,
    testID,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    let apiTime: boolean = false;

    if (value && mode === 'time') {
      apiTime = value?.toString().includes('T');
    }

    const formatedVal = !value
      ? ''
      : mode === 'date'
      ? moment(value).format('MMMM, ddd D YYYY')
      : apiTime
      ? moment(value).format('hh:mm A')
      : moment(value, 'hh:mm:ss').format('hh:mm A');

    const onFocus = () => {
      if (!editable) {
        return;
      }
      setIsFocused(true);
    };

    const onDateTimeSelect = (date: Date) => {
      setIsFocused(false);

      onChangeText(date.toISOString(), date);
    };

    const LabelComponent = () => {
      return (
        <View style={styles.lableContainer}>
          <CDText style={[styles.label, isFocused ? styles.opacity_6 : null]}>
            {label}
          </CDText>
        </View>
      );
    };

    const ErrorComponent = () => {
      if (!error) {
        return null;
      }

      return (
        <View style={styles.error}>
          <Text style={[styles.label, styles.opacity_6, styles.color_danger]}>
            {error}
          </Text>
        </View>
      );
    };

    const DateTimePickerComponent = () => {
      return (
        <DateTimePicker
          mode={mode}
          is24Hour={false}
          isVisible={isFocused}
          onConfirm={onDateTimeSelect}
          onCancel={() => {
            setIsFocused(false);
          }}
          maximumDate={maxDate}
          minimumDate={minDate}
          isDarkModeEnabled={true}
          {...(mode === 'date' ? {date: new Date(value)} : {})}
        />
      );
    };

    return (
      <View style={styles.container}>
        <LabelComponent />
        <TouchableOpacity
          style={[
            styles.selector,
            isFocused ? styles.border : null,
            !editable
              ? {
                  backgroundColor: 'rgba(0,0,0,0.03)',
                }
              : null,
          ]}
          onPress={onFocus}>
          <TextInput
            editable={false}
            testID={testID + '_val'}
            placeholder={placeholder}
            value={formatedVal}
            style={[
              styles.text,
              {flex: 1, color: 'rgba(0,0,0,0.8)'},
              !editable
                ? {
                    color: COLORS.text_basic,
                  }
                : null,
            ]}
          />
          <Icon
            testID={testID}
            type="Ionicons"
            size={25}
            // name={mode === 'date' ? 'md-calendar' : 'md-time-outline'}
            name={mode === 'date' ? 'calendar' : 'time-outline'}
            style={[
              styles.icon,
              isFocused ? styles.opacity_6 : styles.opacity_3,
            ]}
          />
          <DateTimePickerComponent />
        </TouchableOpacity>
        <ErrorComponent />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: '6%',
    paddingVertical: 5,
    marginVertical: '1%',
    // backgroundColor: COLORS.chipe,
    borderRadius: 5,
  },
  selector: {
    paddingHorizontal: 10,
    paddingEnd: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondaryColor,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fontsProxima.regular,
    fontSize: 10,
    opacity: 0.8,
    padding: 0,
  },
  lableContainer: {
    position: 'absolute',
    left: 10,
    top: 4,
  },
  border: {
    borderColor: 'rgba(0,0,0,0.6)',
  },
  opacity_6: {
    opacity: 1,
  },
  opacity_3: {
    opacity: 0.8,
  },
  text: {
    fontFamily: fontsProxima.regular,
    fontSize: 14,
    opacity: 0.8,
  },
  icon: {
    opacity: 0.8,
    color: COLORS.new,
  },
  color_danger: {
    color: COLORS.danger_900,
  },
  error: {padding: 2},
});

export default DTSelector;
