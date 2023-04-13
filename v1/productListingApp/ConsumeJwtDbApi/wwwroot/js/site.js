// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    var clicked = localStorage.getItem('clicked') === 'true' || false;

    function setMode() {
        if (clicked == true) {
            $('body').attr('data-bs-theme', 'dark');
            $('#mode i').attr('class', 'bi bi-brightness-high');
            $('.menu').attr('class', 'menu bi bi-list text-light')
        } else {
            $('body').attr('data-bs-theme', 'light');
            $('#mode i').attr('class', 'bi bi-moon-stars')
            $('.menu').attr('class', 'menu bi bi-list')

        }
    }
    setMode();

    $('.toggle').click(function () {
        clicked = !clicked;
        setMode();
        localStorage.setItem('clicked', clicked);
    });
});
