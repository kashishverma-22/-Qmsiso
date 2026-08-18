/* =========================================================
   QMSISO WEBSITE - COMPLETE JAVASCRIPT
   Validation + Popup + Navbar + EmailJS Integration Support
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================================
     HELPERS
  ========================================================= */

  const get = (id) => document.getElementById(id);

  function setError(input, errorElement, message) {
    if (!input || !errorElement) return;

    const field =
      input.closest(".form-field") ||
      input.closest(".enquiry-field") ||
      input.closest(".contact-field") ||
      input.closest(".form-group");

    if (field) {
      field.classList.add("has-error");
      field.classList.remove("has-success");
    }

    errorElement.textContent = message;
  }

  function setSuccess(input, errorElement) {
    if (!input || !errorElement) return;

    const field =
      input.closest(".form-field") ||
      input.closest(".enquiry-field") ||
      input.closest(".contact-field") ||
      input.closest(".form-group");

    if (field) {
      field.classList.remove("has-error");
      field.classList.add("has-success");
    }

    errorElement.textContent = "";
  }

  function clearValidation(form) {
    if (!form) return;

    form.querySelectorAll(".has-error, .has-success").forEach((field) => {
      field.classList.remove("has-error", "has-success");
    });

    form.querySelectorAll(".form-error, .contact-error").forEach((error) => {
      error.textContent = "";
    });
  }

  function onlyNumbers(input, maxLength = 10) {
    if (!input) return;

    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > maxLength) {
      input.value = input.value.substring(0, maxLength);
    }
  }

  function validIndianMobile(value) {
    return /^[6-9][0-9]{9}$/.test(value);
  }

  function validName(value) {
    return /^[A-Za-z\s.'-]{3,}$/.test(value);
  }

  /* =========================================================
     QUOTE POPUP
  ========================================================= */

  const quoteModal = get("quoteModal");
  const closeQuote = get("closeQuote");
  const quoteForm = get("quoteForm");

  const quoteCertificate = quoteForm
    ? quoteForm.querySelector('select[name="certificate"]')
    : null;

  function openQuotePopup(certificate = "") {
    if (!quoteModal) return;

    if (quoteCertificate && certificate.trim() !== "") {
      let found = false;
      const searchValue = certificate.trim().toLowerCase();

      Array.from(quoteCertificate.options).forEach((option) => {
        const optionValue = option.value.trim().toLowerCase();
        const optionText = option.textContent.trim().toLowerCase();

        if (
          optionValue === searchValue ||
          optionText === searchValue ||
          optionValue.includes(searchValue) ||
          searchValue.includes(optionValue)
        ) {
          quoteCertificate.value = option.value;
          found = true;
        }
      });

      if (!found) {
        const newOption = document.createElement("option");

        newOption.value = certificate;
        newOption.textContent = certificate;
        newOption.selected = true;

        quoteCertificate.appendChild(newOption);
      }
    }

    quoteModal.classList.add("show");
    quoteModal.style.display = "flex";
    quoteModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeQuotePopup() {
    if (!quoteModal) return;

    quoteModal.classList.remove("show");
    quoteModal.style.display = "none";
    quoteModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  /* =========================================================
     OPEN ALL QUOTE BUTTONS
  ========================================================= */

  const quoteOpenButtons = document.querySelectorAll(
    "#openQuote, " +
      "#openQuoteHero, " +
      "#heroQuoteBtn, " +
      "#requestQuoteBtn, " +
      "#complianceQuoteBtn, " +
      "#finalQuoteBtn, " +
      "#finalQuoteBtn2, " +
      ".service-quote-btn, " +
      ".iso-quote-btn, " +
      ".compliance-quote-btn, " +
      ".final-quote-btn",
  );

  quoteOpenButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const certificate = this.getAttribute("data-certificate") || "";

      openQuotePopup(certificate);
    });
  });

  /* =========================================================
     CLOSE POPUP
  ========================================================= */

  if (closeQuote) {
    closeQuote.addEventListener("click", closeQuotePopup);
  }

  if (quoteModal) {
    quoteModal.addEventListener("click", function (event) {
      if (event.target === quoteModal) {
        closeQuotePopup();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      quoteModal &&
      quoteModal.classList.contains("show")
    ) {
      closeQuotePopup();
    }
  });

  /* =========================================================
     POPUP QUOTE FORM
  ========================================================= */

  if (quoteForm) {
    const popupName = quoteForm.querySelector('input[name="name"]');

    const popupBusiness = quoteForm.querySelector('input[name="business"]');

    const popupPhone = quoteForm.querySelector('input[name="phone"]');

    const popupEmail = quoteForm.querySelector('input[name="email"]');

    const popupCertificate = quoteForm.querySelector(
      'select[name="certificate"]',
    );

    if (popupPhone) {
      popupPhone.addEventListener("input", function () {
        onlyNumbers(popupPhone);
      });
    }

    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;

      const name = popupName ? popupName.value.trim() : "";
      const business = popupBusiness ? popupBusiness.value.trim() : "";
      const phone = popupPhone ? popupPhone.value.trim() : "";
      const email = popupEmail ? popupEmail.value.trim() : "";
      const certificate = popupCertificate ? popupCertificate.value : "";

      if (!validName(name)) {
        alert(
          name === ""
            ? "Please enter your full name."
            : "Please enter a valid name.",
        );
        valid = false;
      }

      if (business.length < 2) {
        alert("Please enter your business name.");
        valid = false;
      }

      if (!validIndianMobile(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        valid = false;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        valid = false;
      }

      if (!certificate) {
        alert("Please select an ISO certificate.");
        valid = false;
      }

      if (!valid) return;

      const submitButton = quoteForm.querySelector(".submit-btn");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      /*
         EmailJS is handled by jsmailer.js.
         This event tells jsmailer.js to send the form.
      */

      const emailEvent = new CustomEvent("qmsiso:sendForm", {
        detail: {
          form: quoteForm,
          formName: "Free Quote Popup",
          name: name,
          business: business,
          email: email,
          phone: phone,
          certificate: certificate,
          message: "Quote request for " + certificate,
        },
      });

      document.dispatchEvent(emailEvent);
    });
  }

  /* =========================================================
     HERO FORM
  ========================================================= */

  const heroQuoteForm = get("heroQuoteForm");

  if (heroQuoteForm) {
    const fullName = get("fullName");
    const businessName = get("businessName");
    const mobileNumber = get("mobileNumber");
    const certificate = get("certificate");

    const fullNameError = get("fullNameError");
    const businessNameError = get("businessNameError");
    const mobileNumberError = get("mobileNumberError");
    const certificateError = get("certificateError");

    function validateHeroName() {
      const value = fullName.value.trim();

      if (!value) {
        setError(fullName, fullNameError, "Please enter your full name.");
        return false;
      }

      if (value.length < 3) {
        setError(
          fullName,
          fullNameError,
          "Name must be at least 3 characters.",
        );
        return false;
      }

      setSuccess(fullName, fullNameError);
      return true;
    }

    function validateHeroBusiness() {
      const value = businessName.value.trim();

      if (!value) {
        setError(
          businessName,
          businessNameError,
          "Please enter your business name.",
        );
        return false;
      }

      if (value.length < 2) {
        setError(
          businessName,
          businessNameError,
          "Please enter a valid business name.",
        );
        return false;
      }

      setSuccess(businessName, businessNameError);
      return true;
    }

    function validateHeroMobile() {
      const value = mobileNumber.value.trim();

      if (!value) {
        setError(
          mobileNumber,
          mobileNumberError,
          "Please enter your mobile number.",
        );
        return false;
      }

      if (!validIndianMobile(value)) {
        setError(
          mobileNumber,
          mobileNumberError,
          "Enter a valid 10-digit mobile number.",
        );
        return false;
      }

      setSuccess(mobileNumber, mobileNumberError);
      return true;
    }

    function validateHeroCertificate() {
      if (!certificate.value) {
        setError(
          certificate,
          certificateError,
          "Please select an ISO certificate.",
        );
        return false;
      }

      setSuccess(certificate, certificateError);
      return true;
    }

    if (mobileNumber) {
      mobileNumber.addEventListener("input", function () {
        onlyNumbers(mobileNumber);
      });
    }

    fullName.addEventListener("blur", validateHeroName);
    businessName.addEventListener("blur", validateHeroBusiness);
    mobileNumber.addEventListener("blur", validateHeroMobile);
    certificate.addEventListener("change", validateHeroCertificate);

    heroQuoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const valid =
        validateHeroName() &&
        validateHeroBusiness() &&
        validateHeroMobile() &&
        validateHeroCertificate();

      if (!valid) return;

      const submitButton = heroQuoteForm.querySelector(".form-submit-btn");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      document.dispatchEvent(
        new CustomEvent("qmsiso:sendForm", {
          detail: {
            form: heroQuoteForm,
            formName: "Hero Consultation Form",
            name: fullName.value.trim(),
            business: businessName.value.trim(),
            email: "",
            phone: mobileNumber.value.trim(),
            certificate: certificate.value,
            message: "Request for free ISO consultation.",
          },
        }),
      );
    });
  }

  /* =========================================================
     QUICK ENQUIRY FORM
  ========================================================= */

  const quickEnquiryForm = get("quickEnquiryForm");

  if (quickEnquiryForm) {
    const quickFullName = get("quickFullName");
    const quickBusinessName = get("quickBusinessName");
    const quickMobileNumber = get("quickMobileNumber");
    const quickCertificate = get("quickCertificate");

    const quickFullNameError = get("quickFullNameError");
    const quickBusinessNameError = get("quickBusinessNameError");
    const quickMobileNumberError = get("quickMobileNumberError");
    const quickCertificateError = get("quickCertificateError");

    if (quickMobileNumber) {
      quickMobileNumber.addEventListener("input", function () {
        onlyNumbers(quickMobileNumber);
      });
    }

    quickEnquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;

      [
        quickFullNameError,
        quickBusinessNameError,
        quickMobileNumberError,
        quickCertificateError,
      ].forEach((error) => {
        if (error) error.textContent = "";
      });

      const name = quickFullName.value.trim();
      const business = quickBusinessName.value.trim();
      const phone = quickMobileNumber.value.trim();
      const certificate = quickCertificate.value;

      if (name.length < 3) {
        setError(
          quickFullName,
          quickFullNameError,
          "Please enter your full name.",
        );
        valid = false;
      }

      if (business.length < 2) {
        setError(
          quickBusinessName,
          quickBusinessNameError,
          "Please enter your business name.",
        );
        valid = false;
      }

      if (!validIndianMobile(phone)) {
        setError(
          quickMobileNumber,
          quickMobileNumberError,
          "Please enter a valid 10-digit mobile number.",
        );
        valid = false;
      }

      if (!certificate) {
        setError(
          quickCertificate,
          quickCertificateError,
          "Please select an ISO certification.",
        );
        valid = false;
      }

      if (!valid) return;

      const submitButton = quickEnquiryForm.querySelector(
        ".enquiry-submit-btn",
      );

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      document.dispatchEvent(
        new CustomEvent("qmsiso:sendForm", {
          detail: {
            form: quickEnquiryForm,
            formName: "Quick Enquiry Form",
            name: name,
            business: business,
            email: "",
            phone: phone,
            certificate: certificate,
            message: "Quick enquiry for " + certificate,
          },
        }),
      );
    });
  }

  /* =========================================================
     CONTACT FORM
  ========================================================= */

  const contactForm = get("contactForm");

  if (contactForm) {
    const contactName = get("contactName");
    const contactBusiness = get("contactBusiness");
    const contactMobile = get("contactMobile");
    const contactCertificate = get("contactCertificate");
    const contactMessage = get("contactMessage");

    const contactNameError = get("contactNameError");
    const contactBusinessError = get("contactBusinessError");
    const contactMobileError = get("contactMobileError");
    const contactCertificateError = get("contactCertificateError");

    if (contactMobile) {
      contactMobile.addEventListener("input", function () {
        onlyNumbers(contactMobile);
      });
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;

      [
        contactNameError,
        contactBusinessError,
        contactMobileError,
        contactCertificateError,
      ].forEach((error) => {
        if (error) error.textContent = "";
      });

      const name = contactName.value.trim();
      const business = contactBusiness.value.trim();
      const phone = contactMobile.value.trim();
      const certificate = contactCertificate.value;
      const message = contactMessage.value.trim();

      if (name.length < 3) {
        setError(contactName, contactNameError, "Please enter your full name.");
        valid = false;
      }

      if (business.length < 2) {
        setError(
          contactBusiness,
          contactBusinessError,
          "Please enter your business name.",
        );
        valid = false;
      }

      if (!validIndianMobile(phone)) {
        setError(
          contactMobile,
          contactMobileError,
          "Please enter a valid 10-digit mobile number.",
        );
        valid = false;
      }

      if (!certificate) {
        setError(
          contactCertificate,
          contactCertificateError,
          "Please select an ISO certification.",
        );
        valid = false;
      }

      if (!valid) return;

      const submitButton = contactForm.querySelector(".contact-submit-btn");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      document.dispatchEvent(
        new CustomEvent("qmsiso:sendForm", {
          detail: {
            form: contactForm,
            formName: "Contact Inquiry Form",
            name: name,
            business: business,
            email: "",
            phone: phone,
            certificate: certificate,
            message: message || "No additional message provided.",
          },
        }),
      );
    });
  }

  /* =========================================================
     NAVBAR ACTIVE LINKS
  ========================================================= */

  const navLinks = document.querySelectorAll(
    ".main-navbar .nav-link:not(.dropdown-toggle)",
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));

      this.classList.add("active");
    });
  });

  /* =========================================================
     DROPDOWN ITEMS
  ========================================================= */

  const dropdownItems = document.querySelectorAll(
    ".main-navbar .dropdown-item",
  );

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.forEach((link) => link.classList.remove("active"));
    });
  });

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbar = document.querySelector(".main-navbar");

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      const mainMenu = get("mainMenu");

      if (mainMenu && mainMenu.classList.contains("show")) {
        const navbarToggle = document.querySelector(".mobile-toggle");

        if (navbarToggle) {
          navbarToggle.click();
        }
      }
    });
  });

  /* =========================================================
     CLOSE MOBILE MENU AFTER DROPDOWN
  ========================================================= */

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const mainMenu = get("mainMenu");

      if (mainMenu && mainMenu.classList.contains("show")) {
        const navbarToggle = document.querySelector(".mobile-toggle");

        if (navbarToggle) {
          navbarToggle.click();
        }
      }
    });
  });

  console.log("QMSISO script.js loaded successfully.");
});
