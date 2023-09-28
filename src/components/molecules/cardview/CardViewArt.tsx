import React from "react";
import { ArtModel } from "../../../services/server/models/ApiModel";
import {  TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import ImageWithFallback from "../../atoms/ImageFallBack";
import { getUrl } from "../../../utils/Utils";
import styles from "./styles";

export interface Props {
    item: ArtModel
    handleClick?: (item: ArtModel,event: GestureResponderEvent) => void;
}



const CardViewArt: React.FC<Props> = ({ item,handleClick }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={(event) => handleClick?.(item,event)}>
            <ImageWithFallback
                style={styles.image}
                resizeMode="cover"
                url={getUrl(item?.image_id)}
                defaultSource={require('../../../assets/images/empty_image.jpg')}
                onPress={(event) =>
                    handleClick?.(item,event)
                }
            />
            <Text style={{ color: '#000000', marginHorizontal: 8, fontSize: 22, fontFamily: "IBMPlexSans-SemiBolItalic" }}>{item.title}</Text>
            {item.thumbnail?.alt_text && <Text style={{ color: '#000000', marginHorizontal: 8, fontSize: 14, fontFamily: "IBMPlexSans-Italic" }} numberOfLines={3} ellipsizeMode="tail">{item.thumbnail?.alt_text}</Text>}
            {item.provenance_text && <Text style={{ color: '#000000', marginHorizontal: 8, marginTop: 4, fontSize: 12, fontFamily: "IBMPlexSans-Italic" }} numberOfLines={3} ellipsizeMode="tail" >{item.provenance_text}</Text>}
        </TouchableOpacity>
    )

}

export default CardViewArt