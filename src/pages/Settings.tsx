import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  AssistiveTouch,
  useAssistTouchContext,
} from '../components/AssistiveTouch';
import IonIcons from 'react-native-vector-icons/Ionicons';

export const Settings = () => {
  const assistiveTouch = useAssistTouchContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <AssistiveTouch {...assistiveTouch} />

      <View style={styles.content}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            opacity: 0,
          }}>
          Settings
        </Text>
        <Text style={styles.title}>Settings</Text>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              padding: 5,
              alignItems: 'center',
            }}>
            <IonIcons name="search" size={20} color={'grey'}></IonIcons>
            <TextInput
              style={{ marginLeft: 5 }}
              placeholder="Search"
              placeholderTextColor={'grey'}></TextInput>
          </View>

          <View style={{ marginTop: 20 }} />

          <View style={{ borderRadius: 10 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
