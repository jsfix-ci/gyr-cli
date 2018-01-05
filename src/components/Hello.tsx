import * as  React from 'react'

export interface Props { name: string }

export default class Hello extends React.Component<Props, undefined> {
    public render() {
      return <h1>Hello {this.props.name} !</h1>
    }
}
