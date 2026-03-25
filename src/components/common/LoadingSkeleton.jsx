import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingSkeleton = ({ count = 3, cardHeight = 100 }) => {
  const opacities = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacities, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacities, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacities]);

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View key={index} style={[styles.skeleton, { height: cardHeight, opacity: opacities }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  skeleton: { backgroundColor: '#E5E7EB', borderRadius: 16, marginBottom: 12 }
});

export default LoadingSkeleton;
