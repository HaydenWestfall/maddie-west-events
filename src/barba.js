
let targetPage = '';
const loadingScreen = document.querySelector('.loading-screen');

// Function to add and remove the page transition screen
function pageTransitionIn() {
  // GSAP methods can be chained and return directly a promise
  // but here, a simple tween is enough
  // loadingScreen.children[0].innerHTML = route.charAt(0).toUpperCase() + route.slice(1);

  document.getElementById('route-page').children[0].innerHTML = targetPage;
  return gsap.to(loadingScreen, { duration: 0.8, height: '100%', top: 'unset', bottom: 0, ease: 'power1.out' })
}
// Function to add and remove the page transition screen
function pageTransitionOut(container) {
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 0 }) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .to(loadingScreen, {
      duration: 0.5,
      bottom: 'unset',
      top: 0,
      height: 0,
      ease: 'power1.out'
    }, 'start')
    .call(contentAnimation, [container], 'start')
}

// Function to animate the content of each page
function contentAnimation(container) {
  // Query from container
  // container.querySelector('.text-wrapper').addClass('show')
  // GSAP methods can be chained and return directly a promise
  return null;
}

barba.init({
  transitions: [{
    async leave(data) {
      await pageTransitionIn()
      data.current.container.remove()
    },

    async afterLeave(data) {
      import(`./${data.current.namespace}.js`).then(module => {
        module.onDestroy();
      }).catch(error => {
        console.error('Error loading the module:', error);
      });
    },

    async beforeEnter(data) {
      const link = document.createElement('link');
      link.rel = 'stylesheet'
      link.href = window.location.origin + '/' + data.next.namespace + '.scss';
      const script = document.createElement('script');
      script.type = 'module';
      script.src = './src/' + data.next.namespace + '.js';
      document.getElementsByTagName('head')[0].appendChild(link);
      document.getElementsByTagName('head')[0].appendChild(script);

      import(`./${data.next.namespace}.js`).then(module => {
        module.onInit();
      }).catch(error => {
        console.error('Error loading the module:', error);
      });
    },

    async enter(data) {
      window.scrollTo(0, 0);
      selectAnchors();
      await pageTransitionOut(data.next.container);
    },

    async once(data) {
      await contentAnimation(data.next.container);
    }
  }]
});

let anchorListeners = [];
function selectAnchors() {
  anchorListeners.forEach(elem => document.removeEventListener(elem.event, elem.element, true));
  anchorListeners = []
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function () {
      handleClick(anchor);
    }, true);
    anchorListeners.push({ event: 'click', element: anchor });
  });
}

function handleClick(anchor) {
  let tagName = anchor.getAttribute('tag');
  tagName = (tagName === 'index') ? 'Maddie West Events' : tagName;
  targetPage = tagName.charAt(0).toUpperCase() + tagName.slice(1);
}

selectAnchors();
