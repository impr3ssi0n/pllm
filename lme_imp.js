(function () {
    'use strict';

    // var manifest = {
    //   type: "other",
    //   version: "0.0.5",
    //   author: '@lme_chat',
    //   name: "Lampa Movie Enhancer",
    //   description: "Some tweaks for movie content",
    //   component: "lme"
    // };

    function startPlugin() {
        window.own_rating = true;
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var render = e.object.activity.render();
                console.log(render);
            };
        });
    };

    if (!window.own_rating)
        startPlugin();
})();
