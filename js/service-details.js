
/* =========================================================
   SERVICE DATA
========================================================= */

const services = {
  "iso-9001": {
    eyebrow: "Quality Management System",
    title: "ISO 9001:2015 Certification",
    intro:
      "ISO 9001 is an internationally recognized quality management system standard that helps organizations improve processes, customer satisfaction and continual improvement.",
    description:
      "ISO 9001:2015 provides a systematic framework for managing quality and improving organizational performance. It helps organizations establish effective processes, identify risks, monitor performance and consistently meet customer and applicable requirements.",
    icon: "fa-solid fa-award",
    highlightTitle: "Build a Strong Quality Management System",
    highlightText:
      "Create consistent processes, improve customer satisfaction and develop a culture of continual improvement.",
    focusAreas: [
      "Quality planning and process control",
      "Customer-focused operations",
      "Corrective action and continual improvement",
      "Documented management processes",
    ],
  },

  "iso-14001": {
    eyebrow: "Environmental Management System",
    title: "ISO 14001:2015 Certification",
    intro:
      "ISO 14001 helps organizations manage environmental responsibilities systematically while improving environmental performance and compliance.",
    description:
      "ISO 14001:2015 provides a framework for organizations to identify environmental aspects, control environmental impacts, meet applicable obligations and continually improve their environmental performance.",
    icon: "fa-solid fa-leaf",
    highlightTitle: "Improve Environmental Performance",
    highlightText:
      "Manage environmental responsibilities through structured processes, controls and continual improvement.",
    focusAreas: [
      "Environmental aspects and impacts",
      "Legal and compliance evaluation",
      "Operational environmental controls",
      "Environmental performance monitoring",
    ],
  },

  "iso-45001": {
    eyebrow: "Occupational Health & Safety",
    title: "ISO 45001:2018 Certification",
    intro:
      "ISO 45001 provides organizations with a framework for managing occupational health and safety risks and improving workplace safety.",
    description:
      "ISO 45001:2018 helps organizations identify hazards, assess risks, establish operational controls and improve occupational health and safety performance.",
    icon: "fa-solid fa-helmet-safety",
    highlightTitle: "Create a Safer Workplace",
    highlightText:
      "Identify workplace hazards and implement effective controls to protect workers and improve safety performance.",
    focusAreas: [
      "Hazard identification and risk assessment",
      "Worker safety and participation",
      "Operational health and safety controls",
      "Incident and continual improvement processes",
    ],
  },

  "iso-27001": {
    eyebrow: "Information Security Management",
    title: "ISO/IEC 27001:2022 Certification",
    intro:
      "ISO/IEC 27001 provides a systematic approach for managing information security risks and protecting valuable information.",
    description:
      "ISO/IEC 27001:2022 helps organizations establish, implement, maintain and continually improve an information security management system based on risk management.",
    icon: "fa-solid fa-shield-halved",
    highlightTitle: "Protect Your Information",
    highlightText:
      "Establish a structured information security management system to manage risks and protect organizational information.",
    focusAreas: [
      "Information security risk management",
      "Security controls and policies",
      "Asset and access management",
      "Security monitoring and continual improvement",
    ],
  },

  "iso-22000": {
    eyebrow: "Food Safety Management",
    title: "ISO 22000:2018 Certification",
    intro:
      "ISO 22000 provides a food safety management system framework for organizations involved in the food chain.",
    description:
      "ISO 22000:2018 helps organizations identify food safety hazards, establish controls and maintain effective communication throughout the food chain.",
    icon: "fa-solid fa-utensils",
    highlightTitle: "Strengthen Food Safety",
    highlightText:
      "Manage food safety risks through systematic controls and effective food safety management processes.",
    focusAreas: [
      "Food safety hazard identification",
      "Operational prerequisite programs",
      "Hazard control and monitoring",
      "Food safety communication and improvement",
    ],
  },

  "iso-13485": {
    eyebrow: "Medical Devices Quality Management",
    title: "ISO 13485:2016 Certification",
    intro:
      "ISO 13485 specifies quality management system requirements for organizations involved in the medical device industry.",
    description:
      "ISO 13485:2016 focuses on maintaining effective quality management processes for the design, production, storage, distribution and servicing of medical devices.",
    icon: "fa-solid fa-hospital",
    highlightTitle: "Quality for Medical Devices",
    highlightText:
      "Develop structured quality processes supporting regulatory and customer requirements for medical devices.",
    focusAreas: [
      "Medical device quality management",
      "Risk management processes",
      "Product realization and controls",
      "Regulatory and customer requirements",
    ],
  },

  "iso-50001": {
    eyebrow: "Energy Management System",
    title: "ISO 50001:2018 Certification",
    intro:
      "ISO 50001 helps organizations establish systems for improving energy performance, energy efficiency and energy management.",
    description:
      "ISO 50001:2018 provides a framework for organizations to develop an energy policy, establish objectives and continually improve energy performance.",
    icon: "fa-solid fa-bolt",
    highlightTitle: "Improve Energy Performance",
    highlightText:
      "Create a structured energy management system to monitor, control and improve energy performance.",
    focusAreas: [
      "Energy planning and review",
      "Energy performance monitoring",
      "Operational energy controls",
      "Continual energy improvement",
    ],
  },

  "iso-20000-1": {
    eyebrow: "IT Service Management",
    title: "ISO/IEC 20000-1:2018 Certification",
    intro:
      "ISO/IEC 20000-1 provides requirements for establishing, implementing and improving an IT service management system.",
    description:
      "The standard helps organizations manage IT services effectively and deliver consistent services that meet customer and business requirements.",
    icon: "fa-solid fa-server",
    highlightTitle: "Improve IT Service Management",
    highlightText:
      "Establish structured processes for delivering reliable, consistent and effective IT services.",
    focusAreas: [
      "Service management processes",
      "Service planning and delivery",
      "Performance monitoring",
      "Continual service improvement",
    ],
  },

  "iso-37001": {
    eyebrow: "Anti-Bribery Management System",
    title: "ISO 37001:2025 Certification",
    intro:
      "ISO 37001 provides a management system framework to help organizations prevent, detect and address bribery risks.",
    description:
      "The standard supports organizations in establishing anti-bribery policies, controls, procedures and monitoring mechanisms appropriate to their operations.",
    icon: "fa-solid fa-scale-balanced",
    highlightTitle: "Strengthen Anti-Bribery Controls",
    highlightText:
      "Develop structured controls and processes to manage bribery-related risks within an organization.",
    focusAreas: [
      "Anti-bribery risk assessment",
      "Policies and controls",
      "Due diligence processes",
      "Monitoring and continual improvement",
    ],
  },

  "iso-22301": {
    eyebrow: "Business Continuity Management",
    title: "ISO 22301:2019 Certification",
    intro:
      "ISO 22301 helps organizations prepare for, respond to and recover from disruptive incidents.",
    description:
      "ISO 22301:2019 provides a framework for establishing and maintaining a business continuity management system that supports organizational resilience.",
    icon: "fa-solid fa-business-time",
    highlightTitle: "Build Business Resilience",
    highlightText:
      "Prepare your organization to respond effectively to disruptions and maintain important business activities.",
    focusAreas: [
      "Business impact analysis",
      "Continuity planning",
      "Emergency response processes",
      "Recovery and continual improvement",
    ],
  },

  "iso-39001": {
    eyebrow: "Road Traffic Safety Management",
    title: "ISO 39001:2012 Certification",
    intro:
      "ISO 39001 provides a management system framework for organizations working to improve road traffic safety.",
    description:
      "The standard helps organizations identify road traffic safety risks and establish processes to reduce the likelihood and severity of road traffic incidents.",
    icon: "fa-solid fa-road",
    highlightTitle: "Improve Road Traffic Safety",
    highlightText:
      "Implement systematic processes to identify and manage road traffic safety risks.",
    focusAreas: [
      "Road traffic safety risk assessment",
      "Safety objectives and planning",
      "Operational safety controls",
      "Performance monitoring and improvement",
    ],
  },

  "iso-55001": {
    eyebrow: "Asset Management System",
    title: "ISO 55001:2024 Certification",
    intro:
      "ISO 55001 provides requirements for establishing an effective asset management system.",
    description:
      "The standard helps organizations manage assets throughout their lifecycle while balancing performance, risk and cost.",
    icon: "fa-solid fa-building",
    highlightTitle: "Manage Assets Effectively",
    highlightText:
      "Improve asset performance and lifecycle management through structured processes.",
    focusAreas: [
      "Asset management planning",
      "Asset lifecycle management",
      "Risk and performance management",
      "Continual improvement",
    ],
  },

  gmp: {
    eyebrow: "Good Manufacturing Practices",
    title: "Good Manufacturing Practices (GMP)",
    intro:
      "GMP provides principles and practices that support consistent production and quality control in manufacturing environments.",
    description:
      "Good Manufacturing Practices help organizations maintain controlled production processes, suitable facilities, trained personnel and effective quality controls.",
    icon: "fa-solid fa-industry",
    highlightTitle: "Strengthen Manufacturing Quality",
    highlightText:
      "Establish controlled manufacturing practices that support product quality and consistency.",
    focusAreas: [
      "Production process controls",
      "Personnel and hygiene practices",
      "Facility and equipment controls",
      "Quality control and documentation",
    ],
  },

  halal: {
    eyebrow: "Food & Product Compliance",
    title: "Halal Certification",
    intro:
      "Halal certification helps demonstrate that applicable products, ingredients and processes meet relevant Halal requirements.",
    description:
      "A structured Halal certification process reviews ingredients, sourcing, production practices, handling and relevant documentation. It can help food, beverage, cosmetic and other eligible businesses build confidence with customers and access markets that require Halal assurance.",
    icon: "fa-solid fa-certificate",
    highlightTitle: "Build Confidence with Halal Assurance",
    highlightText:
      "Review products and processes against applicable Halal requirements with clear documentation and practical implementation support.",
    focusAreas: [
      "Ingredient and supplier review",
      "Production and handling practices",
      "Facility and process assessment",
      "Documentation and ongoing compliance support",
    ],
  },

  "ce-marking": {
    eyebrow: "Product Compliance",
    title: "CE Marking",
    intro:
      "CE marking demonstrates that applicable products meet relevant European Union requirements for health, safety and environmental protection.",
    description:
      "CE marking involves assessing applicable product requirements, technical documentation, conformity assessment and other relevant compliance activities.",
    icon: "fa-solid fa-certificate",
    highlightTitle: "Support Product Compliance",
    highlightText:
      "Navigate applicable product conformity requirements with structured compliance support.",
    focusAreas: [
      "Applicable product requirements",
      "Conformity assessment",
      "Technical documentation",
      "Compliance and conformity support",
    ],
  },

  haccp: {
    eyebrow: "Food Safety System",
    title: "HACCP Certification",
    intro:
      "HACCP is a systematic approach for identifying, evaluating and controlling food safety hazards.",
    description:
      "The HACCP approach focuses on preventing food safety problems through hazard analysis and control of critical points throughout relevant food processes.",
    icon: "fa-solid fa-clipboard-check",
    highlightTitle: "Control Food Safety Hazards",
    highlightText:
      "Identify critical food safety risks and establish controls to help prevent unsafe food production.",
    focusAreas: [
      "Hazard analysis",
      "Critical control points",
      "Monitoring procedures",
      "Corrective and verification actions",
    ],
  },

  kosher: {
    eyebrow: "Product & Food Compliance",
    title: "Kosher Certification",
    intro:
      "Kosher certification confirms that applicable products and processes meet defined kosher requirements.",
    description:
      "Kosher certification can support organizations seeking to demonstrate compliance with kosher requirements for relevant ingredients, products and production processes.",
    icon: "fa-solid fa-circle-check",
    highlightTitle: "Support Kosher Compliance",
    highlightText:
      "Establish processes supporting kosher requirements for applicable products and production activities.",
    focusAreas: [
      "Ingredient and material review",
      "Production process evaluation",
      "Facility and process requirements",
      "Ongoing compliance support",
    ],
  },

  rohs: {
    eyebrow: "Environmental Product Compliance",
    title: "RoHS Compliance",
    intro:
      "RoHS addresses the restriction of certain hazardous substances in electrical and electronic equipment.",
    description:
      "RoHS compliance activities can help organizations evaluate applicable products, materials and components against relevant substance restriction requirements.",
    icon: "fa-solid fa-recycle",
    highlightTitle: "Support Product Compliance",
    highlightText:
      "Evaluate applicable products and materials against relevant restricted substance requirements.",
    focusAreas: [
      "Restricted substance evaluation",
      "Material and component assessment",
      "Supplier documentation",
      "Compliance documentation and monitoring",
    ],
  },
};

/* =========================================================
   GET SERVICE FROM URL
========================================================= */

const params = new URLSearchParams(window.location.search);

const serviceKey = params.get("service") || "iso-9001";

/* =========================================================
   SELECT SERVICE
========================================================= */

const selectedService = services[serviceKey] || services["iso-9001"];

/* =========================================================
   SERVICE DETAIL ELEMENT
========================================================= */

const serviceDetail = document.getElementById("serviceDetail");

/* =========================================================
   PAGE TITLE
========================================================= */

document.title = `${selectedService.title} | QMS ISO Certification`;

/* =========================================================
   RENDER SERVICE
========================================================= */

if (serviceDetail) {
  serviceDetail.innerHTML = `

    <!-- ================= SERVICE HERO ================= -->

    <section class="service-detail-hero">

      <div class="service-detail-container">

        <div class="service-breadcrumb">

          <a href="index.html">
            <i class="fa-solid fa-house"></i>
            Home
          </a>

          <span>/</span>

          <a href="index.html#services">
            Services
          </a>

          <span>/</span>

          <span>
            ${selectedService.title}
          </span>

        </div>


        <div class="service-hero-grid">

          <div class="service-hero-content">

            <div class="service-eyebrow">
              ${selectedService.eyebrow}
            </div>

            <h1 class="service-detail-title">
              ${selectedService.title}
            </h1>

            <p class="service-detail-intro">
              ${selectedService.intro}
            </p>


            <div class="service-badges">

              <span class="service-badge">
                <i class="fa-solid fa-globe"></i>
                Global Service Support
              </span>

              <span class="service-badge">
                <i class="fa-solid fa-handshake"></i>
                Consultation Based
              </span>

              <span class="service-badge">
                <i class="fa-solid fa-shield-halved"></i>
                Professional Support
              </span>

            </div>


            <div class="service-hero-buttons">

              <a
                href="#contact-service"
                class="service-primary-btn"
              >
                Request Consultation
                <i class="fa-solid fa-arrow-right"></i>
              </a>

              <a
                href="index.html#services"
                class="service-secondary-btn"
              >
                View All Services
                <i class="fa-solid fa-list"></i>
              </a>

            </div>

          </div>


          <div class="service-highlight-card">

            <div class="service-highlight-icon">
              <i class="${selectedService.icon}"></i>
            </div>

            <h3>
              ${selectedService.highlightTitle}
            </h3>

            <p>
              ${selectedService.highlightText}
            </p>

          </div>

        </div>

      </div>

    </section>



    <!-- ================= ABOUT SERVICE ================= -->

    <section class="service-section service-section-light">

      <div class="service-section-container">

        <div class="service-about-grid">

          <div class="service-about-content">

            <span class="service-section-label">
              ABOUT THE SERVICE
            </span>

            <h2>
              Professional
              <span>Certification Support</span>
            </h2>

            <p>
              ${selectedService.description}
            </p>

            <p>
              Our approach focuses on understanding
              your organization's requirements and
              helping you establish practical and
              effective management processes.
            </p>

            <p>
              The objective is to support your
              organization in developing a structured
              system that can be maintained and
              continually improved.
            </p>

          </div>


          <div class="service-about-visual">

            <div class="service-visual-content">

              <div class="service-visual-icon">
                <i class="${selectedService.icon}"></i>
              </div>

              <h3>
                ${selectedService.title}
              </h3>

              <p>
                Structured certification and
                compliance support for your
                organization.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>



    <!-- ================= KEY AREAS ================= -->

    <section class="service-section service-section-gray">

      <div class="service-section-container">

        <div class="service-section-header">

          <span class="service-section-label">
            KEY AREAS
          </span>

          <h2>
            What This Service Covers
          </h2>

          <p>
            Important areas that organizations can
            focus on while implementing and maintaining
            this system.
          </p>

        </div>


        <div class="service-focus-grid">

          ${selectedService.focusAreas
      .map(
        (area) => `

                <div class="service-focus-card">

                  <div class="service-focus-icon">
                    <i class="fa-solid fa-check"></i>
                  </div>

                  <div>

                    <h3>
                      ${area}
                    </h3>

                    <p>
                      Structured processes and
                      appropriate controls can help
                      organizations manage this area
                      effectively.
                    </p>

                  </div>

                </div>

              `,
      )
      .join("")}

        </div>

      </div>

    </section>



    <!-- ================= PROCESS ================= -->

    <section class="service-section service-section-light">

      <div class="service-section-container">

        <div class="service-section-header">

          <span class="service-section-label">
            OUR APPROACH
          </span>

          <h2>
            Certification Support Process
          </h2>

          <p>
            A structured approach designed to understand
            your requirements and support your
            certification journey.
          </p>

        </div>


        <div class="service-process">

          <div class="service-process-grid">

            <div class="service-process-card">

              <div class="service-process-number">
                01
              </div>

              <h3>
                Requirement Review
              </h3>

              <p>
                Understand your organization's
                requirements, scope and objectives.
              </p>

            </div>


            <div class="service-process-card">

              <div class="service-process-number">
                02
              </div>

              <h3>
                System Preparation
              </h3>

              <p>
                Support the development and
                implementation of relevant processes.
              </p>

            </div>


            <div class="service-process-card">

              <div class="service-process-number">
                03
              </div>

              <h3>
                Assessment
              </h3>

              <p>
                Review the implemented system
                against applicable requirements.
              </p>

            </div>


            <div class="service-process-card">

              <div class="service-process-number">
                04
              </div>

              <h3>
                Continual Improvement
              </h3>

              <p>
                Maintain and improve the management
                system over time.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>



    <!-- ================= CTA ================= -->

    <section
      class="service-section service-section-gray"
      id="contact-service"
    >

      <div class="service-section-container">

        <div
          style="
            max-width:850px;
            margin:auto;
            text-align:center;
          "
        >

          <span class="service-section-label">
            GET STARTED
          </span>

          <h2
            style="
              color:var(--service-navy);
              font-size:36px;
              margin:0 0 15px;
            "
          >
            Need Help With
            ${selectedService.title}?
          </h2>

          <p
            style="
              color:var(--service-muted);
              font-size:15px;
              line-height:1.8;
              margin:0 0 28px;
            "
          >
            Contact our team to discuss your
            organization's requirements and get
            professional guidance for your
            certification or compliance journey.
          </p>

          <button
            type="button"
            class="hero-main-btn"
            onclick="openServiceQuote()"
          >
            Request Consultation
            <i class="fa-solid fa-arrow-right"></i>
          </button>

        </div>

      </div>

    </section>

  `;
}

/* =========================================================
   QUOTE POPUP
   Supports the ID used in your HTML: quoteModal
========================================================= */

function getQuoteOverlay() {
  return (
    document.getElementById("quoteOverlay") ||
    document.getElementById("quoteModal")
  );
}

function openQuotePopup() {
  const overlay = getQuoteOverlay();

  if (!overlay) {
    return;
  }

  overlay.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeQuotePopup() {
  const overlay = getQuoteOverlay();

  if (!overlay) {
    return;
  }

  overlay.classList.remove("active");

  document.body.style.overflow = "";
}

/* =========================================================
   SERVICE QUOTE
========================================================= */

function openServiceQuote() {
  const overlay = getQuoteOverlay();

  if (!overlay) {
    return;
  }

  overlay.classList.add("active");

  document.body.style.overflow = "hidden";

  /*
     Your current HTML has:

     <select name="certificate">

     It does NOT have id="quoteService".

     So we select it using name="certificate".
  */

  const certificateSelect = document.querySelector(
    '#quoteForm select[name="certificate"]',
  );

  if (certificateSelect) {
    let serviceName = selectedService.title;

    /*
       Try to match ISO number
       with the available options.
    */

    const isoMatch = serviceName.match(/ISO(?:\/IEC)?\s*[\d-]+/i);

    if (isoMatch) {
      const isoName = isoMatch[0].toUpperCase();

      const option = Array.from(certificateSelect.options).find(
        (option) => option.value.toUpperCase() === isoName,
      );

      if (option) {
        certificateSelect.value = option.value;

        return;
      }
    }

    /*
       GMP / HACCP / Other
    */

    const lowerTitle = serviceName.toLowerCase();

    if (lowerTitle.includes("gmp")) {
      const option = Array.from(certificateSelect.options).find(
        (option) => option.value.toLowerCase() === "gmp",
      );

      if (option) {
        certificateSelect.value = option.value;
      }
    } else {
      /*
         Services not present in the
         current select list go to Other.
      */

      const otherOption = Array.from(certificateSelect.options).find(
        (option) => option.value.toLowerCase() === "other",
      );

      if (otherOption) {
        certificateSelect.value = otherOption.value;
      }
    }
  }
}

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ================= OPEN QUOTE ================= */

  const openQuoteButton = document.getElementById("openQuote");

  if (openQuoteButton) {
    openQuoteButton.addEventListener("click", openQuotePopup);
  }

  /* ================= CLOSE QUOTE ================= */

  const closeQuoteButton = document.getElementById("closeQuote");

  if (closeQuoteButton) {
    closeQuoteButton.addEventListener("click", closeQuotePopup);
  }

  /* ================= CLICK OUTSIDE ================= */

  const overlay = getQuoteOverlay();

  if (overlay) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeQuotePopup();
      }
    });
  }

  /* ================= ESCAPE ================= */

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeQuotePopup();
    }
  });
});
