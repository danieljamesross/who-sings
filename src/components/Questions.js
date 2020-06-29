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
const jsonpAdapter = require('axios-jsonp');
const url2 = "https://api.randomuser.me/";
const mxm = "https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=callback&page=0&page_size=5&country=us&f_has_lyrics=1&apikey=4051c24e88f36a2617acaa1718d52021";


const fetchTracks = async (url) => {
   const response = await Axios({
	url: url,
	adapter: jsonpAdapter,
	callbackParamName: 'callback' // optional, 'callback' by default
    });
    /*let axios = Axios.create({
        baseURL: 'https://api.musixmatch.com/ws/',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
    });*/
    //let response = await axios.get(url);

    return response.data.message.body.track_list ;
};

console.log(fetchTracks(3));

/*
const generateQuestions = 
    async function() {
    const tracks = await fetchTracks(mxm);
    const questionArray = [];
    let questionItem = {};
    for(var i = 0; i<tracks.length; i++) {
	questionItem.id = i + 1;
	questionItem.question = 'this is question number ' + (i + 1); 
	questionItem.answer_a = 'Answer a'; //tracks[i].track.track_name;
	questionItem.answer_b = 'Answer b';
	questionItem.answer_c = 'Answer c';
	questionItem.correct_answer  = 'b';
	questionArray.push(questionItem);
	questionItem = {};
    };
    console.log("qarr: " + questionArray);
    return questionArray;
};
*/

const generateQuestions = 
    function() {
    
    return fetchTracks(mxm).then((tracks) => {

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

//const questions = generateQuestions(3);

export default generateQuestions;

