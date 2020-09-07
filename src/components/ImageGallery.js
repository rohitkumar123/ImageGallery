import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {Action, URL, IMAGE_URL} from '../utils';
import * as Constant from '../constants';
import styles from './styles';

const ImageGallery = () => {
  const [page, setPage] = useState(1);
  const [isNetworkError, setisNetworkError] = useState(false);
  const loading = useSelector((state) => state.imageData.loading);
  const listdata = useSelector((state) => state.imageData.data);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    (page) => {
      NetInfo.fetch()
        .then((state) => {
          const {isConnected} = state;
          if (isConnected) {
            setisNetworkError(false);
            dispatch(Action(Constant.IMAGE_REQUEST_LOADING));
            axios
              .get(URL(page))
              .then((response) => {
                const {data} = response;
                dispatch(Action(Constant.IMAGE_REQUEST_SUCCESS, data));
              })
              .catch((error) => {
                dispatch(Action(Constant.IMAGE_REQUEST_FAIL, error));
              });
          } else {
            setisNetworkError(true);
          }
        })
        .catch(() => {
          setisNetworkError(true);
        });
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const onRefresh = () => {
    setPage(page + 1);
  };

  const renderItem = ({item}) => {
    const {author, id} = item;
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.title}>{author}</Text>
        <Image
          style={styles.image}
          source={{
            uri: IMAGE_URL(id),
          }}
        />
      </View>
    );
  };
  const Loading = () => {
    return (
      <>
        {loading && (
          <View style={styles.loadingStyle}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </>
    );
  };
  return (
    <>
      <Text style={styles.header}>Image Gallery</Text>
      {isNetworkError && (
        <Text style={[styles.header, styles.error]}>
          {Constant.INTERNET_MESSAGE}
        </Text>
      )}
      {!isNetworkError && Loading()}
      <SafeAreaView style={styles.container}>
        <FlatList
          horizontal
          data={listdata}
          renderItem={renderItem}
          keyExtractor={(item, index) => `key-${item.id}`}
          onRefresh={() => onRefresh()}
          refreshing={loading}
        />
      </SafeAreaView>
    </>
  );
};

export default ImageGallery;
