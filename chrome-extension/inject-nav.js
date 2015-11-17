
function getRecents() {
    return (sessionStorage.getItem('aaa-navhack') || '');
}

function updateRecents(withUrl) {
    var oldRecentsArr = getRecents().split(',').filter(function(s) {return s;}).slice(0,5),
        recents = [withUrl].concat(oldRecentsArr).join(',');

    sessionStorage.setItem('aaa-navhack', recents);
    return recents;
}

function getJsonSource() {
    var urlPre = 'https://api.nextgen.guardianapps.co.uk/',
        urlSuf = '/lite.json',
        section = 'uk',
        url = urlPre + section + urlSuf;

    return url;
}

function removeEls(selector) {
    [].slice.call(document.querySelectorAll(selector)).forEach(function(el) {el.parentNode.removeChild(el);});
}

function getSection(id) {
    return (id + '').split('/')[0];
}

function getClass(id) {
    var kicks = (id + '').split('/');

    kick = kicks[1] && !(kicks[1]).match(/^(\d+|ng-interactive|blog)$/) ? kicks[1] : kicks[0];
    kick = kick.replace('commentisfree', 'comment').replace('-news', '');
    return kick;
}

function getKicker(id) {
    return capitalize(getClass(id).replace(/\-+/, ' '));
}

function capitalize(id) {
    id = id.replace(/^uk/, 'UK').replace(/^us/, 'US').replace(/^au/, 'AU');
    return id.charAt(0).toUpperCase() + id.slice(1);
}

function loadItems() {
    var xhr = new XMLHttpRequest(),
        recents,
        collections,
        shown = true;

    document.querySelector('#header').insertAdjacentHTML('afterBegin',
        '<style>' +

            '.navigation-toggle {' +
                'z-index: 99999;' +
                'border: 0;' +
            '}' +

            '.ojnav {' + 
                'position: absolute;' +
                'z-index: 99999;' +
                'background: #005689;' +
                'height: 88px;' +
                'width: 100%;' +
                'overflow: hidden;' +
            '}' + 

            '.ojnav-logo {' +
                'float: right;' +
                'margin: 3px 12px 0 0;' +
            '}' +

            '.ojnav__front {' +
                'padding: 0 5px 0 0;' +
                'margin: 3px 60px 0 5px;' +
            '}' +

            '.ojnav__coll__title {' +
                'font-weight: bold;' +
                'color: #005689;' +
            '}' +

            '.ojnav__coll__thumb {' +
                'width: 90px;' +
                'float: left;' +
            '}' +

            '.ojnav__coll__item {' +
                'white-space: nowrap;' +
                'overflow: hidden;' +
                'text-overflow: ellipsis;' +
                'color: #fff;;' +
                'font-size: 14px;' +
                'line-height: 18px;' +
                "font-family: 'Guardian Egyptian Web', 'Guardian Text Egyptian Web', Georgia, serif;" +
                'padding: 1px 0px 1px 5px;' +
                'opacity: 1;' +
                'transform: rotateX(0deg);' +
                'transition: all .3s ease-out;' +
                'transition-delay: 1s;' +
            '}' +

            '.ojnav__front--initial .ojnav__coll__item {' +
                'transform: rotateX(90deg);' +
                'opacity: 0.5;' +
            '}' +

            '.ojnav__coll__item--0 {' +
                'transition-delay: 0s;' +
            '}' +

            '.ojnav__coll__item--1 {' +
                'transition-delay: 0.1s;' +
            '}' +

            '.ojnav__coll__item--2 {' +
                'transition-delay: 0.2s;' +
            '}' +

            '.ojnav__coll__item--3 {' +
                'transition-delay: 0.4s;' +
            '}' +

            '.ojnav__coll__item:nth-child(-n+3) {' +
                'border-bottom: 1px solid #00456e;' +
            '}' +

            '.ojnav__coll__item__kicker {' +
                'font-weight: bold;' + 
                'color: #fff;' + 
                'margin-right: 5px;' +
            '}' +

            '.ojnav__coll__item__kicker--live {' +
                'color: #ff5b3a;' + 
            '}' +

            '.ojnav__coll__item__headline {' +
                'color: #eee;' + 
            '}' +

        '</style>' +
        '<div class="ojnav">' +
            '<span class="inline-icon">' + 
            '<a href="/" style="color: #fff;">' +
                '<svg style="fill: currentColor;" class="ojnav-logo" width="36" height="36" viewBox="0 0 36 36"><path d="M21.3 8.8c0-4.9-1.5-5.7-3.3-5.7-1.8 0-3.2.7-3.2 5.7s1.5 5.5 3.2 5.5c1.8-.1 3.3-.6 3.3-5.5m-6.5 18.8c-2.3 0-2.9 1.7-2.9 2.9 0 1.8 1.6 3.4 6.3 3.4 5.3 0 6.8-1.5 6.8-3.4 0-1.7-1.3-2.9-3.4-2.9h-6.8zM10.5 2.4C4.3 5.2 0 11.4 0 18.7c0 4.9 2 9.4 5.2 12.6V31c0-3.2 3.1-4.4 5.9-5-2.6-.6-3.9-2.5-3.9-4.4 0-2.6 2.9-4.8 4.3-5.8l-.2-.1c-2.5-1.4-4.1-3.8-4.1-7 0-2.7 1.2-4.9 3.3-6.3M36 18.8C36 11.4 31.5 5 25.1 2.3c2.1 1.4 3.4 3.5 3.5 6.3l.1.6c0 5.4-4.4 8.2-10.7 8.2-1.6 0-2.7-.1-4.1-.5-.6.4-1.1 1.1-1.1 1.8 0 .9.8 1.6 1.8 1.6h8.8c5.5 0 8.2 2.2 8.2 7.1 0 1.6-.3 3.1-1 4.3 3.3-3.4 5.4-7.9 5.4-12.9"></path></svg>' +
                '</span>' +
            '</a>' +
            '<div class="ojnav__front ojnav__front--initial" id="ojnav__front">' +
            '</div>' +
        '</div>'
    );

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.responseText) {
                collections = JSON.parse(xhr.responseText).collections;
                recents = updateRecents(window.location.pathname.slice(1));

                document.getElementById('ojnav__front').innerHTML = collections
                    .filter(function(c) {
                        return c.content.length;
                    })
                    .slice(0,5)
                    .map(function(c, index) {
                        return '<div class="ojnav__coll__item ojnav__coll__item--' + index + '">' +
                            c.content
                            .filter(function(i) { return recents.indexOf(i.id) === -1 })
                            .slice(0,1)
                            .map(function(i) { 
                                return '<a class="ojnav__coll__item__kicker ojnav__coll__item__kicker--' + getClass(i.id) + '" href="/' + getSection(i.id) + '">' + getKicker(i.id) + '</a>' + 
                                       '<a class="ojnav__coll__item__headline" href="/' + i.id + '">' + i.headline + '</a>';
                            }).join('') +
                        '</div>';
                    })
                    .join('');
            }

            setTimeout(function() {
                document.getElementById('ojnav__front').className = 'ojnav__front';
            }, 1);

            document.querySelector(".js-navigation-toggle").addEventListener("click", function() {
                document.querySelector('.ojnav').style.display = shown ? 'none' : 'block';
                shown = !shown;
            });
        }
    }
    xhr.open('GET', getJsonSource(), true);
    xhr.send();
}

(function() {
    loadItems();
})();
