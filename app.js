
const videoCardContainer=document.querySelector('.video-container')
let api="AIzaSyA4cf4tZb0L8rAmZzcSUBI3cKNDVgSswo8";
let yutubevideos="https://www.googleapis.com/youtube/v3/videos?";
let channel="https://www.googleapis.com/youtube/v3/channels?";
fetch(yutubevideos+new URLSearchParams({
    key:api,
    part:'snippet,statistics',
    chart:'mostpopular',
    maxResults:230,
    regionCode:'IN'
})).then(res=>res.json()).then(
    data=>{
console.log(data)
        data.items.forEach(item=>{
item.statistics.viewCount=String(MoneyFormat(item.statistics.viewCount))

            getchannel(item)
        })
    }
).catch(err=>console.log(err))
const getchannel=(video_data)=>{
    fetch(channel+new URLSearchParams({
        key:api,
        part:'snippet',
        id:video_data.snippet.channelId

})).then(res=>res.json())
.then(data=>{
    
    video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
    
    makeVideoCard(video_data)
})
}



MoneyFormat = function (labelValue) 
{
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+9

           ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "B"
           // Six Zeroes for Millions 
           : Math.abs(Number(labelValue)) >= 1.0e+6

           ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
           // Three Zeroes for Thousands
           : Math.abs(Number(labelValue)) >= 1.0e+3

           ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "K"

           : Math.abs(Number(labelValue));
}






const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
                <span>${data.statistics.viewCount} Views</span>
            </div>
        </div>
    </div>
    `;
}


const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})