import { View, Text, StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Link, Stack } from 'expo-router';

export default function AboutScreen() {
  const { theme } = useUnistyles();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'About',
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>About RapidCapusle</Text>
        <Text style={styles.description}>
          RapidCapusle is a production-grade health tech application built with
          React Native, Expo, and TypeScript.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go Back Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  link: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  linkText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
}));
