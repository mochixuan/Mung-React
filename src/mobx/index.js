import ThemeStore from './ThemeStore'
import HomeStore from "./HomeStore";
import DetailStore from "./DetailStore";
import ListStore from "./ListStore";

// combine
const store = {
    themeStore: new ThemeStore(),
    homeStore: new HomeStore(),
    detailStore: new DetailStore(),
    listStore: new ListStore()
}

export default store
