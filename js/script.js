/* =========================================================
   QMSISO WEBSITE - COMPLETE FINAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const serviceKeys = {
    "ISO 9001:2015": "iso-9001", "ISO 14001:2015": "iso-14001",
    "ISO 45001:2018": "iso-45001", "ISO 27001:2022": "iso-27001",
    "ISO 22000:2018": "iso-22000", "ISO 13485:2016": "iso-13485",
    "ISO 50001:2018": "iso-50001", "ISO 20000-1:2018": "iso-20000-1",
    "GMP Certification": "gmp", "CE Marking": "ce-marking",
    "HACCP Certification": "haccp", "Halal Certification": "halal", "Kosher Certification": "kosher",
    "RoHS Compliance": "rohs"
  };
  document.querySelectorAll(".iso-quote-btn, .compliance-quote-btn").forEach((button) => {
    const key = serviceKeys[button.dataset.certificate];
    if (!key) return;
    const link = document.createElement("a");
    link.className = "service-detail-link";
    link.href = `service_details.html?service=${key}`;
    link.textContent = "View details";
    button.parentElement.insertBefore(link, button);
  });
  const featuredServiceKeys = ["iso-9001", "iso-14001", "iso-45001", "iso-27001"];
  document.querySelectorAll("#services .service-card").forEach((card, index) => {
    const link = document.createElement("a");
    link.className = "service-detail-link";
    link.href = `service_details.html?service=${featuredServiceKeys[index]}`;
    link.textContent = "View details";
    card.appendChild(link);
  });
  "use strict";

  /* =========================================================
     COMMON HELPERS
  ========================================================= */

  const get = (id) => document.getElementById(id);

  function getField(form, selectors) {
    if (!form) return null;

    for (const selector of selectors) {
      const element = form.querySelector(selector);

      if (element) {
        return element;
      }
    }

    return null;
  }

  function getErrorElement(form, selectors) {
    if (!form) return null;

    for (const selector of selectors) {
      const element = form.querySelector(selector);

      if (element) {
        return element;
      }
    }

    return null;
  }

  function validateEmail(input, error) {
    if (!input) return false;
    const value = input.value.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      if (error) error.textContent = "Please enter a valid email address.";
      input.classList.add("has-error");
      return false;
    }
    if (error) error.textContent = "";
    input.classList.remove("has-error");
    return true;
  }

  function getFieldWrapper(input) {
    if (!input) return null;

    return (
      input.closest(".form-field") ||
      input.closest(".enquiry-field") ||
      input.closest(".contact-field") ||
      input.closest(".field") ||
      input.parentElement
    );
  }

  function setError(input, errorElement, message) {
    if (!input) return;

    const field = getFieldWrapper(input);

    if (field) {
      field.classList.add("has-error");
      field.classList.remove("has-success");
    }

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function setSuccess(input, errorElement) {
    if (!input) return;

    const field = getFieldWrapper(input);

    if (field) {
      field.classList.remove("has-error");
      field.classList.add("has-success");
    }

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function clearField(input, errorElement) {
    if (!input) return;

    const field = getFieldWrapper(input);

    if (field) {
      field.classList.remove("has-error");
      field.classList.remove("has-success");
    }

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function onlyNumbers(input, maxLength = 10) {
    if (!input) return;

    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > maxLength) {
      input.value = input.value.substring(0, maxLength);
    }
  }

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

  function setButtonLoading(button, text = "Sending...") {
    if (!button) return;

    button.disabled = true;

    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + text;
  }

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

  function clearFormStates(form) {
    if (!form) return;

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

  function resetForm(form) {
    if (!form) return;

    form.reset();
    clearFormStates(form);
  }

  /* =========================================================
     SEND FORM TO EMAILJS MAILER
     ========================================================= */

  function sendFormToMailer(data) {
    document.dispatchEvent(
      new CustomEvent("qmsiso:sendForm", {
        detail: data,
      }),
    );
  }

  /* =========================================================
     QMSISO QUOTE POPUP
     ========================================================= */

  const quoteModal = get("quoteModal");
  const closeQuote = get("closeQuote");
  const quoteForm = get("quoteForm");

  const quoteCertificate = quoteForm
    ? quoteForm.querySelector('select[name="certificate"]')
    : null;

  function openQuotePopup(certificate = "") {
    if (!quoteModal) {
      console.error("QMS ISO Certification: #quoteModal not found.");
      return;
    }

    if (quoteCertificate && certificate && certificate.trim() !== "") {
      let found = false;

      const certificateText = certificate.trim().toLowerCase();

      for (let i = 0; i < quoteCertificate.options.length; i++) {
        const option = quoteCertificate.options[i];

        const optionValue = option.value.trim().toLowerCase();
        const optionText = option.textContent.trim().toLowerCase();

        if (
          optionValue === certificateText ||
          optionText === certificateText ||
          optionValue.includes(certificateText) ||
          certificateText.includes(optionValue)
        ) {
          quoteCertificate.selectedIndex = i;
          found = true;
          break;
        }
      }

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
     ALL QUOTE BUTTONS
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

  quoteOpenButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const certificate = this.getAttribute("data-certificate") || "";

      openQuotePopup(certificate);
    });
  });

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
     GENERIC FORM DATA COLLECTOR
     ========================================================= */

  function collectFormData(form, formName) {
    if (!form) return null;

    const nameInput = getField(form, [
      "#fullName",
      "#quickFullName",
      "#contactName",
      '[name="name"]',
      '[name="full_name"]',
      '[name="fullname"]',
    ]);

    const businessInput = getField(form, [
      "#businessName",
      "#quickBusinessName",
      "#contactBusiness",
      '[name="business"]',
      '[name="business_name"]',
      '[name="company"]',
    ]);

    const phoneInput = getField(form, [
      "#mobileNumber",
      "#quickMobileNumber",
      "#contactMobile",
      '[name="phone"]',
      '[name="mobile"]',
      '[name="mobile_number"]',
    ]);

    const emailInput = getField(form, [
      "#email",
      "#userEmail",
      "#contactEmail",
      "#quickEmail",
      '[name="email"]',
      'input[type="email"]',
    ]);

    const certificateInput = getField(form, [
      "#certificate",
      "#quickCertificate",
      "#contactCertificate",
      '[name="certificate"]',
      '[name="certification"]',
    ]);

    const messageInput = getField(form, [
      "#message",
      "#contactMessage",
      "#quickMessage",
      '[name="message"]',
      "textarea",
    ]);

    return {
      form: form,
      formName: formName,

      name: nameInput ? nameInput.value.trim() : "",

      business: businessInput ? businessInput.value.trim() : "",

      phone: phoneInput ? phoneInput.value.trim() : "",

      email: emailInput ? emailInput.value.trim() : "",

      certificate: certificateInput ? certificateInput.value.trim() : "",

      message: messageInput ? messageInput.value.trim() : "",
    };
  }

  /* =========================================================
     QUOTE FORM
     ========================================================= */

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = collectFormData(quoteForm, "QMS ISO Contact");

      if (!data) return;

      const submitButton = getSubmitButton(quoteForm);

      setButtonLoading(submitButton, "Sending...");

      sendFormToMailer(data);
    });
  }

  /* =========================================================
     HERO QUOTE FORM
     ========================================================= */

  const heroQuoteForm = get("heroQuoteForm");

  if (heroQuoteForm) {
    const fullName = get("fullName");
    const businessName = get("businessName");
    const mobileNumber = get("mobileNumber");
    const heroEmail = get("heroEmail");
    const certificate = get("certificate");

    const fullNameError = get("fullNameError");
    const businessNameError = get("businessNameError");
    const mobileNumberError = get("mobileNumberError");
    const certificateError = get("certificateError");
    const heroEmailError = get("heroEmailError");

    function validateHeroName() {
      if (!fullName) return true;

      const value = fullName.value.trim();

      if (value === "") {
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
      if (!businessName) return true;

      const value = businessName.value.trim();

      if (value === "") {
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
      if (!mobileNumber) return true;

      const value = mobileNumber.value.trim();

      if (value === "") {
        setError(
          mobileNumber,
          mobileNumberError,
          "Please enter your mobile number.",
        );
        return false;
      }

      if (!/^[6-9][0-9]{9}$/.test(value)) {
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
      if (!certificate) return true;

      const value = certificate.value;

      if (value === "") {
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
        onlyNumbers(mobileNumber, 10);
      });
    }

    if (fullName) {
      fullName.addEventListener("blur", validateHeroName);
    }

    if (businessName) {
      businessName.addEventListener("blur", validateHeroBusiness);
    }

    if (mobileNumber) {
      mobileNumber.addEventListener("blur", validateHeroMobile);
    }

    if (certificate) {
      certificate.addEventListener("change", validateHeroCertificate);
    }

    heroQuoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const validName = validateHeroName();
      const validBusiness = validateHeroBusiness();
      const validMobile = validateHeroMobile();
      const validCertificate = validateHeroCertificate();
      const validEmail = validateEmail(heroEmail, heroEmailError);

      if (!validName || !validBusiness || !validMobile || !validCertificate || !validEmail) {
        return;
      }

      const data = collectFormData(heroQuoteForm, "QMS ISO Contact");

      if (!data) return;

      const submitButton = getSubmitButton(heroQuoteForm);

      setButtonLoading(submitButton, "Sending...");

      sendFormToMailer(data);
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
    const quickEmail = get("quickEmail");
    const quickCertificate = get("quickCertificate");

    const quickFullNameError = get("quickFullNameError");

    const quickBusinessNameError = get("quickBusinessNameError");

    const quickMobileNumberError = get("quickMobileNumberError");

    const quickCertificateError = get("quickCertificateError");
    const quickEmailError = get("quickEmailError");

    if (quickMobileNumber) {
      quickMobileNumber.addEventListener("input", function () {
        onlyNumbers(quickMobileNumber, 10);
      });
    }

    quickEnquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;

      [
        quickFullNameError,
        quickBusinessNameError,
        quickMobileNumberError,
        quickCertificateError,
      ].forEach(function (error) {
        if (error) {
          error.textContent = "";
        }
      });

      if (!validateEmail(quickEmail, quickEmailError)) isValid = false;

      if (!quickFullName || quickFullName.value.trim() === "") {
        if (quickFullNameError) {
          quickFullNameError.textContent = "Please enter your full name.";
        }

        isValid = false;
      } else if (quickFullName.value.trim().length < 3) {
        if (quickFullNameError) {
          quickFullNameError.textContent =
            "Name must contain at least 3 characters.";
        }

        isValid = false;
      }

      if (!quickBusinessName || quickBusinessName.value.trim() === "") {
        if (quickBusinessNameError) {
          quickBusinessNameError.textContent =
            "Please enter your business name.";
        }

        isValid = false;
      }

      const mobileValue = quickMobileNumber
        ? quickMobileNumber.value.trim()
        : "";

      if (mobileValue === "") {
        if (quickMobileNumberError) {
          quickMobileNumberError.textContent =
            "Please enter your mobile number.";
        }

        isValid = false;
      } else if (!/^[6-9][0-9]{9}$/.test(mobileValue)) {
        if (quickMobileNumberError) {
          quickMobileNumberError.textContent =
            "Please enter a valid 10-digit mobile number.";
        }

        isValid = false;
      }

      if (!quickCertificate || quickCertificate.value === "") {
        if (quickCertificateError) {
          quickCertificateError.textContent =
            "Please select an ISO certification.";
        }

        isValid = false;
      }

      if (!isValid) return;

      const data = collectFormData(quickEnquiryForm, "QMS ISO Contact");

      if (!data) return;

      const submitButton = getSubmitButton(quickEnquiryForm);

      setButtonLoading(submitButton, "Sending...");

      sendFormToMailer(data);
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
    const contactEmail = get("contactEmail");
    const contactCertificate = get("contactCertificate");

    const contactNameError = get("contactNameError");

    const contactBusinessError = get("contactBusinessError");

    const contactMobileError = get("contactMobileError");

    const contactCertificateError = get("contactCertificateError");
    const contactEmailError = get("contactEmailError");

    if (contactMobile) {
      contactMobile.addEventListener("input", function () {
        onlyNumbers(contactMobile, 10);
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
      ].forEach(function (error) {
        if (error) {
          error.textContent = "";
        }
      });

      if (!validateEmail(contactEmail, contactEmailError)) valid = false;

      if (!contactName || contactName.value.trim() === "") {
        if (contactNameError) {
          contactNameError.textContent = "Please enter your full name.";
        }

        valid = false;
      } else if (contactName.value.trim().length < 3) {
        if (contactNameError) {
          contactNameError.textContent = "Name must be at least 3 characters.";
        }

        valid = false;
      }

      if (!contactBusiness || contactBusiness.value.trim() === "") {
        if (contactBusinessError) {
          contactBusinessError.textContent = "Please enter your business name.";
        }

        valid = false;
      }

      if (contactMobile) {
        const mobile = contactMobile.value.trim();

        if (mobile === "") {
          if (contactMobileError) {
            contactMobileError.textContent = "Please enter your mobile number.";
          }

          valid = false;
        } else if (!/^[6-9][0-9]{9}$/.test(mobile)) {
          if (contactMobileError) {
            contactMobileError.textContent =
              "Please enter a valid 10-digit mobile number.";
          }

          valid = false;
        }
      }

      if (contactCertificate && contactCertificate.value === "") {
        if (contactCertificateError) {
          contactCertificateError.textContent =
            "Please select an ISO certification.";
        }

        valid = false;
      }

      if (!valid) return;

      const data = collectFormData(contactForm, "QMS ISO Contact");

      if (!data) return;

      const submitButton = getSubmitButton(contactForm);

      setButtonLoading(submitButton, "Sending...");

      sendFormToMailer(data);
    });
  }

  /* =========================================================
     NAVBAR ACTIVE LINKS
     ========================================================= */

  const navLinks = document.querySelectorAll(
    ".main-navbar .nav-link:not(.dropdown-toggle)",
  );

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  /* =========================================================
     DROPDOWN ACTIVE
     ========================================================= */

  const dropdownItems = document.querySelectorAll(
    ".main-navbar .dropdown-item",
  );

  document.querySelectorAll(".main-navbar .submenu-toggle").forEach(function (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const submenuItem = this.closest(".dropdown-submenu");
      if (!submenuItem) return;

      const isOpen = submenuItem.classList.toggle("submenu-open");
      this.setAttribute("aria-expanded", String(isOpen));
    });
  });

  dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (item.classList.contains("submenu-toggle")) return;
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
    });
  });

  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
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
     MOBILE NAVBAR CLOSE
     ========================================================= */

  dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (item.classList.contains("submenu-toggle")) return;
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
     FINAL CONSOLE CHECK
     ========================================================= */

  console.log("QMS ISO Certification script.js loaded successfully.");
});
