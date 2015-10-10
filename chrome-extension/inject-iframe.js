var jsonSource = 'https://api.nextgen.guardianapps.co.uk/uk/lite.json';

function removeEls(selector) {
    [].slice.call(document.querySelectorAll(selector)).forEach(function(el) {el.parentNode.removeChild(el);});
}

function loadItems() {
    var xhr = new XMLHttpRequest();

    document.body.insertAdjacentHTML('afterBegin',
        '<div class="oj-nav">' +
            'discover : find : join' +
        '</div>'
    );

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.responseText) {
            }
        }
    }
    xhr.open('GET', jsonSource, true);
    xhr.send();
}

removeEls('header, .top-banner-ad-container');
loadItems();

