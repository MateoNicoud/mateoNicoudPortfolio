/**
 *
 * @param {HTMLElement} element
 * @param acc
 * @return {number}
 */
function offsetTop(element, acc = 0) {
    if (element.offsetParent) {
        return offsetTop(element.offsetParent, acc + element.offsetTop);
    }
    return acc + element.offsetTop;
}


class Parallax {
    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this);
        this.onIntersection = this.onIntersection.bind(this);
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
        const observer = new IntersectionObserver(this.onIntersection)
        observer.observe(element);
        this.onScroll();
    }

    /**
     * @param {IntersectionObserverEntry[]} entries
     */

    onIntersection(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                document.addEventListener('scroll', this.onScroll);
                this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
            } else {
                document.removeEventListener('scroll', this.onScroll);
            }
        }
    }

    onScroll() {
        window.requestAnimationFrame(() => {
            // console.log(this.element.getAttribute("class"));
            const screenY = window.scrollY + window.innerHeight / 2
            const diffY = this.elementY - screenY;
            this.element.style.setProperty(
                'transform',
                `translateY(${diffY * -1 * this.ratio}px)`
            );
            // console.log(elementY - screenY);
        });
    }

    /**
     * @returns {Parallax[]}
     */
    static bind() {
        return Array.from(document.querySelectorAll('[data-parallax]')).map((element) => {
            return new Parallax(element);
        });
    }
}

Parallax.bind();


window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var image = document.getElementById('scrollDown');

    image.style.opacity = 1 - scrollPosition / 600;
});
//--------------------------------------------------------------------------------------------------------------------------


const pElements = document.querySelectorAll('.aboutMe p, #me p');
const h3Elements = document.querySelectorAll('.aboutMe h3, #me h3');

pElements.forEach((element) => {
    element.classList.add('hidden', 'delayed');
});

h3Elements.forEach((element) => {
    element.classList.add('hidden');
});

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-up');
            entry.target.classList.remove('hidden');
        }
    });
}

const pObserver = new IntersectionObserver(handleIntersection);
const h3Observer = new IntersectionObserver(handleIntersection);

pElements.forEach((element) => {
    pObserver.observe(element);
});

h3Elements.forEach((element) => {
    h3Observer.observe(element);
});



//--------------------------------------------------------------------------------------------------------------------------


const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
    card.addEventListener('click', function() {
        card.classList.toggle('flipped');
    });

    const linksInCard = card.querySelectorAll('a');
    linksInCard.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});

//--------------------------------------------------------------------------------------------------------------------------
