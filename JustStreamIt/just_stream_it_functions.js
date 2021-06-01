// Functions used to add an image
function add_image_in(inside, id, image_url, image_alt){
    // Create image element
    let newImg = document.createElement('img');
    newImg.src = image_url;
    newImg.alt = image_alt;
    // Create div element
    let newDiv = document.createElement('div');
    // Add image in 'inside'
    newDiv.id = id;
    newDiv.append(newImg)
    inside.appendChild(newDiv);
    return newDiv
}

function add_image_after(after, id, image_url, image_alt){
    // Create image element
    let newImg = document.createElement('img');
    newImg.src = image_url;
    newImg.alt = image_alt;
    // Create div element
    let newDiv = document.createElement('div');
    newDiv.id = id;
    // Add image after 'after'
    newDiv.append(newImg)
    after.append(newDiv);
    return newDiv
}

// Function used to add a new text
function add_paragraph(after, classList, text){
  let newDiv = document.createElement('div');
  newDiv.classList = classList;
  let newParagraph = document.createElement('p');
  newParagraph.innerText = text;
  newDiv.append(newParagraph);
  after.append(newDiv);
  return newDiv;
}

// Functions used to add a button
function add_button_after(after, text, classList, href){
    let newButton = document.createElement('a');
    newButton.text = text;
    newButton.classList = classList;
    newButton.href = href;
    newButton.target="_blank";
    after.append(newButton);
    return newButton;
}

function add_button_in(inside, text, classList, href){
    let newButton = document.createElement('a');
    newButton.text = text;
    newButton.classList = classList;
    newButton.href = href;
    newButton.target="_blank";
    inside.appendChild(newButton);
    return newButton;
}

// Function to generate an url with filter parameters 
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

// Funcions used to get information from
// data come from OCMovies-API-EN-FR API
function get_image_url(data, position){
    return data.results[position].image_url
}

function get_title(data, position){
    return data.results[position].title
}

function get_imdb_url(data, position){
    return data.results[position].imdb_url
}

async function get_film_information(data, position, retry_counter=10){
    let url = data.results[position].url;
    let response = await fetch(url);
    if (response.ok) {
        let response_json = await response.json();
        let image_url = response_json.image_url
        let title = response_json.title
        let genres = response_json.genres
        let date_published = response_json.date_published
        let rated = response_json.rated
        let imdb_score = response_json.imdb_score
        let directors = response_json.directors
        let actors = response_json.actors
        let duration = response_json.duration
        let countries = response_json.countries
        let budget = response_json.budget
        let long_description = response_json.long_description
        return new Film(
            image_url,
            title,
            genres,
            date_published,
            rated,
            imdb_score,
            directors,
            actors,
            duration,
            countries,
            budget,
            long_description)
    }else{
        retry_counter -= 1;
        if (retry_counter > 0){
            setTimeout(() => {
                get_film_information(data, position, retry_counter)
            }, 500);
        }
    }
}
