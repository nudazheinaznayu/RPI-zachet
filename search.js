window.token='';
window.scrolling=true;
window.mouse=false;
window.xf=0;
window.xprev=0;
window.less=true;
window.more = true;
window.fc=true;
 var videos=[];
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCcO_91Flz6f6PfNY9vcOpOK3cNDUPSr8c');
}

function search(){
  token='';
  document.getElementById('response').innerHTML='';
  quer();
}

function quer() { 
    var query = document.getElementById('query').value;
    var request = gapi.client.youtube.search.list({
        pageToken: token,
        maxResults:"20",
        part: 'snippet',
        type:"video",
        q:query
    });
    request.execute(onSearchResponse);
}
function onSearchResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    var pars=JSON.parse(responseString);
    videos=OutputInfo(pars);
    output(videos);
}

function OutputInfo(info)
{
   videos=[];
    token=info.nextPageToken;
     for (i=0;i<info.items.length;i++)
    {
        var videoinfo = new Object();
       videoinfo.title=info.items[i].snippet.title;
       videoinfo.discr=info.items[i].snippet.description;
       videoinfo.channeltitle=info.items[i].snippet.channelTitle;
       videoinfo.img=info.items[i].snippet.thumbnails.medium.url;
       videoinfo.link="https://www.youtube.com/watch?v="+info.items[i].id.videoId;
       videos.push(videoinfo);
    }
    return videos;

}

function output(arr)
{
 var child='';   
   for (i=0;i<videos.length;i++)
   {
    child+='<a style="text-decoration:none;" class="video" target="_blanc" href="'+videos[i].link+'">';
    child +='<img src="'+videos[i].img+'" style="margin:5px">';
    child+='<hr>';
    child+='<h1 style="color:white">'+videos[i].title+'</h1>';
        child+='<hr>';
    child+='<h2 style="color:#D8D8D8">'+videos[i].discr+'</h2>';
        child+='<hr>';
    child+='<h2 style="color:#4169E1">Сhannel:'+videos[i].channeltitle+'</h2>';
    child+='</a>';
   }
   document.getElementById('response').innerHTML+=child;
   scrolling=true;
}


window.onscroll = function() {
  var width=document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth-(document.documentElement.clientWidth*2)<(window.pageXOffset)&&scrolling)
    {
      quer();
      scrolling=false;
    }
  }

  window.onmousedown=function()
  {
    xf=event.clientX;
    mouse=true;
  }

  window.onmouseup=function()
  {
    mouse=false;
    xprev=0;
    xf=0;
    fc=true;
  }
  window.onmousemove=function()
  {
    if(mouse)
      {
      if (fc)
        xprev=event.clientX;
      document.body.onselectstart=function(){return false};
      x=event.clientX;
       if (x<xprev&&less)
      {
      xf=xprev
      less=false;
      more=true;
      }
      if (x>xprev&&more)
       { less=true;
        more=false;
        xf=xprev;
       }
      window.scrollBy(-((x-xf)/10),0);
      xprev=x;
      fc=false;
    }
  }
