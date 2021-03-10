class Store {
  constructor() {
    this._state = {};
  }

  get(key) {
    if (key in this._state) {
      return this._state[key];
    } else {
      throw new Error(`${key} is not defined`);
    }
  }

  set(key, val) {
    this._state[key] = val;
  }

  connect(cls) {
    let store = this;
    console.log(this)
    return class extends cls {
      constructor(...args) {
        super(...args);

        this.get = store.get.bind(store);
        this.set = store.set.bind(store);

        // this.get=store.get;
        // this.set=store.set;
      }
    };
  }
}

let store = new Store();
