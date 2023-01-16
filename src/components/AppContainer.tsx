import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../constants';
import { App } from '../pages/Home';

// const APP_MARGIN = (SCREEN_WIDTH - 4 * APP_WIDTH - 2 * CONTENT_PADDING) / 3;
type Props = {
  app?: App
  idx: number;
  dockIcon?: boolean;
};
export const AppContainer = (props: Props) => {
  const { idx, dockIcon = false, app } = props;
  // const iconStyle = {
  //   marginRight: (idx + 1) % 4 === 0 ? 0 : APP_MARGIN,
  // };
  if (app && app.component) {
    return app.component
  }
  return (
    <View style={[dockIcon ? null : {marginBottom: 20}, styles.container]}>
      {app ? (
        <Image
          source={app.icon}
          style={{ width: APP_WIDTH, height: APP_WIDTH }}></Image>
      ) : (
        <View style={[styles.blankContainer]}></View>
      )}
      {!dockIcon && <Text style={styles.title}>{app?.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  blankContainer: {
    borderRadius: 20,
    aspectRatio: 1,
    height: APP_WIDTH,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    marginTop: 3,
  },
  container: {
    width: (SCREEN_WIDTH - CONTENT_PADDING * 2) / 4,
    alignItems: 'center'
  }
});
