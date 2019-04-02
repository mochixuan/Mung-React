import {observable} from 'mobx'
import {ThemeItems} from '../data/const/Constant'

class ThemeStore {

    @observable themeColor = ThemeItems[0].color

}

const themeStore = new ThemeStore()

export {themeStore}
