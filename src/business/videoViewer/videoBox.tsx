import React from 'react';

interface Props {
    id: string
}
interface State {}

class VideoBox extends React.Component<Props, State> {
    render () {
        return (
            <div id={this.props.id} style={{ width: '100%', height: '100%' }}>
            </div>
        )
    }
}

export default function renderVideoBox(key: string) {
    return <VideoBox id={key} />
}