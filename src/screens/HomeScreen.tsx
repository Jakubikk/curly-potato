import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LESSONS } from '../data/lessons';
import { Flame, Trophy, Settings, Star } from 'lucide-react-native';
import { Mascot } from '../components/Mascot';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { progress, updateSettings } = useAppContext();
  const { colors, sizes } = useTheme();

  const renderHeader = () => (
    <View style={[styles.header, { borderBottomColor: colors.lightGray }]}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Flame color={colors.warning} size={sizes.large} fill={colors.warning} />
          <Text style={[styles.statText, { color: colors.text, fontSize: sizes.medium }]}>
            {progress.streak}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Star color={colors.secondary} size={sizes.large} fill={colors.secondary} />
          <Text style={[styles.statText, { color: colors.text, fontSize: sizes.medium }]}>
            {progress.xp} XP
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => updateSettings({ accessibilitySetupDone: false })}>
        <Settings color={colors.gray} size={sizes.large} />
      </TouchableOpacity>
    </View>
  );

  const isLessonLocked = (index: number) => {
    if (index === 0) return false;
    const previousLesson = LESSONS[index - 1];
    return !progress.completedLessons.includes(previousLesson.id);
  };

  const MascotHeader = () => (
    <View style={styles.mascotContainer}>
      <Mascot emotion="happy" />
      <View style={[styles.speechBubble, { backgroundColor: colors.lightGray, marginTop: 10 }]}>
        <Text style={[styles.speechText, { color: colors.text, fontSize: sizes.medium }]}>
          Cześć! Gotowy na nową lekcję?
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MascotHeader />
        <View style={styles.pathContainer}>
          {LESSONS.map((lesson, index) => {
            const locked = isLessonLocked(index);
            const completed = progress.completedLessons.includes(lesson.id);

            return (
              <View key={lesson.id} style={styles.lessonWrapper}>
                <TouchableOpacity
                  style={[
                    styles.lessonNode,
                    {
                      backgroundColor: completed ? colors.success : (locked ? colors.lightGray : colors.primary),
                      width: 100, height: 100, borderRadius: 50,
                    }
                  ]}
                  disabled={locked}
                  onPress={() => navigation.navigate('Lesson', { lessonId: lesson.id })}
                >
                  {completed ? (
                    <Trophy color={colors.background} size={40} />
                  ) : (
                    <Text style={{ color: colors.background, fontSize: 40, fontWeight: 'bold' }}>
                      {index + 1}
                    </Text>
                  )}
                </TouchableOpacity>
                <Text style={[styles.lessonTitle, { color: colors.text, fontSize: sizes.medium }]}>
                  {lesson.title}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mascotContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  mascotText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  speechBubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: '80%',
    borderBottomLeftRadius: 2,
  },
  speechText: {
    textAlign: 'center',
  },
  pathContainer: {
    alignItems: 'center',
    gap: 40,
  },
  lessonWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  lessonNode: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  lessonTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
