function toggle(name) {
	let state = body.classList.contains(name);

	if(!state) {
		body.classList.add(name);
	} else {
		body.classList.remove(name);
	}
}

function toggleSearch() {
	let searchOpened = body.classList.contains("search-opened");

	toggle("search-opened");

	if(searchOpened) {
		searchInputEl.blur();
	} else {
		setTimeout(function() {
			searchInputEl.focus();
		}, 250);
	}

}

function changeSelectedMenu(el, simple, down) {
	let first = searchResultsEl.firstElementChild;
	let last = searchResultsEl.lastElementChild;
	let next = el.nextElementSibling;
	let prev = el.previousElementSibling;

	el.classList.remove("selected");

	var elScroller = zenscroll.createScroller(searchResultsEl);

	if(simple) {
		el.classList.add("selected");
		elScroller.center(el)
		return;
	}

	if (down) {
		if (next) {
			next.classList.add("selected");
			elScroller.center(next)
		} else {
			first.classList.add("selected");
			elScroller.center(first)
		}
	} else {
		if (prev) {
			prev.classList.add("selected");
			elScroller.center(prev)
		} else {
			last.classList.add("selected");
			elScroller.center(last)
		}
	}
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function readingProgress(contentArea, progressBar) {
	const content = document.querySelector(contentArea);
	const progress = document.querySelector(progressBar);

	const frameListening = () => {
		const contentBox = content.getBoundingClientRect();
		const midPoint = 0;
		const minsRemaining = Math.round(progress.max - progress.value);

		if (contentBox.top > midPoint) {
			progress.style.width = "0%";
		}

		if (contentBox.top < midPoint) {
			progress.style.width = "100%";
		}

		if (contentBox.top <= midPoint && contentBox.bottom >= midPoint) {
			progress.style.width =
				((100 * Math.abs(contentBox.top - midPoint)) /
				contentBox.height) + "%";
		}

		window.requestAnimationFrame(frameListening);
	};

	window.requestAnimationFrame(frameListening);
};
