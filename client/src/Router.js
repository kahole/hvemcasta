import SimpleReactRouter from 'simple-react-router';
 
import Cast from './cast/Cast.js';
import Search from './controller/Search.js';
import Controller from './controller/Controller.js';
 
export default class Router extends SimpleReactRouter {
  routes(map){
    map('/', Controller)
    map('/search', Search)
    map('/cast', Cast)
  }
}
