import React, { useRef } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../constants';
import { App } from '../pages/Home';

// const APP_MARGIN = (SCREEN_WIDTH - 4 * APP_WIDTH - 2 * CONTENT_PADDING) / 3;
type Props = {
  app?: App;
  idx: number;
  dockIcon?: boolean;
  setPos: ({ pageX, pageY }: { pageX: number; pageY: number }) => void;
};
export const AppContainer = (props: Props) => {
  const { idx, dockIcon = false, app, setPos } = props;
  const ref = useRef<Image>(null);
  if (app && app.component) {
    return app.component;
  }

  function _onPress() {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setPos({ pageX, pageY });
    });
  }

  return (
    <TouchableOpacity onPress={_onPress}>
      <View style={[dockIcon ? null : { marginBottom: 15 }, styles.container]}>
        {app ? (
          <Image
            ref={ref}
            source={app.icon}
            style={{ width: APP_WIDTH, height: APP_WIDTH }}></Image>
        ) : (
          <View style={[styles.blankContainer]}></View>
        )}
        {!dockIcon && <Text style={styles.title}>{app?.name}</Text>}
      </View>
    </TouchableOpacity>
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
    marginTop: 5,
  },
  container: {
    width: (SCREEN_WIDTH - CONTENT_PADDING * 2) / 4,
    alignItems: 'center',
  },
});
