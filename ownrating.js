(function () {
    // ===== Настройки =====
    var API_URL = 'http://192.168.1.36:5000/api/lampa';

    // Какие рейтинги показывать и в каком порядке
    var SHOW = ['tmdb', 'imdb', 'kp', 'popcorn', 'metacriticuser', 'myanimelist'];

    // Источники, где API отдаёт шкалу 0–100 (переводим в 0–10)
    var SCALE_100 = ['tmdb', 'popcorn'];

    // Родные рейтинги Лампы, которые прячем, если пришёл наш
    var NATIVE = ['tmdb', 'imdb', 'kp'];

    // Подписи для источников без иконки
    var LABELS = { tmdb: 'TMDB' };

    // ===== Иконки: вставьте свои base64 без изменений =====
    var ratingIcons = {
            tmdb: 'data:image/png;base64,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',
            imdb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAGSUExURea5Hua5Hua5Hua5Hua5Hua5Hua5Hua5Hum8Huq8Hue6Hum7Hue5HtiuHItwEoFoEb2YGZF0E3xjEIluEs2lG5BzE3xkEL6YGYZsEX5mEIJoEZl7FNOpG9CoG4VrEdasHOi7HsegGhoVAwICAIpvEikhBQAAAA8MApZ5FB0XBBcSA4xwEg4LAggHAVZFC6uKFgwKAhURA8WeGuu9HxsWAwQDACoiBggGAW1YDhANAhgTA4xxEmhUDgcGASIbBKiHFrCNF86mGwYFATwwCAkHAQEBABIOAg0KAh4YBJV4EyUeBQkIAUQ3CdetHCohBQsJARcTA5V3ExIPAmxXDhMPAi4lBiIcBBgUAxYSAxkUA41xEhsVA0s8CjgtByEbBB0YBGhTDlFBCyQdBRYRA1lHDAUEASAaBJh6FH5lEAoIASsjBhsWBINqEQsJAo1yEhEOAgMCAEw9CqmIFicfBduwHZ5/FZZ5E8afGqSEFZ1/FcihGpp8FL+aGcagGpR3E5+AFc+mG9WrHKeGFruXGOi6Hv///1qiGKEAAAAHdFJOUwABRLPvX+bqeLdLAAAAAWJLR0SFFddq5wAAAAlwSFlzAAAd/AAAHfwBIsusWgAAAAd0SU1FB+kHBhQWCRS/ZfkAAAFCSURBVCjPY2BgZGJmYccCWJiZGBkYGFnZ2HEANlZGBiacskB5JgZmdjyAmYEFnzQLAzteQHtpDk4ubk4OMObgBBJcHBw8cGkuXj5+AUEhYRFRMWFxCUkpaRlZOWF5Lpi0gqKSsoqqmrqGppqWto6arrKevoGhkTEXXNrEVMVMzdzCUs3KWkfdxtZOWt3Q3sERVdrJ2cUVKO0m4e7haWnu5e3jy4WQ9nMx9Ld0DwBKy7lrBqoHBdsqKSogpFVDQtXCwiNg0pFRBtEo0loxarFxIGkJg3hP9UhrNOnIBLXEpGRrHfeU1LR0dcOMTIR0vBNfVnZObrBqeF5+gVNBYVG+QbFarDzEaVwlpWXlFZVV1TUVlbXVdXX1DY3SpU0SzSiBCgzPFm5woHKCApWbU4E+EYpHmkBSJJCQCWQDApkIfxYEAOVZTMDhubpjAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI1LTA3LTA2VDIwOjIyOjAzKzAwOjAw0qXEUQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNS0wNy0wNlQyMDoyMjowMyswMDowMKP4fO0AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjUtMDctMDZUMjA6MjI6MDkrMDA6MDBQnQJ8AAAAAElFTkSuQmCC',
            metacriticuser: 'data:image/png;base64,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',
            tomatoes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVklEQVR4nO2WT4wTVRzHZzcY8c9FQzAeWCPiusuWZaEN20G20/+7sLv9fZ/JbjZRQ6IGTIxxvbiJHJqoBzkJmBg4ALHbmc7Mmzc1hoB6kCMHuXDBixFMBIIhMQa82GwfmWK703a6LAu98U0+Sfu+39/7znRe2irKY3WQdnr/+n0uZifLtLBPsElFKj1KtzXhQttbppt7y5DL0Mnulp6deHLcpRsTLmQbZZruWnG2jPC4CxmIoK+7Vjzh4pWsCxlERtAX7RdKuzMuTmUEfZcVNO99Ymsuz7hUDCoed/GGPzfuQs0KVJpzdCF84sAT9y2ZPDP5XJrnIpo982x9zRtMO1TKCO8u75EWuOOd9KYLFDjvzzTgeGvF0rSgz9MOKmkBmXLopvd8G6ZUetIOPvO8//0L/tmsPb0l7aBa9/2kVjoLSSeXSNVCyyQF/ZVy0d+UE2TVfAcX/espQUda55ehIx2L4w59khCQAfw+JtiLjZwgo7buoJoUNK8JFkqI3McJB5XAeQfVhJOLdSxOCJaMc1TjDmQbnK7HOb6Kc7gdMwFoDi3FHRxa4enek2azuRjHFa029ODEOI4l+PRQTLBMjOMd77WyakmlZw/PjY5xHB7j9NsYh1wlfyr5fK/ySJTP977O6Zs9HHIVNB22NUnTpzbUv3FUm83t5pD3h5ZUzj4Ifz/19AMXRk22M2rhF9WGVC1UoxZdVW36r/Z+lUQtVFQLl1Qbp1Wb3h4uZJ5ZsTSsT20YtejWqA35KNll0+1dNs13fP5hk96LWJCBmPRrxMZHEYt+bPZoKWLS0YhFn0ZM/N1x3qpxPLB4R4kWdpiQrYyU8MdwgW30MsMmCzV5Jp1rzNtQR0qoBO1RZ6fBkm3F28xcbLgE6WdbCf8MmWx7PbPdyLEW/86Indva2KOEQ617NOdpIfCuQwZ9GNLpRsiADOm4FtKh+f0hA1/WPD86XY7aM0/VAvl875AOty1jNJjtfMry+d6QMf1C0GEY1OEOGpBtFOndekY7r60b0HF4QMe/TRmdfvI8ZS16tYgf+nXIVrYU8X5rdqs983y/wZKv6WxmQEf4of6Vbl6kg5uLkH5eLtKtvsXlX6+uqa/A3txUwM+bFulyX4GMl77FYNdLH0t5CN0FepYN+AJ1mWAAAAAASUVORK5CYII=',
            popcorn: 'data:image/png;base64,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',
            kp: 'data:image/png;base64,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',
            myanimelist: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfpBwYVGAj8+RLWAAAEn0lEQVRIx+2WXYhVVRTHf2vvc869d+Y6M86Xo9PojKn5MaiUJplDZA9miJIEUoFUhFFgRhH1UElPYQ8REmVUKFH00EsIRWCfEKI2o0M2lI05MTmTM9M4H86H95579+rhXHUc7ugV1KcW7Iezzjrrv9d//c9eW7htCwz8mWDu2qdIztpBorQeL851tcw4jA+2M3z6LVr27GV2U8riNM6izTupmPsqRWWVGP/6ggIYH2LTKkiU30flQvhl70HL0q2PUXHr6wRFcVSuP+hEs4FPULyC0jkdloUPfkhRVd2NRZwI7seAGQa/uPGmgQIg4BcvNxh7A5p6FTM2aW466AXs/4EvmubWZT7N45vkz/ddHvPyOeOeobokIJ1SekbSqCgJC1UlcVyo9IyEhKoISlnSY1pgMSr0nktRFAsoSgj9QyGjGXcNwE5ZUpfk4+13MjiS5ol3mznRPcKT6xt4fmMj37Z28fT7P1NVmuDZ++ezfmUtlckYmnW8vO8ojfXlbLmnjm27j/DDiX4wtvCKg8Ayu7qExfU+L2xewOc/dvLS5mXUVhRRPT1OMnDs2rqMx9fO52TXAJ19g1QkfKqmWSrLAubNLCHuG1AH5AfO32NVnDrUKY82NfDR9tXMqkhEhGSVdY01PNI0l2Mnenjota9obj/LrBllhBmHuixZNTgA50CzgCsQGMEaobm9h7/+OUdddZIDR04xPJ7CE6FpaS0x3zB6Ps2Gu+Zx95KZlCXjmJiHioJK7thXRF20JinOyw+sGBHau4f54qd2Nq5ewGcH2li5+BasFWoqigDhjkU1rFhUg+/l9q+CqiAo4hRUUVVEwRiHE0Fz1HtTVawA1rD/aBfftPbSUJPAiIBGVaRSGV7cc5DfTg/wysPLuff2+hyBgoijoshSXuqTVWF4LBO12wgiBp2SagHPWHwxuAwMjoWIGDwrOBydvcPEYoaUc3x//Ay9Q+mobyLRsh67tq3i4JsbeG7TQjTXY3GKyVGft+LB0ZCvW/6m7WQfgqBGGRwPOdDSSeupfn7tOMszG7Osaazlk+86ONYxQGV5F51958hm0nx5qANRASO0nRoAByqgErGlOIQH9iixMiYeN0bAlwxBOM54VskAIhBYg3OG0mLLjk2L2X+4m+aT/+JbgzWGtEZNsqrE1XDeQugcLteCi3SmhvIDXxAYLgWZcNK7KIEVJauCMQJqUAxqJOoxLlK3CJ5CFjMhQwQ8hbhyASaGWNBseNEngEgkPiNElIpFBayCE0WRiFuELPmP7qtMJ0FtgLEx5AqhkkvuBMwklKnmxRUqvrQ3tUFEsAvzRkwcTNkC74sFzWMF1PqI8TBcnllFUXHYAkbhxIwGl00XFio4G4D1EZFLGlVBVHDXcjN2btiQHm0taHJHMDjjgfGi/2tCxabgihXC0RbD8Ol3CMdGoLAtK4IzfrQkklyggivoe4FwbIChzvcs3Yd/p2qpIUiuwvoFXnWjMzdSs6JygepJ4DLpOTM+zGDHGxzZvc/SsC7L8U8PUTbnDGLmYb3pGP+qohMExKAiaDQB8gTlgDPn04z1tdH/x04Ov/0BdWvC/wBjCdJ1yzmr/QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNS0wNy0wNlQyMToyNDowMiswMDowMKRaZicAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjUtMDctMDZUMjE6MjQ6MDIrMDA6MDDVB96bAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI1LTA3LTA2VDIxOjI0OjA4KzAwOjAwJmKgCgAAAABJRU5ErkJggg=='
        };

    function startPlugin() {
        window.ownrating_plugin = true;

        Lampa.Manifest.plugins = {
            type: 'video',
            version: '1.1.0',
            name: 'Own Rating'
        };

        if (window.appready) {
            init();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') init();
            });
        }
    }

    function getRatingColor(rating) {
        var color, textColor, borderColor, shadow;

        if (rating >= 7) {
            color = '#5cb85c'; textColor = 'white'; borderColor = '#4cae4c';
            shadow = '0 1px 3px rgba(0,100,0,0.4)';
        } else if (rating >= 4) {
            color = '#f0ad4e'; textColor = '#333'; borderColor = '#eea236';
            shadow = '0 1px 3px rgba(150,100,0,0.3)';
        } else {
            color = '#d9534f'; textColor = 'white'; borderColor = '#c9302c';
            shadow = '0 1px 3px rgba(100,0,0,0.4)';
        }

        return [
            'display: inline-block;',
            'padding: 0.2em 0.6em;',
            'border-radius: 0.3em;',
            'background: ' + color + ';',
            'color: ' + textColor + ';',
            'border: 1px solid ' + borderColor + ';',
            'text-shadow: 0 1px 1px rgba(0,0,0,0.2);',
            'box-shadow: ' + shadow + ';',
            'line-height: 1;',
            'font-weight: bold;',
            'font-size: 1.19em;'
        ].join(' ');
    }

    function normalize(src, value) {
        var num = parseFloat(value);
        if (isNaN(num) || num <= 0) return null;
        if (SCALE_100.indexOf(src) !== -1) num = num / 10;
        return num;
    }

    function formatNumber(num) {
        var s = num.toFixed(1);
        return s === '10.0' ? '10' : s;
    }

    function parseRatings(response) {
        if (!response) return [];
        var data = response.ratingJson;
        if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch (e) { return []; }
        }
        return Array.isArray(data) ? data : [];
    }

    function addStyles() {
        if (document.getElementById('ownrating-style')) return;
        var selectors = NATIVE.map(function (src) {
            return '.ownrating-has-' + src + ' .full-start__rate.rate--' + src;
        }).join(',');
        $('head').append('<style id="ownrating-style">' + selectors + '{display:none!important}</style>');
    }

    function buildItem(src, num) {
        var head = ratingIcons[src]
            ? '<img src="' + ratingIcons[src] + '" style="height:1.9em;width:1.9em;">'
            : '<span style="font-weight:bold;">' + (LABELS[src] || src.toUpperCase()) + '</span>';

        return $(
            '<div class="ownrating-item" style="display:flex;align-items:center;">' +
                '<div style="margin-right:5px;">' + head + '</div>' +
                '<div style="' + getRatingColor(num) + '">' + formatNumber(num) + '</div>' +
            '</div>'
        );
    }

    function init() {
        addStyles();

        var network = new Lampa.Reguest();
        var nativeClasses = NATIVE.map(function (s) { return 'ownrating-has-' + s; }).join(' ');

        Lampa.Listener.follow('full', function (e) {
            if (e.type !== 'complite') return;

            var m = e.data.movie;
            var render = e.object.activity.render();
            var root = $(render);
            var rateElem = $('.full-start__rate.rate--tmdb', render).eq(0);
            if (!rateElem.length) return;

            // следы прошлого рендера, если complite пришёл повторно
            $('.ownrating-item, .ownrating-spinner', render).remove();

            var spinner = $('<div class="processing ownrating-spinner"><div><div class="processing__loader"></div><div class="processing__text">Получение рейтингов...</div></div></div>');
            rateElem.after(spinner);

            var url = API_URL + '/getRatio' +
                '?tmdbId=' + encodeURIComponent(m.id) +
                '&imdbId=' + encodeURIComponent(m.imdb_id || '') +
                '&mediaType=' + encodeURIComponent(m.name ? 'show' : 'movie') +
                '&ruTitle=' + encodeURIComponent(m.title || m.name || '') +
                '&originalTitle=' + encodeURIComponent(m.original_title || m.original_name || '') +
                '&publishDate=' + encodeURIComponent(m.release_date || m.first_air_date || '');

            network.silent(url, function (response) {
                spinner.remove();

                var values = {};
                var list = parseRatings(response);
                for (var i = 0; i < list.length; i++) {
                    var num = normalize(list[i].Source, list[i].Value);
                    if (num !== null) values[list[i].Source] = num;
                }

                root.removeClass(nativeClasses);
                $('.ownrating-item', render).remove();

                var anchor = rateElem;
                for (var j = 0; j < SHOW.length; j++) {
                    var src = SHOW[j];
                    if (!values.hasOwnProperty(src)) continue;

                    var item = buildItem(src, values[src]);
                    anchor.after(item);
                    anchor = item;

                    root.addClass('ownrating-has-' + src);
                }
            }, function (err) {
                spinner.remove();
                console.log('OwnRating ошибка:', err);
            });
        });
    }

    if (!window.ownrating_plugin) startPlugin();
})();
