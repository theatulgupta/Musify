import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player';

import ControlCenter from '../components/ControlCenter';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import { playListData } from '../constants';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (event.type === Event.PlaybackTrackChanged) {
            const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
            setTrack(playingTrack);
        }
    });

    const renderArtWork = () => (
        <View style={styles.listArtWrapper}>
            <View style={styles.albumContainer}>
                {track?.artwork && (
                    <Image style={styles.albumArtImg} source={{ uri: track?.artwork?.toString() }} />
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={playListData}
                renderItem={renderArtWork}
                keyExtractor={(song) => song.id.toString()}
            />
            <SongInfo track={track} />
            <SongSlider />
            <ControlCenter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
    },
    listArtWrapper: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumContainer: {
        width: 300,
        height: 300,
    },
    albumArtImg: {
        height: '100%',
        borderRadius: 4,
    },
});

export default MusicPlayer;
