

window.addEventListener("load", () => {
    document.getElementById("loader").remove();
    document.querySelectorAll(".hidden").forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = "0.8s";
        }, i * 120);
    });
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.onclick = () => nav.classList.toggle("active");

nav.querySelectorAll("a").forEach(link => {
    link.onclick = () => nav.classList.remove("active");
});


window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
});



/* ============================
   TABS
   ============================ */
document.querySelectorAll(".ref-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".ref-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".ref-carousel").forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.add("active");
    });
});

/* ============================
   CAROUSEL – DESKTOP (FIXED)
   ============================ */
document.querySelectorAll(".ref-carousel").forEach(carousel => {

    if (window.innerWidth <= 700) return; // mobil: swipe

    const track = carousel.querySelector(".ref-track");
    const items = carousel.querySelectorAll(".ref-item");
    const viewport = carousel.querySelector(".ref-viewport");
    const left = carousel.querySelector(".left");
    const right = carousel.querySelector(".right");

    let index = 0;

    const update = () => {
        const itemWidth = items[0].offsetWidth + 25;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    };

    const getMaxIndex = () => {
        const itemWidth = items[0].offsetWidth + 25;
        const visibleItems = Math.floor(viewport.offsetWidth / itemWidth);
        return Math.max(items.length - visibleItems, 0);
    };

    left.addEventListener("click", () => {
        index = Math.max(index - 1, 0);
        update();
    });

    right.addEventListener("click", () => {
        index = Math.min(index + 1, getMaxIndex());
        update();
    });

    window.addEventListener("resize", () => {
        index = Math.min(index, getMaxIndex());
        update();
    });
});

/* ============================
   LIGHTBOX
   ============================ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".ref-item img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
    });
});

document.querySelector(".lightbox-close").onclick = () =>
    lightbox.style.display = "none";

lightbox.onclick = e => {
    if (e.target === lightbox) lightbox.style.display = "none";
};


/* ============================
   COOKIE BANNER LOGIC
   ============================ */

const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");

// ha már elfogadta → ne jelenjen meg
if (localStorage.getItem("cookieAccepted") === "true") {
    cookieBanner.style.display = "none";
} else {
    cookieBanner.style.display = "flex";
}

// elfogadás
cookieAccept.addEventListener("click", () => {
    localStorage.setItem("cookieAccepted", "true");
    cookieBanner.style.display = "none";
});
