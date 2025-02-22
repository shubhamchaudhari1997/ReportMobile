import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import {fontsProxima} from '../theme/typography';
import {COLORS} from '../theme';
import Icon from '../components/Icons';

type MultiSelectProps = {
  data: any[];
  types?: string[];
  uniqueType: string;
  selectedMember: any[]; // Array of selected Email IDs
  onChange: (selected: any[]) => void;
  label: string;
  placeholder: string;
};

const InputMultiSelect: React.FC<MultiSelectProps> = ({
  data,
  types,
  uniqueType,
  selectedMember,
  onChange,
  label,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocusToggle = () => {
    setIsFocused(c => !c);
  };
  const toggleBottomSheet = () => {
    setIsFocused(c => !c);
  };
  const toggleSelection = (item: any) => {
    const {RegisterDate, ...rest} = item; // Destructure to exclude FirstName
    const updatedItem = {...rest};
    const updatedSelection = selectedMember.some(
      (member: any) => member[uniqueType] === updatedItem[uniqueType],
    )
      ? selectedMember.filter(
          (member: any) => member[uniqueType] !== updatedItem[uniqueType],
        )
      : [...selectedMember, updatedItem];
    onChange(updatedSelection);
  };

  const renderOption = ({item}: {item: any}) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedMember.some(
          member => item[uniqueType] === member[uniqueType],
        ) && styles.selectedOption,
      ]}
      onPress={() => toggleSelection(item)}>
      {types?.map((type, index) => (
        <Text key={index} style={index === 0 ? styles.userName : styles.text}>
          {item[type]}
        </Text> // Render the value for each type
      ))}
    </TouchableOpacity>
  );
  const LabelComponent = () => {
    if (!label) {
      return null;
    }
    return (
      <View style={styles.lableContainer}>
        <Text style={[styles.label]}>{label}</Text>
      </View>
    );
  };
  const EmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          style={styles.imageSize}
          source={require('../assets/Images/noDataFound.png')}
        />
        {/* <SVGImage width={200} height={200} Image={NoDataFound} /> */}
        <Text style={[styles.taskTxt, styles.emptyListText]}>
          No data found
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LabelComponent></LabelComponent>
      <TouchableOpacity style={styles.selector} onPress={onFocusToggle}>
        <TextInput
          placeholder={placeholder}
          style={[styles.text, {flex: 1, color: COLORS.secondaryColor}]}
          placeholderTextColor={COLORS.secondaryColor}
          editable={false}
          onFocus={onFocusToggle}
        />
        <Icon
          type="AntDesign"
          name={isFocused ? 'caretup' : 'caretdown'}
          style={[styles.icon]}
        />
      </TouchableOpacity>
      {isFocused && (
        <Modal
          statusBarTranslucent
          transparent
          visible={isFocused}
          onRequestClose={toggleBottomSheet}
          style={{backgroundColor: COLORS.secondaryColorLight}}>
          <View style={{flex: 1, backgroundColor: COLORS.secondaryColorLight}}>
            <TouchableOpacity
              onPress={toggleBottomSheet}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}></TouchableOpacity>
            <View style={styles.modelContainer}>
              <View style={styles.modelSubContainer}>
                <Text style={styles.containerHeader}>{placeholder}</Text>
                <TouchableOpacity onPress={toggleBottomSheet}>
                  <Icon
                    type={'MaterialCommunityIcons'}
                    color={COLORS.redIcon}
                    name={'window-close'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderOption}
                windowSize={10}
                ListEmptyComponent={<EmptyList />}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: '6%',
    paddingVertical: 5,
    marginVertical: '1%',
    borderRadius: 5,
  },
  modelContainer: {
    flex: 3,
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modelSubContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primaryColor,
  },
  selectedOption: {
    backgroundColor: COLORS.blue_chipe,
  },
  userName: {
    fontFamily: fontsProxima.medium,
    fontSize: 16,
    color: COLORS.secondaryColor,
    opacity: 0.9,
  },
  text: {
    fontFamily: fontsProxima.regular,
  },
  containerHeader: {
    fontFamily: fontsProxima.semi_bold,
    fontSize: 16,
    color: COLORS.secondaryColor,
    opacity: 0.9,
  },
  selector: {
    paddingHorizontal: 5,
    paddingEnd: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondaryColorLight,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    opacity: 0.8,
  },
  emptyContainer: {
    height: Dimensions.get('window').height / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    color: COLORS.secondaryColor,
    opacity: 0.4,
  },
  taskTxt: {
    fontSize: 14,
    fontFamily: fontsProxima.regular,
    color: COLORS.new,
    textAlign: 'center',
  },
  imageSize: {
    height: 260,
    width: 330,
    marginBottom: 20,
  },
});

export default InputMultiSelect;
