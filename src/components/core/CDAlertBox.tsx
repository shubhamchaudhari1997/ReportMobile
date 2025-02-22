import { Button } from '@rneui/themed';
import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../theme';
import CDText from './CDText';

type AlertProps = {
    onYesPress: () => void;
    onNoPress: () => void;
    message: String;
    alertFlag: boolean;
};

const CDAlertBox: React.FC<AlertProps> = ({
    onYesPress,
    onNoPress,
    message,
    alertFlag,
}) => {
    return (
        <Modal statusBarTranslucent={true} transparent visible={alertFlag}>
            <View style={styles.modalContainer}>
                <View
                    style={{
                        backgroundColor: Colors.primaryColor,
                        marginVertical: 10,
                        marginHorizontal: 10,
                        borderRadius: 10,
                    }}>
                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <CDText
                            style={{
                                fontFamily: Fonts.regular,
                                fontSize: 16,
                                color: Colors.secondaryColor,
                            }}>
                            {message}
                        </CDText>
                    </View>
                    <View style={styles.bottomBtnContainer}>
                        <Button onPress={() => onYesPress()} title="Yes" size="sm" />

                        <Button onPress={() => onNoPress()} title="No" size="sm" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CDAlertBox;

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: Colors.blue_chipe,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottomBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 10,
    },
});
