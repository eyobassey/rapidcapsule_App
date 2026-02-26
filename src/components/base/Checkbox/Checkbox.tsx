import React from 'react';
import BouncyCheckbox, { type BouncyCheckboxProps } from 'react-native-bouncy-checkbox';
import { StyleSheet } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';

export interface CheckboxProps extends Omit<
  BouncyCheckboxProps,
  'text' | 'fillColor' | 'unFillColor' | 'iconStyle'
> {
  label: string;
  emphasisText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  emphasisText,
  accessibilityLabel,
  testID,
  ...checkboxProps
}) => {
  const [prefix, suffix] = React.useMemo(() => {
    if (!emphasisText) return [label, ''] as const;
    const index = label.indexOf(emphasisText);
    if (index === -1) return [label, ''] as const;
    const pre = label.slice(0, index);
    const post = label.slice(index + emphasisText.length);
    return [pre, post] as const;
  }, [label, emphasisText]);

  return (
    <BouncyCheckbox
      {...checkboxProps}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      fillColor={stylesConfig.checkColor}
      unFillColor="transparent"
      iconStyle={styles.icon}
      innerIconStyle={styles.innerIcon}
      textComponent={
        <AppText variant="h5" style={styles.label}>
          {prefix}
          {emphasisText ? (
            <AppText variant="bodySmall" style={styles.emphasis}>
              {emphasisText}
            </AppText>
          ) : null}
          {suffix}
        </AppText>
      }
    />
  );
};

const stylesConfig = {
  checkColor: '#2563EB',
} as const;

const styles = StyleSheet.create((theme) => ({
  emphasis: {
    color: theme.colors.primary,
  },
  icon: {
    borderColor: stylesConfig.checkColor,
    borderRadius: 9999,
    borderWidth: 2,
  },
  innerIcon: {
    borderRadius: 9999,
  },
  label: {
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
}));
