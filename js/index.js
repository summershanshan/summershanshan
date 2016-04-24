/**
 * Created by Administrator on 2016/2/20.
 */
//轮播图 banner部分
$(function(){
  banner();
    navTabs();
    $('[data-toggle="tooltip"]').tooltip();
})
var banner=function(){
    //获取数据
    var myData='';
    var getBannerData=function(callback){
        if(myData){
            callback&&callback(myData);
            return false;
        }
        $.ajax({
            url:"js/index.json",
            type:'get',
            data:{},
            contentType:'json',
            success:function(data){
                //console.log(data);
                myData=data;
                callback&&callback(myData);
            }

        })
    }
    function renderHtml(){
        getBannerData(function(data){
            var width=$(window).width();
            var html='';
            var point='';
            if(width<768){
                for(var i=0;i<data.length;i++){
                    html+='<div class="item '+(i==0?"active":"")+'">';
                    html+='<a href="#" class="img_mobile hidden-sm hidden-md hidden-lg">';
                    html+='<img src="'+data[i].img+'" alt=""/>';
                    html+='</a></div>';

                    //点盒子
                    point+='<li data-target="#wjs_banner" data-slide-to="'+i+'" class="'+(i==0?"active":"")+'"></li>'
                }

            }else{
                for(var i=0;i<data.length;i++){
                    html+='<div class="item '+(i==0?"active":"")+'">';
                    html+='<a href="#" class="img_box hidden-xs "  style="background-image: url('+data[i].bac+')"></a>';
                    html+='</div>';

                    point+='<li data-target="#wjs_banner" data-slide-to="'+i+'" class="'+(i==0?"active":"")+'"></li>'
                }
            }
            $('#wjs_banner').find('.carousel-inner').html(html);
            $('#wjs_banner').find('.carousel-indicators').html(point);
        });
    }


    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

    //手机端滑动效果
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;
    $("#wjs_banner").on('touchstart',function(e){
            startX= e.originalEvent.touches[0].clientX;
        })
        .on('touchmove',function(e){
            moveX= e.originalEvent.touches[0].clientX;
            distanceX=moveX-startX;
            isMove=true;
        })
        .on('touchend',function(){
            //向左滑
            if(distanceX<0){
                $(this).carousel('next');
            }
            //向右滑
            else if(distanceX>0){
                $(this).carousel('prev');
            }
        })
}
    var navTabs=function(){
        var parent=$(".wjs_product_tabs_box");
        var child=parent.find("ul.nav-tabs");
        var lis=child.find("li");
        var ulWidth=0;
        $.each(lis,function(){
            ulWidth += $(this).innerWidth();
        });
        console.log(ulWidth);
          child.width(ulWidth);
    }