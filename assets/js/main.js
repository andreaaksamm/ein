var body;

var numberOfPatterns;

var ghostSearch;
var menuMouse;

var searchButtonEl;
var searchModalEl;
var searchWrapperEl;
var searchInputEl;
var searchResultsEl;
var resultsEmptyEl;

var menuButtonEl;

let dark;
let ext;

var action;
var stripe;

$(document).ready(function() {
	body = document.body;

	numberOfPatterns = 5;

	ghostSearch;
	menuMouse = true;

	searchButtonEl = document.querySelector(".site-search");
	searchModalEl = document.querySelector(".search-modal");
	searchWrapperEl = document.querySelector(".search-wrapper");
	searchInputEl = document.getElementById("search-input");
	searchResultsEl = document.getElementById("results-container");
	resultsEmptyEl = document.querySelector(".results-empty");

	menuButtonEl = document.querySelector(".site-menu");

	action = getParameterByName('action');
	stripe = getParameterByName('stripe');

	dark = body.classList.contains("dark");
	ext = dark ? "d.png" : ".png";

	index();
	events();
	buttons();
	carousel();
	search();
});

function index() {

	let carouselContainer = document.querySelector(".carousel-container");
	if(carouselContainer) {
		let rand = Math.ceil(Math.random() * numberOfPatterns);
		carouselContainer.style.backgroundImage = "url(/assets/images/patterns/" + rand + ext;
	}

	let noImagePosts = document.querySelectorAll("a.no-image");
	if(noImagePosts.length) {
		for(let post of noImagePosts) {
			let rand = Math.ceil(Math.random() * numberOfPatterns);
			post.style.backgroundImage = "url(/assets/images/patterns/" + rand + ext;
		}
	}
}

function carousel() {
	$('.carousel-bg-image.no-image')

	let noImageCarousel = document.querySelectorAll('.carousel-bg-image.no-image');

	if(noImageCarousel.length) {
		for(let container of noImageCarousel) {
			let rand = Math.ceil(Math.random() * 11);
			container.style.backgroundImage = "url(/assets/images/patterns/" + rand + ext;
		}
	}

	$('.carousel').on('init', function(s){
		setTimeout(function() {
			this.style.opacity = "1";
		}.bind(s.target), 200);
	});

	$('.carousel').slick(slickConf);
}

function events() {
	hotkeys.filter = function(event){
		return true;
	}

	hotkeys('esc', function(event, handler){
		event.preventDefault()

		body.classList.remove("menu-opened");
		body.classList.remove("search-opened");
	});
}

function buttons() {
	searchButtonEl.addEventListener("click", function() {
		toggleSearch();
	});

	searchWrapperEl.addEventListener("click", function(e) {
		e.stopPropagation();
	});

	searchModalEl.addEventListener("click", function(e) {
		body.classList.remove("search-opened");
	}, false);

	body.addEventListener("click", function() {
		if(body.classList.contains("menu-opened")) {
			body.classList.remove("menu-opened");
		}
	});

	menuButtonEl.addEventListener("click", function(e) {
		e.stopPropagation();
		toggle("menu-opened");
	});
}

function search() {
	if (typeof ghostsearch_key !== 'undefined' && typeof ghostsearch_url !== 'undefined') {

		searchButtonEl.style.display = "inline-block";

		ghostSearch = new GhostSearch({
			input: '#search-input',
			trigger: 'focus',
			results: '#results-container',
			key: ghostsearch_key,
			url: ghostsearch_url,
			template: function(result) {
				let url = [location.protocol, '//', location.host].join('');
				return '<a href="' + url + '/' + result.slug + '/"' + ' class="search-item"><span class="search-item-name">' + result.title + '</span></a>';
			},
			on: {
				beforeDisplay: function(results) {
				},
				afterDisplay: function(results){
					let inputEl = document.getElementById('search-input');
					let resultsEl = document.getElementById('results-container');

					if(!(inputEl.value == "")) {
						searchWrapperEl.classList.add("with-text")
						resultsEmptyEl.style.display = "none";
						let last = searchResultsEl.lastElementChild;
						if(last) {
							changeSelectedMenu(last, false, true);
						}
					} else {
						searchWrapperEl.classList.remove("with-text")
						resultsEmptyEl.style.display = "block";
					}

					if (results.total == 0 && inputEl.value != '') {
						let e = document.createElement('div');

						e.classList.add("search-item");
						e.classList.add("no-results");
						e.innerHTML = 'No results found';

						resultsEl.appendChild(e);
					};
				},
				beforeFetch: function() {
				},
				afterFetch: function() {
				}
			}
		});

		hotkeys('alt+s', function(event, handler){
			event.preventDefault()
			toggleSearch();
		});

		hotkeys('enter', function(event, handler){
			let searchOpened = body.classList.contains("search-opened");
			let selected = document.querySelector(".selected");

			if(searchOpened && selected) {
				selected.click();
			}
		});

		hotkeys('backspace', function(event, handler){
			searchInputEl.focus();
		});

		hotkeys('up,down', function(event, handler){
			let searchOpened = body.classList.contains("search-opened");
			let results = searchResultsEl.childNodes.length > 0;

			if(searchOpened && results) {
				event.preventDefault()

				searchInputEl.blur();

				menuMouse = false;

				let selected = document.querySelector(".selected");

				switch (handler.key) {
					case 'up':
						if(selected) {
							changeSelectedMenu(selected, false, false);
						} else {
							searchInputEl.focus();
						}
						break;
					case 'down':
						if(selected) {
							changeSelectedMenu(selected, false, true);
						} else {
							searchInputEl.focus();
						}
						break;
					default:
						break;
				}
			}
		});

		window.addEventListener("beforeunload", function() {
			searchInputEl.value = "";
		});
	}
}
