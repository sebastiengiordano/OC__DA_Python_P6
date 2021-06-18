
const OCMovies_API_URL = "http://localhost:8000/api/v1/titles/";

// Get all element in index.html
const best_movie = document.getElementById('best_movie');
const best_rating = document.getElementById('best_rating');
const style_1 = document.getElementById('style_1');
const style_2 = document.getElementById('style_2');
const style_3 = document.getElementById('style_3');


/*********************/
/*  Film categories  */
/*********************/
// Defined all categories filter
let categories_filter = [
    ["sort_by=-imdb_score"],
    ["min_year=1970", "max_year=1980", "sort_by=-imdb_score", "actor=Diane+Keaton"],
    ['genre=Fantasy', "sort_by=-imdb_score"],
    ['director=Christopher+Nolan', "sort_by=year"],
];
// Defined the index of the categories filter by category
let best_movie_categories_filter = 0;
let best_rating_categories_filter =0;
let style_1_categories_filter = 1;
let style_2_categories_filter = 2;
let style_3_categories_filter = 3;

/*********************************/
/*  Number of films by category  */
/*********************************/
let numberOfFilmByCategory = 8;

/*****************/
/*  Best rating  */
/*****************/
// best rating id list
let best_rating_id_list = ['left_arrow_best_rating'];
for (let i=1; i<=numberOfFilmByCategory; i++) {
    best_rating_id_list.push('best_rating_image_' + i);
}
best_rating_id_list.push('right_arrow_best_rating');
// best rating labels
let best_rating_labels = ['best_rating_image_', 'Best Rating n°'];


/*************/
/*  Style_1  */
/*************/
// style_1 id list
let style_1_id_list = ['left_arrow_style_1'];
for (let i=0; i<numberOfFilmByCategory; i++) {
    style_1_id_list.push('style_1_image_' + i);
}
style_1_id_list.push('right_arrow_style_1');
// style_1 labels
let style_1_labels = ['style_1_image_', 'Best film of 1977 n°'];


/*************/
/*  Style_2  */
/*************/
// style_2 id list
let style_2_id_list = ['left_arrow_style_2'];
for (let i=0; i<numberOfFilmByCategory; i++) {
    style_2_id_list.push('style_2_image_' + i);
}
style_2_id_list.push('right_arrow_style_2');
// style_2 labels
let style_2_labels = ['style_2_image_', 'Fantasy n°'];


/*************/
/*  Style_3  */
/*************/
// style_3 id list
let style_3_id_list = ['left_arrow_style_3'];
for (let i=0; i<numberOfFilmByCategory; i++) {
    style_3_id_list.push('style_3_image_' + i);
}
style_3_id_list.push('right_arrow_style_3');
// style_3 labels
let style_3_labels = ['style_3_image_', 'Christopher Nolan n°'];


/***********/
/*  Other  */
/***********/
// month_name
let month_name = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novenbre',
    'Décembre',
]

// Global variable to avoid multi click on arrow before page refresh
let multi_click_block = false;
