import React from 'react';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../theme';
import CDText from './CDText';

type CDSwitchFilterProps = PropsWithChildren<{
    onStatusChange: (input: string) => void;
    status: string
}>

const CDSwitchFilter: React.FC<CDSwitchFilterProps> = ({
    children,
    onStatusChange,
    status
}) => {
    const mergedStyles = StyleSheet.flatten([styles.text]);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                paddingHorizontal: 20,
            }}>
            <TouchableOpacity
                onPress={() => onStatusChange("Active")}
                style={[
                    status === "Active"
                        ? { backgroundColor: Colors.blue_chipe }
                        : { backgroundColor: Colors.secondaryColorLight },
                    {
                        padding: 5,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderRightWidth: 1,
                        borderColor: Colors.secondaryColor,
                        justifyContent: 'center',
                    },
                ]}>
                <CDText>Active</CDText>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onStatusChange("InActive")}
                style={
                    [status === "InActive"
                        ? { backgroundColor: Colors.blue_chipe }
                        : { backgroundColor: Colors.secondaryColorLight },
                    {
                        padding: 5,
                        // backgroundColor: Colors.blue_chipe,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        justifyContent: 'center',
                    }]}>
                <CDText>InActive</CDText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: { fontFamily: 'Poppins-Regular' },
});

export default CDSwitchFilter;
