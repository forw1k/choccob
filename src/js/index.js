// Main js file

// ymap

ymaps.ready(init);
function init() {
    var map = new ymaps.Map('map',{
        center:[55.75, 37.60],
        zoom:14,
        controls: ['zoomControl'],
        behaviors: ['drag']
    })
    var placemark = new ymaps.Placemark([55.76033531594982,37.62405411432585], {
        hintContent: '<div class="map__hint">ул.Пушкина, дом Колотушкина.</div>',
        balloonContent: ['Квартира Петрова, спросить Вольнова'].join('')
    }, 
{
    iconLayout: 'default#image',
    iconImageHref: './assets/img/contacts/contacts-map.png',
    iconImageSize: [46, 57]

    });
    
    
    map.geoObjects.add(placemark);
}

// accordion team

let teamAccoJs = () => {

    let teamList = document.querySelector('.team__list');

    teamList.addEventListener('click', (e) => {
        
        let target = e.target;

        const item = target.closest('.team__item');
        const items = document.querySelectorAll('.team__item');

        if (target.className === 'member-name') {

            if(!item.classList.contains('active')) {

                for (let i=0; i<items.length; i++) {
                    
                    items[i].classList.remove('active');
                }

                item.classList.add('active');
            }

            else {

                item.classList.remove('active');
            }
        }
    })
};
teamAccoJs();

// review tabs

const jsTriggers = document.querySelectorAll('.js-tab-trigger'),
    jsContents = document.querySelectorAll('.js-tab-content');

jsTriggers.forEach(function(trigger) {

    trigger.addEventListener('click', function() {

        const id = this.getAttribute('data-tab'),
        content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
        activeTrigger = document.querySelector('.js-tab-trigger.active'),
        activeContent = document.querySelector('.js-tab-content.active');
        
        activeTrigger.classList.remove('active');
        trigger.classList.add('active'); 
        
        activeContent.classList.remove('active');
        content.classList.add('active');
    });
});

// navigation

const anchors = document.querySelectorAll('a[href*="#"]');
const navMobile = document.querySelector('.nav-mobile');
const hamburger = document.querySelector('.hamburger');
for (let anchor of anchors) {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        const blockId = anchor.getAttribute('href').substr(1);

        document.getElementById(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })

    anchor.onclick = function() { //закрытие модального окна при клике по ссылке

        navMobile.classList.remove('active');
        hamburger.classList.remove('active');
    }    
}

// overlay 

hamburger.addEventListener('click', function() {

    hamburger.classList.toggle('active');
    navMobile.classList.add('active');
    
    if (!hamburger.classList.contains('active')) {

        navMobile.classList.remove('active');
    }
})

//slider

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const sliderList = document.querySelector('.slider__list');
const sliderItem = document.querySelectorAll('.slider__item');

let i = 1;

next.addEventListener('click', () => {

    const itemsCount = sliderItem.length;
    
    if(i == itemsCount) {

        i = 0;
    }

    const currentItem = document.querySelector('.show');

    currentItem.classList.remove('show');

    sliderItem[i].classList.add('show');
    i++;
})

prev.addEventListener('click', () => {

    const itemsCount = sliderItem.length;
    
    if(i == itemsCount) {

        i = 0;
    }

    const currentItem = document.querySelector('.show');

    currentItem.classList.remove('show');

    sliderItem[i].classList.add('show');
    i++;
})


//menu

function accordionMenu() {
    const menuItem = document.querySelectorAll('.menu__item');
    const menuAccordion = document.querySelector('.menu__list');

    menuAccordion.addEventListener('click', (e) => {

        e.preventDefault();
        let target = e.target.parentNode;
        let content = target.nextElementSibling;
        let item = target.parentNode;

        const tarWidth = target.clientWidth;
        const windowWidth = document.documentElement.clientWidth;
        const layoutContentWidth = 520;
        const breackpointPhone = 480;
        const closeMenuWidth = tarWidth * menuItem.lenght;
        const openMenuWidth = closeMenuWidth + layoutContentWidth;

        if (e.target.classList.contains('menu__title')) {
            moveMenu();
        }

        target = e.target;
        content = target.nextElementSibling;
        item = target.parentNode;

        if (target.classList.contains('menu__item-trigger')) {

            moveMenu();
        }

        function moveMenu() {

            for (const iterator of menuItem) {
                if (iterator != item) {
                    iterator.classList.remove('menu__item--active');
                    iterator.lastElementChild.style.width = 0;
                    menuAccordion.style.transform = `translateX(0)`;
                }
            }

            if (item.classList.contains('menu__item--active')) {
                item.classList.remove('menu__item--active');
                content.style.width = 0;
            } else {
                item.classList.add('menu__item--active');
                    
                if (windowWidth > breackpointPhone && windowWidth < openMenuWidth) {
                    content.style.width = windowWidth - closeMenuWidth + 'px';
                } else if (windowWidth <= breackpointPhone) {
                    let num;
                    for (let i = 0; i < menuItem.length; i++) {
                        if (menuItem[i] === item) {
                            num = menuItem.length - (i + 1);
                        }
                        menuAccordion.style.transform = `translateX(${tarWidth * num}px)`;
                        content.style.width = windowWidth - tarWidth + 'px';
                    }
                } else {
                    content.style.width = layoutContentWidth + 'px';
                }
            }
        }
    });
}
accordionMenu();
