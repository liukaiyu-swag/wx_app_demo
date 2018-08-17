var util = require('../../utils/util.js')
Page({
  data:{
    tabs: ['收入', '支出', '通知','我的','你的'],
    stv: {
      //设备宽度
      windowWidth: 0,
      //tab宽度
      lineWidth: 0,
      //操作层位置
      offset: 0,
      //动画效果
      tStart: false
    },
    //tab选中效果
    activeTab: 0
  },
  // 页面加载执行
  onLoad:function(options){
   try {
      let {tabs} = this.data;
      //设备信息
      var res = wx.getSystemInfoSync()
      //设备宽度
      this.windowWidth = res.windowWidth;
      //tab宽度
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      //设备宽度
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({stv: this.data.stv})
      this.tabsCount = tabs.length;
    } catch (e) {
      console.log(e)
    }
  },
  onShow:function(){
    
  },
  //手指触摸
  handlerStart(e) {
    let {clientX, clientY} = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({stv: this.data.stv})
  },
  // 手指触摸后移动
  handlerMove(e) {
    let {clientX, clientY} = e.touches[0];
    let {stv} = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    //最左侧
    if(stv.offset <= 0) {
      stv.offset = 0;
    } else if(stv.offset >= stv.windowWidth*(this.tabsCount-1))/*最右*/ {
      stv.offset = stv.windowWidth*(this.tabsCount-1);
    }
    this.setData({stv: stv});
  },
  //手指触摸动作被打断，如弹窗和来电提醒
  handlerCancel(e) {

  },
  //手指触摸动作结束
  handlerEnd(e) {
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    let {tabs, stv, activeTab} = this.data;
    let {offset, windowWidth} = stv;
    //快速滑动
    if(endTime - this.tapStartTime <= 300) {
      //向左
      if(Math.abs(this.tapStartY - clientY) < 50) {
        if(this.tapStartX - clientX > 5) {
          if(activeTab < this.tabsCount -1) {
            this.setData({activeTab: ++activeTab})
          }
        } else {
          if(activeTab > 0) {
            this.setData({activeTab: --activeTab})
          }
        }
        stv.offset = stv.windowWidth*activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset/windowWidth);
        if (activeTab != page) {
          this.setData({activeTab: page})
        }
        stv.offset = stv.windowWidth*page;
      }
    } else {
      let page = Math.round(offset/windowWidth);
      if (activeTab != page) {
        this.setData({activeTab: page})
      }
      stv.offset = stv.windowWidth*page;
    }
    stv.tStart = false;
    this.setData({stv: this.data.stv})
  },


  _updateSelectedPage(page) {
    let {tabs, stv, activeTab} = this.data;
    activeTab = page;
    this.setData({activeTab: activeTab})
    stv.offset = stv.windowWidth*activeTab;
    this.setData({stv: this.data.stv})
  },
  //点击顶部bar
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  }
})