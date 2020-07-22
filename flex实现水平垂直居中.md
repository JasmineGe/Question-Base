```
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    body, .outer_box{
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center;  /* 垂直居中 */
    }
    .outer_box{
      width: 500px;
      height: 500px;
      background-color: powderblue;
      /* flex-flow: column nowrap; */
    }
    .inline_box1, .inline_box2{
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .inline_box1{
      background-color: greenyellow;
      order: 2;
    }
    .inline_box2{
      background-color: tomato;
      order: 1;
    }
  </style>
</head>
<body>
  <div class="outer_box">
    <div class="inline_box1">box1</div>
    <div class="inline_box2">box2</div>
  </div>
</body>
</html>
```