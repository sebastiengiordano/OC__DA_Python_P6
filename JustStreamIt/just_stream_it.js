
const OCMovies_API_URL = "http://localhost:8000/api/v1/titles/";

// Get all Id reference in index.html
const best_movie = document.getElementById('best_movie');
const best_rating = document.getElementById('best_rating');
const style_1 = document.getElementById('style_1');
const style_2 = document.getElementById('style_2');
const style_3 = document.getElementById('style_3');

// Defined all categories filter
let categories_filter = [["imdb_score_min=5", "sort_by=-imdb_score"], ["year=1977"]];


// min_year=
// max_year=
// imdb_score=
// imdb_score_min=4
// imdb_score_max=5
// title=
// title_contains=
// genre=
// genre_contains=
// sort_by=
// director=
// director_contains=
// writer=
// writer_contains=
// actor=
// actor_contains=
// country=
// country_contains=
// lang=
// lang_contains=
// company=
// company_contains=
// rating=
// rating_contains=


// Defined all callback to request
let requets_list = [];
for (filter of categories_filter){
    requets_list.push(
        function() {
            fetch_server_filter(...filter);
        }
    );
}

// Send request for all the categories
// for (r of requets_list){
//     data_json = r();
//     console.log('// Send request for all the categories');
//     console.log(data_json);
//     console.log(`${data_json.results}`);
// }


// Promise.all(requets_list)
//     .then(responses => {
//         // all responses are resolved successfully
//         for(let response of responses) {
//             console.log('')
//             console.log(`Promise.all - all resposnes - ${response.url}: ${response.status}`); // shows 200 for every url
//         }
//         return responses
//     })
//     .then(responses =>{
//         for(let response of responses) {
//             response = response.json()
//             console.log(`${response.url}: ${response.imdb_score}`); // shows 200 for every url
//         }
//     })

// <!-- Best Movie -->
function best_movie_sequence(){
    url = fetch_server_filter(...categories_filter[0])
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                console.log('')
                console.log('function get: response OK')
                console.log(`${response.url}: ${response.status}`); // shows 200 for every url
                return response.json();
            }
            else{
            console.error('Retour du serveur :', response.status);
            retry_counter -= 1;
            if (retry_counter > 0){
                get(url, retry_counter);
                }
            }
        })
        .catch(function(error){
            console.log('')
            console.log('function fetch_server_filter: catch error')
            console.log(error)
        })}

// <!-- Best rating -->


// <!-- By Style -->
//* style_1 */
//* style_2 */
//* style_3 */