/* =====================================================================
   DATA FILE — everything you may want to edit lives here.
   Edit this file, save, redeploy. No other file needs to change.
   ===================================================================== */

window.SITE = {
  name: "MD MONIRUL ISLAM",
  alias: "SsaR ShishiR",
  aliasBn: "এস.এস.এ.আর. শিশির",
  role: "Computer Science & Technology Student",
  headline: "Aspiring Penetration Tester & Red Teamer",
  intro:
    "I study Computer Science and Technology at Dhaka Government Polytechnic Institute. I am building practical skills in penetration testing and red teaming through hands-on labs, projects and certifications, and I have written a Bangla cybersecurity guide for beginners.",
  careerGoal:
    "My career goal is to build expertise in penetration testing and red teaming. I’m currently preparing for the OSCP+, OSCP, eWPTX, CRTA, and CEH certifications while improving my practical skills through hands-on labs and projects.",

  emails: ["off.red.alpha@gmail.com", "ssarhere@gmail.com"],
  phone: "+8801893839859",          // shown on the site
  phoneDisplay: "01893839859",
  whatsapp: "8801893839859",        // digits only, used for wa.me link

  // Social/profile links — add more later: { label: "GitHub", url: "https://github.com/..." }
  // Leave empty until you have real profiles; they are hidden automatically.
  socials: [],

  // Contact form:
  //  - leave formspreeId empty  -> the form opens the visitor's mail app (works everywhere, free)
  //  - paste your Formspree form id (e.g. "xyzabcde") -> real form submission
  formspreeId: "",

  // Top announcement bar. Set to null to hide it.
  announcement: "My Bangla cybersecurity book is free to download",

  education: [
    {
      period: "2025 – Present",
      title: "Computer Science and Technology",
      place: "Dhaka Government Polytechnic Institute",
      note: "Currently studying."
    },
    {
      period: "2025",
      title: "Secondary School Certificate (SSC)",
      place: "Pagla High School",
      note: ""
    }
  ],

  // Areas taken from the courses completed so far (see Certification page).
  learningAreas: [
    "Computer Networking",
    "Cybersecurity Fundamentals",
    "IoT & Digital Transformation",
    "Digital Drawing (Photoshop)"
  ],

  interests: ["Penetration Testing", "Red Teaming", "Ethical Hacking Labs", "Cybersecurity Writing (Bangla)"],

  // Certifications currently being prepared for (NOT earned yet)
  targetCerts: ["OSCP+", "OSCP", "eWPTX", "CRTA", "CEH"],

  // Projects: add real ones here { name, description, link }. Empty = "coming soon" card.
  projects: []
};

/* ---------------------------------------------------------------------
   CERTIFICATES — to add a new one, copy a block, paste it at the TOP of
   the list, then put the image in assets/img/certs/ and the PDF in
   assets/certs/. `verifyUrl` is optional (leave "" if you have none).
   --------------------------------------------------------------------- */
window.CERTIFICATES = [
  {
    title: "Computer Networking",
    issuer: "Muktopaath · DIKKHA Project, ICT Division, Government of Bangladesh",
    date: "",                                   // not printed on the certificate
    credentialId: "MC-U1Z9276136G1863G",
    image: "assets/img/certs/computer-networking.jpg",
    pdf: "assets/certs/computer-networking.pdf",
    verifyUrl: "",
    description:
      "Certificate of Completion for the online course “Computer Networking”, offered on the Muktopaath platform under the DIKKHA project of the Government of Bangladesh."
  },
  {
    title: "Cyber Security for Everything",
    issuer: "Cyber Bangla Ltd.",
    date: "07 Nov 2026",
    credentialId: "CERT-2026-EC324D",
    studentId: "CB-2026-1585",
    image: "assets/img/certs/cyber-security-for-everything.jpg",
    pdf: "assets/certs/cyber-security-for-everything.pdf",
    verifyUrl: "",
    description:
      "Certificate of Completion for the course “Cyber Security for Everything” from Cyber Bangla Ltd."
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "06 Nov 2026",
    credentialId: "fc53df51-5758-4b4f-b0fd-15a479811def",
    image: "assets/img/certs/intro-to-cybersecurity.jpg",
    pdf: "assets/certs/intro-to-cybersecurity.pdf",
    verifyUrl: "https://www.netacad.com/recognitions/verify/fc53df51-5758-4b4f-b0fd-15a479811def",
    description:
      "Awarded for successfully completing “Introduction to Cybersecurity” through the Cisco Networking Academy program."
  },
  {
    title: "Introduction to IoT and Digital Transformation",
    issuer: "Cisco Networking Academy",
    date: "06 Nov 2026",
    credentialId: "d921859d-e006-49be-9e99-85b7fcd4ee8b",
    image: "assets/img/certs/intro-to-iot.jpg",
    pdf: "assets/certs/intro-to-iot.pdf",
    verifyUrl: "https://www.netacad.com/recognitions/verify/d921859d-e006-49be-9e99-85b7fcd4ee8b",
    description:
      "Awarded for successfully completing “Introduction to IoT and Digital Transformation” through the Cisco Networking Academy program."
  },
  {
    title: "Digital Drawing with Photoshop",
    issuer: "Grameenphone Academy",
    date: "04 Jun 2026",
    credentialId: "",
    image: "assets/img/certs/digital-drawing-photoshop.jpg",
    pdf: "assets/certs/digital-drawing-photoshop.pdf",
    verifyUrl: "https://www.grameenphone.academy/cert/6860479418d3",
    description:
      "Certificate of Excellence for the successful completion of “Digital Drawing with Photoshop” from Grameenphone Academy."
  }
];

/* ---------------------------------------------------------------------
   BOOK — set `pdf` to "" to show a “coming soon” placeholder instead.
   --------------------------------------------------------------------- */
window.BOOK = {
  title: "সাইবার সিকিউরিটি: শূন্য থেকে এক্সপার্ট লেভেল",
  titleEn: "Cyber Security: From Zero to Expert Level",
  subtitle: "বাংলায় একটি পূর্ণাঙ্গ গাইড — নতুন পাঠক থেকে শুরু করে অ্যাডভান্স ধারণা পর্যন্ত",
  author: "SsaR ShishiR",
  language: "Bangla",
  pages: 41,
  pdf: "assets/book/cybersecurity-zero-to-expert-bangla.pdf",
  cover: "",                                       // optional image path; empty = designed cover
  preview: "assets/img/book-page1.jpg",
  description:
    "A complete Bangla guide to cybersecurity that starts from the very basics and moves step by step towards advanced ideas. Each topic explains how it works, gives a real-life example and shows how to defend.",
  parts: [
    { name: "পার্ট ১: সাইবার জগতের পরিচয় এবং মৌলিক ভিত্তি", chapters: ["সাইবার সিকিউরিটির পরিচয়", "সাইবার নিরাপত্তার তিনটি ভিত্তি (CIA Triad)", "মূল ধারণা ও মৌলিক শব্দ", "সাইবার আক্রমণের ধরন"] },
    { name: "পার্ট ২: নিরাপদ থাকার নিয়ম, নেটওয়ার্কিং, অপারেটিং সিস্টেম ও ক্রিপ্টোগ্রাফি", chapters: ["নিজেকে নিরাপদ রাখার সহজ নিয়ম", "নেটওয়ার্কিং বেসিক", "অপারেটিং সিস্টেম ও Linux বেসিক", "ক্রিপ্টোগ্রাফি"] },
    { name: "পার্ট ৩: ওয়েব নিরাপত্তা, দুর্বলতা ব্যবস্থাপনা, ফরেনসিক ও ক্যারিয়ার", chapters: ["Web Security ও OWASP Top 10", "Vulnerability Management, Patching ও CVE", "Incident Response ও Digital Forensics", "সাইবার নিরাপত্তায় ক্যারিয়ার গাইড", "শব্দকোষ (Glossary)"] }
  ]
};
