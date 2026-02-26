import { Icons } from '@assets/icons';
import React from 'react';
import type { SvgProps } from 'react-native-svg';
import { useUnistyles } from 'react-native-unistyles';

export type AppIconName = keyof typeof Icons;

export interface AppIconProps extends Omit<SvgProps, 'width' | 'height'> {
  name: AppIconName;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 20,
  width,
  height,
  color,
  ...props
}) => {
  const { theme } = useUnistyles();
  const Icon = Icons[name] as React.FC<SvgProps> | undefined;

  if (!Icon) return null;

  return (
    <Icon
      width={width ?? size}
      height={height ?? size}
      color={color ?? theme.colors.text}
      {...props}
    />
  );
};
