/* =========================================================
   QMSISO WEBSITE - CLEAN COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const get = (id) => document.getElementById(id);

  function setError(input, errorElement, message) {
    if (!input || !errorElement) return;

    const field =
      input.closest(".form-field") ||
      input.closest(".enquiry-field") ||
      input.closest(".contact-field");

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
      input.closest(".contact-field");

    if (field) {
      field.classList.remove("has-error");
      field.classList.add("has-success");
    }

    errorElement.textContent = "";
  }

  function clearField(input, errorElement) {
    if (!input || !errorElement) return;

    const field =
      input.closest(".form-field") ||
      input.closest(".enquiry-field") ||
      input.closest(".contact-field");

    if (field) {
      field.classList.remove("has-error");
      field.classList.remove("has-success");
    }

    errorElement.textContent = "";
  }

  function onlyNumbers(input, maxLength = 10) {
    if (!input) return;

    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > maxLength) {
      input.value = input.value.substring(0, maxLength);
    }
  }

  /* =====================================================
       QMSISO QUOTE POPUP
       SINGLE POPUP SYSTEM
    ===================================================== */

  const quoteModal = get("quoteModal");
  const closeQuote = get("closeQuote");
  const quoteCertificate = get("quoteCertificate");

  /* =====================================================
       OPEN QUOTE POPUP
    ===================================================== */

  function openQuotePopup(certificate = "") {
    if (!quoteModal) {
      console.error("QMSISO: #quoteModal not found.");
      return;
    }

    /* ---------------------------------------------
           SELECT CERTIFICATE IF SUPPLIED
        --------------------------------------------- */

    if (quoteCertificate && certificate && certificate.trim() !== "") {
      let found = false;

      for (let i = 0; i < quoteCertificate.options.length; i++) {
        const option = quoteCertificate.options[i];

        if (option.value.toLowerCase() === certificate.toLowerCase()) {
          quoteCertificate.selectedIndex = i;
          found = true;
          break;
        }
      }

      /* Add temporary option if not found */

      if (!found) {
        const newOption = document.createElement("option");

        newOption.value = certificate;
        newOption.textContent = certificate;
        newOption.selected = true;

        quoteCertificate.appendChild(newOption);
      }
    }

    /* ---------------------------------------------
           SHOW POPUP
        --------------------------------------------- */

    quoteModal.classList.add("show");

    quoteModal.style.display = "flex";

    quoteModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  /* =====================================================
       CLOSE QUOTE POPUP
    ===================================================== */

  function closeQuotePopup() {
    if (!quoteModal) return;

    quoteModal.classList.remove("show");

    quoteModal.style.display = "none";

    quoteModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  /* =====================================================
       ALL QUOTE OPEN BUTTONS
    ===================================================== */

  const quoteOpenButtons = document.querySelectorAll(
    "#openQuote, " +
      "#openQuoteHero, " +
      "#heroQuoteBtn, " +
      "#requestQuoteBtn, " +
      "#complianceQuoteBtn, " +
      "#finalQuoteBtn, " +
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

  /* =====================================================
       CLOSE BUTTON
    ===================================================== */

  if (closeQuote) {
    closeQuote.addEventListener("click", closeQuotePopup);
  }

  /* =====================================================
       CLICK OUTSIDE POPUP
    ===================================================== */

  if (quoteModal) {
    quoteModal.addEventListener("click", function (event) {
      if (event.target === quoteModal) {
        closeQuotePopup();
      }
    });
  }

  /* =====================================================
       ESCAPE KEY
    ===================================================== */

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      quoteModal &&
      quoteModal.classList.contains("show")
    ) {
      closeQuotePopup();
    }
  });

  /* =====================================================
       POPUP QUOTE FORM
    ===================================================== */

  const quoteForm = get("quoteForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitButton = quoteForm.querySelector(".submit-btn");

      if (!submitButton) return;

      submitButton.disabled = true;

      submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      /* -----------------------------------------
                   DEMO SUBMISSION
                   Replace later with EmailJS / PHP
                ----------------------------------------- */

      setTimeout(function () {
        alert(
          "Thank you! Your inquiry has been submitted. QMSISO team will contact you shortly.",
        );

        quoteForm.reset();

        submitButton.disabled = false;

        submitButton.innerHTML =
          'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';

        closeQuotePopup();
      }, 1000);
    });
  }

  /* =====================================================
       HERO QUOTE FORM
    ===================================================== */

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

    /* ---------------------------------------------
           NAME VALIDATION
        --------------------------------------------- */

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

    /* ---------------------------------------------
           BUSINESS VALIDATION
        --------------------------------------------- */

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

    /* ---------------------------------------------
           MOBILE VALIDATION
        --------------------------------------------- */

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

    /* ---------------------------------------------
           CERTIFICATE VALIDATION
        --------------------------------------------- */

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

    /* ---------------------------------------------
           MOBILE ONLY NUMBERS
        --------------------------------------------- */

    if (mobileNumber) {
      mobileNumber.addEventListener("input", function () {
        onlyNumbers(mobileNumber, 10);
      });
    }

    /* ---------------------------------------------
           LIVE VALIDATION
        --------------------------------------------- */

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

    /* ---------------------------------------------
           HERO FORM SUBMIT
        --------------------------------------------- */

    heroQuoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const validName = validateHeroName();

      const validBusiness = validateHeroBusiness();

      const validMobile = validateHeroMobile();

      const validCertificate = validateHeroCertificate();

      if (!validName || !validBusiness || !validMobile || !validCertificate) {
        return;
      }

      const submitButton = heroQuoteForm.querySelector(".form-submit-btn");

      if (!submitButton) return;

      submitButton.disabled = true;

      submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

      setTimeout(function () {
        heroQuoteForm.reset();

        heroQuoteForm.querySelectorAll(".form-field").forEach(function (field) {
          field.classList.remove("has-error", "has-success");
        });

        heroQuoteForm.querySelectorAll(".form-error").forEach(function (error) {
          error.textContent = "";
        });

        submitButton.disabled = false;

        submitButton.innerHTML =
          'Request Consultation <i class="fa-solid fa-arrow-right"></i>';

        alert("Thank you! Your consultation request has been submitted.");
      }, 1000);
    });
  }

  /* =====================================================
       QUICK ENQUIRY FORM
    ===================================================== */

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

    /* ---------------------------------------------
           MOBILE ONLY NUMBERS
        --------------------------------------------- */

    if (quickMobileNumber) {
      quickMobileNumber.addEventListener("input", function () {
        onlyNumbers(quickMobileNumber, 10);
      });
    }

    /* ---------------------------------------------
           QUICK ENQUIRY SUBMIT
        --------------------------------------------- */

    quickEnquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;

      /* CLEAR ERRORS */

      if (quickFullNameError) quickFullNameError.textContent = "";

      if (quickBusinessNameError) quickBusinessNameError.textContent = "";

      if (quickMobileNumberError) quickMobileNumberError.textContent = "";

      if (quickCertificateError) quickCertificateError.textContent = "";

      /* NAME */

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

      /* BUSINESS */

      if (!quickBusinessName || quickBusinessName.value.trim() === "") {
        if (quickBusinessNameError) {
          quickBusinessNameError.textContent =
            "Please enter your business name.";
        }

        isValid = false;
      }

      /* MOBILE */

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

      /* CERTIFICATE */

      if (!quickCertificate || quickCertificate.value === "") {
        if (quickCertificateError) {
          quickCertificateError.textContent =
            "Please select an ISO certification.";
        }

        isValid = false;
      }

      /* STOP IF INVALID */

      if (!isValid) return;

      const submitButton = quickEnquiryForm.querySelector(
        ".enquiry-submit-btn",
      );

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      setTimeout(function () {
        quickEnquiryForm.reset();

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML =
            'Submit Enquiry <i class="fa-solid fa-arrow-right"></i>';
        }

        alert("Thank you! Your enquiry has been submitted.");
      }, 1000);
    });
  }

  /* =====================================================
       CONTACT FORM
    ===================================================== */

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

    const contactMessageError = get("contactMessageError");

    /* ---------------------------------------------
           MOBILE ONLY NUMBERS
        --------------------------------------------- */

    if (contactMobile) {
      contactMobile.addEventListener("input", function () {
        onlyNumbers(contactMobile, 10);
      });
    }

    /* ---------------------------------------------
           CONTACT SUBMIT
        --------------------------------------------- */

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;

      /* CLEAR ERRORS */

      [
        contactNameError,
        contactBusinessError,
        contactMobileError,
        contactCertificateError,
        contactMessageError,
      ].forEach(function (error) {
        if (error) {
          error.textContent = "";
        }
      });

      /* NAME */

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

      /* BUSINESS */

      if (!contactBusiness || contactBusiness.value.trim() === "") {
        if (contactBusinessError) {
          contactBusinessError.textContent = "Please enter your business name.";
        }

        valid = false;
      }

      /* MOBILE */

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

      /* CERTIFICATE */

      if (contactCertificate && contactCertificate.value === "") {
        if (contactCertificateError) {
          contactCertificateError.textContent =
            "Please select an ISO certification.";
        }

        valid = false;
      }

      /* MESSAGE */

      if (contactMessage && contactMessage.value.trim() === "") {
        if (contactMessageError) {
          contactMessageError.textContent = "Please enter your message.";
        }

        valid = false;
      }

      /* STOP IF INVALID */

      if (!valid) return;

      const submitButton = contactForm.querySelector(".contact-submit-btn");

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      setTimeout(function () {
        contactForm.reset();

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Send Inquiry';
        }

        alert(
          "Thank you! Your inquiry has been submitted. Our team will contact you shortly.",
        );
      }, 1000);
    });
  }

  /* =====================================================
       NAVBAR ACTIVE LINKS
    ===================================================== */

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

  /* =====================================================
       DROPDOWN LINKS ACTIVE
    ===================================================== */

  const dropdownItems = document.querySelectorAll(
    ".main-navbar .dropdown-item",
  );

  dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
    });
  });

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

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
    });
  });

  /* =====================================================
       CONSOLE CHECK
    ===================================================== */

  console.log(
    "QMSISO JavaScript loaded successfully - Single popup system active.",
  );
});
