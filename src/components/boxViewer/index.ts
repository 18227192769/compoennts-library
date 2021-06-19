import { ReactInstance } from "react";
import Component, { Hooks } from "../component";
import createBoxs from './box';

export interface boxViewerProps {
    parentId: string,
    config: Config,
    hooks: Hooks
}

interface Config {
    boxMatrix: string // '2X4'
    boxSize: [number, number]
}

export default class BoxViewer extends Component<Config> {
    name: string;
    reactInstance: ReactInstance
    constructor(props: boxViewerProps) {
        super(props);
        this.name = 'box-viewer';
    }

    public init() {
        this.reactInstance = createBoxs(this, this.$parent)
    }
}