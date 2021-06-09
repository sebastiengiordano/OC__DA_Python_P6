// Functions to manage best movie section
function manage_best_movie_section() {
    url = fetch_server_filter(...categories_filter[0])
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                console.log('')
                console.log('function manage_best_movie_section: response OK')
                return response.json();
            }
            else {
                console.log('')
                console.log('function manage_best_movie_section')
                console.error('Retour du serveur :', response.status);
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(manage_best_movie_section, 500);
                    }
            }
        })
        .then(function (data) {
            best_movie_section_update(data);
            })
        .catch(function(error) {
            console.log('')
            console.log('function manage_best_movie_section: catch error')
            console.log(error)
            setTimeout(manage_best_movie_section, 500);
        })}


function best_movie_section_update(data) {
    console.log(data);
    // Add best movie title inside best_movie div
    title = get_title(data, 0);
    new_paragraph = add_paragraph(best_movie, 'best_movie_title', title);
    // Add Play button with imdb url of the best movie
    href = get_imdb_url(data, 0);
    add_button(new_paragraph, 'Play', 'play_button', href);
    // Add image in best_movie div
    image_id = 'best_movie_image';
    image_url = get_film_url(data, 0);
    image_alt = 'Best Movie';
    add_image_in(best_movie, image_id, image_url, image_alt);
}


// Functions to manage best rating section
function manage_best_rating_section() {
    url = fetch_server_filter(...categories_filter[0]);
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                console.log('');
                console.log('function manage_best_rating_section: response OK');
                return response.json();
            }
            else {
                console.log('')
                console.log('function manage_best_rating_section')
                console.error('Retour du serveur :', response.status);
                retry_counter -= 1;
                if (retry_counter > 0) {
                    setTimeout(manage_best_rating_section, 500);
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
            setTimeout(manage_best_rating_section, 500);
        })
}

function best_rating_section_update(data ) {
    // let firstElementChild = best_rating.firstElementChild;
    let child = best_rating.firstElementChild;
    for (let i=1; i<5;i++) {
        href = get_imdb_url(data, i);
        image_id = 'best_rating_image_' + i;
        image_url = get_film_url(data, i);
        image_alt = 'Best Rating n°' + i;
        child = add_image_after(
            child,
            image_id,
            image_url,
            image_alt);
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
        0);
}
