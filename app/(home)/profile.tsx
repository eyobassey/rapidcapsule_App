import { Icons } from '@assets/icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppAvatar, AppIcon, AppText } from '@/components/base';
import type { AppIconName } from '@/components/base/AppIcon/AppIcon';
import { foundationColors } from '@/config/foundation-colors';
import { CircularProgress } from '@/shared/ui/organisms';
import { useAuthStore } from '@/store';

const PROFILE_BG = '#f1f5f9';
const CARD_BG = '#ffffff';
const SECTION_LABEL_COLOR = '#94a3b8';
const WALLET_GRADIENT = ['#155DFC', '#51A2FF'] as const;
const ARROW_COLOR = 'rgba(255, 255, 255, 0.25)';

interface ProfileRowProps {
  icon?: AppIconName;
  iconColor?: string;
  iconElement?: React.ReactNode;
  iconBgColor: string;
  label: string;
  labelColor?: string;
  onPress?: () => void;
}

function ProfileRow({
  icon,
  iconColor,
  iconElement,
  iconBgColor,
  label,
  labelColor,
  onPress,
}: ProfileRowProps) {
  const bgColor = iconBgColor;
  const { theme } = useUnistyles();

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={[styles.rowIconWrap, { backgroundColor: bgColor }]}>
        {iconElement ??
          (icon != null && <AppIcon name={icon} size={18} color={iconColor ?? '#fff'} />)}
      </View>
      <AppText
        variant="bodyMedium"
        style={[
          styles.rowLabel,
          labelColor != null ? { color: labelColor } : null,
          { fontWeight: theme.typography.fontWeight.regular },
        ]}
      >
        {label}
      </AppText>
      <AppIcon name="TaillessLineArrowRight1" size={20} color={SECTION_LABEL_COLOR} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { theme } = useUnistyles();
  const user = useAuthStore((s) => s.user);

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Guest';
  const displayEmail = user?.email ?? '';
  const progress = useSharedValue(29);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User info card */}
        <View style={[styles.card, styles.cardContent]}>
          <View style={styles.userRow}>
            <View style={styles.avatarWrap}>
              <AppAvatar
                source={user?.profilePicture ? { uri: user.profilePicture } : undefined}
                name={displayName || undefined}
                size="large"
                style={styles.avatar}
              />
              <View style={styles.cameraBadge}>
                <AppIcon name="EditImagePhoto" size={14} color={theme.colors.primary} />
              </View>
            </View>
            <View style={styles.userInfo}>
              <AppText variant="h3" numberOfLines={1}>
                {displayName || 'My Profile'}
              </AppText>
              <AppText variant="bodySmall" color={theme.colors.textSecondary} numberOfLines={1}>
                {displayEmail}
              </AppText>
            </View>
          </View>

          <View style={styles.completionRow}>
            <View style={styles.completionLeft}>
              <CircularProgress
                progress={progress}
                size={20}
                strokeWidth={3}
                outerCircleColor={theme.colors.palette.base.white}
                progressCircleColor={theme.colors.primary}
                backgroundColor="transparent"
                gap={10}
              />
              <AppText variant="caption" style={styles.completionText} numberOfLines={1}>
                29% complete
              </AppText>
              <View style={styles.stepsPill}>
                <AppText variant="caption" style={styles.stepsPillText} numberOfLines={1}>
                  7 steps remaining
                </AppText>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [styles.finishButton, pressed && styles.finishButtonPressed]}
            >
              <LinearGradient
                colors={['#155DFC', '#1D4ED8']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.finishButtonGradient}
              >
                <AppText variant="bodySmall" style={styles.finishButtonText}>
                  Finish Setup
                </AppText>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        {/* Wallet & credits card */}
        <View style={[styles.card, styles.verticalSpacer]}>
          <LinearGradient
            colors={[...WALLET_GRADIENT]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.walletGradient}
          >
            <View style={styles.walletLeft}>
              <View style={styles.walletIconWrap}>
                <AppIcon name="Wallet" size={22} color="#fff" />
              </View>
              <View>
                <AppText variant="caption" style={styles.walletLabel}>
                  Wallet Balance
                </AppText>
                <AppText variant="bodyMedium" style={styles.walletAmount}>
                  ₦ 18400
                </AppText>
              </View>
            </View>
            <Pressable style={styles.creditsRight}>
              <View style={styles.creditsPill}>
                <AppIcon name="CoinDiagonal" size={18} color="#fff" />
                <AppText variant="caption" style={styles.creditsText}>
                  12 AI credits
                </AppText>
              </View>
              <AppIcon name="TaillessLineArrowRight1" size={18} color={ARROW_COLOR} />
            </Pressable>
          </LinearGradient>
        </View>

        {/* ACCOUNT */}
        <AppText variant="bodySmall" style={styles.sectionHeader}>
          ACCOUNT
        </AppText>
        <View style={styles.card}>
          <ProfileRow
            icon="UserEditPencil"
            iconColor="#fff"
            iconBgColor={theme.colors.palette.blue[500]}
            label="Personal Details"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            icon="LocationHome"
            iconColor="#fff"
            iconBgColor={theme.colors.palette.orange[500]}
            label="Address & Emergency Contacts"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            icon="MedicalFilesReportHistory"
            iconColor="#fff"
            iconBgColor={theme.colors.palette.indigo[500]}
            label="Medical History"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            icon="NoPoverty"
            iconColor="#fff"
            iconBgColor={theme.colors.palette.violet[500]}
            label="Dependents & Family"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            iconElement={<Icons.HeartRatePulseGraph width={22} height={22} color="#fff" />}
            iconBgColor={theme.colors.palette.green[500]}
            label="Vitals & Health Metrics"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            iconElement={<Icons.AllergensLupin width={22} height={22} color="#fff" />}
            iconBgColor={foundationColors.amber[500]}
            label="Allergies & Drug Reactions"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            iconElement={<Icons.WatchCircleHeartbeatMonitor2 width={22} height={22} color="#fff" />}
            iconBgColor={theme.colors.palette.gray[950]}
            label="Devices & Health Apps"
          />
        </View>

        {/* PREFERENCES */}
        <AppText variant="bodySmall" style={styles.sectionHeader}>
          PREFERENCES
        </AppText>
        <View style={styles.card}>
          <ProfileRow
            iconElement={<Icons.BellNotification width={22} height={22} color="#fff" />}
            iconBgColor={theme.colors.palette.orange[500]}
            label="Notification Settings"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            icon="ChatTwoBubblesSquareText1"
            iconColor="#fff"
            iconBgColor={theme.colors.palette.blue[500]}
            label="Need Help?"
          />
        </View>

        {/* OTHERS */}
        <AppText variant="bodySmall" style={styles.sectionHeader}>
          OTHERS
        </AppText>
        <View style={styles.card}>
          <ProfileRow
            iconElement={<Icons.DoorOpenHouseExitLogout width={22} height={22} color="#fff" />}
            iconBgColor={theme.colors.palette.gray[950]}
            label="Sign Out"
          />
          <View style={styles.rowDivider} />
          <ProfileRow
            iconElement={<Icons.RecycleBin2 width={22} height={22} color="#fff" />}
            iconBgColor={theme.colors.palette.red[500]}
            label="Delete Account"
            labelColor={theme.colors.palette.red[500]}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  avatar: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  avatarWrap: {
    position: 'relative',
  },
  bottomSpacer: {
    height: theme.spacing.xl,
  },
  cameraBadge: {
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderColor: CARD_BG,
    borderRadius: 12,
    borderWidth: 2,
    bottom: 0,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 24,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardContent: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  completionLeft: {
    alignItems: 'center',
    backgroundColor: theme.colors.palette.blue[100],
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    flexShrink: 1,
    gap: theme.spacing.sm,
    maxWidth: '70%',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  completionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completionText: {
    color: theme.colors.palette.blue[600],
    fontSize: theme.typography.fontSize.caption,
  },
  creditsPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 9999,
    flexDirection: 'row',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  creditsRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  creditsText: {
    color: '#fff',
  },
  finishButton: {
    borderRadius: theme.borderRadius.full,
    flexShrink: 0,
    marginLeft: 'auto',
  },
  finishButtonGradient: {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  finishButtonPressed: {
    opacity: 0.9,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: theme.typography.fontSize.xs,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  rowDivider: {
    backgroundColor: '#e2e8f0',
    height: 1,
    marginLeft: theme.spacing.lg + 40 + theme.spacing.md,
  },
  rowIconWrap: {
    alignItems: 'center',
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  rowLabel: {
    flex: 1,
  },
  rowPressed: {
    opacity: 0.7,
  },
  screen: {
    backgroundColor: PROFILE_BG,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  sectionHeader: {
    color: SECTION_LABEL_COLOR,
    letterSpacing: 0.5,
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
  },
  stepsPill: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: theme.colors.palette.blue[200],
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    flexShrink: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs / 2,
  },
  stepsPillText: {
    color: theme.colors.palette.blue[600],
    fontSize: theme.typography.fontSize.caption,
  },
  userInfo: {
    flex: 1,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  verticalSpacer: {
    marginTop: theme.spacing.lg,
  },
  walletAmount: {
    color: '#fff',
    fontWeight: '700',
  },
  walletGradient: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  walletIconWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  walletLabel: {
    color: '#fff',
    opacity: 0.95,
  },
  walletLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
}));
