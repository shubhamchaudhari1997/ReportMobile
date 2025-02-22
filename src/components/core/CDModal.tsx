
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, View } from 'react-native';
import { Colors, Fonts } from '../../theme';
import CDText from './CDText';

type CDModalProps = {
    children: any;
    isVisble: boolean;
    onModalToggle: (item: any) => void;
    header: string;
};

const CDModal: React.FC<CDModalProps> = ({
    children,
    isVisble,
    onModalToggle,
    header,
}) => {
    return (
        <Modal transparent statusBarTranslucent visible={isVisble}>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
                <TouchableOpacity
                    onPress={onModalToggle}
                    style={{ flex: 1 }}></TouchableOpacity>
                {/* <TouchableOpacity
          onPress={onModalToggle}
          style={{alignItems: 'center'}}>
          <Icon
            style={{paddingVertical: 10}}
            color={Colors.primaryColor}
            onPress={onModalToggle}
            size={36}
            name="close-circle"
            type="material-community"></Icon>
        </TouchableOpacity> */}
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onModalToggle} style={styles.headerView}>
                        <CDText style={styles.header}>{header}</CDText>
                        <View style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <CDText style={{ backgroundColor: Colors.red_chipe, paddingVertical: 2, paddingHorizontal: 10, borderRadius: 20, color: Colors.accentColor }}>Cancel</CDText>
                        </View>
                        {/* <Icon
              style={{marginHorizontal: 10}}
              color={Colors.secondaryColor}
              onPress={onModalToggle}
              size={24}
              name="chevron-down"
              type="material-community"></Icon> */}
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 20 }}>{children}</View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CDModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.primaryColor,
        overflow: 'hidden',
        maxHeight: '90%',
    },
    headerView: {
        // justifyContent: 'center',
        // // elevation: 5,
        // alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: 10,

        flexDirection: 'row',
    },

    header: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        paddingVertical: 5,
        color: Colors.secondaryColor,
        alignSelf: 'flex-start',
        flex: 1, paddingHorizontal: 30
    },
});
