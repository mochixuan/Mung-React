/*用了代理解决跨域所以头未/api了*/
import {BaseGetRequest,KEY_APP_ID} from "./HttpBase";

export const BASE_URL = "/api"




/*正在热映*/
const MOVIE_HOT_URL = "/movie/in_theaters"
/*电影条目信息*/
const MOVIE_DETAIL_URL = '/movie/subject/'

export const requestMovieHot = (start,count) => BaseGetRequest(`${BASE_URL+MOVIE_HOT_URL}?start=${start}&count=${count}`)

export const requestMovieDetail = (id) => BaseGetRequest(BASE_URL+MOVIE_DETAIL_URL+id)

export const requestMoviePhotos = (id,count) => BaseGetRequest(BASE_URL+MOVIE_DETAIL_URL+id+'/photos'+"?count="+count+"&"+KEY_APP_ID.name+"="+KEY_APP_ID.value)

export const requestMovieDiscuss = (id,start,count) => BaseGetRequest(BASE_URL+MOVIE_DETAIL_URL+id+"/comments"+"?start="+start+"&count="+count+"&"+KEY_APP_ID.name+"="+KEY_APP_ID.value)

export const requestListMovie = (url,start,count) => BaseGetRequest(url+"?start="+start+"&count="+count+"&"+KEY_APP_ID.name+"="+KEY_APP_ID.value)
