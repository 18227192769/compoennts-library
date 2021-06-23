import BoxViewer from "components/boxViewer/index";
import VideoPlayer from "components/videoPlayer/index";
import renderVideoBox from "./videoBox";

import { VideoViewerConfig, VideoViewerProps } from './index.d';

declare global {
    interface Window {
        VideoViewer: any
    }
}
class VideoViewer {
    playerInstances: VideoPlayer[];
    boxViewerInstance: BoxViewer;
    boxIds: string[];

    parentId: string
    config: VideoViewerConfig

    constructor(props: VideoViewerProps) {
        this.boxIds = [];
        this.parentId = props.parentId;
        this.config = props.config ?? {
            defaultVideoSrc: [
                'https://chimee.org/vod/1.mp4',
                'http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8'
            ]
        };
        this.init()
    }

    public init() {
        this.boxViewerInstance = this.createBoxViewer();
        this.playerInstances = this.createVideoPlayer();
    }

    public createBoxViewer() {
        return new BoxViewer({ 
            parentId: this.parentId,
            config: {
                boxMatrix: '2X2',
                boxSize: [200, 200]
            },
            hooks: {
                renderBoxContent: ({ key }) => {
                    const id = `video-${key}`
                    this.boxIds.push(id)
                    return renderVideoBox(id)
                }
            }
        })
    }

    public createVideoPlayer() {
        let prevSrc: string = '';
        const { defaultVideoSrc } = this.config;
        return this.boxIds.map((id, index) => {
            const src = defaultVideoSrc[index];
            const instance = new VideoPlayer({
                parentId: id,
                config: {
                    controls: true,
                    autoplay: true,
                    src: src ?? prevSrc
                }
            })

            src && (prevSrc = src);

            return instance
        })
    }
}

window.VideoViewer = VideoViewer;

window.mm = new VideoViewer({
    parentId: 'root'
})