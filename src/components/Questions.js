// const questions = [
//     {
// 	id: 1,
// 	question: "I hate myself! La la la dee dee dooo",
// 	answer_a: "Eminem",
// 	answer_b: "Your mum",
// 	answer_c: "Britt",
// 	correct_answer: 'c',
//     },
//     {
// 	id: 2,
// 	question: "Death to the aristos",
// 	answer_a: "FFS",
// 	answer_b: "Hell",
// 	answer_c: "death",
// 	correct_answer: 'c',
//     },
//     {
//  	id: 3,
//  	question: "another q",
//  	answer_a: "FFS",
//  	answer_b: "Hell",
//  	answer_c: "death",
//  	correct_answer: 'c',
//     },
// ];
import Axios from 'axios';
import localApiData from '../api/trackList.json';
const jsonpAdapter = require('axios-jsonp');
const apikey = null;// "29450db265149eeecee7b32fd83137fe";
//const apikey = "4051c24e88f36a2617acaa1718d52021"; broken, exceeded limit
const mxm = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=callback&page=0&page_size=20&country=us&f_has_lyrics=1&apikey=${apikey}`;

//https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=callback&page=0&page_size=20&country=us&f_has_lyrics=1&apikey=29450db265149eeecee7b32fd83137fe

const fetchTracks = async (url) => {

   const response = await Axios({
	url: url,
	adapter: jsonpAdapter,
	callbackParamName: 'callback' // optional, 'callback' by default
   });

    // if the api call doesn't work, use local saved data
    if (response.data.message.header.status_code == 200) {
	console.dir('Using api call data');
	return response.data.message.body.track_list;
    } else {
	console.log(response.data.message.header.status_code);
	console.log('Using local data');
	return localApiData.message.body.track_list;
    }
};
	


const generateQuestions = 
    function() {
    
	return fetchTracks(mxm).then((tracks) => {
	    console.dir(tracks);
		const questionArray = [];
		let questionItem = {};
		for(var i = 0; i<tracks.length; i++) {
		    questionItem.id = i + 1;
		    questionItem.question = 'this is question number ' + (i + 1); 
		    questionItem.answer_a = tracks[i].track.track_name;
		    questionItem.answer_b = 'Answer b';
		    questionItem.answer_c = 'Answer c';
		    questionItem.correct_answer  = 'b';
		    questionArray.push(questionItem);
		    questionItem = {};
		};
		console.log("qarr: " + questionArray);
		return questionArray;
	    
	    });
	
    };


export default generateQuestions;

