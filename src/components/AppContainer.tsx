import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../constants';

const APP_MARGIN = (SCREEN_WIDTH - 4 * APP_WIDTH - 2 * CONTENT_PADDING) / 3;
console.log(APP_MARGIN);
type Props = {
  name?: string;
  icon?: string;
  idx: number;
  hideName?: boolean;
};
export const AppContainer = (props: Props) => {
  const { idx, hideName = false } = props;
  const marginStyle = {
    marginRight: (idx + 1) % 4 === 0 ? 0 : APP_MARGIN,
  };
  return (
    <View style={[{ }, marginStyle]}>
      <View style={[styles.container]}></View>
      {!hideName && <Text style={styles.title}>App</Text>}
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
