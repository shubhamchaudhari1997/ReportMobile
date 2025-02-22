
import React from 'react';
import { Text } from 'react-native';
import { PropsWithChildren } from 'react'
import { TextProps } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

type CDTextProps = PropsWithChildren<{

}> & TextProps;

const CDText: React.FC<CDTextProps> = ({
    children,
    style,
    ...rest
}) => {

    const mergedStyles = StyleSheet.flatten([styles.text, style]);

    return (
        <Text style={mergedStyles} {...rest}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: { fontFamily: 'Poppins-Regular', color: COLORS.secondaryColor }
})

export default CDText;

