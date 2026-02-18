import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function AboutScreen() {
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
          RapidCapusle is a production-grade health tech application built with React Native, Expo,
          and TypeScript.
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
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.md,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  link: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  linkText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
  },
}));
