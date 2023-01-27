import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedRef,
  withTiming,
} from 'react-native-reanimated';
import { APP_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';

const WIDTH = 0.9 * APP_WIDTH;
type ContextInterface = {
  positionX: number;
  positionY: number;
};

export const AssistiveTouch = () => {
  const positionX = useSharedValue(0.85 * SCREEN_WIDTH);
  const positionY = useSharedValue(0.7 * SCREEN_HEIGHT);
  const ref = useAnimatedRef();

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context) => {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive: (event, context) => {
      positionX.value = event.translationX + context.positionX;
      positionY.value = event.translationY + context.positionY;
    },
    onEnd: (event, context) => {
      const x = event.absoluteX;
      const y = event.absoluteY;

      if (x < SCREEN_WIDTH / 2) {
        positionX.value = withTiming(0);
      } else {
        positionX.value = withTiming(SCREEN_WIDTH - WIDTH);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      left: positionX.value,
      top: positionY.value,
    };
  });
  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          {
            height: WIDTH,
            width: WIDTH,
            aspectRatio: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            position: 'absolute',
            left: SCREEN_WIDTH - WIDTH,
            top: 0.78 * SCREEN_HEIGHT,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          rStyle,
        ]}>
        <View style={[styles.circle, styles.outerCircle]}></View>
        <View style={[styles.circle, styles.middleCircle]}></View>
        <View style={[styles.circle, styles.innerCircle]}></View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  circle: {
    aspectRatio: 1,
    borderRadius: APP_WIDTH,
    position: 'absolute',
  },
  outerCircle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 0.75 * APP_WIDTH,
  },
  middleCircle: {
    height: 0.6 * APP_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  innerCircle: {
    height: 0.45 * APP_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
