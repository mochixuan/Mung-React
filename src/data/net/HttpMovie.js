/*用了代理解决跨域所以头未/api了*/
import {BaseGetRequest} from "./HttpBase";

const BASE_URL = "/api"

/*正在热映*/
const MOVIE_HOT_URL = "/movie/in_theaters"
/*top250*/
const MOVIE_TOP250_URL="/movie/top250"
/*口碑榜*/
const MOVIE_PRAISE_URL = "/movie/weekly"
/*北美票房榜*/
const MOVIE_NORTH_URL = "/movie/us_box"
/*新片榜*/
const MOVIE_NEWS_URL = "/movie/new_movies"
/*电影条目信息*/
const MOVIE_DETAIL_URL = '/movie/subject/'
/*电影搜索*/
const MOVIE_SEARCH_URL = '/movie/search'

export const requestMovieHot = (start,count) => BaseGetRequest(`${BASE_URL+MOVIE_HOT_URL}?start=${start}&count=${count}`)

export const requestMovieDetail = (id) => BaseGetRequest(BASE_URL+MOVIE_DETAIL_URL+id)
