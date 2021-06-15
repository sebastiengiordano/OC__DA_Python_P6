// Functions used to add an image
function add_image_in(inside, image_id, image_url, image_alt) {
    // Create image element
    let newImg = document.createElement('img');
    newImg.src = image_url;
    newImg.alt = image_alt;
    // Create div element
    let newDiv = document.createElement('div');
    // Add image in 'inside'
    newDiv.id = image_id;
    newDiv.classList = image_id;
    newDiv.append(newImg);
    inside.append(newDiv);
    return newDiv;
}

function add_image_after(after, id, image_url, image_alt) {
    // Create image element
    let newImg = document.createElement('img');
    newImg.src = image_url;
    newImg.alt = image_alt;
    // Create div element
    let newDiv = document.createElement('div');
    newDiv.id = id;
    newDiv.classList = id;
    // Add image after 'after'
    newDiv.append(newImg);
    after.after(newDiv);
    return newDiv;
}
/*
function add_image_before(before, id, image_url, image_alt) {
    // Create image element
    let newImg = document.createElement('img');
    newImg.src = image_url;
    newImg.alt = image_alt;
    // Create div element
    let newDiv = document.createElement('div');
    newDiv.id = id;
    // Add image after 'after'
    newDiv.append(newImg);
    before.parentNode.insertBefore(newDiv, before);
    return newDiv;
}
*/


// Function used to add a new text inside an element
function add_paragraph(element, classList, text) {
  let newDiv = document.createElement('div');
  newDiv.classList = classList;
  let newParagraph = document.createElement('p');
  newParagraph.innerText = text;
  newDiv.append(newParagraph);
  element.append(newDiv);
  return newDiv;
}

function add_title_h1(element, classList, text) {
  let newDiv = document.createElement('div');
  newDiv.classList = classList;
  let newTitle = document.createElement('h1');
  newTitle.innerText = text;
  newDiv.append(newTitle);
  element.append(newDiv);
  return newDiv;
}

function add_title_h2(element, classList, text) {
  let newDiv = document.createElement('div');
  newDiv.classList = classList;
  let newTitle = document.createElement('h2');
  newTitle.innerText = text;
  newDiv.append(newTitle);
  element.append(newDiv);
  return newDiv;
}

// Functions used to add a button at the end of an element
function add_button(element, text, classList, href) {
    let newButton = document.createElement('a');
    newButton.text = text;
    newButton.classList = classList;
    newButton.href = href;
    newButton.target="_blank";
    element.append(newButton);
    return newButton;
}

// Functions used to add a button after an element
function add_button_after(after, text, classList, href) {
    let newButton = document.createElement('a');
    newButton.text = text;
    newButton.classList = classList;
    newButton.href = href;
    newButton.target="_blank";
    after.after(newButton);
    return newButton;
}

// Functions used to add an arrow
function add_arrow(
        element,
        direction,
        id,
        category_label,
        category_filter_number,
        id_list) {
    // Create new div
    let newArrow = document.createElement('div');
    // Add arrow id
    newArrow.id = id;
    // Create left arrow
    if (direction === 'left') {
        newArrow.classList = 'left_arrow';
        let firstChild = element.firstElementChild;
        element.insertBefore(newArrow, firstChild);
    }
    // Create right arrow
    else {
        newArrow.classList = 'right_arrow';
        element.lastElementChild.after(newArrow);
    }
    // Add click event
    add_event_on_arrow(
        newArrow,
        element,
        direction,
        category_label,
        category_filter_number,
        id_list);
}

function add_no_arrow(
        element,
        direction) {
    // Create new div
    let newArrow = document.createElement('div');
    // Add arrow id
    newArrow.id = "no_arrow" + element.id;
    // Add arrow classList
    newArrow.classList = 'no_arrow';
    // Create left no_arrow
    if (direction === 'left') {
        let firstChild = element.firstElementChild;
        element.insertBefore(newArrow, firstChild);
    }
    // Create right no_arrow 
    else {
        element.lastElementChild.after(newArrow);
    }
}


// Function to generate an url with filter parameters 
function fetch_server_filter(...filter) {
    // Add filter to fetch request
    let count = 0;
    let url = OCMovies_API_URL;
    for (f of filter) {
        if (count ===0) {
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


// Functions to seek for which element to add
function seek_4_left_element_to_add(
        firstFilm,
        data_from_REST_API,
        id_list,
        image_id,
        image_alt) {
    for (i in id_list) {
        if (id_list[i] === firstFilm.id) {
            let j = parseInt(i) - 1;
            // Get the index of the next film, according to data_from_REST_API
            let index = id_list[j].charAt(id_list[j].length - 1);
            image_id =  id_list[j];
            film_url = get_film_url(data_from_REST_API, index);
            image_url = get_film_image_url(data_from_REST_API, index);
            image_alt += index;
            return [image_id, film_url, image_url, image_alt];
        }
    }
}

async function seek_4_right_element_to_add(
        lastFilm,
        data_from_REST_API,
        id_list,
        image_id,
        image_alt,
        retry,
        retry_counter
        ) {
    let number_of_films_on_response = data_from_REST_API.results.length;
    for (i in id_list) {
        if (id_list[i] === lastFilm.id) {
            let j = parseInt(i) + 1;
            // Get the index of the next film, according to data_from_REST_API
            let index =id_list[j].charAt(id_list[j].length - 1);;
            if (index >= number_of_films_on_response) {
                index -= number_of_films_on_response;
                let url = data_from_REST_API.next;
                let response = await fetch(url);
                if (response.ok) {
                    let data = await response.json();
                    image_id =  id_list[j];
                    let film_url = get_film_url(data, index);
                    let image_url = get_film_image_url(data, index);
                    image_alt += id_list[j].charAt(id_list[j].length - 1);
                    return [image_id, film_url, image_url, image_alt];
                } else {
                    if (retry_counter > 0) {
                        setTimeout(retry, 500);
                        break;
                    }
                }
            } else {
                image_id =  id_list[j];
                let film_url = get_film_url(data_from_REST_API, index);
                let image_url = get_film_image_url(data_from_REST_API, index);
                image_alt += id_list[j].charAt(id_list[j].length - 1);
                return [image_id, film_url, image_url, image_alt];
            }
        }
    }
}


// Function to manage click event on arrow
async function arrow_click_event(element, click, category_label, category_filter_number, id_list) {
    let firstElementChild = element.firstElementChild;
    let firstFilm = firstElementChild.nextElementSibling;
    let lastElementChild = element.lastElementChild;
    let lastFilm = lastElementChild.previousElementSibling;

    url = fetch_server_filter(...categories_filter[category_filter_number])
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(() => {
                        arrow_click_event(element, click, category_label, category_filter_number, id_list);
                    },
                    500);
                }
            }
        })
        .then(function (data) {
            if (click === 'left') {
                // Add the previous film to the left
                firstFilm = firstElementChild.nextElementSibling;
                [image_id, film_url, image_url, image_alt] = seek_4_left_element_to_add(
                    firstFilm,
                    data,
                    id_list,
                    category_label[0],
                    category_label[1]);
                let newImage = add_image_after(firstElementChild, image_id, image_url, image_alt);
                add_event_on_film(newImage, film_url);
                // Check if there is no previous film,
                // in order to remove left arrow
                if (image_id === id_list[1]) {
                    add_no_arrow(firstElementChild.parentNode, 'left');
                    firstElementChild.remove();
                }
                // Then, check if the right arrow shall be added
                let max_index = id_list.length - 1;
                let right_arrow_id = id_list[max_index];
                if (lastElementChild != right_arrow_id) {
                    add_arrow(
                        lastElementChild.parentNode,
                        'right',
                        right_arrow_id,
                        category_label,
                        category_filter_number,
                        id_list);
                    // remove the no_arrow
                    lastElementChild.remove();
                }
                // Removed the last film
                lastFilm.remove();
            } else {
                // Add the next film to the right
                add_next_film_to_the_right(
                    firstElementChild,
                    firstFilm,
                    lastElementChild,
                    lastFilm,
                    data,
                    id_list,
                    category_label,
                    category_filter_number);
            }
        })
        .catch(function(error) {
            console.log('')
            console.log('function arrow_click_event: catch error')
            console.log(error)
        })
}

async function add_next_film_to_the_right(
        firstElementChild,
        firstFilm,
        lastElementChild,
        lastFilm,
        data,
        id_list,
        category_label,
        category_filter_number,
        retry_counter=10) {
    const retry = () => {add_next_film_to_the_right(
        firstElementChild,
        firstFilm,
        lastElementChild,
        lastFilm,
        data,
        id_list,
        category_label,
        category_filter_number,
        retry_counter-=1);}
    [image_id, film_url, image_url, image_alt] = await seek_4_right_element_to_add(
        lastFilm,
        data,
        id_list,
        category_label[0],
        category_label[1],
        retry,
        retry_counter);
    // Add new image to the end 
    newImage = add_image_after(
        lastElementChild.previousElementSibling,
        image_id,
        image_url,
        image_alt
        );
    add_event_on_film(newImage, film_url);
    // Check if there is no last film,
    // in order to remove right arrow
    let lastFilmIndex = id_list.length - 2;
    let lastFilmID = id_list[lastFilmIndex];
    if (image_id === lastFilmID) {
        add_no_arrow(lastElementChild.parentNode, 'right');
        lastElementChild.remove();
    }
    // Then, check if the left arrow shall be added
    let left_arrow_id = id_list[0];
    if (firstElementChild.id != left_arrow_id) {
        add_arrow(
            firstElementChild.parentNode,
            'left',
            left_arrow_id,
            category_label,
            category_filter_number,
            id_list);
        // remove the no_arrow
        firstElementChild.remove();
    }
    // Removed the first film
    firstFilm.remove();
}

function add_event_on_arrow(
        arrow,
        element,
        click,
        category_label,
        category_filter_number,
        id_list) {
    arrow.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        arrow_click_event(element, click, category_label, category_filter_number, id_list);
    });
}

// Funcions used to get information from
// data come from OCMovies-API-EN-FR API
function get_film_url(data, position) {
    return data.results[position].url;
}

function get_film_image_url(data, position) {
    return data.results[position].image_url;
}

function get_title(data, position) {
    return data.results[position].title;
}

function get_imdb_url(data, position) {
    return data.results[position].imdb_url;
}

async function get_film_information(data, position, retry, retry_counter) {
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
            long_description);
    } else {
        retry_counter -= 1;
        if (retry_counter > 0) {
            setTimeout(retry, 500);
        }
    }
}

async function get_film_information_from_url(url, retry, retry_counter) {
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
            long_description);
    } else {
        if (retry_counter > 0) {
            setTimeout(retry, 500);
        }
    }
}
