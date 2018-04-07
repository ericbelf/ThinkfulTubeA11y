const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const outputElem = $('.js-search-results');

function getDataFromApi(searchTerm, callback) {
  const query = {
    key: 'AIzaSyBGbrDNLV912_uQ3onsbEpd32DI-H23JTU',
    q: `${searchTerm}`,
    part: 'snippet',
    maxResults: 5
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  console.log('getDataFromApi ran');
  
}

function renderResults(result) {
  let i=0
  console.log('renderResults ran');
  return `
    <ul>
      <li>    
        <h3 class="js-video-title">${result.snippet.title}</h3>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img class="js-result-img" src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a>
        <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">More from this channel: ${result.snippet.channelTitle}</a>
      </li>
    </ul>  
  `;
}

function displayYouTubeSearchData(data) {
  console.log('displayYouTubeSearchData ran');
  outputElem
    .prop('hidden', false)
  const results = data.items.map((item) => renderResults(item));
  
  
  $('.js-results-length-parent').css('display', 'inline');
  
  $('.js-results-length').html(data.items.length);
    
  $('.js-search-results').html(results);
}


function watchSubmit() {
  
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log('funcion watchSubmit ran, query =',query);
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

function showErr(err) {
  const errMsg = (
    `<p>We couldn't find a video with that name!`
  );
    
  outputElem
    .prop('hidden', false)
    .html(errMsg);
}

$(watchSubmit);
