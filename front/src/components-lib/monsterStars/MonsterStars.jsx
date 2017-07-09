import React from 'react'

import './MonsterStars.scss'

let STAR_COLOR = {
    GREY: 'grey',
    YELLOW: 'yellow',
    PURPLE: 'purple'
}

class MonsterStars extends React.Component {

    constructor(props) {
        super(props)
    }

    _buildStars() {
        let stars = this.props.stars || 1
        let color = STAR_COLOR.YELLOW
        let result = []
        for (let i = 0; i < stars; i++) {
            result.push(this._buildStar(color, i))
        }
        return result
    }

    _buildStar(color, index) { return (
        <div key={index} className='sm-monsterstar'>
            <img className='sm-monsterstar-image' src={'assets/images/monsters_assets/Star_' + color + '.png'}/>
        </div>
    )}

    render() { return (
        <div className='sm-monsterstars'>
            {this._buildStars()}
        </div>
    )}

}
export default MonsterStars
