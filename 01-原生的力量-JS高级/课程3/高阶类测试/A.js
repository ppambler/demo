const A = store.connect(
  class {
    constructor() {}

    getA() {
      console.log(this.get("a"));
    }
  }
);
