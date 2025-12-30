import { useState } from "react";
import { toast } from "react-toastify";
import { env } from "../../config/env";

interface StudioFormData {
  name: string;
  email: string;
  shootDate: string;
  shootLength: string;
  eventType: string;
  numberOfPeople: string;
  message: string;
}

interface StudioContactFormProps {
  onSubmissionSuccess: () => void;
}

const StudioContactForm: React.FC<StudioContactFormProps> = ({ onSubmissionSuccess }) => {
  const [status, setStatus] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState<StudioFormData>({
    name: "",
    email: "",
    shootDate: "",
    shootLength: "",
    eventType: "",
    numberOfPeople: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    shootDate: false,
    shootLength: false,
    eventType: false,
    numberOfPeople: false,
  });

  // Generate half-hour increment options
  const shootLengthOptions = [
    { value: "", label: "SELECT SHOOT LENGTH", disabled: true },
    { value: "0.5", label: "30 minutes" },
    { value: "1", label: "1 hour" },
    { value: "1.5", label: "1.5 hours" },
    { value: "2", label: "2 hours" },
    { value: "2.5", label: "2.5 hours" },
    { value: "3", label: "3 hours" },
    { value: "3.5", label: "3.5 hours" },
    { value: "4", label: "4 hours" },
    { value: "4.5", label: "4.5 hours" },
    { value: "5", label: "5 hours" },
    { value: "5.5", label: "5.5 hours" },
    { value: "6", label: "6 hours" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isInvalid = {
    name: touched.name && !formData.name,
    email: touched.email && (!formData.email || !validateEmail(formData.email)),
    shootDate: touched.shootDate && !formData.shootDate,
    shootLength: touched.shootLength && !formData.shootLength,
    eventType: touched.eventType && !formData.eventType,
    numberOfPeople: touched.numberOfPeople && !formData.numberOfPeople,
  };

  const errorMsg = {
    name: touched.name && !formData.name ? "Required" : "",
    email:
      touched.email && !formData.email
        ? "Required"
        : touched.email && formData.email && !validateEmail(formData.email)
        ? "Please enter a valid email address."
        : "",
    shootDate: touched.shootDate && !formData.shootDate ? "Required" : "",
    shootLength: touched.shootLength && !formData.shootLength ? "Required" : "",
    eventType: touched.eventType && !formData.eventType ? "Required" : "",
    numberOfPeople: touched.numberOfPeople && !formData.numberOfPeople ? "Required" : "",
  };

  const isFormEmpty =
    !formData.name ||
    !formData.email ||
    !formData.shootDate ||
    !formData.shootLength ||
    !formData.eventType ||
    !formData.numberOfPeople;
  const isFormInvalid = !validateEmail(formData.email) || isFormEmpty;
  const disableSubmit = isFormInvalid || status.type !== "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.shootDate ||
      !formData.shootLength ||
      !formData.eventType ||
      !formData.numberOfPeople
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
      console.log("Submitting studio form: ", formData);
      const res = await fetch(`${env.API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "studio" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          shootDate: "",
          shootLength: "",
          eventType: "",
          numberOfPeople: "",
          message: "",
        });
        setTouched({
          name: false,
          email: false,
          shootDate: false,
          shootLength: false,
          eventType: false,
          numberOfPeople: false,
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
    <form onSubmit={handleSubmit} id="contact-form" className="studio-contact-form">
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

      <div className="input-inline">
        <div className="input-wrapper">
          <label className="input-label">
            DATE OF SHOOT <span>*</span>
          </label>
          <input
            type="date"
            name="shootDate"
            value={formData.shootDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={isInvalid.shootDate ? "invalid" : ""}
            min={new Date().toISOString().split("T")[0]}
            style={!formData.shootDate.length ? { color: "#ededed" } : {}}
          />
          {errorMsg.shootDate && <span className="input-error">{errorMsg.shootDate}</span>}
        </div>
        <div className="input-wrapper">
          <label className="input-label">
            LENGTH OF SHOOT <span>*</span>
          </label>
          <select
            name="shootLength"
            value={formData.shootLength}
            onChange={handleChange}
            onBlur={handleBlur}
            className={isInvalid.shootLength ? "invalid" : ""}
            style={!formData.shootLength.length ? { color: "#ededed" } : {}}
          >
            {shootLengthOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {errorMsg.shootLength && <span className="input-error">{errorMsg.shootLength}</span>}
        </div>
      </div>

      <div className="input-inline">
        <div className="input-wrapper">
          <label className="input-label">
            EVENT TYPE <span>*</span>
          </label>
          <input
            type="text"
            name="eventType"
            placeholder="TYPE OF SHOOT (I.E. COUPLE'S SESSION)"
            value={formData.eventType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={isInvalid.eventType ? "invalid" : ""}
          />
          {errorMsg.eventType && <span className="input-error">{errorMsg.eventType}</span>}
        </div>
        <div className="input-wrapper">
          <label className="input-label">
            NUMBER OF PEOPLE <span>*</span>
          </label>
          <input
            type="number"
            name="numberOfPeople"
            placeholder="HOW MANY PEOPLE WILL BE PHOTOGRAPHED"
            value={formData.numberOfPeople}
            onChange={handleChange}
            onBlur={handleBlur}
            className={isInvalid.numberOfPeople ? "invalid" : ""}
            min="1"
          />
          {errorMsg.numberOfPeople && <span className="input-error">{errorMsg.numberOfPeople}</span>}
        </div>
      </div>

      <div className="input-wrapper">
        <label className="input-label">COMMENTS</label>
        <textarea
          name="message"
          placeholder="TELL US MORE ABOUT YOUR VISION FOR THE SHOOT..."
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

export default StudioContactForm;
