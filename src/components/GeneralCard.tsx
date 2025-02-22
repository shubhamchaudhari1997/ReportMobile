import {Icon} from './Icons';
import {COLORS} from '../theme';
import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {IconFamily} from '../model';
import {fontsProxima} from '../theme/typography';
import NullHandler from '../utils/nullHandler';

type IProps = {
  data: any;
  iconFamily: any;
  iconName: string;
  index:number
};

const GeneralCard: React.FC<IProps> = ({data, iconFamily, iconName,index}) => {
  return (
    <View style={[style.main]}>
      <View style={style.header}>
        {data.Total ? (
          <View style={style.labelValueView}>
            {/* <Text style={style.labelText}>Source</Text> */}
            <Text numberOfLines={1} style={style.labelValue}>
              {NullHandler(data?.Source).trim()}
            </Text>
          </View>
        ) : null}
        {data.Total ? (
          <View style={style.labelValueView2}>
            {/* <Text style={style.labelText}>Total</Text> */}
            <Text numberOfLines={1} style={style.labelValue}>
              {data.Total}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    // padding: 10,
    // elevation: 2,
    backgroundColor: COLORS.primaryColor,
    // borderRadius: 5,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // backgroundColor:COLORS.blueIcon
    // borderBottomWidth: 0.2,
    // paddingBottom: 5
  },
  titleText: {
    fontFamily: fontsProxima.bold,
    fontSize: 12,
    //color: COLORS.new,
    backgroundColor: '#e2f1fb',
    padding: 2,
    borderRadius: 2,
    paddingHorizontal: 4,
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: fontsProxima.bold,
    fontSize: 12,
    backgroundColor: '#e2f1fb',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  iconStyle: {
    fontSize: 16,
    color: COLORS.new,
  },
  iconContainer: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 13,
    height: 26,
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconBack: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 16,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
    marginStart: 15,
  },
  labelText: {
    fontFamily: fontsProxima.regular,
    fontSize: 10,
    opacity: 0.4,
    paddingBottom: 2,
  },
  labelValue: {
    fontFamily: fontsProxima.regular,
    fontSize: 12,
    color: COLORS.secondaryColor,
  },
  labelValueView2: {
    flex: 1,
    alignItems:'flex-end',
    marginVertical: 5,
  },
  labelValueView: {
    flex: 1,
    marginVertical: 5,
  },
});

export default GeneralCard;
