import ThemeStore from './ThemeStore'
import HomeStore from "./HomeStore";
import DetailStore from "./DetailStore";

// combine
const store = {
    themeStore: new ThemeStore(),
    homeStore: new HomeStore(),
    detailStore: new DetailStore()
}

export default store
