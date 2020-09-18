window.addEventListener('load',function(){

    // Hero typed
    if (document.querySelector('.typed') != null) {
        document.querySelectorAll('.typed').forEach(typed => {
            let typed_strings = typed.getAttribute("data-typed-items");
            typed_strings = typed_strings.split(',')
            new Typed(typed, {
                strings: typed_strings,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });
        });
    }

    // Aos
    function aosInit() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out-back"
        });
    }
    aosInit();

    // Skills
    if (document.querySelector('[aria-valuenow]') != null) {
        document.querySelectorAll('[aria-valuenow]').forEach(bar => {
            let width = (bar.getAttribute('aria-valuenow') * 100) / bar.getAttribute('aria-valuemax');
            bar.style.width = `${width}%`;
        });
    }

    // Github Calendar
    if (document.querySelector('.gitcalendar') != null) {
        GitHubCalendar(".gitcalendar", "hnrazevedo", { responsive: true });
    }
    
    // Scroll links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            /* Close menu before click link */
            document.querySelector('#main-menu').checked = false;

            if(document.querySelector(this.getAttribute('href')) != null){
                document.querySelector(`section.${this.parentNode.getAttribute('id')}`).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filter
    if (document.querySelector('[data-filter]') != null) {
        document.querySelectorAll('[data-filter]').forEach(aFilter => {
            aFilter.addEventListener('click',function(){
                let container = document.querySelector(aFilter.getAttribute('data-filter-container'));
                let filter = aFilter.getAttribute('data-filter');
                if(container != null){
                    if(container.querySelector(`:scope > ${filter}`) != null){
                        container.querySelectorAll(`:scope > *`).forEach(all => {
                            all.classList.remove('hidden');
                        });
                        container.querySelectorAll(`:scope > :not(${filter})`).forEach(hidden => {
                            hidden.classList.add('hidden');
                        });
                    }
                }
            });
        });
    }


});


/* Active class to Nav-menu li visible */
window.addEventListener('scroll', function(e) {
    if(document.querySelector('header .nav-menu') != null){
        document.querySelectorAll('.nav-menu ul li').forEach(li => {
            li.classList.remove('active');
            if(document.querySelector(`section.${li.getAttribute('id')}`) != null){
                if(isScrolledIntoView(document.querySelector(`section.${li.getAttribute('id')}`))){
                    li.classList.add('active');
                }
            }
        });
    }
});

function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}