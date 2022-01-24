var options = {
    rootMargin: '0px',
    threshold: 0.2
};
var callback = function (entries, observer) {
    entries.forEach(function (entry) {
        var navItem = document.querySelector("#button-".concat(entry.target.id));
        navItem === null || navItem === void 0 ? void 0 : navItem.classList.toggle('active', entry.isIntersecting);
        entry.target.classList.toggle('active', entry.isIntersecting);
    });
};
var sectionObserver = new IntersectionObserver(callback, options);
var sections = document.querySelectorAll('section');
var headlines = document.querySelectorAll('h2');
var navigation = document.querySelector('ul');
console.log(navigation);
sections.forEach(function (section, index) {
    var _a, _b;
    var navItem = document.createElement('li');
    var button = document.createElement('button');
    button.id = "button-".concat((_a = section.attributes.getNamedItem('id')) === null || _a === void 0 ? void 0 : _a.value);
    button.innerText = headlines[index].innerText;
    button.setAttribute('onclick', "navigateTo('#".concat((_b = section.attributes.getNamedItem('id')) === null || _b === void 0 ? void 0 : _b.value, "')"));
    navItem.appendChild(button);
    navigation === null || navigation === void 0 ? void 0 : navigation.appendChild(navItem);
    sectionObserver.observe(section);
});
var navigateTo = function (path) {
    var _a;
    (_a = window.event) === null || _a === void 0 ? void 0 : _a.preventDefault();
    var element = document.querySelector(path);
    element === null || element === void 0 ? void 0 : element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};
