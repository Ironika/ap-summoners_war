import React from 'react'

import './SWPanel.scss'

class SWPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    render() { return (
        <div className={'sm-panel' + (this.props.size ? ' sm-panel-' + this.props.size : ' sm-panel-sm') +  (this.props.className ? ' ' + this.props.className : '')}>
            <div className='sm-panel-border sm-panel-border-top' />
            <div className='sm-panel-border sm-panel-border-right' />
            <div className='sm-panel-border sm-panel-border-bottom' />
            <div className='sm-panel-border sm-panel-border-left' />
            <div className='sm-panel-corner sm-panel-corner-tr' />
            <div className='sm-panel-corner sm-panel-corner-br' />
            <div className='sm-panel-corner sm-panel-corner-bl' />
            <div className='sm-panel-corner sm-panel-corner-tl' />
            {this.props.children}
        </div>
    )}
}
export default SWPanel
