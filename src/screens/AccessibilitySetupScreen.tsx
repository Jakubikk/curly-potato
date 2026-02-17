import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccessibilitySetupScreen = () => {
  const { settings, updateSettings } = useAppContext();
  const { colors, sizes } = useTheme();

  const handleFinish = () => {
    updateSettings({ accessibilitySetupDone: true });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text, fontSize: sizes.xlarge }]}>
          Witaj w CyberSenior!
        </Text>
        <Text style={[styles.subtitle, { color: colors.gray, fontSize: sizes.medium }]}>
          Dostosuj aplikację do swoich potrzeb. Możesz zmienić te ustawienia później.
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: sizes.large }]}>
            Wielkość tekstu
          </Text>
          <View style={styles.buttonGroup}>
            {(['normal', 'large', 'extraLarge'] as const).map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  { borderColor: colors.primary },
                  settings.fontSize === size && { backgroundColor: colors.primary }
                ]}
                onPress={() => updateSettings({ fontSize: size })}
              >
                <Text style={[
                  styles.optionText,
                  { color: settings.fontSize === size ? colors.background : colors.primary, fontSize: sizes.medium }
                ]}>
                  {size === 'normal' ? 'Mała' : size === 'large' ? 'Średnia' : 'Duża'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: sizes.large }]}>
            Kontrast
          </Text>
          <TouchableOpacity
            style={[
              styles.optionButton,
              { borderColor: colors.primary, width: '100%' },
              settings.highContrast && { backgroundColor: colors.primary }
            ]}
            onPress={() => updateSettings({ highContrast: !settings.highContrast })}
          >
            <Text style={[
              styles.optionText,
              { color: settings.highContrast ? colors.background : colors.primary, fontSize: sizes.medium }
            ]}>
              {settings.highContrast ? 'Wysoki kontrast: WŁ' : 'Wysoki kontrast: WYŁ'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.preview}>
          <Text style={[styles.previewText, { color: colors.text, fontSize: sizes.medium }]}>
            Tak będzie wyglądał tekst w aplikacji.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: colors.primary }]}
          onPress={handleFinish}
        >
          <Text style={[styles.mainButtonText, { color: colors.background, fontSize: sizes.large }]}>
            Zacznij naukę
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    width: '100%',
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 32,
    alignItems: 'center',
  },
  previewText: {},
  mainButton: {
    width: '100%',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  mainButtonText: {
    fontWeight: 'bold',
  },
});

export default AccessibilitySetupScreen;
