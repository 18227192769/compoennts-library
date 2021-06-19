import React from 'react';
import ReactDom from 'react-dom';
import Component, { Frame } from '../component';

interface Props {}
interface State {}

class Boxs extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    state = {
        value: 123
    }

    updateValue(value: string) {
        this.setState({
            value
        })
    }

    render() {
        return (
            <div>{ this.state.value }</div>
        )
    }
}

export default function createBoxs(
    componentInstance: any,
    $parent: JQuery<HTMLElement>
) {
    let reactInstance: any = null;

    componentInstance.mount(
        Frame.react,
        $parent,
        <Boxs ref={(instance: any) => reactInstance = instance} />
    )

    return reactInstance
}