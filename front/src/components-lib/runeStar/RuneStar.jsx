import React from 'react'

import './RuneStar.scss'

class RuneStar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        }

        this.onClick1 = this.onClick.bind(this, '1')
        this.onClick2 = this.onClick.bind(this, '2')
        this.onClick3 = this.onClick.bind(this, '3')
        this.onClick4 = this.onClick.bind(this, '4')
        this.onClick5 = this.onClick.bind(this, '5')
        this.onClick6 = this.onClick.bind(this, '6')
    }

    onClick(rune) {
        let data = {}
        data[rune] = !this.state[rune]
        if (this.props.onChange) {
            this.props.onChange(data)
        }
        this.setState(data)
    }

    render() {
        return (
            <div className='sm-runestar'>
                <div className='sm-runestar-container'>
                    <img src={'assets/images/runes_star/rune_background.png'}/>
                    <div 
                        className={'sm-runestar-pos sm-runestar-pos-top' + (this.state[1] ? ' sm-runestar-selected' : '')}
                        onClick={this.onClick1}/>
                    <div 
                        className={'sm-runestar-pos sm-runestar-pos-top-right' + (this.state[2] ? ' sm-runestar-selected' : '')}
                        onClick={this.onClick2}/>
                    <div 
                        className={'sm-runestar-pos sm-runestar-pos-bottom-right' + (this.state[3] ? ' sm-runestar-selected' : '')}
                        onClick={this.onClick3}/>
                    <div 
                        className={'sm-runestar-pos sm-runestar-pos-bottom' + (this.state[4] ? ' sm-runestar-selected' : '')}
                        onClick={this.onClick4}/>
                    <div 
                        className={'sm-runestar-pos sm-runestar-pos-bottom-left' + (this.state[5] ? ' sm-runestar-selected' : '')}
                        onClick={this.onClick5}/>
                    <div 
                        className={'sm-runestar-pos sm-runestar-pos-top-left' + (this.state[6] ? ' sm-runestar-selected' : '')}
                        onClick={this.onClick6}/>
                </div>
            </div>
        )
    }

}
export default RuneStar
