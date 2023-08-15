class Slider {
    constructor(query, opts) {
        this.slider = document.querySelector(query); 
        this.slides = [...this.slider.querySelectorAll(".slider-slide")];
        this.currentSlide = this.slides.findIndex(el => el.classList.contains("active"));
        this.time = null;

        const defaultOpts = {
            autoplay: 0,
            pagination: false
        };

        this.options = {...defaultOpts, ...opts};
        this.autoChangeSlides = typeof this.options.autoplay === "number" && this.options.autoplay > 0;
        this.createPrevNext();
        if(this.options.pagination === true) this.createPagination();
        this.setSlide(this.currentSlide);
    }

    createPrevNext() {
        this.btnPrev = document.createElement("button");
        this.btnPrev.type = "button";
        this.btnPrev.innerText = "Prev slide";
        this.btnPrev.classList.add("slider-button", "slider-button-prev");
        this.btnPrev.addEventListener("click", () => this.slidePrev());

        this.btnNext = document.createElement("button");
        this.btnNext.type = "button";
        this.btnNext.innerText = "Next slide"
        this.btnNext.classList.add("slider-button", "slider-button-next");
        this.btnNext.addEventListener("click", () => this.slideNext());

        const nav = document.createElement("div");
        nav.classList.add("slider-nav");
        this.slider.append(this.btnPrev);
        this.slider.append(this.btnNext);
        this.slider.append(nav);
    }

    slidePrev() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.setSlide(this.currentSlide);
    }

    slideNext() {
        this.currentSlide++;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }
        this.setSlide(this.currentSlide);
    }

    setSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove("active");
        });

        this.slides[index].classList.add("active");
        const dots = [...this.dots.children];
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        this.currentSlide = index;
        if (this.autoChangeSlides) {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.slideNext(), this.options.autoplay)
        }
    }

    createPagination() {
        this.dots = document.createElement("div");
        this.dots.classList.add("slider-pagination");

        this.slides.forEach((el, i) => {
            const btn = document.createElement("button");
            btn.classList.add("slider-pagination-button");
            btn.type = "button";
            btn.innerText = i + 1;
            btn.addEventListener("click", () => this.setSlide(i));
            this.dots.append(btn);
        });

        this.slider.append(this.dots);
    }
}

const options = {
    autoplay : 5000,
    pagination: true
}
const slider = new Slider("#slider", options);
