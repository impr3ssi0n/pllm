(function () {
    'use strict';
function startPlugin() {
    window.ownrating_plugin = true;
    var manifest = {
        type: 'video',
        version: '1.0.0',
        name: 'Own Rating'
    }

    Lampa.Manifest.plugins = manifest

    if (window.appready) init()
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') init()
        })
    }
}

function init() {
    var network = new Lampa.Reguest();
    var apiUrl = "http://192.168.1.49:5105/api/lampa";
    // Подписка на события карточки фильма  
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
            var movieData = e.data.movie
            var mediaType = movieData.name ? 'show' : 'movie';
            var year = movieData.release_date ? movieData.release_date : movieData.first_air_date;
            var render = e.object.activity.render();
            var ratingElement = $('.full-start__rate.rate--tmdb', render).eq(0);
            var spinnerElement = $('<div class="processing"><div><div class="processing__loader"></div><div class="processing__text">Получение рейтингов...</div></div></div>');
            ratingElement.after(spinnerElement);
            network.silent(apiUrl + "/getRatio" + "?tmdbId=" + movieData.id + "&imdbId=" + movieData.imdb_id + "&mediaType=" + mediaType + "&ruTitle=" + movieData.title + "&originalTitle=" + movieData.original_title + "&publishDate=" + year, (response) => {
                var ratingsData;
                // debugger;
                spinnerElement.remove();
                if (response && response.ratingJson) {
                    ratingsData = JSON.parse(response.ratingJson);
                    ratingsData.forEach((rating, index) => {
                        if (rating.Value === null || rating.Source === 'tmdb') return;
                        var ratingDiv = $('<div>')
                            .append('<div>' + rating.Value + '</div>')
                            .append('<div>' + rating.Source.slice(0, 3) + '</div>');
                        if (index === 0) {
                            ratingElement.after(ratingDiv);
                        } else {
                            $('.full-start__rate.rate--tmdb', render).last().after(ratingDiv);
                        }
                    });
                }
            }, (error) => {
                spinnerElement.remove();
                console.log('OwnRating', 'Ошибка загрузки рейтингов:', error);
            })
            console.log({
                title: movieData.title,
                id: movieData.id,
                year: movieData.release_date,
                rating: movieData.vote_average,
                imdb_id: movieData.imdb_id,
                original_title: movieData.original_title
            })
        }
    })
}

if (!window.ownrating_plugin)
    startPlugin()
})();
