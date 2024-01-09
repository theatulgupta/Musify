import App from './src/App';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json';
import { playbackService } from './musicPlayerService';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);
