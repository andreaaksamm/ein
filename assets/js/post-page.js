var up;
var toc;
var $postHeader;

function pre() {
	up = document.querySelector(".sticky-header-up");
	toc = document.querySelector(".toc");

	$postHeader = $(".post-header");
}

function progress() {
	readingProgress(".post-content", ".post-progress-bar");
}

function sticky() {
	tocbot.init({
		tocSelector: '.toc',
		contentSelector: '.post-content',
		hasInnerContainers: true
	});

	up.addEventListener("click", function() {
		zenscroll.toY(0, 300);
	});

	if(!toc.childElementCount) {
		stickyTitle.style.display = "block";
	}

	checkTop();

	window.addEventListener("scroll", function() {
		checkTop();
	});
}

function checkTop() {
	let scroll = $(window).scrollTop();

	let bottomHeader = ($postHeader.height() + $postHeader.offset().top);
	let belowHeader = scroll > bottomHeader;

	let bottomPost = $(".post-content").height() + bottomHeader;
	let belowPost = scroll > bottomPost;

	if(belowHeader) {
		if(!belowPost) {
			body.classList.add("sticky-opened");
		} else {
			body.classList.remove("sticky-opened");
		}
	} else {
		body.classList.remove("sticky-opened");
	}
}
