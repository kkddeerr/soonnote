
$( document ).ready(function() {

    var routes = {},
			defaultRoute ='main';

		routes['main'] = {
			url: '#/',
			templateUrl: 'view/main.html'
		};

		routes['calendar'] = {
			url: '#/calendar',
			templateUrl: 'view/calendar.html'
		};

		$.router
			.setData(routes)
			.setDefault(defaultRoute);

		$.when($.ready)
			.then(function() {
				$.router.run('.my-view', 'main');
            });
            
});
