import Component, { Props } from "../component";
import { VideoPlayerConfig } from './index.d';
import Chimee from 'chimee';

import flv from 'chimee-kernel-flv';
import hls from 'chimee-kernel-hls';

export default class VideoPlayer extends Component<VideoPlayerConfig> {
    parentId: string;
    player: any
    constructor(props: Props<VideoPlayerConfig>) {
        super(props)

        this.parentId = props.parentId;

        this.init();
    }

    public init() {
        this.player = this.createPlayer()
    }

    public createPlayer() {
        return new Chimee({
            wrapper: `#${this.parentId}`,
            kernels: {
                flv,
                hls
            },
            ...this.config
        })
    }
}