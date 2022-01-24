const options = {
    rootMargin: '0px',
    threshold: 0.2,
}

const callback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
        let navItem = document.querySelector(`#button-${entry.target.id}`)
        navItem?.classList.toggle('active', entry.isIntersecting)
        entry.target.classList.toggle('active', entry.isIntersecting)
        
    });
}

const sectionObserver = new IntersectionObserver(callback, options)

const sections = document.querySelectorAll('section')
const headlines = document.querySelectorAll('h2')

const navigation = document.querySelector('ul')

sections.forEach((section, index) => {
    let navItem = document.createElement('li')
    let button = document.createElement('button')
    button.id = `button-${section.attributes.getNamedItem('id')?.value}`
    button.innerText = headlines[index].innerText
    button.setAttribute('onclick', `navigateTo('#${section.attributes.getNamedItem('id')?.value}')`)
    navItem.appendChild(button)
    navigation?.appendChild(navItem)
    sectionObserver.observe(section)
})

const navigateTo = (path: string) => {
    window.event?.preventDefault()
    let element = document.querySelector(path)
    element?.scrollIntoView({block: 'nearest', behavior: 'smooth'})
}

let timer:any = null
window.addEventListener('scroll', () => {
    if(timer !== null) {
        clearTimeout(timer)
        let headerEl = document.querySelector('header')
        headerEl?.classList.remove('hide-header')
        let footerEl = document.querySelector("footer");
        footerEl?.classList.remove("hide-header");
    }
    timer = setTimeout(() => {
        let headerEl = document.querySelector('header')
        headerEl?.classList.add('hide-header')
        let footerEl = document.querySelector("footer");
        footerEl?.classList.add("hide-header");
    }, 1500 )
}, false)
