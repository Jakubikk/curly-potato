# CyberSenior - Bezpieczeństwo w Twoich Rękach

Aplikacja edukacyjna imitująca Duolingo, skierowana do osób starszych, ucząca podstaw cyberbezpieczeństwa.

## Funkcje
- **Ścieżka nauki**: Liniowy progres przez kolejne lekcje.
- **Lekcje MVP**:
  - Bezpieczne hasła (z testerem siły hasła).
  - Podejrzane wiadomości (symulacja SMS i e-mail).
  - Oszustwa telefoniczne (np. "na wnuczka").
- **Grywalizacja**: Zbieranie punktów XP oraz utrzymywanie "streaków" (serii dni nauki).
- **Ułatwienia dostępu**: Możliwość dostosowania wielkości czcionki oraz włączenia wysokiego kontrastu przy pierwszym uruchomieniu.
- **Mascot**: Przyjazna maskotka w formie animowanych emotikon ASCII.
- **Prywatność**: Wszystkie dane zapisywane są lokalnie na urządzeniu (brak backendu).

## Technologie
- React Native
- Expo
- TypeScript
- React Navigation
- React Native Reanimated (animacje)
- AsyncStorage (zapis lokalny)
- Lucide React Native (ikony)

## Jak uruchomić

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom aplikację:
   ```bash
   npx expo start
   ```

3. Możesz otworzyć aplikację:
   - Na telefonie z zainstalowaną aplikacją **Expo Go** (skanując kod QR).
   - W emulatorze Android/iOS (wymaga zainstalowanego Android Studio / Xcode).
   - W przeglądarce (naciśnij `w` w terminalu).

## Struktura projektu
- `src/screens`: Ekrany aplikacji (Home, Lesson, Setup).
- `src/components`: Komponenty wielokrotnego użytku (Mascot, TaskRenderer).
- `src/context`: Zarządzanie stanem (XP, postęp, ustawienia).
- `src/data`: Treści lekcji i zadań.
- `src/hooks`: Hooki pomocnicze (np. `useTheme`).
- `src/constants`: Kolory i rozmiary czcionek.
