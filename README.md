# ChosenJquery-RemoteExample

First of all, you need understand a concept: debounce. Here [you are a very helpful post](https://davidwalsh.name/javascript-debounce-function). In simple words, debounce will let you wait some milliseconds before execute some action.

Ok, now You understand about debounce.

Before to start this is the html tag for the select for a multiple select, if You need a single option select, just remove the multiple attribute. The empty option is necesary for the styles of the Chosen plugin.
```html
<select class="chosen-select form-control" id="chosen-remote" multiple>
    <option disabled></option>
</select>
```

If you need a single select, you have to do some css tricks.

The first thing you have to do is initialize the select with the chosen plugin, just like this

```javascript
$(document).ready(function(){
    $("#chosen-remote").chosen();
});
```

Then, using the debounce funtion, make another function with ajax in order to make the remote search, in my case I decide use the [github api](https://api.github.com/) for search users.

```javascript
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
```

Put attention on `var searchValue = $(".chosen-search-input").val()` because it's the input text that chosen plugin creates to search inside the select. We take the value of that input and then, we send to the url search. After that, in the done function we fill the select with the options and with an chosen plugin event, we refresh it.

Then, in order to show only the selected results each time the user makes a search, with use an chosen event for clean the results that were not selectd. This, in case you need a multiple select.

```javascript
$('#chosen-remote').on('chosen:showing_dropdown', function(evt, params) {
    $(".chosen-results").find(".active-result").remove();
});
```

And finally we add the listener on the input text:
```javascript
$("body").on("keyup",".chosen-search-input", remoteSearchFunction);
```

[You can see how it works here](https://lvcios.github.io/ChosenJquery-RemoteExample/), in this example I have two selects, one single and one multiple. Check the app.js code to watch how they works.
