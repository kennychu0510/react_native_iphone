import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH, CONTENT_PADDING, APP_WIDTH } from '../../constants';

const FRAME_WIDTH = 0.9 * APP_WIDTH;
const MINUTE_HAND_LENGTH = 0.4 * FRAME_WIDTH;
const SECOND_HAND_LENGTH = 0.5 * FRAME_WIDTH;
const HOUR_HAND_LENGTH = 0.25 * FRAME_WIDTH;

function getYoffset(degree: number) {
  return Math.cos((Math.PI / 180) * degree);
}

function getXoffset(degree: number) {
  return Math.sin((Math.PI / 180) * degree);
}

function degToRad(degree: number) {
  'worklet';
  return (Math.PI / 180) * degree + 'rad';
}

const TIME_STAMP = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Clock = () => {
  const secondHand = useSharedValue(0);
  const minuteHand = useSharedValue(0);
  const hourHand = useSharedValue(0);

  useEffect(() => {
    const time = setInterval(() => {
      const timeNow = new Date();
      secondHand.value =
        timeNow.getSeconds() + timeNow.getMilliseconds() / 1000;
      minuteHand.value = timeNow.getMinutes() + secondHand.value / 60;
      hourHand.value = timeNow.getHours() + minuteHand.value / 60;
    }, 1);
    return () => {
      clearInterval(time);
    };
  }, []);

  const secondHandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: degToRad(secondHand.value * 6),
        },
        { translateY: -0.4 * SECOND_HAND_LENGTH },
      ],
    };
  });

  const minuteHandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: degToRad(minuteHand.value * 6),
        },
        { translateY: -0.5 * MINUTE_HAND_LENGTH },
      ],
    };
  });
  const hourHandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: degToRad(hourHand.value * 6),
        },
        { translateY: -0.5 * HOUR_HAND_LENGTH },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.frame}>
          {TIME_STAMP.map((time, idx) => {
            return (
              <Text
                key={idx}
                style={[
                  styles.timeStamp,
                  {
                    transform: [
                      {
                        translateY: -FRAME_WIDTH * 0.39 * getYoffset(idx * 30),
                      },
                      { translateX: FRAME_WIDTH * 0.39 * getXoffset(idx * 30) },
                    ],
                  },
                ]}>
                {time}
              </Text>
            );
          })}
          <Animated.View style={[styles.hourHand, hourHandStyle]} />
          <Animated.View style={[styles.minHand, minuteHandStyle]} />
          <Animated.View style={[styles.secondHand, secondHandStyle]} />
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
  minHand: {
    height: MINUTE_HAND_LENGTH,
    width: 2,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    backgroundColor: 'black',
    position: 'absolute',
  },
  secondHand: {
    height: SECOND_HAND_LENGTH,
    width: 1,
    backgroundColor: 'red',
    position: 'absolute',
  },
  hourHand: {
    height: HOUR_HAND_LENGTH,
    width: 2,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    backgroundColor: 'black',
    position: 'absolute',
  },
});
