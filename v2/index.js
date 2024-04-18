/**
 *
 * @param {HTMLElement} element
 * @return {number}
 */
function offsetTop(element, acc =0) {
    if (element.offsetParent){
        return offsetTop(element.offsetParent, acc + element.offsetTop);
    }
    return acc+element.offsetTop;
}


class Parallax {
    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this);
        document.addEventListener('scroll', this.onScroll);
    }
    onScroll(){
        const screenY = window.scrollY+ window.innerHeight/2
        const elementY = offsetTop(this.element)+ this.element.offsetHeight/2;
        const diffY = elementY - screenY;
        this.element.style.setProperty('transform', `translateY(${diffY *-1 *this.ratio}px)`)
        console.log(elementY - screenY);
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