export default class DataService {
  static getData(store, trigger, param) {
      if (trigger) store.commit('CLEAR_' + param.toUpperCase());
      if (store.state[param].length === 0) {
          let local = JSON.parse(localStorage.getItem(param));
          if (local) {
              store.commit('FETCH_' + param.toUpperCase(), local);
          }
      }
  }
  static sendData(store, param){
      localStorage.setItem( param, JSON.stringify(store.state[param]));
  }

}
