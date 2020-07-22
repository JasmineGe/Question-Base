情景介绍：  有三个元素，第一个与第三个已知宽高，第二个不知宽高，将三个元素占满水平位置

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
    .box{
      display: flex;
      flex-direction: horizontal;
    }
    .box1, .box3{
      width: 100px;
      height: 100px;
      border: 1px solid skyblue;
      background: skyblue
    }
    .box2{
      width: 100%;
      border: 1px solid plum;
      background: plum;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
  </div>
</body>
</html>
```