
const OCMovies_API_URL = "http://localhost:8000/api/v1/titles/";

// Get all Id reference in index.html
const best_movie = document.getElementById('best_movie');
const best_rating = document.getElementById('best_rating');
const style_1 = document.getElementById('style_1');
const style_2 = document.getElementById('style_2');
const style_3 = document.getElementById('style_3');

// Defined all categories filter
let categories_filter = [
    ["sort_by=-imdb_score"],
    ["year=1977", "sort_by=-imdb_score"],
    ['genre=Fantasy', "sort_by=-imdb_score"],
    ['director=Christopher+Nolan'],
];

async function get(url, retry_counter=10) {
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
              if (retry_counter > 0) {
                  function retry() {get(url, retry_counter);}
                  setTimeout(retry, 500);
                }
            }
        })
        .then(data => {
            return data;
        })
        .catch(function(error) {
            console.log('')
            console.log('function get: catch error')
            console.log(error)
            retry_counter -= 1;
            if (retry_counter > 0) {
                function retry() {get(url, retry_counter);}
                setTimeout(retry, 500);
              }
        });
}


// Defined all callback to request
let requests_list = [];
for (filter of categories_filter) {
    requests_list.push(
        async function() {
            let url = fetch_server_filter(...filter);
            get(url)
                .then(data =>{
                    return data;
                })
        }
    );
}


// Send request for all the categories
async function request_all() {
    for (r of requests_list) {
        let data_json = await r();
        console.log('   Send request for all the categories');
        console.log(data_json);
        console.log(`${data_json.results}`);
    }
}
request_all()


// Defined all callback to request
let requests_list_2 = [];
for (filter of categories_filter) {
    requests_list_2.push(
        async function() {
            let url = fetch_server_filter(...filter);
            get(url)
                .then(data =>{
                    return data;
                })
        }
    );
}


// Send request for all the categories
async function request_all_2() {
    for (r of requests_list_2) {
        r()
            .then(data_json =>{
                console.log('   Send request for all the categories');
                console.log(data_json);
                console.log(`${data_json.results}`);
                })
    }
}
request_all_2()
