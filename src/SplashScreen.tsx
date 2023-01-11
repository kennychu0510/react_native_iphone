import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../App';
import { SCREEN_WIDTH } from './constants';
import { IMAGES } from './images';

export const SplashScreen = () => {
  const progressVal = useRef(new Animated.Value(0)).current;
  const FULL_WIDTH = SCREEN_WIDTH * 0.5;
  const LOADING_TIME = 2000;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    Animated.timing(progressVal, {
      toValue: FULL_WIDTH,
      duration: LOADING_TIME,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      navigation.navigate('Home');
    }, LOADING_TIME);
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      }}
      >
      <Image source={IMAGES.APPLE_LOGO} style={styles.logo}></Image>
      <View style={styles.loadingBar}>
        <Animated.View
          style={[
            styles.progress,
            {
              width: progressVal.interpolate({
                inputRange: [0, 0.4 * FULL_WIDTH, 0.8 * FULL_WIDTH, FULL_WIDTH],
                outputRange: [
                  0,
                  0.2 * FULL_WIDTH,
                  0.4 * FULL_WIDTH,
                  FULL_WIDTH,
                ],
              }),
            },
          ]}></Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logo: {
    aspectRatio: 1,
    height: 80,
  },
  loadingBar: {
    width: SCREEN_WIDTH * 0.5,
    height: 5,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 40,
  },
  progress: {
    // width: SCREEN_WIDTH * 0.1,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: 1,
  },
});
