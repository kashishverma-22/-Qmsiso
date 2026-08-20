/* =========================================================
   QMSISO - EMAILJS MAILER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================================
     EMAILJS CONFIGURATION
     ========================================================= */

  const PUBLIC_KEY = "rbcYF-ftTP6MUowTJ";
  const SERVICE_ID = "service_gle0qcr";
  const TEMPLATE_ID = "template_r5a5wac";

  /* =========================================================
     CHECK EMAILJS LIBRARY
     ========================================================= */

  if (typeof emailjs === "undefined") {
    console.error("QMSISO EmailJS Error: EmailJS library not loaded.");

    return;
  }

  /* =========================================================
     INITIALIZE EMAILJS
     ========================================================= */

  emailjs.init({
    publicKey: PUBLIC_KEY,
  });

  console.log("QMSISO EmailJS initialized successfully.");

  /* =========================================================
     GET SUBMIT BUTTON
     ========================================================= */

  function getSubmitButton(form) {
    if (!form) return null;

    return (
      form.querySelector(".submit-btn") ||
      form.querySelector(".form-submit-btn") ||
      form.querySelector(".enquiry-submit-btn") ||
      form.querySelector(".contact-submit-btn") ||
      form.querySelector('button[type="submit"]')
    );
  }

  /* =========================================================
     RESTORE BUTTON
     ========================================================= */

  function restoreButton(form) {
    const button = getSubmitButton(form);

    if (!button) return;

    button.disabled = false;

    switch (form.id) {
      case "quoteForm":
        button.innerHTML =
          'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';
        break;

      case "heroQuoteForm":
        button.innerHTML =
          'Request Consultation <i class="fa-solid fa-arrow-right"></i>';
        break;

      case "quickEnquiryForm":
        button.innerHTML =
          'Submit Enquiry <i class="fa-solid fa-arrow-right"></i>';
        break;

      case "contactForm":
        button.innerHTML =
          'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';
        break;

      default:
        button.innerHTML =
          'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  /* =========================================================
     RESET FORM
     ========================================================= */

  function resetForm(form) {
    if (!form) return;

    form.reset();

    form.querySelectorAll(".has-error, .has-success").forEach(function (field) {
      field.classList.remove("has-error", "has-success");
    });

    form
      .querySelectorAll(
        ".form-error, .contact-error, .enquiry-error, .error-message",
      )
      .forEach(function (error) {
        error.textContent = "";
      });
  }

  /* =========================================================
     CLOSE QUOTE POPUP
     ========================================================= */

  function closeQuotePopup() {
    const quoteModal = document.getElementById("quoteModal");

    if (!quoteModal) return;

    quoteModal.classList.remove("show");

    quoteModal.style.display = "none";

    quoteModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  /* =========================================================
     SUCCESS MESSAGE
     ========================================================= */

  function showSuccess(formName) {
    alert(
      "Thank you!\n\n" +
        formName +
        " has been submitted successfully.\n\n" +
        "Our QMSISO team will contact you shortly.",
    );
  }

  /* =========================================================
     ERROR MESSAGE
     ========================================================= */

  function showError(error) {
    console.error("QMSISO EmailJS sending failed:", error);

    alert(
      "Sorry!\n\n" +
        "Your enquiry could not be sent right now.\n\n" +
        "Please try again.",
    );
  }

  /* =========================================================
     SEND EMAIL THROUGH EMAILJS
     ========================================================= */

  async function sendQMSISOEmail(data) {
    try {
      /*
        IMPORTANT:
        These variable names MUST match
        your EmailJS template:

        {{form_name}}
        {{name}}
        {{business}}
        {{phone}}
        {{email}}
        {{certificate}}
        {{message}}
      */

      const templateParams = {
        form_name: data.formName || "QMSISO Website Enquiry",

        name: data.name || "Not Provided",

        business: data.business || "Not Provided",

        phone: data.phone || "Not Provided",

        email: data.email || "Not Provided",

        certificate: data.certificate || "Not Selected",

        message: data.message || "No additional message",
      };

      console.log("QMSISO EmailJS Template Parameters:", templateParams);

      /* =====================================================
         SEND EMAIL
         ===================================================== */

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
      );

      console.log("QMSISO EmailJS SUCCESS:", response);

      return {
        success: true,
        response: response,
      };
    } catch (error) {
      console.error("QMSISO EmailJS ERROR:", error);

      return {
        success: false,
        error: error,
      };
    }
  }

  /* =========================================================
     RECEIVE FORM FROM script.js
     ========================================================= */

  document.addEventListener("qmsiso:sendForm", async function (event) {
    const data = event.detail;

    if (!data || !data.form) {
      console.error("QMSISO: Form data missing.");

      return;
    }

    const form = data.form;

    const submitButton = getSubmitButton(form);

    /* =====================================================
         SEND EMAIL
         ===================================================== */

    const result = await sendQMSISOEmail(data);

    /* =====================================================
         EMAIL SENT SUCCESSFULLY
         ===================================================== */

    if (result.success) {
      console.log("QMSISO: Email successfully sent.");

      resetForm(form);

      restoreButton(form);

      showSuccess(data.formName || "Your enquiry");

      /* Close quote popup */
      if (form.id === "quoteForm") {
        closeQuotePopup();
      }

      return;
    }

    /* =====================================================
         EMAIL FAILED
         ===================================================== */

    restoreButton(form);

    showError(result.error);
  });

  /* =========================================================
     FINAL CONSOLE CHECK
     ========================================================= */

  console.log("QMSISO jsmailer.js loaded successfully.");
});
