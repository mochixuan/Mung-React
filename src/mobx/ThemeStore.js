import {observable,action} from 'mobx'
import {ThemeItems} from '../data/const/Constant'

export default class ThemeStore {

    @observable themeColor = ThemeItems[0].color

    @action
    changeThemeColor = (position) => {
        this.themeColor = ThemeItems[position].color
    }

}
