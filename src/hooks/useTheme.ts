import { useAppContext } from '../context/AppContext';
import { Colors, HighContrastColors, FontSizes } from '../constants/Theme';

export const useTheme = () => {
  const { settings } = useAppContext();

  const colors = settings.highContrast ? HighContrastColors : Colors;
  const sizes = FontSizes[settings.fontSize];

  return { colors, sizes, settings };
};
