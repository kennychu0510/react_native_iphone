import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { RootScreenNavigationProp } from '../pages/Home';

const WIDTH = 0.9 * APP_WIDTH;
type ContextInterface = {
  positionX: number;
  positionY: number;
};

type Props = {
  x?: number;
  y?: number;
};

export const AssistiveTouch = (props: Props) => {
  const { x: defaultX, y: defaultY } = props;
  const positionX = useSharedValue(defaultX || 0.85 * SCREEN_WIDTH);
  const positionY = useSharedValue(defaultY || 0.7 * SCREEN_HEIGHT);
  const ref = useAnimatedRef();
  const navigation = useNavigation<RootScreenNavigationProp>();

  function onPress() {
    navigation.navigate('Home');
  }

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

      const relativeMoveX = x - context.positionX;
      const relativeMoveY = y - context.positionY;
      // if (x - context.positionX < APP_WIDTH && y - context.positionY < APP_WIDTH) {
      //   return onPress()
      // }
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
    <AssistTouchContext.Provider
      value={{ x: positionX.value, y: positionY.value }}>
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
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.circle, styles.outerCircle]}></View>
            <View style={[styles.circle, styles.middleCircle]}></View>
            <View style={[styles.circle, styles.innerCircle]}></View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </AssistTouchContext.Provider>
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
    transform: [
      { translateX: (-0.75 * APP_WIDTH) / 2 },
      { translateY: (-0.75 * APP_WIDTH) / 2 },
    ],
  },
  middleCircle: {
    height: 0.6 * APP_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.5)',
    transform: [
      { translateX: (-0.6 * APP_WIDTH) / 2 },
      { translateY: (-0.6 * APP_WIDTH) / 2 },
    ],
  },
  innerCircle: {
    height: 0.45 * APP_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.7)',
    transform: [
      { translateX: (-0.45 * APP_WIDTH) / 2 },
      { translateY: (-0.45 * APP_WIDTH) / 2 },
    ],
  },
});

export const AssistTouchContext = createContext({
  x: 0.85 * SCREEN_WIDTH,
  y: 0.7 * SCREEN_HEIGHT,
});

export const useAssistTouchContext = () => useContext(AssistTouchContext);
