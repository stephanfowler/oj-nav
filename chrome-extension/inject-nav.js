var jsonSource = 'https://api.nextgen.guardianapps.co.uk/uk/lite.json';

function removeEls(selector) {
    [].slice.call(document.querySelectorAll(selector)).forEach(function(el) {el.parentNode.removeChild(el);});
}

function loadItems() {
    var xhr = new XMLHttpRequest(),
        collections;

    document.body.insertAdjacentHTML('afterBegin',
        '<style>' +
            '.ojnav {' + 
                'position: relative;' +
            '}' + 

            '.ojnav__header {' + 
                'padding: 0 10px;' +
            '}' + 

            '.ojnav input[type=checkbox] {' + 
                'position: absolute;' + 
                'opacity: 0;' + 
            '}' + 

            '.ojnav__reveal {' + 
                'height: 0px;' +
                'overflow: hidden;' +
                'transition: height 0.3s;' +
                'position: absolute;' +
                'z-index: 10;' +
                'background-color: #fff;' +
                'width: 100%;' +
                'padding: 0 10px;' +
            '}' + 

            '.ojnav input[type=checkbox]:checked ~ .ojnav__reveal {' + 
                'height: 440px;' +
            '}' +

            '.ojnav__coll__title {' +
                'font-weight: bold;' +
                'color: #999;' +
            '}' +

            '.ojnav__coll__thumb {' +
                'width: 90px;' +
                'float: left;' +
            '}' +

            '.ojnav__coll__items {' +
                'padding-left: 95px;' +
                'padding-right: 15px;' +
                'margin-top: -4px;' +
                'padding-bottom: 5px;' +
            '}' +

            '.ojnav__coll__items__item {' +
                'display: block;' +
                'white-space: nowrap;' +
                'overflow: hidden;' +
                'text-overflow: ellipsis;' +
                'font-size: 15px;' +
                'line-height: 21px; ' + 
                'color: #333;' +          
            '}' +

        '</style>' +
        '<div class="ojnav">' +
            '<label class="ojnav__header" for="toggle-1">discover...</label>' + 
            '<input type="checkbox" id="toggle-1">' +
            '<div class="ojnav__reveal" id="ojnav__reveal"></div>' +
        '</div>'
    );

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.responseText) {
                collections = JSON.parse(xhr.responseText).collections;
                document.getElementById('ojnav__reveal').innerHTML = collections
                    .filter(function(c) {
                        return c.content.length;
                    })
                    .slice(0,5)
                    .map(function(c) {
                        return '<div>' + 
                            '<div class="ojnav__coll__title">' + c.displayName + '</div>' +
                            '<img class="ojnav__coll__thumb" src="' + c.content[0].thumbnail + '"/>' +
                            '<div class="ojnav__coll__items">' +
                                c.content.slice(0,3).map(function(i) { 
                                    return '<a class="ojnav__coll__items__item" href="/' + i.id + '">' + i.headline + '</a>';
                                }).join('') +
                            '</div>' +
                        '</div>';
                    })
                    .join('');
            }
        }
    }
    xhr.open('GET', jsonSource, true);
    xhr.send();
}

removeEls('.js-navigation-header');
loadItems();

