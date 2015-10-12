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
                'background: #005689;' +
                'height: 45px;' +
            '}' + 

            '.ojnav-logo {' +
                'float: right;' +
                'margin: 3px 10px 0 0;' +
            '}' +

            '.ojnav__cta {' + 
                'padding: 0 10px;' +
                'color: #fff;' +
                'font-weight: bold;' +
                'padding: 9px 10px 0;' +
                'display: block;' +
            '}' + 

            '.ojnav input[type=checkbox] {' + 
                'position: absolute;' + 
                'opacity: 0;' + 
            '}' + 

            '.ojnav__reveal {' +
                'position: absolute;' +
                'top: 45px;' + 
                'height: 0px;' +
                'overflow: hidden;' +
                'transition: height 0.3s;' +
                'z-index: 10;' +
                'background-color: #fff;' +
                'width: 100%;' +
                'padding: 0 10px;' +
                'border-bottom: 1px solid #005689;' +
            '}' + 

            '.ojnav__reveal__front {' +
                'margin: 5px 0;' +
            '}' +

            '.ojnav input[type=checkbox]:checked ~ .ojnav__reveal {' + 
                'height: 460px;' +
            '}' +

            '.ojnav__coll__title {' +
                'font-weight: bold;' +
                'color: #005689;' +
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
            '<svg class="ojnav-logo" width="160" height="30" viewBox="0 0 320 60"><path fill="#fff" d="M284 45h16v-3l-3-1.5v-20c1.2-.9 2.8-1.1 4.3-1.1 2.8 0 3.8.9 3.8 4.1v17l-3 1.5v3h16v-3l-3-1.5v-19c0-5.7-2.2-8.3-7.2-8.3-4.1 0-8.1 1.5-10.8 4V13h-1l-12.4 2.2v2.7l3.4 1.6v21l-3 1.5-.1 3zM245.3.4c-3 0-5.4 2.4-5.4 5.5 0 3 2.4 5.4 5.4 5.4 2.9 0 5.4-2.4 5.4-5.4-.1-3.1-2.5-5.5-5.4-5.5zM237 15.1v2.8l3 1.6v20.9l-3 1.5v3h16v-3l-3-1.5V13.1h-1l-12 2zM222.9 39c-.7.6-1.6 1.1-3.1 1.1-4 0-5.9-3.3-5.9-10.9 0-8.7 2.4-11.7 5.6-11.7 1.8 0 2.7.6 3.4 1.4V39zm0-24.5c-1.2-.9-3.2-1.4-4.9-1.4-7.4 0-14.5 4.3-14.5 16.8 0 11.9 7.1 15.7 11.8 15.7 3.8 0 6.4-1.7 7.6-3.4h.3v3.3h.9l11.9-1.4v-2.3l-3.2-1.8V.6h-.8l-12.6 2v2.8l3.4 1.6v7.5h.1zM181 18l3 1.5v20.9l-3 1.5v3h17v-3l-3.9-1.5V24.1c1.8-1.4 4-1.9 6.7-1.9.9 0 1.6.2 2.2.3v-9c-.3-.1-.7-.2-1.2-.2-3.3 0-5.9 2.1-7.7 6.2V13H193l-12 2v3zm-19.3-.8c3.9 0 5 2 5 5.9v3.5l-5.8 1.1c-5.9 1.1-10.4 3-10.4 9.3 0 5.1 3.5 8.7 8.3 8.7 3.8 0 7.4-1.7 8.7-4.4h.3c.5 3.3 3.3 4.4 6.4 4.4 2.4 0 4.8-.6 5.7-1.6v-2l-3-1.5v-18c0-6.9-5-9.4-13.1-9.4-5.3 0-8.8 1.4-11.6 2.7v7.8h4.7l2-6c.9-.5 2.4-.5 2.8-.5zm2.3 22.9c-1.9 0-4-1.1-4-4.6 0-2.4 2.4-4.6 4.8-5l2.2-.5v8.5s-1.9 1.6-3 1.6zm100.8-22.9c3.9 0 5 2 5 5.9v3.5l-5.8 1.1c-5.9 1.1-10.4 3-10.4 9.3 0 5.1 3.5 8.7 8.3 8.7 3.8 0 7.4-1.7 8.7-4.4h.3c.5 3.3 3.3 4.4 6.4 4.4 2.4 0 4.8-.6 5.7-1.6v-2l-3-1.5v-18c0-6.9-5-9.4-13.1-9.4-5.3 0-8.8 1.4-11.6 2.7v7.8h4.7l2-6c.8-.5 2.3-.5 2.8-.5zm2.2 22.9c-1.9 0-4-1.1-4-4.6 0-2.4 2.4-4.6 4.8-5l2.2-.5v8.5s-1.9 1.6-3 1.6zm-138.7 5.6c.4 0 .9 0 1.3-.1 3.5-.3 6.7-2 8.4-4.2v4.1l12-1.5v-2l-3-2V13h-1l-11.9 2.3v2.8l3.9 1.6V38c-1.1.8-2.4 1.3-4.2 1.3-2.5 0-4.8-.8-4.8-4.3V13h-1l-12 2.5v2.6l4 1.6V36c0 5.4 2.2 9.7 8.3 9.7zM96 38c-1.2 0-2.5-.8-2.5-1.9 0-.8.6-1.7 1.3-2.3 1.6.5 3 .6 5 .6 7.8 0 13.2-3.7 13.2-10.4 0-3-1.3-4.6-3.2-6.4L115 19v-6l-8.2 1.6c-1.9-.7-4.5-1.6-7-1.6-7.8 0-13.2 4.1-13.2 10.8 0 4.1 2 7.1 5 8.8l.3.2c-1.7 1.2-5.3 4-5.3 7.2 0 2.4 1.5 4.8 4.8 5.5C88 46.3 84 48 84 52c0 4.1 5.9 8 15.5 8 11.8 0 16.5-5.7 16.5-13 0-6.1-2.8-9-9.5-9H96zm7.5-14c0 5.7-1.3 6.5-3.5 6.5s-4-.8-4-6.5c0-5.8 1.8-7.5 4-7.5s3.5 2 3.5 7.5zM92 50.9c.1-1.5 1.1-3.4 3.7-3.6h8.6c2.5 0 3.7 2 3.7 3.6 0 3.2-2 4.4-8.3 4.4-5.5 0-7.8-2.2-7.7-4.4z"/><path fill="#AADCE6" d="M83 30c0-13-5.1-16.9-13-16.9-9 0-15 6.2-15 16.4 0 10.5 5.5 16.2 15.8 16.2 5.6 0 9.8-2.7 11.2-4.7v-3c-2.1.7-3.9 1.2-7.8 1.2-5.4 0-9.2-3.2-9.2-9.2h18zM69.9 16.6c2.5 0 3.8 1.9 3.8 9.6l-8.4.5c.2-7.9 1.8-10.1 4.6-10.1zM37 45v-3l-3-1.5V21c1.2-.9 3.3-1.7 4.8-1.7 2.8 0 4.3 1.5 4.2 4.2v17L40 42v3h16v-3l-3-1.5v-19c0-5.7-3.3-8.3-7.7-8.3-4.1 0-8.6 1.3-11.3 3.8V0h-1L21 2v3l4 1.5v34L22 42v3h15zM4 36.4c0 5.7 2.8 9.3 8.9 9.3 3.1 0 6.5-.8 8.4-2.3v-3.8c-.8.3-2.2.5-3.3.5-2.9 0-4-1.6-4-4.6V19h7v-5h-7V6.5L4 8v6l-4 1v4h4v17.4z"/></svg>' +
            '<label class="ojnav__cta" for="toggle-1">discover...</label>' + 
            '<input type="checkbox" id="toggle-1">' +
            '<div class="ojnav__reveal">' +
                '<div class="ojnav__reveal__front" id="ojnav__reveal__front">' +
                '</div>' +
            '</div>' +
        '</div>'
    );

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.responseText) {
                collections = JSON.parse(xhr.responseText).collections;
                document.getElementById('ojnav__reveal__front').innerHTML = collections
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

