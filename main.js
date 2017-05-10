
import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'n-zepto'
import { List } from 'react-virtualized';
import './main.css';





function getViewportSize () {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}
var GoodsList = React.createClass({
  getInitialState: function() {
    return {
      isFinish: false,
      goodsdata:[],
    };
  },

  componentDidMount: function() {
    $.ajax({
        type: "post",
        url: 'http://yujianni520.com/QuestionServer/rs/liangpu/post ',
        // url:'http://192.168.17.221:3000/json',
        // contentType: "multipart/form-data; boundary=null; charset=utf-8",
        // contentType: "appcation/json",
        data: {
          "command":"10001",
          "root":"{\"pageSize\":200,\"page\":1}",
          "version":"1.1",
          "sign":"7c6cca9bf9216c41c6986ee2cf510d79"
        },
        headers: {
          Accept:"text/plain, */*; q=0.01",
        },
        dataType: 'json',
        crossDomain: true,
        success: (data) => {
          console.log(222);
          console.log(333);
          console.log(data);
          this.setState({
            isFinish: true,
            goodsdata:this.state.goodsdata.concat(data.goodsJa)
          });
          // 成功回调
        },
        error: (err) => {
          //失败回调
          console.log('错误了');
          this.setState({
            isFinish: true
          });
        }
    });
  },

  handClick : function(index){
    var indexurl = this.state.goodsdata[index].couponUrl
    if (indexurl === undefined) return;
    // alert('hahah');
    window.location.href=indexurl;
  },
  handClickgoods : function(index){
    var indexurl = this.state.goodsdata[index].goodsUrl
    if (indexurl === undefined) return;
    // alert('hahah');
    window.location.href=indexurl;
  },
 rowRenderer : function({ index, isScrolling, key, style }){
  var couponUrl = this.state.goodsdata[index].couponUrl
  if (couponUrl === undefined) {
    return (
    <div className="goods-row" key={key} style={style}>
    <div className="goods-item">
            <div className="goods-img">
              <img className="goods-img img" src={this.state.goodsdata[index].imageUrl}></img>
            </div>
            <div className="coupon">
              <div className="price">&yen; {this.state.goodsdata[index].price}</div>
              <div className="txt">优惠价</div>
              <div onClick={this.handClickgoods.bind(this,index)} className="btnurl">链接购买</div>
            </div>
            <div className="goods-info">
              <p className="title">{this.state.goodsdata[index].title} </p>
              <div className="final-price">
                <span className="final-value">{this.state.goodsdata[index].price}</span>
                <del className="origin-value">{this.state.goodsdata[index].oldPrice}</del>
              </div>
            </div>
    </div>
    </div>

    )
  }else{
      return (
    <div className="goods-row" key={key} style={style}>
    <div className="goods-item">
            <div className="goods-img">
              <img className="goods-img img" src={this.state.goodsdata[index].imageUrl}></img>
            </div>
            <div className="coupon">
              <div className="price">&yen; {parseInt((this.state.goodsdata[index].oldPrice - this.state.goodsdata[index].price).toFixed(10))}</div>
              <div className="txt">优惠券</div>
              <div onClick={this.handClick.bind(this,index)} className="btn">领券购买</div>
              <div onClick={this.handClickgoods.bind(this,index)} className="btn">链接购买</div>
            </div>
            <div className="goods-info">
              <p className="title">{this.state.goodsdata[index].title} </p>
              <div className="final-price">
                <span className="final-value">{this.state.goodsdata[index].price}</span>
                <del className="origin-value">{this.state.goodsdata[index].oldPrice}</del>
              </div>
            </div>
    </div>
    </div>

    )
  }
  
},
noRowRenderer: function(){
  (
        <div className="goods-list">
        <div className="loading">暂时没有商品</div>
        </div>
      );
},
  render: function() {

    if (!this.state.isFinish) {
      return (
        <div className="goods-list">
        <div className="loading">正在加载中....</div>
        </div>
      );
    }
    return(<List
    ref='List'
    className={"goods-list"}
    width={getViewportSize().width}
    height={getViewportSize().height}
    rowCount={this.state.goodsdata.length}
    rowHeight={130}
    overscanRowCount={10}
    noRowRenderer={this.noRowRenderer}
    rowRenderer={this.rowRenderer}/>);
    
  }
});

ReactDOM.render(  
  <GoodsList/>,
  document.getElementById('example')
);

