(function () {
    var asideNode = document.querySelector('.aside');
    var asideDelimetrNode = document.querySelector('.delimetr');
    var documentHeight = document.body.clientHeight;

    function setDelimetrHeight() {
        var visibleClientHeight = window.innerHeight;
        var asideHeight = visibleClientHeight * parseInt(getComputedStyle(asideNode).height) / documentHeight;
        asideDelimetrNode.style.setProperty('--height', asideHeight + 'px');
    }

    function getScrolledTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    setDelimetrHeight();
    window.addEventListener('resize', setDelimetrHeight);

    window.addEventListener('scroll', function () {
        var scrolledFromTop = getScrolledTop() * 100 / documentHeight;
        asideDelimetrNode.style.setProperty('--top', scrolledFromTop + '%');
    });

}());