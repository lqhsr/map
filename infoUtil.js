var slideLock = false;
function showInfo(data, hilite=-1){
  clearInfoDiv();
  var doScroll = false;
  var sContent = '<div class="infoUniversity"><div id="title_bar">'
  univHTML = `&emsp;<a style="text-decoration:none;color:white" href="https://www.baidu.com/s?wd=${data.University}" target="blank">${data.University}</a>`
  if (hilite == -2){
    sContent += '<b><span style="color:yellow">' + univHTML + '</span></b>'
  }else{
    //Browser compatibility
    sContent += '<span>' + univHTML + '</span>'
  };
  sContent += '<span id="open_map_trigger" onclick="toggleOpenMap()"><b>· · ·</b></span>'
  sContent += '</div><div id="student_ul" onclick="clearInfoDiv()">'
  sContent += getMoreContent(data) + '<ul>';
  data.Students.forEach(function(student, index){
    var studentHTML = '<li style="position:relative">' + student + '</li>'
    if (index == hilite){
      sContent += '<b id="student_hilite">' + studentHTML + '</b>'
      doScroll = true;
    }else{
      sContent += studentHTML
    }});
  sContent += '</ul><p style="font-size: 12px; text-align: center"><br/>轻触关闭窗口</p><br></div></div>';
  map.centerAndZoom(data.Marker.getPosition(), Math.max(data.Zoom, map.getZoom()));
  sContent = $.parseHTML(sContent);
  $(sContent).appendTo("body")
  $("body").add(sContent);
  if (doScroll){
    var container = $("#student_ul");
    var target = $("#student_hilite");
    container.scrollTop(target.offset().top-container.offset().top-30);
  }
}
function clearInfoDiv(){
  $(".infoUniversity").remove()
}
function toggleOpenMap(){
  $("#more_action").slideToggle()
  $("#student_ul").scrollTop(0);
}
function getMoreContent(data){
  var univContent = '<div id="more_action">';
  univContent += '<span id=univ_detail>地址：' + data.Address;
  var moreContent = univContent
  moreContent += `</span><span id=open_maps onClick="javascript:showWay(${data.Lng},${data.Lat});clearInfoDiv()">直接去蹭饭</span><br/>`;
  if (data.Telephone != ''){
    moreContent += '<span id=univ_detail>电话：' + data.Telephone+'</span>'
  }
  var UA = window.navigator.userAgent.toLocaleLowerCase()
  if(/iphone|ipad|ipod/.test(UA)){//ios
    moreContent += `<span id=open_maps onClick="baidumap://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&content=${data.University}&src=ios.tg2019303.ioPage">`;
  }else{
    moreContent += `<span id=open_maps onClick="bdapp://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&content=${data.University}&src=andr.tg2019303.ioPage">`;
  }
  moreContent += '百度地图App</span><br/>'
  my = getmylocation()
  moreContent += `<span id=open_maps onClick="http://api.map.baidu.com/direction?origin=latlng:${my.lat},${my.lng}|name:我的位置&destination=latlng:${data.Lat},${data.Lng}|name:${data.University}&&region=浙江&mode=driving&output=html&src=webapp.baidu.openAPIdemo" target="blank" onClick="reminder()">百度地图网页版</span><br>`
  moreContent += '</div>'
  return moreContent;
}
