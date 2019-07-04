
$( document ).ready(function() {

	//페이지 추가시 
	// routes[이름] = {
	// 	url: '#/URL',
	// 	templateUrl: 'view/html이름'
	// };
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

		routes['join'] = {
			url: '#/join',
			templateUrl: 'view/join.html'
		};

		routes['ccm'] = {
			url: '#/ccm',
			templateUrl: 'view/ccm.html'
		};

		routes['summerConference2019'] = {
			url: '#/summerConference2019',
			templateUrl: 'view/summerConference2019.html'
		};

		routes['board'] = {
			url: '#/board',
			templateUrl: 'view/board.html'
		};

		routes['form'] = {
			url: '#/form',
			templateUrl: 'view/form.html'
		};

		routes['ccmAdd'] = {
			url: '#/ccmAdd',
			templateUrl: 'view/ccmAdd.html'
		};

		routes['login'] = {
			url : '#/login',
			templateUrl: 'view/login.html'
		}
		
		/* @ view-model 사용예제
			routes['categoryDetail'] = {
			url: '#/categories/:categoryId',
			templateUrl: 'templates/category.html',
			viewModel: vm["categoryVM"],
		}; */

		routes['ccmDetail'] = {
			url: '#/ccmDetail/:cmId',
			templateUrl: 'view/ccmDetail.html',
			viewModel : vm["getCcmDetail"]
		};

<<<<<<< HEAD
		routes['boardDetail'] = {
			url: '#/boardDetail/:BOARD_NO',
			templateUrl: 'view/boardDetail.html',
			viewModel : vm["getboardDetail"]
=======
		routes['conferenceRegistry'] = {
			url: '#/conferenceRegistry'	,
			templateUrl: 'view/conferenceRegistry.html'
>>>>>>> ef05e1b613bb7574e31c826d8089e0ded5998a2f
		};

		$.router
			.setData(routes)
			.setDefault(defaultRoute)
			.onRouteChanged(function(e, route, param) {
			  route.viewModel(route, param);
			});

		$.when($.ready)
			.then(function() {
				$.router.run('.my-view', 'main');
            });
            
});
