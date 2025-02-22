import {ListItem} from '@rneui/themed';

import React, {useEffect, useState} from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TextStyle,
  Text,
  Keyboard,
} from 'react-native';

import {COLORS} from '../theme';
import {fontsProxima} from '../theme/typography';
import Icon from './Icons';
import SearchComp from './SearchComp';
import CDText from './core/CDText';

type BlurType = (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

type SelectorIProps = {
  value: any;
  placeholder: string;
  onChangeText: (text: string, item?: any) => void;
  onBlur?: any;
  label?: string;
  type?: string;
  data: Array<any>;
  error?: string;
  containerStyle?: ViewStyle;
  selectorStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: TextStyle;
  selectorShowValue?: (item: any) => string;
  search?: boolean;
  testID?: string;
};

const Selector: React.FC<SelectorIProps> = React.memo(
  ({
    label,
    placeholder,
    value,
    data = [],
    onChangeText,
    type,
    onBlur,
    error,
    containerStyle,
    selectorStyle: selectorPropsStyle,
    textStyle,
    iconStyle,
    selectorShowValue,
    search,
    testID,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const [arrayData, setArrayData] = useState<Array<any>>(data);
    const [arrayFilterData, setArrayFilterData] = useState<Array<any>>([]);

    const onFocusToggle = () => {
      setIsFocused(c => !c);
    };

    useEffect(() => {
      // setArrayData(data);
      setArrayFilterData(data);
    }, [data]);

    useEffect(() => {
      if (searchValue === '') {
        onChange('', data);
      }
    }, [searchValue]);

    const LabelComponent = () => {
      if (!label) {
        return null;
      }
      return (
        <View style={selectorStyle.lableContainer}>
          <CDText style={[selectorStyle.label]}>{label}</CDText>
        </View>
      );
    };

    const ErrorComponent = () => {
      if (!error) {
        return null;
      }

      return (
        <View style={selectorStyle.error}>
          <Text style={[selectorStyle.label, selectorStyle.color_danger]}>
            {error}
          </Text>
        </View>
      );
    };

    const onChange = (text: string, dataArray?: any) => {
      setSearchValue(text);
      if (text === '') {
        // setArrayData(data);
        setArrayFilterData(dataArray);
        return;
      }

      let filterData = data?.filter((value: any) => {
        try {
          if (value?.Name?.toLowerCase()?.includes(text?.toLowerCase())) {
            return true;
          }
        } catch (error) {
          return false;
        }
      });

      setArrayFilterData(filterData);
    };
    const toggleBottomSheet = () => {
      setIsFocused(c => !c);
    };

    return (
      <View style={containerStyle ? containerStyle : selectorStyle.container}>
        <LabelComponent />
        <TouchableOpacity
          testID={testID}
          style={[
            selectorStyle.selector,
            isFocused ? selectorStyle.border : null,
            selectorPropsStyle,
          ]}
          onPress={onFocusToggle}>
          <TextInput
            placeholder={placeholder}
            value={value}
            style={[
              selectorStyle.text,
              {flex: 1, color: 'rgba(0,0,0,0.8)'},
              textStyle,
            ]}
            placeholderTextColor={COLORS.secondaryColor}
            // onTouchStart={onFocusToggle}

            editable={false}
            onFocus={onFocusToggle}
            onBlur={onBlur}
          />
          <Icon
            type="AntDesign"
            name={isFocused ? 'caretup' : 'caretdown'}
            style={[selectorStyle.icon, iconStyle]}
          />
        </TouchableOpacity>
        <ErrorComponent />
        <BottomSheet
          onClosePress={onFocusToggle}
          placeholder={placeholder}
          toggleBottomSheet={toggleBottomSheet}
          isVisible={isFocused}
          search={search}
          data={data}
          type={type}
          value={searchValue}
          bottomSheetTitle={placeholder}
          onChangeText={onChangeText}
          onChange={onChange}>
          {arrayFilterData?.map((val, index) => {
            let item = val;
            // if (type) {
            item = type
              ? val[type]
              : selectorShowValue
              ? selectorShowValue(val)
              : val;
            // }else{
            //   item=val;
            // }
            return (
              <SelectorRowCard
                testID={item}
                key={item + index}
                onPress={() => {
                  onChangeText(item, val);
                  onFocusToggle();
                }}
                value={item}
              />
            );
          })}
        </BottomSheet>
      </View>
    );
  },
);

type SelectorRowIProps = {
  value: string;
  onPress: () => void;
  color?: string;
  testID?: string;
};

const SelectorRowCard: React.FC<SelectorRowIProps> = React.memo(
  ({value, onPress, color, testID}) => {
    return (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        style={selectorStyle.selectorRowCard}>
        <Text style={[selectorStyle.text, {color: color}]}>{value}</Text>
      </TouchableOpacity>
    );
  },
);

const selectorStyle = StyleSheet.create({
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
    paddingHorizontal: 5,
    paddingEnd: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.6)',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  opacity_6: {
    opacity: 0.6,
  },
  opacity_3: {
    opacity: 0.3,
  },
  text: {
    fontFamily: fontsProxima.regular,
  },
  icon: {
    opacity: 0.8,
  },
  selectorRowCard: {
    padding: 10,
  },
  color_danger: {
    color: COLORS.danger_900,
  },
  error: {paddingVertical: 4},
});

type BottomSheetIProps = {
  isVisible: boolean;
  onClosePress: () => void;
  placeholder: string;
  toggleBottomSheet: () => void;
  search?: boolean;
  data: any[];
  type?: any;
  bottomSheetTitle: string;
  value?: string;
  onChange?: (text: any, data?: any) => any;
  onChangeText: (text: any, data?: any) => any;
};

const BottomSheet: React.FC<BottomSheetIProps> = React.memo(
  ({
    isVisible,
    // onBackPress,
    children,
    toggleBottomSheet,
    placeholder,
    data,
    type,
    onClosePress,
    search,
    bottomSheetTitle,
    value,
    onChange,
    onChangeText,
  }) => {
    const [searchvalue, setSearchValue] = useState('');
    const [focoused, setIsFocused] = useState(false);
    const [filteredData, setFilteredData] = useState<Array<any>>(data);
    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onCancel = () => {
      setSearchValue('');
      setIsFocused(false);
      Keyboard.dismiss();
    };

    // const onChangeT = (searchvalue: string) => {
    //   // const filtered = data.filter(item =>
    //   //   item.Name?.toLowerCase().includes(searchvalue?.toLowerCase())
    //   // );

    //   if (searchvalue === '') {
    //     // setArrayData(data);
    //     setFilteredData(data);
    //     setSearchValue("")
    //     return;
    //   }

    //   let filterData = data?.filter((value: any) => {
    //     try {
    //       if (value?.Name?.toLowerCase()?.includes(searchvalue?.toLowerCase())) {

    //         return true;
    //       }
    //       if (value?.toLowerCase()?.includes(searchvalue?.toLowerCase())) {

    //         return true;
    //       }
    //     } catch (error) {
    //       return false;
    //     }
    //   });

    //   // setFilteredData(filtered);
    //   setFilteredData(filterData);
    //   setSearchValue(searchvalue);

    // }

    const onChangeT = (searchValue: string) => {
      const lowerCaseSearchValue = searchValue?.toLowerCase();

      if (Array.isArray(data)) {
        const filteredData = data?.filter((item: any) => {
          // If item is a number, convert it to string and check if it includes the search value
          if (typeof item === 'number') {
            return item?.toString()?.includes(lowerCaseSearchValue);
          }
          // If item is a string, check if it includes the search value
          if (typeof item === 'string') {
            return item?.toLowerCase()?.includes(lowerCaseSearchValue);
          }
          // If item is an object, check each property for search value
          if (typeof item === 'object') {
            for (const prop in item) {
              if (Object.prototype?.hasOwnProperty.call(item, prop)) {
                const propValue = item[prop];
                // Check if property value is a string and includes the search value
                if (
                  typeof propValue === 'string' &&
                  propValue.toLowerCase()?.includes(lowerCaseSearchValue)
                ) {
                  return true;
                }
              }
            }
          }
          return false;
        });
        setFilteredData(filteredData);
      }
      setSearchValue(searchValue);
    };
    return (
      // <Modal statusBarTranslucent={true} transparent visible={isVisible}>
      //   <SafeAreaView style={[bottomSheetStyle.container]}>
      //     <View
      //       style={[
      //         bottomSheetStyle.subContainer,
      //         search && { height: '75%', maxHeight: '75%' },
      //       ]}>
      //       <View style={bottomSheetStyle.mainContainer}>
      //         <Text style={[selectorStyle.text, selectorStyle.opacity_6]}>
      //           {"hello"}
      //         </Text>
      //         <TouchableOpacity onPress={onClosePress}>
      //           <Text style={bottomSheetStyle.text}>Cancel</Text>
      //         </TouchableOpacity>
      //       </View>
      //       {search ? (
      //         <SearchInput
      //           search={search}
      //           value={value}
      //           onChangeText={onChange}
      //           placeholder={'search channel partner name'}
      //         />
      //       ) : null}
      //       <ScrollView>{children}</ScrollView>
      //     </View>
      //   </SafeAreaView>
      // </Modal>
      <Modal
        statusBarTranslucent
        transparent
        visible={isVisible}
        onRequestClose={toggleBottomSheet}>
        {/* onRequestClose={toggleBottomSheet}> */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <TouchableOpacity
            onPress={toggleBottomSheet}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}></TouchableOpacity>
          <View
            style={{
              flex: 3,
              backgroundColor: COLORS.primaryColor,
              paddingHorizontal: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: fontsProxima.semi_bold,
                  fontSize: 16,
                  color: COLORS.secondaryColor,
                  opacity: 0.9,
                }}>
                {bottomSheetTitle}
              </Text>
              <TouchableOpacity onPress={toggleBottomSheet}>
                {/* <Text
                  style={{
                    opacity: 0.7,
                    paddingHorizontal: 10,
                    color: COLORS.danger_900,
                    backgroundColor: COLORS.redBackgroundIcon,
                    paddingVertical: 3,
                    borderRadius: 10,
                    fontFamily: fontsProxima.semi_bold,
                  }}>
                  Cancel
                </Text> */}
                <Icon
                  type={'MaterialCommunityIcons'}
                  color={COLORS.redIcon}
                  name={'window-close'}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            {search ? (
              <SearchComp
                onBlur={onBlur}
                onFocus={onFocus}
                onCancel={onCancel}
                focused={focoused}
                value={searchvalue}
                onChangeText={onChangeT}
                onClear={() => {
                  setFilteredData(data);
                  setSearchValue('');
                }}
                placeholder={'Search'}
              />
            ) : null}

            <FlatList
              // refreshing={isLoading}
              // onRefresh={getCpsStatements}
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}: {item: any; index: number}) => {
                return (
                  <View>
                    <ListItem
                      style={{backgroundColor: COLORS.danger_200}}
                      key={item}
                      onPress={() => {
                        onChangeText(type ? item[type] : item, item);
                        toggleBottomSheet();
                      }}>
                      <ListItem.Content>
                        <ListItem.Title
                          style={{
                            color: COLORS.secondaryColor,
                            fontFamily: fontsProxima.regular,
                            fontSize: 14,
                            textTransform: 'capitalize',
                          }}>
                          {type ? item[type] : item}
                        </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  </View>
                );
              }}
              removeClippedSubviews={true}
              maxToRenderPerBatch={3}
              initialNumToRender={3}
              windowSize={28}
            />
          </View>
        </View>
      </Modal>
    );
  },
);
const bottomSheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  subContainer: {
    backgroundColor: COLORS.primaryColor,
    maxHeight: '45%',
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  mainContainer: {
    paddingVertical: 8,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    opacity: 0.6,
    paddingHorizontal: 10,
    color: COLORS.danger_900,
    backgroundColor: COLORS.red_chipe,
    paddingVertical: 2,
    borderRadius: 2,
  },
});

export default Selector;
