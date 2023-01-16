import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AppContainer } from '../components/AppContainer';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../constants';
import { IMAGES } from '../images';

type APP = {
  name: string;
  icon: ImageSourcePropType;
};
const APPS: APP[] = [
  { name: 'FaceTime', icon: IMAGES.APP_ICONS.APPLE_FACETIME },
  { name: 'Calendar', icon: IMAGES.APP_ICONS.APPLE_CALENDAR },
  { name: 'Photos', icon: IMAGES.APP_ICONS.APPLE_PHOTOS },
  { name: 'Camera', icon: IMAGES.APP_ICONS.APPLE_CAMERA },
  { name: 'Mail', icon: IMAGES.APP_ICONS.APPLE_MAIL },
  { name: 'Clock', icon: IMAGES.APP_ICONS.APPLE_CLOCK },
  { name: 'Weather', icon: IMAGES.APP_ICONS.APPLE_WEATHER },
  { name: 'Reminders', icon: IMAGES.APP_ICONS.APPLE_REMINDERS },
  { name: 'Notes', icon: IMAGES.APP_ICONS.APPLE_NOTES },
  { name: 'Books', icon: IMAGES.APP_ICONS.APPLE_BOOKS },
  { name: 'App Store', icon: IMAGES.APP_ICONS.APPLE_APP_STORE },
  { name: 'Settings', icon: IMAGES.APP_ICONS.APPLE_SETTINGS },
  { name: 'Apple Store', icon: IMAGES.APP_ICONS.APPLE_APPLE_STORE },
  { name: 'Wallet', icon: IMAGES.APP_ICONS.APPLE_WALLET },
  { name: 'Health', icon: IMAGES.APP_ICONS.APPLE_HEALTH },
  { name: 'Home', icon: IMAGES.APP_ICONS.APPLE_HOME },
  { name: 'Podcasts', icon: IMAGES.APP_ICONS.APPLE_PODCASTS },
  { name: 'Safari', icon: IMAGES.APP_ICONS.APPLE_SAFARI },
  { name: 'Stocks', icon: IMAGES.APP_ICONS.APPLE_STOCKS },
  { name: 'WhatsApp', icon: IMAGES.APP_ICONS.WHATSAPP },
  { name: 'Translate', icon: IMAGES.APP_ICONS.APPLE_TRANSLATE },
  { name: 'Voice Memos', icon: IMAGES.APP_ICONS.APPLE_VOICE_MEMOS },
  { name: 'News', icon: IMAGES.APP_ICONS.APPLE_NEWS },
  { name: 'Files', icon: IMAGES.APP_ICONS.APPLE_FILES },
];
const DOCK_APPS: APP[] = [
  { name: 'Phone', icon: IMAGES.APP_ICONS.APPLE_PHONE },
  { name: 'Safari', icon: IMAGES.APP_ICONS.APPLE_SAFARI },
  { name: 'Messages', icon: IMAGES.APP_ICONS.APPLE_MESSAGES },
  { name: 'Itunes', icon: IMAGES.APP_ICONS.APPLE_APPLE_MUSIC },
];
const PAGES = [null];
export const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        source={IMAGES.WALLPAPER.IPHONE_14_2}
        style={{ flex: 1, width: SCREEN_WIDTH }}
        imageStyle={{ resizeMode: 'cover' }}>
        <ScrollView horizontal={true} snapToInterval={SCREEN_WIDTH}>
          <SafeAreaView style={{ flex: 1, width: SCREEN_WIDTH }} edges={['top']}>
            <View style={styles.container}>
              {APPS.map((app, idx) => {
                return <AppContainer key={idx} idx={idx} app={app} />;
              })}
            </View>
            <View style={styles.pageIndicator}>
              {PAGES.map((page, idx) => {
                return (
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 5,
                      aspectRatio: 1,
                      borderRadius: 10,
                    }}
                    key={idx}></View>
                );
              })}
            </View>
            <View style={styles.dock}>
              {DOCK_APPS.map((app, idx) => {
                return <AppContainer key={idx} idx={idx} dockIcon app={app} />;
              })}
            </View>
          </SafeAreaView>
        </ScrollView>
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
  },
  dock: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 100,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicator: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    height: 20,
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
