import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { APP_WIDTH, CONTENT_PADDING, SCREEN_WIDTH } from '../../constants';
import { App } from '../../pages/Home';

function getDayOfWeek(): string {
  const today = new Date().getDay()
  const map = new Map<number, string>([
    [0, 'SUN'],
    [1, 'MON'],
    [2, 'TUE'],
    [3, 'WED'],
    [4, 'THU'],
    [5, 'FRI'],
    [6, 'SAT'],
  ])
  return map.get(today) || 'ERROR'
}

export const CalendarIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.month}>{getDayOfWeek()}</Text>
        <Text style={styles.date}>{new Date().getDate()}</Text>
      </View>
      <Text style={styles.title}>Calendar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (SCREEN_WIDTH - CONTENT_PADDING * 2) / 4,
    alignItems: 'center',
  },
  month: {
    color: 'red',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5
  },
  content: {
    borderRadius: 15,
    aspectRatio: 1,
    height: APP_WIDTH,
    backgroundColor: 'white',
  },
  date: {
    color: 'black',
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '300'
  },
  title: {
    color: 'white',
    marginTop: 3,
  },
});
