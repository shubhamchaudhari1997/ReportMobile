import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
  View,
  TextInput,
  Text,
  TextInputProps,
} from 'react-native';
import {COLORS} from '../theme';
import {fontsProxima} from '../theme/typography';
import CDText from './core/CDText';
import {color} from '@rneui/base';

type BlurType = (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

type InputIProps = {
  value: any;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onBlur?: BlurType;
  onBlurValidation?: boolean;
  label?: string;
  error?: string;
  multiline?: any;
  editable?: boolean;
  inputProps?: TextInputProps;
} & TextInputProps;

const Input: React.FC<InputIProps> = React.memo(
  ({
    label,
    onBlur,
    error,
    editable = true,
    onBlurValidation = true,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [onBlurValid, setOnBlurValid] = useState(false);
    // console.log(error);
    // console.log({...props},"props")
    const onFocusToggle = () => {
      setOnBlurValid(true);
      setIsFocused(c => !c);
    };

    const onBlurPress: BlurType = e => {
      // console.log(e);

      onFocusToggle();
      setOnBlurValid(onBlurValidation);
      if (onBlur) {
        onBlur(e);
      }
    };

    const LabelComponent = () => {
      if (!label) {
        return null;
      }
      return (
        <View style={inputStyle.lableContainer}>
          <CDText style={[inputStyle.label]}>{label}</CDText>
        </View>
      );
    };

    const ErrorComponent = () => {
      if (!error) {
        return null;
      }

      return (
        <View style={inputStyle.error}>
          <Text style={[inputStyle.label, inputStyle.color_danger]}>
            {error}
          </Text>
        </View>
      );
    };

    return (
      <View style={[inputStyle.container, label ? {paddingTop: '6%'} : null]}>
        <LabelComponent />
        <TextInput
          style={[
            inputStyle.input,
            isFocused ? inputStyle.border : null,
            onBlurValidation ? inputStyle.border : inputStyle.validatedBorder,
            !editable
              ? {backgroundColor: 'rgba(0,0,0,0.03)', color: COLORS.text_basic}
              : null,
            props.multiline ? inputStyle.multilineContainer : null,
          ]}
          placeholderTextColor={COLORS.secondaryColor}
          onFocus={onFocusToggle}
          editable={editable}
          onBlur={onBlurPress}
          {...props}
          {...props.inputProps}
        />
        <ErrorComponent />
      </View>
    );
  },
);

const inputStyle = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // paddingTop: '6%',
    paddingVertical: 5,
    marginVertical: '1%',
    // backgroundColor: COLORS.chipe,
    borderRadius: 5,
  },
  input: {
    paddingHorizontal: 10,
    fontFamily: fontsProxima.regular,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 50,
    color: COLORS.secondaryColor,
  },
  label: {
    fontFamily: fontsProxima.light,
    fontSize: 12,
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
  validatedBorder: {
    borderColor: COLORS.danger_900,
  },
  opacity_6: {
    opacity: 0.6,
  },
  color_danger: {
    color: COLORS.danger_900,
  },
  error: {paddingVertical: 4},
  multilineContainer: {
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  placeHolderStyle: {
    color: COLORS.secondaryColor,
  },
});

export default Input;
