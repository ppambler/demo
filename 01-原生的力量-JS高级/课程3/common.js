function _getRoot(options) {
  assert(options.root, "root不能为空");

  if (typeof options.root == "string") {
    let root = document.querySelector(options.root);
    assert(root, `找不到: ${options.root}`);

    return root;
  } else if (options.root instanceof HTMLElement) {
    return options.root;
  } else {
    assert(false, "root不合法");
  }
}

function _getData(options) {
  assert(options.data, `data不能没有`);
  assert(typeof options.data == "function", `data必须是函数`);

  let data = options.data();
  assert(data, "data必须有返回值");
  assert(typeof data == "object", "data必须是object");

  return data;
}

function createClass(cls) {
  return new Proxy(cls, {
    construct(cls, args) {
      let obj = new cls(...args);

      obj._root = _getRoot(args[0]);
      let data = _getData(args[0]);

      for (let name in data) {
        obj[name] = data[name];
      }

      obj.render();

      return new Proxy(obj, {
        set(obj, name, val) {
          obj[name] = val;

          obj.render();
        },
      });
    },
  });
}

const HotList = createClass(
  class {
    render() {
      let div = document.createElement("div");
      div.className = "v-hd";
      div.innerHTML = this.title;

      let ul = document.createElement("ul");
      ul.className = "user-list";

      let arr = [];
      this.data.forEach((data) => {
        arr.push(`
        <li class="row">
          <a href="${data.href}" class="cver">
            <img src="${data.avatar}" alt="">
          </a>
          <div class="info">
            <p class="row aic">
              <a href="${data.href}" class="nm-icn">${data.name}</a>
              ${data.vip ? '<img src="./img/vip.png" alt="">' : ""}
            </p>
            <p class="label">${data.title}</p>
          </div>
        </li>
      `);
      });
      ul.innerHTML = arr.join("");

      //
      this._root.innerHTML = "";
      this._root.appendChild(div);
      this._root.appendChild(ul);
    }
  }
);

let list = new HotList({
  root: ".hot-host",
  data() {
    return {
      title: "热门主播",
      data: [
        {
          name: "blue",
          href: "http://www.zhinengshe.com/",
          avatar: "img/1407374893913311.jpg",
          vip: false,
          title: "打杂的",
        },
        {
          name: "blue",
          href: "http://www.zhinengshe.com/",
          avatar: "img/1407374893913311.jpg",
          vip: false,
          title: "打杂的",
        },
        {
          name: "blue",
          href: "http://www.zhinengshe.com/",
          avatar: "img/1407374893913311.jpg",
          vip: false,
          title: "打杂的",
        },
      ],
    };
  },
});
