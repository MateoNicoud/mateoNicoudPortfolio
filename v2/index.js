let images = document.getElementsByClassName('images');
for (let i = 0; i < images.length; i++) {
    new simpleParallax(images[i], {
        scale: 1.5
    });
}