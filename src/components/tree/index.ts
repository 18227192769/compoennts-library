import Component, { Props } from "../component";
import { TreeConfig } from './index.d';

export default class Tree extends Component<TreeConfig> {
    constructor(props: Props<TreeConfig>) {
        super(props);
    }

    public init() {}
}