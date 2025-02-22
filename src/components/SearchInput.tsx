import Icon from './Icons';
import { COLORS } from '../theme';
import React, { useRef, useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {fontsProxima} from '../theme/typography';

type IProps = {
  search?: boolean;
} & TextInputProps;

const SearchInput: React.FC<IProps> = (props) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        props?.search ? styles.searchContainer1 : styles.searchContainer,
      ]}>
      {props?.search ? (
        <Icon
          style={{ opacity: 0.6, color: COLORS.new }}
          size={20}
          name="search"
          type="Ionicons"
        />
      ) : !isFocused ? (
        <Icon
          style={{ opacity: 0.6 }}
          size={20}
          name="search"
          type="Ionicons"
        />
      ) : (
        <Icon
          onPress={() => {
            props.onChangeText && props.onChangeText('');
          }}
          style={{ opacity: 0.6 }}
          size={20}
          name="arrow-back"
          type="Ionicons"
        />
      )}
      <TextInput
        autoFocus={props.search}
        onBlur={onBlur}
        ref={inputRef}
        onFocus={onFocus}
        {...props}
        style={styles.textInput}
      />
      {props.value !== '' ? (
        <TouchableOpacity
          onPress={() => {
            props.onChangeText && props.onChangeText('');
          }}>
          <Icon
            onPress={() => {
              props.onChangeText && props.onChangeText('');
            }}
            style={[props?.search && { color: COLORS.new }, { opacity: 0.6 }]}
            size={20}
            name="close"
            type="Ionicons"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryColor,
    marginTop: 10,
    height: 45,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 1,
  },

  searchContainer1: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryColor,
    marginTop: 10,
    height: 45,
    marginHorizontal: 5,
    borderRadius: 5,
    borderBottomWidth: 0.3,
    borderColor: COLORS.new,
  },
  textInput: {
    fontFamily: fontsProxima.regular,
    paddingHorizontal: 20,
    flex: 1,
    padding: 5,
  },
});

export default SearchInput;
