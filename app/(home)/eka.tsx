import React from 'react';

import { Screen } from '@/components/base';
import { EkaCompanionScreen } from '@/components/home';

export default function EkaScreen() {
  return (
    <Screen edges={['top']}>
      <EkaCompanionScreen />
    </Screen>
  );
}
