(function () {
  var asideNode = document.querySelector('.aside');
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    var asideDelimetrNode = document.querySelector('.delimetr');
    var documentHeight = document.body.clientHeight;

    function setDelimetrHeight() {
      var visibleClientHeight = window.innerHeight;
      var asideHeight = visibleClientHeight * parseInt(getComputedStyle(asideNode).height) / documentHeight;
      asideDelimetrNode.style.setProperty('--height', asideHeight + 'px');
    }
    setDelimetrHeight();
    window.addEventListener('resize', setDelimetrHeight);

    window.addEventListener('scroll', function () {
      var scrolledFromTop = document.documentElement.scrollTop * 100 / documentHeight;
      asideDelimetrNode.style.setProperty('--top', scrolledFromTop + '%');
    });
  } else {
    console.log('Sorry, your browser is not support this stuff');
    asideNode.remove();
  }
}());