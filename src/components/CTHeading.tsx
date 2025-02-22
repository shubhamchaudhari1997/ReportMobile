import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS } from '../theme';
import { fontsProxima } from '../theme/typography';

type CTHeadingProps = {
    title: string;
    required?: boolean; // Optional prop to indicate if the field is required
    headingColor?: string; // Optional prop for custom heading color
    paddingHorizontal?: number; // Optional prop for horizontal padding
    style?: ViewStyle | TextStyle;
};

const CTHeading: React.FC<CTHeadingProps> = ({
    title,
    required = false,
    headingColor = COLORS.secondaryColor,
    paddingHorizontal = 0,
    style
}) => {
    return (
        <View style={style}>
            <Text style={[styles.heading, { color: headingColor }]}>
                {title}
                {required ? <Text style={styles.asterisk}> *</Text> : null}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        color: COLORS.secondaryColor,
        fontFamily: fontsProxima.semi_bold,
        //marginVertical: 2
    },
    asterisk: {
        color: COLORS.danger,
        fontFamily: fontsProxima.semi_bold,
    },
});

export default CTHeading;
