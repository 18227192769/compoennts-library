import $ from 'jquery';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface Props<Config> {
    parentId: string
    config: Config,
    hooks: Hooks
}

export interface Hooks {
    [propname: string]: (params: any) => void
}

export enum Frame {
    none,
    react,
    vue
}

export default class Component<Config> {
    config: Config;
    hooks: Hooks;

    $parent: JQuery
    $element: JQuery
    constructor(props: Props<Config>) {
        const {
            parentId,
            config,
            hooks
        } = props;

        this.config = config;
        this.hooks = hooks;

        this.$parent = $(`#${parentId}`);
        this.$element = null;
    }

    /**
     * 初始化
     */
    public init() {}

    /**
     * 挂载元素
     * @param $parent 
     */
    public mount(frame: Frame, $parent: JQuery, component: ReactElement) {
        $parent = $parent ?? this.$parent;

        if (!$parent) {
            throw new Error('mount error: parent does not exist')
        }

        if (frame === Frame.none) {
            $parent.append(
                this.$element
            )
            return;
        }

        if (frame === Frame.react) {
            ReactDOM.render(component, $parent[0]);
            return;
        }
        
    }

    /**
     * 渲染函数
     */
    public render() {}

    /**
     * 执行钩子
     * @param hookName 
     */
    public executeHooks(hookName: string, params: any) {
        const targetHook = this.hooks[hookName];
        if (typeof targetHook !== 'function') {
            throw new Error(`not found hook: ${hookName}`)
        }
        targetHook(params);
    }
}