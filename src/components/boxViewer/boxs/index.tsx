import React from 'react';
import Component, { Frame, Hooks } from '../../component';
import { boxViewerConfig } from '../index.d';

import './index.less';

interface Props {
    config: boxViewerConfig,
    componentInstance: Component<boxViewerConfig>
}

class Boxs extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    state = {
        currentCheck: 'col-0-0',
        boxMatrix: this.props.config.boxMatrix,
        boxSize: this.props.config.boxSize
    }

    checkBox(key: string) {
        if (key === this.state.currentCheck) {
            key = '';
        }
        this.setState({
            currentCheck: key
        })
    }

    /**
     * 解析盒子矩阵配置
     * @param matrix 
     * @returns 
     */
    parseBoxMatrix(matrix: string) {
        const [x, y] = matrix.split('X');

        if (
            window.isNaN(+x) ||
            window.isNaN(+y)
        ) {
            throw new Error('config error: the matrix is illegal')
        }

        return {
            x: Number(x),
            y: Number(y)
        };
    }

    /**
     * 渲染盒子
     * @param row 
     * @param col 
     * @returns 
     */
    renderBox(
        row: number,
        col: number,
        boxSize: [number, number]
    ) {
        const { currentCheck } = this.state;
        const key = `${row}-${col}`;
        const [ width, height ] = boxSize;

        return (
            <div 
                className={`boxs-viewer-content-col ${currentCheck === key ? 'box-checked' : ''}`}
                key={key}
                onClick={() => this.checkBox(key)}
                style={{
                    width,
                    height
                }}
            >
                <div className='boxs-viewer-content-col-item'>
                    {this.props.componentInstance.executeHooks('renderBoxContent', {
                        key
                    })}
                </div>
            </div>
        )
    }

    /**
     * 渲染盒子矩阵
     * @returns 
     */
    renderBoxs() {
        const { boxMatrix, boxSize } = this.state;

        const { x, y } = this.parseBoxMatrix(boxMatrix);

        const rowElements = [];

        for (let i = 0; i < x; i ++) {
            const columnElements = [];
            for (let j = 0; j < y; j ++) {
                columnElements.push(
                    this.renderBox(i, j, boxSize)
                )
            }
            rowElements.push(
                <div className='boxs-viewer-content-row' key={`row-${i}`}>
                    { columnElements }
                </div>
            )
        }
        return rowElements;
    }

    render() {
        return (
            <div className='boxs-viewer-content'>
                { this.renderBoxs() }
            </div>
        )
    }
}

export default function createBoxs(
    componentInstance: any
) {
    let reactInstance: any = null;

    const {
        $parent,
        config
    } = componentInstance;

    componentInstance.mount(
        Frame.react,
        $parent,
        <Boxs
            config={ config }
            componentInstance={ componentInstance }
            ref={(instance: any) => reactInstance = instance}
        />
    )

    return reactInstance
}