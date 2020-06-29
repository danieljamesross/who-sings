// const highScores = [
//     {
// 	name: 'Dan',
// 	score: 0,
//     },
//     {
// 	name: 'Frank',
// 	score: 0,
//     },
// ];

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
export default highScores;
