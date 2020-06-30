import Axios from 'axios';
import localApiData from '../api/trackList.json';
import jsonpAdapter from 'axios-jsonp';
const apikey = "29450db265149eeecee7b32fd83137fe";
//const apikey = "4051c24e88f36a2617acaa1718d52021"; broken, exceeded limit
const mxm = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=callback&page=0&page_size=100&country=us&f_has_lyrics=1&apikey=${apikey}`;

//https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=callback&page=0&page_size=20&country=us&f_has_lyrics=1&apikey=29450db265149eeecee7b32fd83137fe

const fetchTracks = async (url) => {

   const response = await Axios({
	url: url,
	adapter: jsonpAdapter,
	callbackParamName: 'callback' // optional, 'callback' by default
   });

    // if the api call doesn't work, use local saved data
    if (response.data.message.header.status_code == 200) {
	return response.data.message.body.track_list;
    } else {
	return localApiData.message.body.track_list;
    }
};

const fetchSnippet = async (id) => {
    const mxmSnippet = `https://api.musixmatch.com/ws/1.1/track.snippet.get?format=jsonp&callback=callback&track_id=${id}&apikey=${apikey}`;
    const response = await Axios({
	url: mxmSnippet,
	adapter: jsonpAdapter,
	callbackParamName: 'callback' // optional, 'callback' by default
    });
     if (response.data.message.header.status_code == 200) {
	 return response.data.message.body.snippet.snippet_body;
     } else {
	 console.log(response.data.message.header.status_code);
	 return "snippet";
     }
};
	
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Thanks to CoolAJ86
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const whichAnswer = () => {
    const rand = Math.floor(Math.random() * 3);
    switch (rand) {
    case 0:
	return 'a';
    case 1:
	return 'b';
    case 2:
	return 'c';
    default:
	return 'd';
    };
};

const qNumArray = [...Array(100).keys()];

// Kinda hacky, but what we do is loop through a randomised list which
// is equal to the total length of the API tracks call and set the answers
// to be random artists. Once we've done this, we then map() back through
// the generated array and randomly choose one of the answers to be correct
// and set the correct answer and question accordingly.
// There's probably a more javascripty way, but I am used to the common lisp
// (loop) macro and this is similar to how I'd do it in common lisp.

const generateQuestions = () => {
    /// these .then() statements make the whole thing work.
    // I'm sure there's a more elegant way, but hey-ho.
    return fetchTracks(mxm).then((tracks) => {
	const questionArray = [];
	let j = 0;
	const shuffArray = shuffle(qNumArray);
	// Here we fill all the answers with track artists
	for(var i = 0; i<5; i++) {
	    const questionItem = {};
	    let k = shuffArray[j];
	    questionItem.id = i + 1;
	    questionItem.answer_a = tracks[k].track.artist_name;
	    // use this to make fetching track_ids easier later on.
	    questionItem.id_a = tracks[k].track.track_id; 
	    j++;
	    k = shuffArray[j];
	    questionItem.answer_b = tracks[k].track.artist_name;
	    questionItem.id_b = tracks[k].track.track_id;
	    j++;
	    k = shuffArray[j];
	    questionItem.answer_c = tracks[k].track.artist_name;
	    questionItem.id_c = tracks[k].track.track_id;
	    questionArray.push(questionItem);
	};
	return questionArray;
	// yes, another .then()
    }).then((questionArray) => {
	questionArray.map((item) => {
	    const randomAnswer = whichAnswer();
	    item.correct_answer = randomAnswer;
	    let snippet = "";
	    switch (randomAnswer) {
	    case 'a':
		return snippet = fetchSnippet(item.id_a).then((data) => {
		    return item.question = data;
		});
	    case 'b':
		return snippet = fetchSnippet(item.id_b).then((data) => {
		    return item.question = data;
		});
	    case 'c':
		return snippet = fetchSnippet(item.id_c).then((data) => {
		    return item.question = data;
		});
	    default:
		return item.question = snippet;
	    };
	});
	return questionArray;
	
    });
    
};


export default generateQuestions;

