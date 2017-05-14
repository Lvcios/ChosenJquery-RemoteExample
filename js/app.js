$(document).ready(function(){
    $("#chosen-remote").chosen();
});

$('#chosen-remote').on('chosen:showing_dropdown', function(evt, params) {
    $(".chosen-results").find(".active-result").remove();
});


var remoteSearchFunction = debounce(function() {
    var searchValue = $(".chosen-search-input").val()
    $.ajax({
        url: "https://api.github.com/search/users",
        method:"get",
        data:{
            q : searchValue
        }
    }).done(function(response) {
        var optionsHtmlString = "";
        response.items.forEach(function(item, index){
            optionsHtmlString += "<option value=" + item.login + ">" + item.login + "</option>"
        });
        $("#chosen-remote").append(optionsHtmlString);
        $("#chosen-remote").trigger("chosen:updated");
    });
}, 500);



function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

$("body").on("keyup",".chosen-search-input", remoteSearchFunction);