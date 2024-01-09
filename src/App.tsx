import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addTrack, setupPlayer } from '../musicPlayerService';

import MusicPlayer from './screens/MusicPlayer';

export default function App(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  // Loading Screen -> When Player is not ready :)
  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
