/* =========================================================
   QMSISO - PHP MAILER (send-mail.php)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const MAIL_ENDPOINT = "send-mail.php";

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

  function restoreButton(form) {
    const button = getSubmitButton(form);
    if (!button) return;

    button.disabled = false;

    switch (form.id) {
      case "heroQuoteForm":
        button.innerHTML =
          'Request Consultation <i class="fa-solid fa-arrow-right"></i>';
        break;
      case "quickEnquiryForm":
        button.innerHTML =
          'Submit Enquiry <i class="fa-solid fa-arrow-right"></i>';
        break;
      default:
        button.innerHTML =
          'Submit Inquiry <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  function resetForm(form) {
    if (!form) return;
    form.reset();
    form.querySelectorAll(".has-error, .has-success").forEach(function (f) {
      f.classList.remove("has-error", "has-success");
    });
    form
      .querySelectorAll(
        ".form-error, .contact-error, .enquiry-error, .error-message",
      )
      .forEach(function (e) {
        e.textContent = "";
      });
  }

  function closeQuotePopup() {
    const quoteModal = document.getElementById("quoteModal");
    if (!quoteModal) return;
    quoteModal.classList.remove("show");
    quoteModal.style.display = "none";
    quoteModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- PROFESSIONAL POPUP (success / error) ---------- */
  function injectPopupStyles() {
    if (document.getElementById("qmsisoPopupStyles")) return;
    const css = `
      .qm-popup-overlay{position:fixed;inset:0;background:rgba(11,31,58,.65);display:flex;align-items:center;justify-content:center;z-index:2147483000;padding:16px;opacity:0;transition:opacity .25s ease;font-family:"Poppins",sans-serif}
      .qm-popup-overlay.qm-show{opacity:1}
      .qm-popup-box{background:#fff;width:100%;max-width:420px;border-radius:14px;padding:38px 30px 30px;text-align:center;position:relative;border-top:5px solid #f2a51a;box-shadow:0 20px 50px rgba(0,0,0,.3);transform:translateY(20px) scale(.96);transition:transform .25s ease}
      .qm-popup-overlay.qm-show .qm-popup-box{transform:translateY(0) scale(1)}
      .qm-popup-icon{width:72px;height:72px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:700;color:#fff;background:#1fa764}
      .qm-popup-error .qm-popup-icon{background:#d9534f}
      .qm-popup-box h3{margin:0 0 10px;font-size:22px;color:#0b1f3a;font-weight:700}
      .qm-popup-box p{margin:0 0 6px;font-size:14.5px;line-height:1.7;color:#26364f}
      .qm-popup-sub{color:#6b7a90 !important;font-size:13px !important}
      .qm-popup-btn{margin-top:22px;background:#f2a51a;color:#0b1f3a;border:0;border-radius:8px;padding:12px 38px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .2s}
      .qm-popup-btn:hover{background:#df9208}
      .qm-popup-close{position:absolute;top:10px;right:14px;background:none;border:0;font-size:26px;line-height:1;color:#8793a5;cursor:pointer}
      .qm-popup-close:hover{color:#0b1f3a}
    `;
    const style = document.createElement("style");
    style.id = "qmsisoPopupStyles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showPopup(type, title, lines) {
    injectPopupStyles();

    const old = document.getElementById("qmsisoPopup");
    if (old) old.remove();

    const isError = type === "error";
    const overlay = document.createElement("div");
    overlay.id = "qmsisoPopup";
    overlay.className = "qm-popup-overlay" + (isError ? " qm-popup-error" : "");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="qm-popup-box">' +
      '<button type="button" class="qm-popup-close" aria-label="Close">&times;</button>' +
      '<div class="qm-popup-icon">' +
      (isError ? "!" : "&#10003;") +
      "</div>" +
      "<h3>" +
      title +
      "</h3>" +
      lines +
      '<button type="button" class="qm-popup-btn">' +
      (isError ? "Try Again" : "OK") +
      "</button>" +
      "</div>";

    function close() {
      overlay.classList.remove("qm-show");
      document.removeEventListener("keydown", onKey);
      setTimeout(function () {
        overlay.remove();
      }, 250);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector(".qm-popup-close").addEventListener("click", close);
    overlay.querySelector(".qm-popup-btn").addEventListener("click", close);
    document.addEventListener("keydown", onKey);

    document.body.appendChild(overlay);
    requestAnimationFrame(function () {
      overlay.classList.add("qm-show");
    });
  }

  function showSuccess(formName) {
    const safe = String(formName || "Your enquiry").replace(/[<>&]/g, "");
    showPopup(
      "success",
      "Thank You!",
      "<p>" +
        safe +
        " has been submitted successfully.</p>" +
        "<p>Our QMSISO team will contact you shortly.</p>" +
        '<p class="qm-popup-sub">We usually respond within one business day.</p>',
    );
  }

  function showError(error) {
    console.error("QMSISO mail failed:", error);
    showPopup(
      "error",
      "Something Went Wrong",
      "<p>Your enquiry could not be sent right now.</p>" +
        '<p class="qm-popup-sub">Please check your details and try again.</p>',
    );
  }

  async function sendQMSISOEmail(data) {
    try {
      const body = new URLSearchParams({
        form_name: data.formName || "QMSISO Website Enquiry",
        name: data.name || "",
        business: data.business || "",
        phone: data.phone || "",
        email: data.email || "",
        certificate: data.certificate || "",
        message: data.message || "",
      });

      const res = await fetch(MAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Mail failed");
      }

      return { success: true, response: json };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  document.addEventListener("qmsiso:sendForm", async function (event) {
    const data = event.detail;

    if (!data || !data.form) {
      console.error("QMSISO: Form data missing.");
      return;
    }

    const form = data.form;
    const result = await sendQMSISOEmail(data);

    if (result.success) {
      resetForm(form);
      restoreButton(form);
      showSuccess(data.formName || "Your enquiry");

      if (form.id === "quoteForm") {
        closeQuotePopup();
      }
      return;
    }

    restoreButton(form);
    showError(result.error);
  });
});
