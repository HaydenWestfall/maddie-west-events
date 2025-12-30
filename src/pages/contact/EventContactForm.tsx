import { useState } from "react";
import { toast } from "react-toastify";
import { env } from "../../config/env";

interface EventFormData {
  name: string;
  email: string;
  eventLocation: string;
  eventType: string;
  eventDate: string;
  eventBudget: string;
  guestCount: string;
  message: string;
}

interface EventContactFormProps {
  onSubmissionSuccess: () => void;
}

const EventContactForm: React.FC<EventContactFormProps> = ({ onSubmissionSuccess }) => {
  const [status, setStatus] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState<EventFormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
      console.log("Submitting event form: ", formData);
      const res = await fetch(`${env.API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "event" }),
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
        onSubmissionSuccess();
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
    if (data.details) {
      data.details.forEach((detail: any) => {
        errorMessages.push(detail.msg);
      });
    }
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
    <form onSubmit={handleSubmit} id="contact-form" className="event-contact-form">
      <div className="input-inline">
        <div className="input-wrapper">
          <label className="input-label">
            NAME <span>*</span>
          </label>
          <input
            type="text"
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
          <label className="input-label">
            EMAIL <span>*</span>
          </label>
          <input
            type="text"
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
        <label className="input-label">
          EVENT LOCATION <span>*</span>
        </label>
        <input
          type="text"
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
          <label className="input-label">
            EVENT TYPE <span>*</span>
          </label>
          <input
            type="text"
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
          <label className="input-label">
            EVENT DATE <span>*</span>
          </label>
          <input
            type="text"
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
        <label className="input-label">
          EVENT BUDGET <span>*</span>
        </label>
        <input
          type="text"
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
        <label className="input-label">GUEST COUNT</label>
        <input
          type="text"
          name="guestCount"
          placeholder="EXPECTED GUEST COUNT AT THE EVENT"
          value={formData.guestCount}
          onChange={handleChange}
        />
      </div>

      <div className="input-wrapper">
        <label className="input-label">COMMENTS FOR MADDIE</label>
        <textarea
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
          <button type="submit" className="primary-button large light" id="submit-button" disabled={disableSubmit}>
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
  );
};

export default EventContactForm;
