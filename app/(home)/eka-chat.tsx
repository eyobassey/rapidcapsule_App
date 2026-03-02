import React from 'react';

import { Screen } from '@/components/base';
import { EkaChatScreen } from '@/components/home';

export default function EkaChatRoute() {
  return (
    <Screen edges={['top']}>
      <EkaChatScreen />
    </Screen>
  );
}
