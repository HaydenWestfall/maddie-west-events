import { useState } from "react";
import { toast } from "react-toastify";
import { useRentalCart } from "../context/RentalCartContext";
import { createRentalRequest } from "../rentals.api";
import { AGREEMENT_VERSION } from "./RentalAgreement";

interface RentalInquiryFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const RentalInquiryForm: React.FC<RentalInquiryFormProps> = ({ onSuccess, onBack }) => {
  const { items, dateRange, clear } = useRentalCart();
  const [status, setStatus] = useState<"" | "loading">("");

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [touched, setTouched] = useState({ name: false, email: false });

  const [agreed, setAgreed] = useState(false);
  const [signatureName, setSignatureName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isInvalid = {
    name: touched.name && !formData.name.trim(),
    email: touched.email && (!formData.email || !validateEmail(formData.email)),
  };

  const errorMsg = {
    name: touched.name && !formData.name.trim() ? "Required" : "",
    email:
      touched.email && !formData.email
        ? "Required"
        : touched.email && formData.email && !validateEmail(formData.email)
        ? "Please enter a valid email address."
        : "",
  };

  const disableSubmit =
    !formData.name.trim() ||
    !validateEmail(formData.email) ||
    !agreed ||
    !signatureName.trim() ||
    items.length === 0 ||
    !dateRange ||
    status === "loading";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateRange) {
      toast.error("Please choose your event date before submitting.");
      return;
    }
    if (!formData.name.trim() || !validateEmail(formData.email)) {
      toast.error("Please add your name and a valid email.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!agreed || !signatureName.trim()) {
      toast.error("Please review and sign the rental agreement before submitting.");
      return;
    }

    try {
      setStatus("loading");
      await createRentalRequest({
        items: items.map((ci) => ({ itemId: ci.item._id, quantity: ci.quantity })),
        dateRange,
        requester: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          notes: formData.notes.trim() || undefined,
        },
        agreement: {
          acknowledged: true,
          signatureName: signatureName.trim(),
          agreementVersion: AGREEMENT_VERSION,
        },
      });
      clear();
      onSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong submitting your request. Please try again.",
        { autoClose: false },
      );
    } finally {
      setStatus("");
    }
  };

  return (
    <form className="rental-inquiry-form" onSubmit={handleSubmit}>
      <button type="button" className="inquiry-back" onClick={onBack}>
        ← Back to cart
      </button>

      <p className="inquiry-intro">
        Share your details and we'll send this request to Maddie West. You'll both get an email, and Maddie will
        confirm availability and final pricing.
      </p>

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

      <div className="input-wrapper">
        <label className="input-label">PHONE</label>
        <input type="tel" name="phone" placeholder="PHONE NUMBER" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="input-wrapper">
        <label className="input-label">NOTES FOR MADDIE</label>
        <textarea
          name="notes"
          placeholder="ANYTHING ELSE WE SHOULD KNOW ABOUT YOUR EVENT . . ."
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="agreement-block">
        <label className="agreement-check">
          <input type="checkbox" name="agreed" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I have read and agree to the{" "}
            <a href="/rentals/agreement" target="_blank" rel="noopener noreferrer" className="agreement-link">
              Rental Agreement
            </a>
            .
          </span>
        </label>

        <div className="input-wrapper">
          <label className="input-label">
            SIGN — TYPE YOUR FULL NAME <span>*</span>
          </label>
          <input
            type="text"
            name="signatureName"
            placeholder="FULL NAME"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
          />
        </div>
      </div>

      <div className="inquiry-submit">
        {status === "" ? (
          <button type="submit" className="primary-button large light" disabled={disableSubmit}>
            <span>SEND REQUEST</span>
          </button>
        ) : (
          <button type="button" className="primary-button large active">
            <div className="loader-wrapper">
              <div className="loader"></div>
            </div>
          </button>
        )}
      </div>
    </form>
  );
};

export default RentalInquiryForm;
