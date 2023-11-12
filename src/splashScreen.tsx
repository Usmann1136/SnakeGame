/*import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
    return (
        <View style={style.view}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'yellow'} />
            <Text style={style.text}>𝓣𝓸𝓭𝓸 𝓐𝓹𝓹</Text>
        </View>
    );
}
 */

import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Text, Animated, Easing, StyleSheet } from 'react-native';

export default function SplashScreen() {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animation sequence
    const floatingAnimation = Animated.sequence([
      Animated.timing(translateY, {
        toValue: -10, // Move the text up by 10 units
        duration: 1000, // Duration of the animation
        easing: Easing.linear,
        useNativeDriver: false, // You may need to set this to true for better performance on some devices
      }),
      Animated.timing(translateY, {
        toValue: 0, // Move the text back to its original position
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]);

    // Start the animation
    Animated.loop(floatingAnimation).start();
  }, [translateY]);

  return (
    <View style={style.view}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'yellow'} />
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Text style={style.text}>𝓣𝓸𝓭𝓸 𝓐𝓹𝓹</Text>
      </Animated.View>
    </View>
  );
}

  const style = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        fontWeight: '700'
    }
})
  


