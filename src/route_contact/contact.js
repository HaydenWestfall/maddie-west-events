
import "../route_contact/contact.scss";
import "../assets/contact/contact_cover.webp";

onInit(true);
setTimeout(() => {
  window.navigation.addEventListener("navigate", (event) => {
    if (event.destination.url.includes('contact')) {
      onInit(false);
    } else {
      onDestroy();
    }
  });
});

/**
 * Initialize the contact page
 * 
 * @param {*} initialScriptLoad - Is this the initial page load
 */
export function onInit(initialScriptLoad) {
  let timeout;
  if (initialScriptLoad && !window.barbaIsActive) {
    // Initial page load. wait on page load and run animation.
    timeout = 250;
  } else if (initialScriptLoad && window.barbaIsActive) {
    // Initial page load when routed to by website. Delay half of barba animation.
    timeout = 1200;
  } else {
    // Navigating back to the same page delay the whole barba animation.
    timeout = 2400;
  }

  setTimeout(() => {
    gsap.fromTo("#contact-header", { y: '80px', opacity: 0 }, { y: '0', opacity: 1, duration: 0.7 });
    document.getElementById('submit-button').addEventListener('click', handleFormSubmission);
  }, timeout);
}

/**
 * Handles a form submission by checking its validity, sending an email, and
 * showing the confirmation modal that the request was sent.
 * 
 * @param {*} e - Click event triggered from the form submission
 */
function handleFormSubmission(e) {
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
    Username: "westfallhayden@gmail.com",
    Password: "433EBF428FCEF8259B7788124EC388EC1B69",
    To: 'westfallhayden@gmail.com',
    From: "westfallhayden@gmail.com",
    Subject: "NEW CLIENT INQUIRY!",
    Body: formBody
  }).then(
    message => alert(message)
  );
}

/**
 * On Destroy callback to clean up this page on leave
 */
export function onDestroy() {
  if (document.getElementById('submit-button')) {
    document.getElementById('submit-button').removeEventListener('click', handleFormSubmission);
  }
}
