import "./contact.scss";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { componentOnLoadAnimationDelay, mweNavigate, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";
import { toast } from "react-toastify";
import { env } from "../../config/env";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ContactRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const [status, setStatus] = useState({ type: "", message: "" });
  const { isTransitioning } = useMWETransitionContext();
  const contactContainer = useRef<HTMLDivElement | null>(null);
  const contactHeader = useRef<HTMLDivElement | null>(null);
  const submissionOverlay = useRef<HTMLDivElement | null>(null);
  const submissionConfirmation = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventLocation: "",
    eventType: "",
    eventDate: "",
    eventBudget: "",
    guestCount: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    eventLocation: false,
    eventType: false,
    eventDate: false,
    eventBudget: false,
  });

  const isInvalid = {
    name: touched.name && !formData.name,
    email: touched.email && (!formData.email || !validateEmail(formData.email)),
    eventLocation: touched.eventLocation && !formData.eventLocation,
    eventType: touched.eventType && !formData.eventType,
    eventDate: touched.eventDate && !formData.eventDate,
    eventBudget: touched.eventBudget && !formData.eventBudget,
  };

  const errorMsg = {
    name: touched.name && !formData.name ? "Required" : "",
    email:
      touched.email && !formData.email
        ? "Required"
        : touched.email && formData.email && !validateEmail(formData.email)
        ? "Please enter a valid email address."
        : "",
    eventLocation: touched.eventLocation && !formData.eventLocation ? "Required" : "",
    eventType: touched.eventType && !formData.eventType ? "Required" : "",
    eventDate: touched.eventDate && !formData.eventDate ? "Required" : "",
    eventBudget: touched.eventBudget && !formData.eventBudget ? "Required" : "",
  };

  const isFormEmpty =
    !formData.name ||
    !formData.email ||
    !formData.eventLocation ||
    !formData.eventBudget ||
    !formData.eventDate ||
    !formData.eventType;
  const isFormInvalid = !validateEmail(formData.email) || isFormEmpty;
  const disableSubmit = isFormInvalid || status.type !== "";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.eventLocation ||
      !formData.eventBudget ||
      !formData.eventDate ||
      !formData.eventType
    ) {
      toast.error("Please fill out all required fields.", { autoClose: false });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.", { autoClose: false });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Sending..." });
      console.log("Submitting form: ", formData);
      const res = await fetch(`${env.API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          eventLocation: "",
          eventType: "",
          eventDate: "",
          eventBudget: "",
          guestCount: "",
          message: "",
        });
        setTouched({
          name: false,
          email: false,
          eventLocation: false,
          eventType: false,
          eventDate: false,
          eventBudget: false,
        });

        submissionOverlay.current!.style.display = "flex";
        gsap.fromTo(submissionOverlay.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        gsap.fromTo(
          submissionConfirmation.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.75, delay: 0.3 }
        );
      } else {
        handleEmailError(data);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        "There was an error sending your message. Please try again later. If issues persist, try reaching out to Madison via instagram."
      );
    } finally {
      setStatus({ type: "", message: "" });
    }
  };

  const handleEmailError = (data: any) => {
    const errorMessages = [data.error];
    data.details.forEach((detail: any) => {
      errorMessages.push(detail.msg);
    });
    console.log("Error messages: ", errorMessages);

    const errorContent = (
      <div>
        {errorMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    );

    setStatus({ type: "error", message: data.error || "Failed to send." });
    toast.error(errorContent, { autoClose: false });
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
            <form onSubmit={handleSubmit} id="contact-form">
              <div className="input-inline">
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    NAME <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="FULL NAME"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={isInvalid.name ? "invalid" : ""}
                  />
                  {errorMsg.name && <span className="input-error">{errorMsg.name}</span>}
                </div>
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    EMAIL <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="EMAIL ADDRESS . . ."
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={isInvalid.email ? "invalid" : ""}
                  />
                  {errorMsg.email && <span className="input-error">{errorMsg.email}</span>}
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
                  placeholder="EVENT LOCATION . . ."
                  value={formData.eventLocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={isInvalid.eventLocation ? "invalid" : ""}
                />
                {errorMsg.eventLocation && <span className="input-error">{errorMsg.eventLocation}</span>}
              </div>

              <div className="input-inline">
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    EVENT TYPE <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="event-type"
                    name="eventType"
                    placeholder="TYPE OF EVENT (I.E. WEDDING)"
                    value={formData.eventType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={isInvalid.eventType ? "invalid" : ""}
                  />
                  {errorMsg.eventType && <span className="input-error">{errorMsg.eventType}</span>}
                </div>
                <div className="input-wrapper">
                  <label id="name-label" className="input-label">
                    EVENT DATE <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="event-date"
                    name="eventDate"
                    placeholder="EVENT DATE"
                    value={formData.eventDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={isInvalid.eventDate ? "invalid" : ""}
                  />
                  {errorMsg.eventDate && <span className="input-error">{errorMsg.eventDate}</span>}
                </div>
              </div>

              <div className="input-wrapper">
                <label id="name-label" className="input-label">
                  EVENT BUDGET <span>*</span>
                </label>
                <input
                  type="text"
                  id="event-budget"
                  name="eventBudget"
                  placeholder="EXPECTED BUDGET FOR THE EVENT"
                  value={formData.eventBudget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={isInvalid.eventBudget ? "invalid" : ""}
                />
                {errorMsg.eventBudget && <span className="input-error">{errorMsg.eventBudget}</span>}
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
                  id="message"
                  name="message"
                  placeholder="HI MADDIE I AM INTERESTED IN THE MONTH OF COORDINATION PACKAGE..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div style={{ display: "none" }}>
                <input id="hidden-field"></input>
              </div>

              <div id="send-button">
                {status.type === "" ? (
                  <button
                    type="submit"
                    className="primary-button large light"
                    id="submit-button"
                    disabled={disableSubmit}
                  >
                    <span id="submit-label">SEND MESSAGE</span>
                  </button>
                ) : (
                  <button className="primary-button large active">
                    <div id="submit-loader" className="loader-wrapper">
                      <div className="loader"></div>
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        <div ref={submissionOverlay} className="overlay" id="overlay">
          <div ref={submissionConfirmation} className="thank-you-modal" id="modal">
            <div className="header">
              <span>THANK YOU</span>
              <Player id="fireworks" src={env.LOTTIE_FIREWORKS_URL} speed={0.7} loop autoplay />
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
