if (attr.name.startsWith(":")) {
  // attr -> 属性节点对象
  console.dir(attr);
  let attrName = attr.name.substring(1);
  // 属性值的空格是有意义的，如class="cls1 cls2"
  // 所以这里不用 trim 了
  let attrValue = attr.value;
  // 去掉:的属性，如 :value -> value
  console.log(attrName);
  // 有:标志属性的节点，如 input 的 :value 和 span 的 :title
  console.log(child);
  let arr = [];
  // Proxy 实例 -> 监听你传的 data 函数的返回值
  // Proxy {name: "blue", a: 12, b: 5, c: 99, json: {…}}
  console.log(this._data);
  for (let key in this._data) {
    arr.push(`let ${key}=${JSON.stringify(this._data[key])};`);
  }
  arr.push(attrValue);
  // let name="blue";let a=12;let b=5;let c=99;let json={"n":99};a
  console.log(arr.join(""));
  // eval的返回值正是最后一行代码的返回值，也就是 a 的返回值
  attrValue = eval(arr.join(""));
  child.setAttribute(attrName, attrValue);
}
