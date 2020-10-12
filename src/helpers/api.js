import Axios from 'axios'
import authHeader from './authHeader';
/** 
 * const PROD_URL = 'https://api.aniimam.com/api'; 
*/
const DEV_URL = 'http://localhost:8080/api';

const axios = Axios.create({
    baseURL: DEV_URL
  });

  
export default axios

const BASE_ROUTES = {
  empty:''
};

/**
* List all items
* @return {Promise}
*/
function list(){
    return axios.get(this.baseRoute,{ headers: authHeader() });
  }
  
  /**
  * Create new item
  * @param {Object} itemInfo the new Item
  * @return {Promise}
  */
  function create(itemInfo){
    return axios.post(this.baseRoute, itemInfo,{ headers: authHeader() });
  }
  
  
  /**
  * Retrieve a single item
  * @param {numbre} id
  * @return {Promise}
  */
  function get(id){
   return axios.get(this.baseRoute+"/"+id,{ headers: authHeader() });
  }
  
  /**
  * Update an item
  * @param {numbre} id the id of the item
  * @param {Object} itemInfo the new Item information
  */
  function update(id, itemInfo){
    return axios.put(this.baseRoute+"/"+id, itemInfo,{ headers: authHeader() });
  }

  /**
* Remove an item
* @param {number} id
* @return {Promise} 
*/
function remove(id){
    return axios.delete(this.baseRoute+"/"+id,{ headers: authHeader() });
  }
  
  
  /**
  * Make request
  * @param {String} url
  * @param {String} method HTTP METHOD
  * @param {object} data
  * @param {obect} params URL params
  * @return {Promise} 
  */
  function request(url, method="get", data={}, params={}){
    return axios.request({url, method, data, params,headers:authHeader()});
  }

  /**
 * Conection to section of the server.
*/
export  class Api{
    constructor(baseRoute){
        this.baseRoute = baseRoute;
    }
    static ROUTES(){
        return BASE_ROUTES;
    }
  }
  
  Api.prototype.list = list;
  Api.prototype.create = create;
  Api.prototype.get = get;
  Api.prototype.update = update;
  Api.prototype.remove = remove;
  Api.prototype.request = request;
  //Api.prototype.GETMethod = GETMethod;
  //Api.prototype.POSTMethod = POSTMethod;