const B=store.connect(class {
  constructor(){

  }

  setA(val){
    this.set('a', val);
  }
});
