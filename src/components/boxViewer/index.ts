import { ReactInstance } from "react";
import Component from "../component";
import createBoxs from './boxs/index';

import {
    boxViewerProps,
    boxViewerConfig
} from './index.d';

export default class BoxViewer extends Component<boxViewerConfig> {
    name: string;
    reactInstance: ReactInstance
    constructor(props: boxViewerProps) {
        super(props);
        this.name = 'box-viewer';

        this.config = props.config ?? {
            boxMatrix: '3X3',
            boxSize: [300, 300]
        }

        this.init();
    }

    public init() {
        this.reactInstance = createBoxs(this)
    }
}