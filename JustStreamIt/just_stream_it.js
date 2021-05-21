const OCMovies_API_URL = "http://localhost:8000/api/v1/titles/";

const best_movie = document.getElementById('best_movie');

let url = OCMovies_API_URL;
let retry_counter = 10;





function add_div_with_paragraph(after, classList, text){    
  let newDiv = document.createElement('div');
  newDiv.classList.add(classList);
  let newParagraph = document.createElement('p');
  newParagraph.innerText = text;
  newDiv.append(newParagraph);
  after.append(newDiv);
}

function fetch_server(){
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else{
              console.error('Retour du serveur :', response.status);
              retry_counter -= 1;
              if (retry_counter > 0){ 
                fetch_server()
                }
            }
        })
        .then(function (value) {
            // best_movie.innerText = value.postData.text
            add_div_with_paragraph(best_movie, 'best_movie_div', value)
            console.log(value)
        })
        .catch(function(error){
            console.log(error)
            retry_counter -= 1;
            if (retry_counter > 0){ 
              fetch_server()
              }
        });
}

function fetch_server_filter(...filter){
    for(f of filter){
        url = url + "?" + f
    }

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else{
              console.error('Retour du serveur :', response.status);
              retry_counter -= 1;
              if (retry_counter > 0){ 
                fetch_server()
                }
            }
        })
        .then(function (value) {
            // best_movie.innerText = value.postData.text
            add_div_with_paragraph(best_movie, 'best_movie_div', value)
            console.log(value)
        })
        .catch(function(error){
            console.log(error)
            retry_counter -= 1;
            if (retry_counter > 0){ 
              fetch_server()
              }
        });
}

fetch_server_filter("genre=Fantasy", "max_year=1960")