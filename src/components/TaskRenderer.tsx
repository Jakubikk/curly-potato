import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Task } from '../data/lessons';
import { useTheme } from '../hooks/useTheme';
import { CheckCircle2, XCircle } from 'lucide-react-native';

interface TaskRendererProps {
  task: Task;
  onAnswer: (isCorrect: boolean) => void;
}

export const TaskRenderer: React.FC<TaskRendererProps> = ({ task, onAnswer }) => {
  const { colors, sizes } = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [password, setPassword] = useState('');

  const checkMultipleChoice = (option: string) => {
    setSelectedOption(option);
    onAnswer(option === task.correctAnswer);
  };

  const checkTrueFalse = (val: boolean) => {
    onAnswer(val === task.correctAnswer);
  };

  const checkSpotTheCatch = (val: boolean) => {
    // For MVP, spot-the-catch is like true-false but with specific UI
    onAnswer(val === (task.correctAnswer === 'true' || task.correctAnswer === true));
  };

  const checkCompare = (choice: 'a' | 'b') => {
    onAnswer(choice === task.correctAnswer);
  };

  const evaluatePassword = (pass: string) => {
    // Simple logic for senior education
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLong = pass.length >= 8;

    if (isLong && hasUpper && hasNumber && hasSpecial) return true;
    return false;
  };

  switch (task.type) {
    case 'multiple-choice':
      return (
        <View style={styles.container}>
          <Text style={[styles.question, { color: colors.text, fontSize: sizes.large }]}>{task.question}</Text>
          {task.options?.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.option, { borderColor: colors.primary }]}
              onPress={() => checkMultipleChoice(option)}
            >
              <Text style={[styles.optionText, { color: colors.text, fontSize: sizes.medium }]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );

    case 'true-false':
      return (
        <View style={styles.container}>
          <Text style={[styles.question, { color: colors.text, fontSize: sizes.large }]}>{task.question}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.halfButton, { backgroundColor: colors.success }]}
              onPress={() => checkTrueFalse(true)}
            >
              <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.medium }]}>PRAWDA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.halfButton, { backgroundColor: colors.error }]}
              onPress={() => checkTrueFalse(false)}
            >
              <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.medium }]}>FAŁSZ</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    case 'spot-the-catch':
      const isEmail = task.content.type === 'email';
      return (
        <View style={styles.container}>
          <Text style={[styles.question, { color: colors.text, fontSize: sizes.large }]}>{task.question}</Text>
          {isEmail ? (
            <View style={[styles.emailSim, { borderColor: colors.gray }]}>
              <View style={[styles.emailHeader, { backgroundColor: colors.lightGray }]}>
                <Text style={{ fontSize: sizes.small }}>Od: {task.content.sender}</Text>
                <Text style={{ fontSize: sizes.small, fontWeight: 'bold' }}>Temat: {task.content.subject}</Text>
              </View>
              <View style={styles.emailBody}>
                <Text style={{ fontSize: sizes.medium }}>{task.content.message}</Text>
              </View>
            </View>
          ) : (
            <View style={[styles.phoneSim, { backgroundColor: '#E8E8E8' }]}>
              <View style={styles.phoneHeader}>
                <Text style={{ fontWeight: 'bold' }}>Od: {task.content.sender}</Text>
              </View>
              <View style={styles.smsBubble}>
                <Text style={{ fontSize: 16 }}>{task.content.message}</Text>
              </View>
            </View>
          )}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.halfButton, { backgroundColor: colors.error }]}
              onPress={() => checkSpotTheCatch(false)}
            >
              <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.medium }]}>PODEJRZANE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.halfButton, { backgroundColor: colors.success }]}
              onPress={() => checkSpotTheCatch(true)}
            >
              <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.medium }]}>BEZPIECZNE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    case 'compare':
      return (
        <View style={styles.container}>
          <Text style={[styles.question, { color: colors.text, fontSize: sizes.large }]}>{task.question}</Text>
          <TouchableOpacity
            style={[styles.compareBox, { borderColor: colors.gray }]}
            onPress={() => checkCompare('a')}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Wiadomość A:</Text>
            <Text style={{ fontSize: sizes.medium }}>{task.content.a}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.compareBox, { borderColor: colors.gray }]}
            onPress={() => checkCompare('b')}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Wiadomość B:</Text>
            <Text style={{ fontSize: sizes.medium }}>{task.content.b}</Text>
          </TouchableOpacity>
        </View>
      );

    case 'password-tester':
      return (
        <View style={styles.container}>
          <Text style={[styles.question, { color: colors.text, fontSize: sizes.large }]}>{task.question}</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.primary, fontSize: sizes.medium }]}
            placeholder="Wpisz hasło..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: colors.primary }]}
            onPress={() => onAnswer(evaluatePassword(password))}
          >
            <Text style={[styles.buttonText, { color: colors.background, fontSize: sizes.medium }]}>Sprawdź siłę</Text>
          </TouchableOpacity>
        </View>
      );

    default:
      return <Text>Nieznany typ zadania</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  option: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfButton: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  phoneSim: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  phoneHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  smsBubble: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  emailSim: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  emailHeader: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emailBody: {
    padding: 12,
    backgroundColor: '#fff',
  },
  compareBox: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  mainButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  }
});
