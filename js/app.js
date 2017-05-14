$(document).ready(function(){
    $("#chosen-remote-multiple").chosen();
    $("#chosen-remote-single").chosen();
    $(".chosen-search").find("input").attr("readonly", false);;
});

$('#chosen-remote-multiple').on('chosen:showing_dropdown', function(evt, params) {
    $(".chosen-multiple").find(".chosen-results").find(".active-result").remove();
});

$('#chosen-remote-single').on('chosen:showing_dropdown', function(evt, params) {
    $(".chosen-single").find(".chosen-results").find(".active-result").remove();
});


var remoteSearchFunctionMultiple = debounce(function() {
    var searchValue = $(".chosen-multiple").find(".chosen-search-input").val()
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
        $("#chosen-remote-multiple").append(optionsHtmlString);
        $("#chosen-remote-multiple").trigger("chosen:updated");
    });
}, 500);

var remoteSearchFunctionSingle = debounce(function() {
    var searchValue = $(".chosen-single").find(".chosen-search-input").val()
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
        $("#chosen-remote-single").append(optionsHtmlString);
        $("#chosen-remote-single").trigger("chosen:updated");
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

$(".chosen-multiple").on("keyup",".chosen-search-input", remoteSearchFunctionMultiple);
$(".chosen-single").on("keyup",".chosen-search-input", remoteSearchFunctionSingle);
