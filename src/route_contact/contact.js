
import "../index.js";
import "../route_home/index.scss";
import "../route_about/about.scss";
import "../route_testimonies/testimonies.scss";
import "../route_packages/packages.scss";
import "../route_journal/journal.scss";
import "../route_contact/contact.scss";

//MODULE SPECIFIC
import "../assets/contact/contact_cover.webp";

/**
 * On Destroy callback anytime barba navigates away from the page.
 */
export function onInit() {
  if (!initialized) {
    const timeline = gsap.timeline();
    timeline.fromTo("#contact-header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 });
    timeline.delay(1.4);
    timeline.play();

    document.getElementById('submit-button').addEventListener('click', (e) => {
      e.preventDefault();

      if (document.getElementById('hidden-field').value != '') {
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const eventLocation = document.getElementById('event-location').value.trim();
      const eventType = document.getElementById('event-type').value.trim();
      const eventDate = document.getElementById('event-date').value.trim();
      const eventBudget = document.getElementById('event-budget').value.trim();
      const guestCount = document.getElementById('guest-count').value.trim();
      const comments = document.getElementById('comments').value.trim();

      if (name == '' || email == '' || eventLocation == '') {
        alert("Please fill out all required fields.");
        return
      }

      const formBody = `
        <b>Client Name: </b><br/>${name}<br><br/>
        <b>Client Email: </b><br/>${email}<br><br/>
        <b>Event Location: </b><br/>${eventLocation}<br><br/>
        <b>Event Type: </b><br/>${eventType}<br><br/>
        <b>Event Date: </b><br/>${eventDate}<br><br/>
        <b>Event Budget: </b><br/>${eventBudget}<br><br/>
        <b>Guest Count: </b><br/>${guestCount}<br><br/>
        <b>Comments: </b><br/>${comments}<br>`;

      document.getElementById('submit-label').style.display = "none";
      document.getElementById('submit-loader').style.display = "unset";
      const button = document.getElementById('submit-button');
      button.classList.remove('light');
      button.classList.add('active');

      setTimeout(() => {
        document.getElementById('overlay').style.display = "flex";
        gsap.fromTo("#overlay", { opacity: 0 }, { opacity: 1, duration: 0.5 });
        gsap.fromTo("#submit-loader", { opacity: 1 }, { opacity: 0, duration: 0.5 });
        gsap.fromTo("#modal", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.3 });
      }, 2000);

      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "maddiewestfallevents@gmail.com",
        Password: "433EBF428FCEF8259B7788124EC388EC1B69",
        To: 'maddiewestfallevents@gmail.com',
        From: "maddiewestfallevents@gmail.com",
        Subject: "NEW CLIENT INQUIRY!",
        Body: formBody
      }).then(
        message => alert(message)
      );
    });

    initialized = true;
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
