# autoframe

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# create components or reset components
npm run newComp (--reset)

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
***
## vuesetting可以添加json,格式如下(暂定)
```
{
  "link": {
    "postName": "linkname",
    "methods": "post"
  },
  "compType": "comTable",
  "key": [
    {"name": "名称", "type": "text", "key": "lee1"},
    {"name": "岁数", "type": "select", "key": "lee2"},
    {"name": "工种", "type": "checkbox", "key": "lee4"}
  ]
}
```

