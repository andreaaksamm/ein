$(document).ready(function() {
	pre();
	post();
	sticky();
	progress();
	images();
});

function post() {
	$("table").wrap("<div class='responsive-table'></div>");
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
