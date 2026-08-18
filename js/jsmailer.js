/* =========================================================
   QMSISO - EMAILJS FORM INTEGRATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================================
     EMAILJS CONFIG
  ========================================================= */

  const PUBLIC_KEY = "rbcYF-ftTP6MUowTJ";
  const SERVICE_ID = "service_gle0qcr";
  const TEMPLATE_ID = "template_r5a5wac";

  /* =========================================================
     EMAILJS INIT
  ========================================================= */

  if (typeof emailjs === "undefined") {
    console.error("QMSISO EmailJS Error: EmailJS library not loaded.");
    return;
  }

  emailjs.init({
    publicKey: PUBLIC_KEY,
  });

  console.log("QMSISO EmailJS initialized.");

  /* =========================================================
     HELPERS
  ========================================================= */

  function getSubmitButton(form) {
    if (!form) return null;

    return (
      form.querySelector(".submit-btn") ||
      form.querySelector(".form-submit-btn") ||
      form.querySelector(".enquiry-submit-btn") ||
      form.querySelector(".contact-submit-btn")
    );
  }

  function restoreButton(form) {
    const button = getSubmitButton(form);

    if (!button) return;

    button.disabled = false;

    if (form.id === "quoteForm") {
      button.innerHTML =
        'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';
    } else if (form.id === "heroQuoteForm") {
      button.innerHTML =
        'Request Consultation <i class="fa-solid fa-arrow-right"></i>';
    } else if (form.id === "quickEnquiryForm") {
      button.innerHTML =
        'Submit Enquiry <i class="fa-solid fa-arrow-right"></i>';
    } else if (form.id === "contactForm") {
      button.innerHTML =
        'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  function resetFormAfterSuccess(form) {
    if (!form) return;

    form.reset();

    form.querySelectorAll(".has-error, .has-success").forEach((field) => {
      field.classList.remove("has-error", "has-success");
    });

    form.querySelectorAll(".form-error, .contact-error").forEach((error) => {
      error.textContent = "";
    });
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

  function showError() {
    alert(
      "Sorry!\n\n" +
        "Your inquiry could not be sent right now.\n\n" +
        "Please try again or contact QMSISO directly.",
    );
  }

  /* =========================================================
     SEND EMAIL
  ========================================================= */

  async function sendQMSISOEmail(data) {
    try {
      /*
        These names MUST match your EmailJS template variables.

        {{form_name}}
        {{user_name}}
        {{user_email}}
        {{user_phone}}
        {{message}}
      */

      const templateParams = {
        form_name: data.formName || "QMSISO Website Form",

        user_name: data.name || "Not Provided",

        user_email: data.email || "Not Provided",

        user_phone: data.phone || "Not Provided",

        message:
          "Business Name: " +
          (data.business || "Not Provided") +
          "\n" +
          "Required Certification: " +
          (data.certificate || "Not Selected") +
          "\n" +
          "Message: " +
          (data.message || "No additional message"),
      };

      console.log("QMSISO EmailJS Sending:", templateParams);

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
      );

      console.log("QMSISO EmailJS Success:", response);

      return true;
    } catch (error) {
      console.error("QMSISO EmailJS Error:", error);

      return false;
    }
  }

  /* =========================================================
     FORM SEND EVENT
  ========================================================= */

  document.addEventListener("qmsiso:sendForm", async function (event) {
    const data = event.detail;

    if (!data || !data.form) {
      console.error("QMSISO: Form data missing.");
      return;
    }

    const form = data.form;

    const submitButton = getSubmitButton(form);

    /*
        Disable button while EmailJS is sending
      */

    if (submitButton) {
      submitButton.disabled = true;

      submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }

    /*
        SEND EMAIL
      */

    const success = await sendQMSISOEmail(data);

    /* =====================================================
         SUCCESS
      ===================================================== */

    if (success) {
      resetFormAfterSuccess(form);

      restoreButton(form);

      showSuccess(data.formName);

      /*
          Quote popup close
        */

      if (form.id === "quoteForm") {
        const quoteModal = document.getElementById("quoteModal");

        if (quoteModal) {
          quoteModal.classList.remove("show");

          quoteModal.style.display = "none";

          quoteModal.setAttribute("aria-hidden", "true");

          document.body.style.overflow = "";
        }
      }

      return;
    }

    /* =====================================================
         ERROR
      ===================================================== */

    restoreButton(form);

    showError();
  });

  /* =========================================================
     CONSOLE CHECK
  ========================================================= */

  console.log("QMSISO EmailJS mailer loaded successfully.");
});
