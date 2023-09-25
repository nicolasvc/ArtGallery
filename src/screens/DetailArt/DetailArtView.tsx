import { View, Modal, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import {validateUrl } from '../../utils/Utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import PagerView from 'react-native-pager-view';
import TemplateArtText from '../../components/templates/TemplateTextArt';
import { GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingView from '../../components/molecules/LoadingView';
import useDetailArt from '../../hooks/useDetailArt';



function DetailArtView({ route }) {
  const { itemId } = route.params;
  const useDetail = useDetailArt()


  useEffect(() => {
    useDetail.getDetail(itemId)
  }, []);
 

  return (
    <View style={styles.container}>
      {useDetail.loading && <LoadingView showLoading={true} />}
      <Modal
        animationType="slide"
        transparent={false}
        visible={useDetail.modalVisible}
        onRequestClose={() => {
          useDetail.setModalVisible(!useDetail.modalVisible);
        }}>
        <ImageViewer
          imageUrls={useDetail.images}
          renderIndicator={() => <></>}
          enableSwipeDown={true}
          onSwipeDown={() => { useDetail.setModalVisible(!useDetail.modalVisible); }} />
      </Modal> 
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: validateUrl(useDetail.artDetail?.image_id || null) }}>
        <View style={{ flex: 1 }}>
          <PagerView
            ref={useDetail.pagerRef}
            style={styles.pagerView} 
            initialPage={0}>
            {useDetail.itemDescription?.map((dataItem, index) => (
              <View key={index.toString()} style={styles.textContainer}>
                <TemplateArtText infoText={dataItem} handleEvent={{
                  handlePrev: (event: GestureResponderEvent) => {
                    useDetail.handlePrev()
                  },
                  handleNext: (event: GestureResponderEvent) => {
                    useDetail.handleNext()
                  },
                  showNext: index !== useDetail.itemDescription.length - 1,
                  showPrev: index  != 0
                }} />
              </View>
            ))}
          </PagerView>
          <View style={styles.textInCorner}>
            <TouchableOpacity onPress={useDetail.validateActionFavorite} style={styles.circularButton}>
              <Icon name={useDetail.favorite ? "favorite" : "favorite-border"} size={30} color={useDetail.favorite ? "#fa5252" : "#5e5e5e"} />
            </TouchableOpacity>
          </View>
          <View style={styles.textInCornerLeft}>
            <TouchableOpacity onPress={() => useDetail.setModalVisible(true)} style={styles.circularButton}>
              <Icon name="fullscreen" size={35} color="#35a9db" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default DetailArtView