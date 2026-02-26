import React from 'react';
import { ActivityIndicator } from 'react-native';

export interface CircularLoaderProps {
  activeColor: string;
  size: number;
  strokeWidth: number;
  duration?: number;
}

export const CircularLoader: React.FC<CircularLoaderProps> = ({ activeColor, size }) => {
  return <ActivityIndicator color={activeColor} size={size} />;
};
