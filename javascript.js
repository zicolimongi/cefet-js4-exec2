var tutorial = {
  turnedOn: true,
  timer: 0,

  start: function (el) {
    this.el = el;
    this.timer = window.setTimeout(this.show.bind(this), 1000);
  },

  deactivate: function () {
    this.turnedOn = false;
    this.el.parentNode.removeChild(this.el);
    window.clearTimeout(this.timer);
  },

  show: function () {
    var tutorialDataLocalStr = localStorage.getItem('tutorialData'),
        tutorialDataSessionStr = sessionStorage.getItem('tutorialData');

    if(tutorialDataLocalStr == null){
      tutorialDataLocal = { show: 0 };
    }
    else{
      tutorialDataLocal = JSON.parse(tutorialDataLocalStr);
    }
    if(tutorialDataSessionStr == null){
      tutorialDataSession = { show: 0 };
    }
    else{
      tutorialDataSession = JSON.parse(tutorialDataSessionStr);
    }

    if(tutorialDataSession.show < 1 && tutorialDataLocal.show < 3){
      this.el.classList.add('tutorial-on');
    }
    else{
      this.deactivate();
    }

    tutorialDataLocal.show += 1;
    tutorialDataSession.show += 1;
    localStorage.setItem('tutorialData', JSON.stringify(tutorialDataLocal));
    sessionStorage.setItem('tutorialData', JSON.stringify(tutorialDataSession));
    }
};

var tut = document.getElementById('tut');
tutorial.start(tut);