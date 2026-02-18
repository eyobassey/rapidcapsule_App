/**
 * Network Monitoring Service
 *
 * Monitors network connectivity and provides network state information
 * Follows Single Responsibility Principle (SRP)
 */

import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: NetInfoStateType;
}

/**
 * Network Service Interface
 */
export interface INetworkService {
  getNetworkState(): Promise<NetworkState>;
  isConnected(): Promise<boolean>;
  subscribe(callback: (state: NetworkState) => void): () => void;
}

/**
 * Network Service Implementation
 */
class NetworkService implements INetworkService {
  /**
   * Get current network state
   */
  async getNetworkState(): Promise<NetworkState> {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
    };
  }

  /**
   * Check if device is connected
   */
  async isConnected(): Promise<boolean> {
    const state = await this.getNetworkState();
    return state.isConnected && (state.isInternetReachable ?? false);
  }

  /**
   * Subscribe to network state changes
   * Returns unsubscribe function
   */
  subscribe(callback: (state: NetworkState) => void): () => void {
    return NetInfo.addEventListener((state: NetInfoState) => {
      callback({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });
    });
  }
}

/**
 * React Hook for Network State
 */
export const useNetworkState = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: false,
    isInternetReachable: null,
    type: NetInfoStateType.unknown,
  });

  useEffect(() => {
    const service = new NetworkService();

    // Get initial state
    service.getNetworkState().then(setNetworkState);

    // Subscribe to changes
    const unsubscribe = service.subscribe(setNetworkState);

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
};

// Singleton instance
export const networkService = new NetworkService();
