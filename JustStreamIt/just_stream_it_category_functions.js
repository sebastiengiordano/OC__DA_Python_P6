// Functions to manage best movie section
function manage_best_movie_section(retry_counter=2) {
    url = fetch_server_filter(...categories_filter[best_movie_categories_filter])
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(() => {
                        manage_best_movie_section(retry_counter);
                    },
                    500);
                }
            }
        })
        .then(function (data) {
            best_movie_section_update(data);
            })
        .catch(function(error) {
            console.log('');
            console.log('function manage_best_movie_section: catch error');
            console.log(error);
        })
}


function best_movie_section_update(data) {
    // Add best movie title inside best_movie div
    title = get_title(data, 0);
    new_paragraph = add_paragraph(best_movie, 'best_movie_title', title);
    // Add Play button with imdb url of the best movie
    href = get_imdb_url(data, 0);
    add_button(new_paragraph, 'Play', 'play_button', href);
    // Add image in best_movie div
    let image_id = 'best_movie_image';
    let film_url = get_film_url(data, 0);
    let image_url = get_film_image_url(data, 0);
    let image_alt = 'Best Movie';
    let film_picture = add_image_in(best_movie, image_id, image_url, image_alt);
    // Add click event on film, to open a modal
    add_event_on_film(film_picture, film_url);
}


// Functions to manage best rating section
function manage_best_rating_section(retry_counter=2) {
    url = fetch_server_filter(...categories_filter[best_rating_categories_filter]);
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(() => {
                        manage_best_rating_section(retry_counter);
                    },
                    500);
                }
            }
        })
        .then(function (data) {
            best_rating_section_update(data);
        })
        .catch(function(error) {
            console.log('');
            console.log('function manage_best_rating_section: catch error');
            console.log(error);
        })
}

function best_rating_section_update(data) {
    let child = best_rating.firstElementChild;
    for (let i=1; i<5;i++) {
        href = get_imdb_url(data, i);
        image_id = 'best_rating_image_' + i;
        film_url = get_film_url(data, i);
        image_url = get_film_image_url(data, i);
        image_alt = 'Best Rating n°' + i;
        child = add_image_after(
            child,
            image_id,
            image_url,
            image_alt);
        add_event_on_film(child, film_url);
    }
}

function best_rating_add_event_on_arrow() {
    let max_index = best_rating_id_list.length - 1;
    let arrow = document.getElementById(best_rating_id_list[max_index]);
    add_event_on_arrow(
        arrow,
        best_rating,
        'right',
        best_rating_labels,
        best_rating_categories_filter,
        best_rating_id_list);
}


// Functions to manage style_1 section
function manage_style_1_section(retry_counter=2) {
    url = fetch_server_filter(...categories_filter[style_1_categories_filter]);
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(() => {
                        manage_style_1_section(retry_counter);
                    },
                    500);
                }
            }
        })
        .then(function (data) {
            style_1_section_update(data);
        })
        .catch(function(error) {
            console.log('');
            console.log('function manage_style_1_section: catch error');
            console.log(error);
        })
}

function style_1_section_update(data) {
    let child = style_1.firstElementChild;
    for (let i=0; i<4;i++) {
        href = get_imdb_url(data, i);
        image_id = style_1_labels[0] + i;
        film_url = get_film_url(data, i);
        image_url = get_film_image_url(data, i);
        image_alt = style_1_labels[1] + i;
        child = add_image_after(
            child,
            image_id,
            image_url,
            image_alt);
        add_event_on_film(child, film_url);
    }
}

function style_1_add_event_on_arrow() {
    let max_index = style_1_id_list.length - 1;
    let arrow = document.getElementById(style_1_id_list[max_index]);
    add_event_on_arrow(
        arrow,
        style_1,
        'right',
        style_1_labels,
        style_1_categories_filter,
        style_1_id_list);
}


// Functions to manage style_2 section
function manage_style_2_section(retry_counter=2) {
    url = fetch_server_filter(...categories_filter[style_2_categories_filter]);
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(() => {
                        manage_style_2_section(retry_counter);
                    },
                    500);
                }
            }
        })
        .then(function (data) {
            style_2_section_update(data);
        })
        .catch(function(error) {
            console.log('');
            console.log('function manage_style_2_section: catch error');
            console.log(error);
        })
}

function style_2_section_update(data) {
    let child = style_2.firstElementChild;
    for (let i=0; i<4;i++) {
        href = get_imdb_url(data, i);
        image_id = style_2_labels[0] + i;
        film_url = get_film_url(data, i);
        image_url = get_film_image_url(data, i);
        image_alt = style_2_labels[1] + i;
        child = add_image_after(
            child,
            image_id,
            image_url,
            image_alt);
        add_event_on_film(child, film_url);
    }
}

function style_2_add_event_on_arrow() {
    let max_index = style_2_id_list.length - 1;
    let arrow = document.getElementById(style_2_id_list[max_index]);
    add_event_on_arrow(
        arrow,
        style_2,
        'right',
        style_2_labels,
        style_2_categories_filter,
        style_2_id_list);
}


// Functions to manage style_3 section
function manage_style_3_section(retry_counter=2) {
    url = fetch_server_filter(...categories_filter[style_3_categories_filter]);
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(() => {
                        manage_style_3_section(retry_counter);
                    },
                    500);
                }
            }
        })
        .then(function (data) {
            style_3_section_update(data);
        })
        .catch(function(error) {
            console.log('');
            console.log('function manage_style_3_section: catch error');
            console.log(error);
        })
}

function style_3_section_update(data) {
    let child = style_3.firstElementChild;
    for (let i=0; i<4;i++) {
        href = get_imdb_url(data, i);
        image_id = style_3_labels[0] + i;
        film_url = get_film_url(data, i);
        image_url = get_film_image_url(data, i);
        image_alt = style_3_labels[1] + i;
        child = add_image_after(
            child,
            image_id,
            image_url,
            image_alt);
        add_event_on_film(child, film_url);
    }
}

function style_3_add_event_on_arrow() {
    let max_index = style_3_id_list.length - 1;
    let arrow = document.getElementById(style_3_id_list[max_index]);
    add_event_on_arrow(
        arrow,
        style_3,
        'right',
        style_3_labels,
        style_3_categories_filter,
        style_3_id_list);
}
