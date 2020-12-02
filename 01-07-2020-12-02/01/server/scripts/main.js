console.log("main.js文件解析执行");

let btn = document.querySelector("#getCSS");

// 这种姿势无法处理 404 的情况：

// btn.onclick = () => {
//   console.log(1)
//   const request = new XMLHttpRequest()
//   request.open('GET','/styles/main.css')
//   request.onload = () => {
//     console.log('GetCSS 成功！')
//     const style = document.createElement('style')
//     style.textContent = request.response
//     document.head.appendChild(style)
//   }
//   request.onerror = ()=>{
//     console.log('GetCSS 失败！')
//   }
//   request.send()
// }

// 专业姿势：

btn.onclick = () => {
  const request = new XMLHttpRequest();
  console.log(request.readyState) //0
  request.open("GET", "/styles/main.css");
  console.log(request.readyState) //1
  request.onreadystatechange = () => {
    console.log(request);
    // console.log(request.getAllResponseHeaders()); //获取所有的响应头消息
    console.log(request.readyState, request.status);
    if (request.readyState === 4 && request.status === 200) {
      const style = document.createElement("style");
      style.textContent = request.response;
      document.head.appendChild(style);
    }
  };
  // 异步代码，执行 cb 时才会拿到 readyState 为 2 的状态
  // 注意，send 必须放在 open 之后执行
  request.send();
  console.log(request.readyState) // 1
};

const btn1 = document.querySelector('#getJS')

btn1.onclick = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET','/scripts/getjs.js')
  xhr.onreadystatechange=()=>{
    if(xhr.readyState === 4 && xhr.status === 200) {
      const script = document.createElement('script')
      console.log(typeof xhr.response)
      script.textContent = xhr.response
      document.body.appendChild(script)
    }
  }
  xhr.send()
}

const btn2 = document.querySelector('#getHTML')

btn2.onclick = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET','/public/3.html')
  xhr.onreadystatechange=()=>{
    if(xhr.readyState === 4 && xhr.status === 200) {
      const div = document.createElement('div')
      div.innerHTML = xhr.response
      document.body.appendChild(div)
    }
  }
  xhr.send()
}
const btn3 = document.querySelector('#getXML')

btn3.onclick = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET','/4.xml')
  xhr.onreadystatechange=()=>{
    if(xhr.readyState === 4 && xhr.status === 200) {
      const dom = xhr.responseXML
      // 这个 dom 相当于是 HTML 文档的 document
      console.log(dom)
      const text = dom.getElementsByTagName('warning')[0].textContent
      alert(text.trim())
    }
  }
  xhr.send()
}
const btn4 = document.querySelector('#getJSON')

btn4.onclick = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET','/5.json')
  xhr.onreadystatechange=()=>{
    if(xhr.readyState === 4 && xhr.status === 200) {
      let obj
      try {
        obj = JSON.parse(xhr.response)
      } catch(e) {
        console.log('转换对象失败')
        console.log(e)
        obj = {name:'noName'}
      }
      console.log(obj)
    }
  }
  xhr.send()
}


