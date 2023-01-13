import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../constants';

const APP_MARGIN = (SCREEN_WIDTH - 4 * APP_WIDTH - 2 * CONTENT_PADDING) / 3;
type Props = {
  app?: {
    name: string;
    icon: ImageSourcePropType;
  };
  idx: number;
  dockIcon?: boolean;
};
export const AppContainer = (props: Props) => {
  const { idx, dockIcon = false, app } = props;
  const marginStyle = {
    marginRight: (idx + 1) % 4 === 0 ? 0 : APP_MARGIN,
  };
  return (
    <View style={[marginStyle, dockIcon ? null : {marginBottom: 20}]}>
      {app ? (
        <Image
          source={app.icon}
          style={{ width: APP_WIDTH, height: APP_WIDTH }}></Image>
      ) : (
        <View style={[styles.container]}></View>
      )}
      {!dockIcon && <Text style={styles.title}>{app?.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    aspectRatio: 1,
    height: APP_WIDTH,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 3,
  },
});
