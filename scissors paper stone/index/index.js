const app = getApp()
let timer;
let numAi=0;
let btnState=true;

Page({
  data: {
    btnState:true,
    winnum:0,
    imgAiScr:"",
    imgUserSrc:"/index/1.jpg",
    srcs:[
      '/index/image/shitou.png',
      '/index/image/jiandao.png',
      '/index/image/bu.png'
    ]
  },
  onShareAppMessage: function () {
    return {
      title: '震惊！看过的人都流泪了！',
      path: '/index/index?id=123',
      imageUrl: "/index/1.jpg"
    }
  },
  onLoad: function () {
   this.timeGo();

  },
  onShow: function (opt) {
    console.log(opt)
  },
    onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  }, 

  changeForChoose:function(e){
    if (btnState==false){
      return;
    }
    this.setData({imgUserSrc:this.data.srcs[e.currentTarget.id]})
    clearInterval(timer);

    let user=this.data.imgUserSrc;
    let ai=this.data.imgAiScr;
    let num=this.data.winnum;
    let str="你输了";

    if (user == "/index/image/shitou.png" && ai == '/index/image/jiandao.png') {
      num++;
      str = "你赢了";
      wx.setStorageSync('winnum', num);
    }
    if (user == "/index/image/jiandao.png" && ai == '/index/image/bu.png') {
      num++;
      str = "你赢了";
      wx.setStorageSync('winnum', num);
    }
    if (user == "/index/image/bu.png" && ai == '/index/image/shitou.png') {
      num++;
      str = "你赢了";
      wx.setStorageSync('winnum', num);
    }
    if(user==ai){
      str="平局";
    }
    this.setData({
       winnum:num,
       gameResult:str,
       
    })
    btnState= false;
  },
  timeGo(){
    timer=setInterval(this.move,100);
  },
  move(){
    numAi=parseInt(Math.floor(Math.random()*3));
    this.setData({imgAiScr:this.data.srcs[numAi]})
  },
  again(){
    clearInterval(timer);
    this.timeGo();
    this.setData({
      gameResult:"",
      imgUserSrc:"/index/1.jpg"
    })
    btnState=true;
  }
})
