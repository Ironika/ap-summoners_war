import { BaseData }  from 'ap-react-bootstrap'
import AppHelper from 'helpers/AppHelper'
import RuneHelper from 'helpers/RuneHelper'

import StatType from 'utils/constants/StatType'
import SetType from 'utils/constants/SetType'

let SETS_BONUS = {
    Energy: 2,
    Swift: 4,
    Despair: 4,
    Blade: 2,
    Focus: 2,
    Fatal: 4,
    Revenge: 2,
    Vampire: 4,
    Rage: 4,
    Guard: 2,
    Shield: 2,
    Revenge: 2,
    Will: 2,
    Nemesis: 2,
    Violent: 4,
    Destroy: 2,
    Fight: 0,
    Determination: 0,
    Enhance: 0,
    Accuracy: 0,
    Tolerance: 0,
    Endure: 0,
}

class MonsterProfilData extends BaseData {

    register(obj) {
        super.register(obj)

        this.obj.onClickInfos = this.onClickInfos.bind(this)
        this.obj.onClickRunes = this.onClickRunes.bind(this)

        this.obj.state = {
            currentPage: 'infos',
            monsterHaveRunes: false,
            monster: {},
            bonus: {},
            runes: []
        }

        AppHelper.register('/currentMonster', this, this.onMonsterChange.bind(this));
    }

    unregister() {
        AppHelper.unregister(this)
    }

    _buildSetsAndBonusRunes(runes) {
        let runeSets = {}
        let runeBonus = {}
        runeBonus[StatType.HP.key] = 0
        runeBonus[StatType.HPFLAT.key] = 0
        runeBonus[StatType.DEF.key] = 0
        runeBonus[StatType.DEFFLAT.key] = 0
        runeBonus[StatType.ATK.key] = 0
        runeBonus[StatType.ATKFLAT.key] = 0
        runeBonus[StatType.SPD.key] = 0
        runeBonus[StatType.CRATE.key] = 0
        runeBonus[StatType.CDMG.key] = 0
        runeBonus[StatType.RES.key] = 0
        runeBonus[StatType.ACC.key] = 0

        for(let rune in runes) {
            let currentRune = runes[rune]
            if (currentRune.set in runeSets)
                runeSets[currentRune.set]++ 
            else 
                runeSets[currentRune.set] = 1

            if (currentRune.statMainType)
                runeBonus[currentRune.statMainType] += currentRune.statMain
            if (currentRune.statSubType)
                runeBonus[currentRune.statSubType] += currentRune.statSub
            if (currentRune.stat1Type)
                runeBonus[currentRune.stat1Type] += currentRune.stat1
            if (currentRune.stat2Type)
                runeBonus[currentRune.stat2Type] += currentRune.stat2
            if (currentRune.stat3Type)
                runeBonus[currentRune.stat3Type] += currentRune.stat3
            if (currentRune.stat4Type)
                runeBonus[currentRune.stat4Type] += currentRune.stat4
        }
           
        let sets = {}
        for(let set in runeSets)
            if(runeSets[set] >= SETS_BONUS[set])
                if (set in sets)
                    sets[set]++ 
                else 
                    sets[set] = 1

        return { sets : sets, bonus: runeBonus}
    }

    computeHpBonus(baseHp, bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.ENERGY.key])
            bonusSet = (sets[SetType.ENERGY.key] * 0.15) * baseHp
        return bonusSet + bonus[StatType.HPFLAT.key] + (baseHp * bonus[StatType.HP.key] / 100)
    }

    computeAtkBonus(baseAtk, bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.FATAL.key])
            bonusSet = (sets[SetType.FATAL.key] * 0.35) * baseAtk
        return bonusSet + bonus[StatType.ATKFLAT.key] + (baseAtk * bonus[StatType.ATK.key] / 100)
    }

    computeDefBonus(baseDef, bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.GUARD.key])
            bonusSet = (sets[SetType.GUARD.key] * 0.15) * baseDef
        return bonusSet + bonus[StatType.DEFFLAT.key] + (baseDef * bonus[StatType.DEF.key] / 100)
    }

    computeSpdBonus(baseSpd, bonus, sets) {
         let bonusSet = 0
        if (sets[SetType.SWIFT.key])
            bonusSet = (sets[SetType.SWIFT.key] * 0.25) * baseSpd
        return bonusSet + bonus[StatType.SPD.key]
    }

    computeCrateBonus(bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.BLADE.key])
            bonusSet = sets[SetType.BLADE.key] * 12
        return bonusSet + bonus[StatType.CRATE.key]
    }

    computeCdmgBonus(bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.RAGE.key])
            bonusSet = sets[SetType.RAGE.key] * 40
        return bonusSet + bonus[StatType.CDMG.key]
    }

    computeResBonus(bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.ENDURE.key])
            bonusSet = sets[SetType.ENDURE.key] * 20
        return bonusSet + bonus[StatType.RES.key]
    }

    computeAccBonus(bonus, sets) {
        let bonusSet = 0
        if (sets[SetType.FOCUS.key])
            bonusSet = sets[SetType.FOCUS.key] * 20
        return bonusSet + bonus[StatType.ACC.key]
    }

    onMonsterChange() {
        let monster = AppHelper.getData('/currentMonster')
        let runes = []

        let allRunes = RuneHelper.getData()
        let monsterHaveRunes = false
        for (let key in allRunes) {
            if (allRunes[key].monsterId == monster.id) {
                runes.push(allRunes[key])
                monsterHaveRunes = true
            }
        }

        let setsAndBonus = this._buildSetsAndBonusRunes(runes)
        let sets = setsAndBonus.sets
        let rawBonus = setsAndBonus.bonus
        let computedBonus = {
            hp: Math.floor(this.computeHpBonus(monster.hp, rawBonus, sets)),
            atk: Math.floor(this.computeAtkBonus(monster.atk, rawBonus, sets)),
            def: Math.floor(this.computeDefBonus(monster.def, rawBonus, sets)),
            spd: Math.floor(this.computeSpdBonus(monster.spd, rawBonus, sets)),
            crate: Math.floor(this.computeCrateBonus(rawBonus, sets)),
            cdmg: Math.floor(this.computeCdmgBonus(rawBonus, sets)),
            res: Math.floor(this.computeResBonus(rawBonus, sets)),
            acc: Math.floor(this.computeAccBonus(rawBonus, sets))
        }

        if(monsterHaveRunes)
            this.setState({ monster: monster, monsterHaveRunes: monsterHaveRunes, runes: runes, sets: sets, bonus: computedBonus})
        else 
            this.setState({ monster: monster, monsterHaveRunes: monsterHaveRunes, currentPage: 'infos', runes: runes, sets: sets, bonus: computedBonus})
    }

    onClickRunes() {
        this.setState({ currentPage: 'runes' })
    }

    onClickInfos() {
        this.setState({ currentPage: 'infos' })
    }
}
let MonsterProfilObj = new MonsterProfilData()
export default MonsterProfilObj