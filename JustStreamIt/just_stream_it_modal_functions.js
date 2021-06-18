/**************************************************************/
/*********** Functions for Modal purpose **********************/
/**************************************************************/

// Function to manage click event on film
// This will open a modal with film informations
function add_event_on_film(
    film,
    url
    ) {
    film.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    modal_click_event(url);
    });
}

async function modal_click_event(url, retry_counter=2) {
    const retry = () => {
        modal_click_event(url, retry_counter-=1);
    }
    let film_information = await get_film_information_from_url(url);
    show_modal(film_information);
}

function show_modal(film_information) {
    /* The Modal */
    // Create modal body
    let modal = document.createElement('div');
    modal.id = "modal_id";
    modal.classList = "modal";
    let bloc_page = document.getElementById('bloc_page')
    bloc_page.append(modal);
    // Add click event in order to close the modal
    modal.addEventListener("click", event => {close_modal (event);});
    // Add modal content inside modal body 
    let modal_content = document.createElement('div');
    modal_content.id = "modal_content animate_modal";
    modal_content.classList = "modal_content";
    modal.append(modal_content);
    // Add modal container inside modal content
    let modal_container = document.createElement('div');
    modal_container.id = "modal_container";
    modal_container.classList = "modal_container";
    modal_content.append(modal_container);
    // Add close button inside modal container
    let span = document.createElement('span');
    span.classList = 'closebtn';
    span.textContent = "X"
    span.addEventListener("click", event => {close_modal (event);});
    modal_content.append(span);
    // Add film informations inside the modal container
    add_film_information(film_information);
}

// Function used to add film informations inside the modal container
function add_film_information(film_information) {
    let modalContainer = document.getElementById('modal_container');

    // Header
    add_title_h1(
        modalContainer,
        'film_title',
        film_information.title);
    add_image_in(
        modalContainer,
        'film_picture',
        film_information.image_url,
        'Picture of the film: ' + film_information.title);
    let more_information = add_title_h2(
        modalContainer,
        'more_information',
        'More informations :');
    // Add Genres
    add_genres(film_information, more_information);
    // Add date_published
    add_date_published(film_information, more_information);
    // Add rated
    add_rated(film_information, more_information);
    // Add imdb_score
    add_imdb_score(film_information, more_information);
    // Add directors
    add_directors(film_information, more_information);
    // Add actors
    add_actors(film_information, more_information);
    // Add duration
    add_duration(film_information, more_information);
    // Add countries
    add_countries(film_information, more_information);
    // Add budget
    add_budget(film_information, more_information);
    // Add description
    add_description(film_information, more_information);
}

// Function for click event, used to close the modal
function close_modal (event) {
    event.preventDefault();
    event.stopPropagation();
    let modal = document.getElementById("modal_id");
    modal.remove();
}


// Functions to add film information inside the modal
function add_genres(film_information, after) {
    let genres = "";
    if (film_information.genres.length > 1) {
        genres = "Genres : ";
    } else {
        genres = "Genre : ";
    }
    for (i in film_information.genres){
        if (i > 0){
            genres += " - "
        }
        genres += film_information.genres[i];
    }
    add_paragraph(
        after,
        'genres',
        genres);
}

function add_date_published(film_information, after) {
    let date = date_published_to_dd_mm_yyyy(film_information.date_published)
    add_paragraph(
        after,
        'date_published',
        'Date de sortie : ' + date);
}

function add_rated(film_information, after) {
    let rated = film_information.rated;
    if (rated === "Not rated or unkown rating") {
        rated = "-";
    }
    add_paragraph(
        after,
        'rated',
        "Note : " + rated);
}

function add_imdb_score(film_information, after) {
    add_paragraph(
        after,
        'imdb_score',
        "Score IMDb : " + film_information.imdb_score);
}

function add_directors(film_information, after) {
    let directors = "";
    if (film_information.directors.length > 1) {
        directors = "Réalisateurs : ";
    } else {
        directors = "Réalisateur : ";
    }
    for (i in film_information.directors){
        if (i > 0){
            directors += " - "
        }
        directors += film_information.directors[i];
    }
    add_paragraph(
        after,
        'directors',
        directors);
}

function add_actors(film_information, after) {
    let actors = "";
    if (film_information.actors.length > 1) {
        actors = "Acteurs : ";
    } else {
        actors = "Acteur : ";
    }
    for (i in film_information.actors){
        if (i > 0){
            actors += " - "
        }
        actors += film_information.actors[i];
    }
    add_paragraph(
        after,
        'actors',
        actors);
}

function add_duration(film_information, after) {
    let duration = timeConvert(film_information.duration);
    add_paragraph(
        after,
        'duration',
        'Durée du film : ' + duration);
}

function add_countries(film_information, after) {
    add_paragraph(
        after,
        'countries',
        'Pays : ' + film_information.countries);
}

function add_budget(film_information, after) {
    let budget = film_information.budget;
    if (budget) {
        budget = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', minimumFractionDigits: '0'}).format(budget);
    } else {
        budget= "-";
    }
    add_paragraph(
        after,
        'budget',
        'Budbet : ' + budget);
}

function add_description(film_information, after) {
    add_paragraph(
        after,
        'Description',
        'Description : ' + film_information.long_description);
}

// Utils
function date_published_to_dd_mm_yyyy(date) {
    let day = "";
    let month = "";
    let year = "";
    let index = 0;
    for(i in date){
        if (year === "") {
            if (date.charAt(i) === "-") {
                for (let j=0; j<i; j++) {
                    year += date.charAt(j);
                }
                index = parseInt(i) + 1;
            }
        } else if (month === "") {
            if (date.charAt(i) === "-") {
                for (let j=index; j<i; j++) {
                    month += date.charAt(j);
                }
                index = parseInt(i) + 1;
                for (let j=index; j<date.length; j++) {
                    day += date.charAt(j);
                }
                break;
            }
        }
    }
    month = month_name[parseInt(month) - 1]
    return day + ' ' + month + ' ' + year
}

function timeConvert(minutes_to_convert) {
    var hours = Math.floor(minutes_to_convert / 60);
    var minutes = minutes_to_convert % 60;
    if (hours === 0){
        hours = "";
    } else if (hours > 1) {
        hours += " heures ";
    } else {
        hours += " heure "
    }

    if (minutes === 0){
        minutes = "";
    } else if (minutes > 1) {
        minutes += " minutes";
    } else {
        minutes += " minute"
    }
    return hours + minutes;
    }
