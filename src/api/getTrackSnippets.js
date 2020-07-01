const Axios = require('axios');
const localApiData = require('./trackList.json');
const fs = require('fs');
const jsonpAdapter = require('axios-jsonp');
const trackSnippets = [];
const tracks = localApiData.message.body.track_list;
const apikey = "29450db265149eeecee7b32fd83137fe";


const fetchSnippet = async (id) => {
    const mxmSnippet = `https://api.musixmatch.com/ws/1.1/track.snippet.get?format=jsonp&callback=callback&track_id=${id}&apikey=${apikey}`;
    const response = await Axios({
    	url: mxmSnippet,
    	adapter: jsonpAdapter,
    	callbackParamName: 'callback' // optional, 'callback' by default
	  });
   return response.data.message.body.snippet.snippet_body;
};

const fetchSnippets = () => {
        for (var i = 0; i<2;i++) {
	    fetchSnippet(tracks[i].track.track_id)
		.then((snip) => {
		    
		    let snippet = {
			track_id: tracks[i].track.track_id,
			track_name: tracks[i].track.track_name,
			artist_name: tracks[i].track.artist_name,
			snippet: snip,
		    };
		    // console.log(snippet);
		    trackSnippets.push(snippet);
		});
	    return trackSnippets;
	}
};

//fetchSnippet(192324206);
const callback = () => {return null;};

const doAll = async () => {
    const getSnippets = await fetchSnippets();
};

const writeApiJSON = () => fs.writeFile('trackSnippets.json', JSON.stringify(trackSnippets), 'utf8', callback);

doAll().then(() => 
	     writeApiJSON()
	    );

