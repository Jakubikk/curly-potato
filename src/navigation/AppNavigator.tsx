import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import AccessibilitySetupScreen from '../screens/AccessibilitySetupScreen';
import HomeScreen from '../screens/HomeScreen';
import LessonScreen from '../screens/LessonScreen';

export type RootStackParamList = {
  AccessibilitySetup: undefined;
  Home: undefined;
  Lesson: { lessonId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { settings, loading } = useAppContext();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!settings.accessibilitySetupDone ? (
        <Stack.Screen name="AccessibilitySetup" component={AccessibilitySetupScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
