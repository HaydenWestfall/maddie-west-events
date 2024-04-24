
/**
 * On Destroy callback anytime barba navigates away from the page.
 */
function initScript() {
  const timeline = gsap.timeline();
  timeline.fromTo("#contact-header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 });
  timeline.delay(1.4);
  timeline.play();

  document.getElementById('submit-button').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('submit-label').style.display = "none";
    document.getElementById('submit-loader').style.display = "unset";
    const button = document.getElementById('submit-button');
    button.classList.remove('light');
    button.classList.add('active');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const eventLocation = document.getElementById('event-location');
    const eventType = document.getElementById('event-type');
    const eventDate = document.getElementById('event-date');
    const eventBudget = document.getElementById('event-budget');
    const guestCount = document.getElementById('guest-count');
    const comments = document.getElementById('comments');

    const formBody = `
    <b>Client Name: </b><br/>${name.value.trim()}<br><br/>
    <b>Client Email: </b><br/>${email.value.trim()}<br><br/>
    <b>Event Location: </b><br/>${eventLocation.value.trim()}<br><br/>
    <b>Event Type: </b><br/>${eventType.value.trim()}<br><br/>
    <b>Event Date: </b><br/>${eventDate.value.trim()}<br><br/>
    <b>Event Budget: </b><br/>${eventBudget.value.trim()}<br><br/>
    <b>Guest Count: </b><br/>${guestCount.value.trim()}<br><br/>
    <b>Comments: </b><br/>${comments.value.trim()}<br>
    `;

    setTimeout(() => {
      document.getElementById('overlay').style.display = "flex";
      gsap.fromTo("#overlay", { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo("#submit-loader", { opacity: 1 }, { opacity: 0, duration: 0.5 });
      gsap.fromTo("#modal", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.3 });
    }, 2000);

    // Email.send({
    //   Host: "smtp.elasticemail.com",
    //   Username: "maddiewestfallevents@gmail.com",
    //   Password: "433EBF428FCEF8259B7788124EC388EC1B69",
    //   To: 'maddiewestfallevents@gmail.com',
    //   From: "maddiewestfallevents@gmail.com",
    //   Subject: "NEW CLIENT INQUIRY!",
    //   Body: formBody
    // }).then(
    //   message => alert(message)
    // );
  });

  initialized = true;
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onInit() {
  if (!initialized) {
    initScript();
  }
}

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onDestroy() {
  // Remove Script
  document.querySelectorAll('script').forEach(script => {
    if (script.src.endsWith('contact-page.js')) {
      script.parentNode.removeChild(script);
    }
  });

  // Remove StyleSheet
  document.querySelectorAll('link').forEach(styleSheet => {
    if (styleSheet.href.endsWith('contact.scss')) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });
  initialized = false;
}

let initialized = false;
onInit();
