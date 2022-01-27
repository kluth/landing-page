/**
 * Setting options for the IntersectionObserver
 * in an object.
 */
const options = {
    rootMargin: '0px',
    threshold: 0.2,
};
/**
 * Callback for the IntersectionObserver
 *
 * fires whenever the IntersectionState changes
 * and adds or removes the active class, to highlight
 * the current view
 * @param entries
 * @param observer
 */
const callback = (entries, observer) => {
    entries.forEach((entry) => {
        let navItem = document.querySelector(`#button-${entry.target.id}`);
        navItem?.classList.toggle('active', entry.isIntersecting);
        entry.target.classList.toggle('active', entry.isIntersecting);
    });
};
const sectionObserver = new IntersectionObserver(callback, options);
const sections = document.querySelectorAll('section');
const headlines = document.querySelectorAll('h2');
const navigation = document.querySelector('ul');
/**
 * Adding the IntersectionObserver to
 * every section element in the document
 */
sections.forEach((section, index) => {
    let navItem = document.createElement('li');
    let button = document.createElement('button');
    button.id = `button-${section.attributes.getNamedItem('id')?.value}`;
    button.innerText = headlines[index].innerText;
    button.setAttribute('onclick', `navigateTo('#${section.attributes.getNamedItem('id')?.value}')`);
    navItem.appendChild(button);
    navigation?.appendChild(navItem);
    sectionObserver.observe(section);
});
/**
 * Programmatically navigate to a
 * given anchor on the page
 *
 * @description Paths navigate to
 * @param path
 */
const navigateTo = (path) => {
    window.event?.preventDefault();
    let element = document.querySelector(path);
    element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};
/**
 * Hide the navbar and the footer
 * after 2.5s if there is no scrolling
 */
let timer = null;
window.addEventListener('scroll', () => {
    if (timer !== null) {
        clearTimeout(timer);
        let headerEl = document.querySelector('header');
        headerEl?.classList.remove('hide-header');
        let footerEl = document.querySelector("footer");
        footerEl?.classList.remove("hide-header");
    }
    timer = setTimeout(() => {
        let headerEl = document.querySelector('header');
        headerEl?.classList.add('hide-header');
        let footerEl = document.querySelector("footer");
        footerEl?.classList.add("hide-header");
    }, 2500);
}, false);
/**
 * Opens the mobile menu,
 * if burger button is clicked
 */
const burgerMenu = document.querySelector('.menu-btn');
let menuOpen = false;
burgerMenu?.addEventListener('click', () => {
    if (!menuOpen) {
        burgerMenu.classList.add('open');
        navigation?.classList.add('drawer');
    }
    else {
        burgerMenu.classList.remove('open');
        navigation?.classList.remove('drawer');
    }
    menuOpen = !menuOpen;
});
