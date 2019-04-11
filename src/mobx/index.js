import ThemeStore from './ThemeStore'
import HomeStore from "./HomeStore";

// combine
const store = {
    themeStore: new ThemeStore(),
    homeStore: new HomeStore()
}

export default store
