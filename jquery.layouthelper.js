var layoutHelper = function () {
	layoutHelper.url = "/helper.txt";
	layoutHelper.menu = {};

	layoutHelper.box = "<div class='html-layouts-box'></div>";
	layoutHelper.boxCss = {
		position			: "fixed",
		top					: "50px",
		left				: "-300px",
		width				: "300px",
		"background-color"	: "#FFF",
		"z-index"			: 9999999,
		"box-sizing"		: "border-box",
		"padding"			: "16px",
		"font-size"			: "12px"
	};
	layoutHelper.icn = "<div class='html-layouts-icn'></div>";
	layoutHelper.icnCss = {
		position			: "absolute",
		top					: "3px",
		left				: "305px",
		width				: "16px",
		height				: "16px",
		cursor				: "pointer",
		background			: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVR4AbXTwU3AIBTG8cICHpyAA5NwYgsSpmhijAsQBnAFZ1Jr7RJqiv+Dhy8EE2pik9/hEfhS4LH827c+Pnk0nHBYRvqBhACDivajwCIi/xaQZcGOL6k/8C51GgVEtElhFGBxyKQX3OEerzK+wfQBDkV++xk3En6LTbZT4TXgRBMrls4DmtKA9oeAUwM86oUtFLj+EA32iUPcYUe3ENAmxVFAkgkHPrtGepM6a4DKiLAosqDCICANWnnIyfX62cd02TcVzQI+dZzoygAAAABJRU5ErkJggg==) center no-repeat"
	};
	layoutHelper.item = "<a class='html-layouts-item'></a>";
	layoutHelper.itemCss = {
		position			: "relative",
		display				: "block",
		"text-transform"	: "uppercase",
		"font-size"			: "10px",
		"text-decoration"	: "none",
		"color"				: "#799bac",
		"margin-bottom"		: "7px",
		"border"			: "none"
	};
	layoutHelper.itemCssLast = {
		"margin-bottom"		: "0px"
	};
	layoutHelper.itemSpan = "<span></span>";
	layoutHelper.itemSpanCss = {
		display				: "block",
		"text-transform"	: "uppercase",
		"font-size"			: "8px",
		"text-decoration"	: "none",
		"color"				: "#cccccc"
	};

	layoutHelper.load();
};

layoutHelper.buildBox = function () {
	layoutHelper.$box = $(layoutHelper.box);
	layoutHelper.$box.css(layoutHelper.boxCss);

	layoutHelper.$icn = $(layoutHelper.icn);
	layoutHelper.$icn.css(layoutHelper.icnCss);

	layoutHelper.$box.prepend(layoutHelper.$icn);
	$("body").prepend(layoutHelper.$box);
};

layoutHelper.buildMenu = function () {
	var $menu, $item, $span, item;
	var items = layoutHelper.message.split("\n");
	
	for (var key in items) {
		layoutHelper.menu[key] = items[key].split(":");
		$span = $(layoutHelper.itemSpan).css(layoutHelper.itemSpanCss).text(layoutHelper.menu[key][0]);
		$item = $(layoutHelper.item).css(layoutHelper.itemCss).text(layoutHelper.menu[key][2]).attr("href", layoutHelper.menu[key][0]).append($span);
		if ((items.length-1) == key) $item.css(layoutHelper.itemCssLast);
		layoutHelper.$box.append($item);
	}
};

layoutHelper.setEvents = function () {
	layoutHelper.$icn.on("click", function () {
		if (layoutHelper.$box.css("left") === "0px") {
			layoutHelper.$box.css({left : "-300px"});
		} else {
			layoutHelper.$box.css({left : 0});
		}
	});
	
	$("a[href ^= '#']").on("click", layoutHelper.setLocation);
};

layoutHelper.setLocation = function () {
	var href = $(this).attr("href");
	for (var key in layoutHelper.menu) {
		if (layoutHelper.menu[key][0] == href) {
			window.location = layoutHelper.menu[key][1];
			return false;
		}
	}
};

layoutHelper.load = function () {
	$.ajax({
		url : layoutHelper.url,
		dataType : "html",
		success : function (data) {
			layoutHelper.message = data;
			layoutHelper.buildBox();
			layoutHelper.buildMenu();
			layoutHelper.setEvents();
		},
		error : function (error) {
			/** Обработка ошибок. */
			if (error.status == 404) 
				layoutHelper.message = "File " + layoutHelper.url + " not exist.";
			else
				layoutHelper.message = "Error.";
			console.info(layoutHelper.message);
		}
	});
};

$(document).ready(function() {
	setTimeout(layoutHelper, 500);
});