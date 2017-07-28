function Create2DArray(rows, cols) {
    var x = new Array(rows);
    for (var i = 0; i < rows; i++) {
        x[i] = new Array(cols);
    }
    return x;
}

var urlParams;
(window.onpopstate = function() {
    var match,
        pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();