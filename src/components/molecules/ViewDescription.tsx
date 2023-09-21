import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import HTML, { defaultSystemFonts } from 'react-native-render-html';
import { TagsStyles, stylesText, systemFonts } from './styles/StylesContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface ItemDescription {
    label: string;
    value: string;
    icon?: string;
}

export interface Props {
    data: ItemDescription;
}

const ViewDescription: React.FC<Props> = ({ data }) => {
    const windowDimensions = useWindowDimensions();

    return (
        <View style={{ marginEnd: 4 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={stylesText.title} >{data.label}</Text>
                {data.icon && <Icon style={{ marginStart: 8,marginBottom:8 }} name={data.icon} size={16} color="#FFFFFF" />}
            </View>
            <HTML systemFonts={systemFonts} tagsStyles={TagsStyles} source={{ html: data.value }} contentWidth={windowDimensions.width} />
        </View>
    );
};

export default ViewDescription;
