import {observable} from 'mobx'
import {ThemeItems} from '../data/const/Constant'

export default class ThemeStore {

    @observable themeColor = ThemeItems[0].color


}
