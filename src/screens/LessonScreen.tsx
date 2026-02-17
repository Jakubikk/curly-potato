import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LESSONS } from '../data/lessons';
import { TaskRenderer } from '../components/TaskRenderer';
import { Mascot } from '../components/Mascot';
import { X } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LessonScreenProps = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

const LessonScreen: React.FC<LessonScreenProps> = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const { addXp, completeLesson } = useAppContext();
  const { colors, sizes } = useTheme();

  const lesson = LESSONS.find(l => l.id === lessonId);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, explanation: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  if (!lesson) return null;

  const currentTask = lesson.tasks[currentTaskIndex];
  const progressPercent = ((currentTaskIndex) / lesson.tasks.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback({
      isCorrect,
      explanation: isCorrect ? 'Brawo! Tak trzymaj.' : currentTask.explanation
    });
  };

  const handleNext = async () => {
    if (feedback?.isCorrect) {
      // Points for correct answer
    }

    setFeedback(null);
    if (currentTaskIndex < lesson.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setIsFinished(true);
      await addXp(20);
      await completeLesson(lessonId);
    }
  };

  if (isFinished) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Mascot emotion="happy" size={100} />
        <Text style={[styles.title, { color: colors.text, fontSize: sizes.xlarge, marginTop: 20 }]}>
          Lekcja ukończona!
        </Text>
        <Text style={[styles.subtitle, { color: colors.gray, fontSize: sizes.large, marginBottom: 40 }]}>
          Zdobyłeś 20 XP
        </Text>
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: colors.primary, width: '80%' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.large }]}>Powrót</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color={colors.gray} size={sizes.large} />
        </TouchableOpacity>
        <View style={[styles.progressBarBg, { backgroundColor: colors.lightGray }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${progressPercent}%` }]} />
        </View>
      </View>

      <View style={styles.content}>
        <TaskRenderer task={currentTask} onAnswer={handleAnswer} />
      </View>

      {feedback && (
        <View style={[
          styles.feedbackContainer,
          { backgroundColor: feedback.isCorrect ? '#E8F5E9' : '#FFEBEE' }
        ]}>
          <View style={styles.feedbackHeader}>
            <Text style={[
              styles.feedbackTitle,
              { color: feedback.isCorrect ? colors.success : colors.error, fontSize: sizes.large }
            ]}>
              {feedback.isCorrect ? 'Świetnie!' : 'Niezupełnie...'}
            </Text>
            <Mascot emotion={feedback.isCorrect ? 'happy' : 'sad'} size={sizes.xlarge} />
          </View>
          <Text style={[styles.explanation, { color: colors.text, fontSize: sizes.medium }]}>
            {feedback.isCorrect ? 'Dobra robota!' : feedback.explanation}
          </Text>
          <TouchableOpacity
            style={[
              styles.mainButton,
              { backgroundColor: feedback.isCorrect ? colors.success : colors.error }
            ]}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.large }]}>
              Kontynuuj
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  progressBarBg: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackTitle: {
    fontWeight: 'bold',
  },
  mascotSmall: {
    fontWeight: 'bold',
  },
  explanation: {
    marginBottom: 20,
  },
  mainButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  mascotText: {
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: '500',
  }
});

export default LessonScreen;
