//获取设备像素，设置HTML font-size,在移动端按原设计尺寸显示
//var pixclPatio = 1 / window.devicePixelRatio;
//document.write('<meta name="viewport" content="width=device-width,initial-scale='+pixclPatio+',minimum-scale='+pixclPatio+',maximum-scale='+pixclPatio+',user-scalable=no" />');

setFontSize();
window.onresize=setFontSize;
function setFontSize(){
  var html = document.getElementsByTagName('html')[0];
  var pageWidth = html.getBoundingClientRect().width;
  html.style.fontSize = pageWidth / 10 + 'px';//获取设备的像素宽度
  window.w=pageWidth / 10;
}



//明星对比

var show={
  'resemble':'个人和明星相似度',
   'reInfo':'根据相似度写批注语',
  'person':{//个人信息
      'workPic':'工作照',
      'lifePic':'生活照',
      "name":'姓名',
      'sex':'性别',
      'department':'部门',
      'time':'今日最早抵达时间',
      'monCount':'本月到达次数',
      'charming':'魅力值',
      'happy':'欢乐值',
      'luck':'今日运势|'
  },
   'star':{
       "picUrl":'照片',
       "name":'姓名'
   }

};

