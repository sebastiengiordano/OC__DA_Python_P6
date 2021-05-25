function add_image(after, image_url, image_alt){  
    let newImg = document.createElement('img');
    newImg.src.add(image_url);
    newImg.alt.add(image_alt);
    after.append(newImg);
}

function add_div_with_paragraph(after, classList, text){
  let newDiv = document.createElement('div');
  newDiv.classList.add(classList);
  let newParagraph = document.createElement('p');
  newParagraph.innerText = text;
  newDiv.append(newParagraph);
  after.append(newDiv);
}

function fetch_server(){
    fetch(OCMovies_API_URL)
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
    // Add filter to fetch request
    let count = 0;
    let url = OCMovies_API_URL;
    for(f of filter){
        if (count ===0){
            url += "?";
        }
        else {
            url += "&";
        }
        url += f;
        count += 1;
    }

    // Try to get response
    return url;
}

function get(url, retry_counter=10){
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
        // .then(function (json_data) {
        //     console.log('')
        //     console.log('function get: return json_data')
        //     console.log(json_data)
        //     data = new Promise(function(json_data){return json_data})
        //     return data;
        // })
        .catch(function(error){
            console.log('')
            console.log('function get: catch error')
            console.log(error)
            retry_counter -= 1;
            if (retry_counter > 0){
                get(url, retry_counter);
              }
        });
}