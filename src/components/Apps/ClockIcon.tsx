import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH, CONTENT_PADDING, APP_WIDTH } from '../../constants';

const FRAME_WIDTH = 0.9 * APP_WIDTH;

function getYoffset(degree: number) {
  return Math.cos((Math.PI / 180) * degree);
}

function getXoffset(degree: number) {
  return Math.sin((Math.PI / 180) * degree);
}

const TIME_STAMP = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const Clock = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.frame}>
          {TIME_STAMP.map((time, idx) => {
            return (
              <Text
                style={[
                  styles.timeStamp,
                  {
                    transform: [
                      { translateY: -FRAME_WIDTH * 0.39 * getYoffset(idx * 30) },
                      { translateX: FRAME_WIDTH * 0.39 * getXoffset(idx * 30) },
                    ],
                  },
                ]}>
                {time}
              </Text>
            );
          })}
        </View>
      </View>
      <Text style={styles.title}>Clock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (SCREEN_WIDTH - CONTENT_PADDING * 2) / 4,
    alignItems: 'center',
  },
  content: {
    borderRadius: 15,
    aspectRatio: 1,
    height: APP_WIDTH,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginTop: 3,
  },
  frame: {
    backgroundColor: 'white',
    borderRadius: 1000,
    width: FRAME_WIDTH,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeStamp: {
    position: 'absolute',
    color: 'black',
    fontSize: 8,
  },
});
