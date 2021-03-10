const HotList = new Proxy(
  class {
    //parent自动判断
    constructor(options) {
      assert(options, "options必须有");

      this._root = this._getRoot(options);
      // this._data=this._getData(options);

      // this.render();

      // this._update=false;
    }

    _getRoot(options) {
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

      // this._update=true;
    }
  },
  {
    construct(cls, args) {
      console.log(args);
      let obj = new cls(...args);

      assert(args[0].data, `data不能没有`);
      assert(typeof args[0].data == "function", `data必须是函数`);

      let data = args[0].data();
      assert(data, "data必须有返回值");
      assert(typeof data == "object", "data必须是object");

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
