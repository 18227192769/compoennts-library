export interface VideoViewerConfig {
    videoMatrix?: string,
    defaultVideoSrc?: string[]
}

export interface VideoViewerProps {
    parentId: string,
    config?: VideoViewerConfig
}