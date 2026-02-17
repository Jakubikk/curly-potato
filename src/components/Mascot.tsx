import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence
} from 'react-native-reanimated';
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
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={[
        styles.text,
        { color: colors.primary, fontSize: size || sizes.xlarge * 1.5 }
      ]}>
        {emotions[emotion]}
      </Text>
    </Animated.View>
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
