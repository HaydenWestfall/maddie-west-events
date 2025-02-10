import "./contact.scss";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { componentOnLoadAnimationDelay, mweNavigate, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ContactRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const { isTransitioning } = useMWETransitionContext();
  const contactContainer = useRef<HTMLDivElement | null>(null);
  const contactHeader = useRef<HTMLDivElement | null>(null);
  const submissionOverlay = useRef<HTMLDivElement | null>(null);
  const submissionConfirmation = useRef<HTMLDivElement | null>(null);
  const sendMessageButton = useRef<HTMLButtonElement | null>(null);
  const sendMessageText = useRef<HTMLSpanElement | null>(null);
  const sendMessageLoader = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        const timeline = gsap.timeline({ delay: componentOnLoadAnimationDelay });
        timeline.fromTo(contactHeader.current, { y: "80px", opacity: 0 }, { y: "0", opacity: 1, duration: 0.7 });
        timeline.play();
      }
    },
    { dependencies: [isTransitioning], scope: contactContainer }
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventLocation: "",
    eventType: "",
    eventDate: "",
    eventBudget: "",
    guestCount: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)

    const formBody = `
        <b>Client Name: </b><br/>${formData.name}<br><br/>
        <b>Client Email: </b><br/>${formData.email}<br><br/>
        <b>Event Location: </b><br/>${formData.eventLocation}<br><br/>
        <b>Event Type: </b><br/>${formData.eventType}<br><br/>
        <b>Event Date: </b><br/>${formData.eventDate}<br><br/>
        <b>Event Budget: </b><br/>${formData.eventBudget}<br><br/>
        <b>Guest Count: </b><br/>${formData.guestCount}<br><br/>
        <b>Comments: </b><br/>${formData.comment}<br>`;

    const emailData = {
      Host: "smtp.elasticemail.com",
      Username: "maddiewestfallevents@gmail.com",
      Password: "77C1826308C524A3D85CAE1A9821A951C1DA",
      To: "maddiewestfallevents@gmail.com",
      From: "customer@maddiewestevents.com",
      Subject: "NEW CLIENT INQUIRY!",
      Body: formBody,
    };

    try {
      sendMessageText.current!.style.display = "none";
      sendMessageLoader.current!.style.display = "flex";
      sendMessageButton.current!.classList.remove("light");
      sendMessageButton.current!.classList.add("active");
      await (window as any).Email.send(emailData);

      submissionOverlay.current!.style.display = "flex";
      gsap.fromTo(submissionOverlay.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(
        submissionConfirmation.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, delay: 0.3 }
      );
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        "There was an error sending your message. Please try again later. If issues persist, try reaching out to Madison via instagram."
      );
    } finally {
      sendMessageText.current!.style.display = "flex";
      sendMessageLoader.current!.style.display = "none";
      sendMessageButton.current!.classList.remove("active");
      sendMessageButton.current!.classList.add("light");
    }
  };

  return (
    <main data-barba="wrapper">
      <div ref={contactContainer} data-barba="container" data-barba-namespace="contact" className="contact_route">
        <section id="contact-header">
          <img src="/contact/contact_cover.webp" alt="Madison Westfall posing in front of a tablescape" />
          <div id="accent-wrapper">
            <span id="maddie-west-accent">MADDIE WEST EVENTS | EVENT COORDINATOR</span>
          </div>
          <h1 ref={contactHeader} id="contact-header-text">
            RELAX your BIG DAY
            <br /> is in GOOD HANDS
          </h1>
        </section>

        <section id="contact-section">
          <div id="contact-form-wrapper">
            <p>
              FILL IN THE FORM BELOW AND YOU WILL HEAR BACK FROM ME WITHIN 48 HOURS. PLEASE ENTER AS MUCH INFORMATION
              ABOUT YOUR DAY AS YOU CAN.
            </p>
            <form onSubmit={handleFormSubmission} id="contact-form">
              <div className="input-inline">
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    NAME <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="FULL NAME"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    EMAIL <span>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="EMAIL ADDRESS . . ."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label id="name-label" className="input-label">
                  EVENT LOCATION <span>*</span>
                </label>
                <input
                  type="text"
                  id="event-location"
                  name="eventLocation"
                  required
                  placeholder="EVENT LOCATION . . ."
                  value={formData.eventLocation}
                  onChange={handleChange}
                />
              </div>

              <div className="input-inline">
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    EVENT TYPE
                  </label>
                  <input
                    type="text"
                    id="event-type"
                    name="eventType"
                    placeholder="TYPE OF EVENT (I.E. WEDDING)"
                    value={formData.eventType}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    EVENT DATE
                  </label>
                  <input
                    type="text"
                    id="event-date"
                    name="eventDate"
                    placeholder="EVENT DATE"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label id="name-label" className="input-label">
                  EVENT BUDGET
                </label>
                <input
                  type="text"
                  id="event-budget"
                  name="eventBudget"
                  placeholder="EXPECTED BUDGET FOR THE EVENT"
                  value={formData.eventBudget}
                  onChange={handleChange}
                />
              </div>

              <div className="input-wrapper">
                <label id="name-label" className="input-label">
                  GUEST COUNT
                </label>
                <input
                  type="text"
                  id="guest-count"
                  name="guestCount"
                  placeholder="EXPECTED GUEST COUNT AT THE EVENT"
                  value={formData.guestCount}
                  onChange={handleChange}
                />
              </div>

              <div className="input-wrapper">
                <label id="name-label" className="input-label">
                  COMMENTS FOR MADDIE
                </label>
                <textarea
                  id="comments"
                  name="comment"
                  placeholder="HI MADDIE I AM INTERESTED IN THE MONTH OF COORDINATION PACKAGE..."
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div style={{ display: "none" }}>
                <input id="hidden-field"></input>
              </div>

              <div id="send-button">
                <button ref={sendMessageButton} type="submit" className="primary-button large light" id="submit-button">
                  <span ref={sendMessageText} id="submit-label">
                    SEND MESSAGE
                  </span>

                  <div ref={sendMessageLoader} id="submit-loader" className="loader-wrapper">
                    <div className="loader"></div>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </section>

        <div ref={submissionOverlay} className="overlay" id="overlay">
          <div ref={submissionConfirmation} className="thank-you-modal" id="modal">
            <div className="header">
              <span>THANK YOU</span>
              <Player
                id="fireworks"
                src="https://lottie.host/8616784f-3af3-47f5-93cb-343729a65cd9/tGZehZfDsr.json"
                speed={0.7}
                loop
                autoplay
              />
            </div>
            <div className="body">
              I have received your inquiry and will get back with you within the next 48 hours.
            </div>
            <a href="/" className="text-button small" onClick={(e: any) => mweNavigate(e, handleNavigation, "/")}>
              HOME
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactRoute;
