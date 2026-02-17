import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface MascotProps {
  emotion?: 'happy' | 'neutral' | 'surprised' | 'sad';
  size?: number;
}

const emotions = {
  happy: 'd(^o^)b',
  neutral: 'd(-_-)b',
  surprised: 'd(O_O)b',
  sad: 'd(;_;)b',
};

export const Mascot: React.FC<MascotProps> = ({ emotion = 'neutral', size }) => {
  const { colors, sizes } = useTheme();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            color: colors.primary,
            fontSize: size || sizes.xlarge * 1.5,
            transform: [{ translateY: bounceAnim }]
          }
        ]}
      >
        {emotions[emotion]}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }
});
