function assert(exp, msg) {
  if (!exp) {
    throw new Error(msg);
  }
}

function _getElement(obj) {
  assert(obj, "root is required");

  if (typeof obj == "string") {
    let el = document.querySelector(obj);
    assert(el, `${obj} not found`);
    return el;
  } else if (obj instanceof HTMLElement) {
    return obj;
  } else {
    assert(false, "root is invaild");
  }
}

class Blue {
  constructor(options = {}) {
    this._root = _getElement(options.root);

    //
    this.timer = 0;

    //assert从简
    const _this = this;
    let proxy = new Proxy(options.data(), {
      get(data, name) {
        assert(name in data, `data '${name}' is not found`);

        return data[name];
      },
      set(data, name, val) {
        data[name] = val;

        _this.update();

        return true;
      },
    });

    this._parent = this._root.parentNode;
    console.log(this._parent)
    // this._template=document.createDocumentFragment();
    // this._template.appendChild(this._root);
    this._template = this._root.cloneNode(true);
    console.log(this._template)

    //保存所有methods
    this._methods = options.methods || {};

    this.update();

    this._data = proxy;
    return proxy;
  }

  update() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.render();
    }, 0);
  }

  render() {
    console.log("render");

    let root = this._template.cloneNode(true);

    //1.找到所有的模板({{}})
    Array.from(root.childNodes).forEach((child) => {
      if (child.nodeType == document.TEXT_NODE) {
        child.data = child.data.replace(/\{\{[^\}]+\}\}/g, (str) => {
          str = str.substring(2, str.length - 2).trim();

          let arr = [];
          for (let key in this._data) {
            arr.push(`let ${key}=${JSON.stringify(this._data[key])};`);
          }
          arr.push(str);
          // console.log(eval(arr.join("")))
          // 'let name="blue";let a=12;let b=5;let c=99;let json={"n":99};name' -> name 的值就是eval的返回值
          // console.log(arr.join(""))
          return eval(arr.join(""));
        });
      }
    });

    //2.找到所有的事件和属性
    Array.from(root.children).forEach((child) => {
      Array.from(child.attributes).forEach((attr) => {
        // console.dir(attr)
        if (attr.name.startsWith("@")) {
          let evname = attr.name.substring(1);

          child.addEventListener(
            evname,
            () => {
              let arr = [];
              for (let key in this._methods) {
                arr.push(`let ${key}=this._methods[${JSON.stringify(key)}];`);
              }
              arr.push(attr.value + ".call(this._data)");
              console.log(arr.join(""));
              eval(arr.join(""));
            },
            false
          );
        }
        if(attr.name.startsWith(":")) {
          // attr -> 属性节点对象
          console.dir(attr)
          let attrName = attr.name.substring(1)
          // 属性值的空格是有意义的，如class="cls1 cls2"
          // 所以这里不用 trim 了
          let attrValue = attr.value
          // 去掉:的属性，如 :value -> value
          console.log(attrName)
          // 有:标志属性的节点，如 input 的 :value 和 span 的 :title
          console.log(child)
          let arr = []
          // Proxy 实例 -> 监听你传的 data 函数的返回值
          // Proxy {name: "blue", a: 12, b: 5, c: 99, json: {…}}
          console.log(this._data)
          for (let key in this._data) {
            arr.push(`let ${key}=${JSON.stringify(this._data[key])};`);
          }
          arr.push(attrValue);
          // let name="blue";let a=12;let b=5;let c=99;let json={"n":99};a
          console.log(arr.join(''))
          // eval的返回值正是最后一行代码的返回值，也就是 a 的返回值
          attrValue = eval(arr.join(''))
          child.setAttribute(attrName,attrValue)
        }
      });
    });

    //新的元素换进去
    this._parent.replaceChild(root, this._root);
    this._root = root;
  }
}

let blue = new Blue({
  root: "#root",
  data() {
    return {
      name: "blue",
      a: 12,
      b: 5,
      c: 99,
      json: {
        n: 99,
      },
    };
  },
  methods: {
    add() {
      this.a += 6;
    },
  },
});
