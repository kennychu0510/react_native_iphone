import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContainer } from '../components/AppContainer';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../constants';
import { IMAGES } from '../images';

const APPS = new Array(24).fill(null);
const DOCK_APPS = new Array(4).fill(null);
const PAGES = [null]
export const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        source={IMAGES.BACKGROUND_2}
        style={{ flex: 1, width: SCREEN_WIDTH }}
        imageStyle={{ resizeMode: 'cover' }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']} >
          <View style={styles.container}>
            {APPS.map((app, idx) => {
              return <AppContainer key={idx} idx={idx}/>;
            })}
          </View>
          <View style={styles.pageIndicator}>
            {PAGES.map((page, idx) =>{
              return <View style={{backgroundColor: 'white', height: 5, aspectRatio: 1, borderRadius: 10}} key={idx}></View>
            })}
          </View>
          <View style={styles.dock}>
            {DOCK_APPS.map((app, idx) => {
              return <AppContainer key={idx} idx={idx} hideName/>;
            })}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: CONTENT_PADDING,
    alignContent: 'space-around'
  },
  dock: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 100,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageIndicator: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    height: 20,
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});
