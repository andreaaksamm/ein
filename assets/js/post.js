var stickyTitle;

$(document).ready(function() {
	pre();

	stickyTitle = document.querySelector(".sticky-title");

	conf();

	post();
	sticky();
	progress();
	images();
	disqus();
	readmore();
});

function conf() {
	toastr.options.timeOut = 1500;
	toastr.options.extendedTimeOut = 60;
	toastr.options.positionClass = "toast-top-full-width";

	toastr.options.showMethod = 'slideDown';
	toastr.options.hideMethod = 'slideUp';
	toastr.options.closeMethod = 'slideUp';

	toastr.options.showDuration = "100";
	toastr.options.hideDuration = "100";
}

function post() {
	let linkAuthors = document.querySelector(".link-authors");
	let authors = document.querySelector("#authors");

	if(linkAuthors) {
		linkAuthors.addEventListener("click", function() {
			zenscroll.to(authors);
		});
	}

	let clipboard = new ClipboardJS('.post-share-content.clipboard');

	$("table").wrap("<div class='responsive-table'></div>");

	clipboard.on('success', function(e) {
		toastr.success('Copied!');
	});
}

function disqus() {
	let commentsButtonEl = document.querySelector(".post-comments-link");

	if(commentsButtonEl && typeof disqus_shortname !== 'undefined') {
		let commentsSection = document.querySelector(".post-section-wrapper.comments");

		if(commentsSection) {
			commentsSection.style.display = "block";
		}

		commentsButtonEl.addEventListener("click", function(e) {
			e.currentTarget.classList.add("loading");

			(function() { // DON'T EDIT BELOW THIS LINE
				var d = document, s = d.createElement('script');
				s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
				s.setAttribute('data-timestamp', +new Date());
				(d.head || d.body).appendChild(s);
			})();

		});
	}
}

function images() {
	var images = document.querySelectorAll('.kg-gallery-image img');
	images.forEach(function (image) {
		var container = image.closest('.kg-gallery-image');
		var width = image.attributes.width.value;
		var height = image.attributes.height.value;
		var ratio = width / height;
		container.style.flex = ratio + ' 1 0%';
	});

	$(document).ready(function () {
		var $postContent = $(".post-content");
		$postContent.fitVids();
	});

	mediumZoom(document.querySelectorAll('.kg-image'));
	mediumZoom(document.querySelectorAll('.kg-gallery-image img'));
}

function readmore() {
	let readmore = document.querySelector(".readmore");
	if(readmore) {
		let rand = Math.ceil(Math.random() * numberOfPatterns);
		readmore.style.backgroundImage = "url(/assets/images/patterns/" + rand + ext;
	}
}
