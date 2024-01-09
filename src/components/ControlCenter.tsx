import { Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
    const playBackState = usePlaybackState();

    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const togglePlayback = useCallback(async () => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex();

        if (currentTrack !== null) {
            if (playBackState && (playBackState.state === State.Paused || playBackState.state === State.Ready)) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }, [playBackState]);

    const playPauseIconName = (playBackState && playBackState.state === State.Playing) ? 'pause' : 'play-arrow';

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={togglePlayback} style={styles.playButton}>
                <Icon style={styles.icon} name={playPauseIconName} size={75} />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

export default ControlCenter;
