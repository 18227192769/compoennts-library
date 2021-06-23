import { Hooks } from '../component';

export interface boxViewerProps {
    parentId: string,
    config?: boxViewerConfig,
    hooks?: Hooks
}

export interface boxViewerConfig {
    boxMatrix: string // '2X4'
    boxSize: [number, number]
}