// Efek shadow saat scroll
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Toggle menu saat klik hamburger
document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("nav-links").classList.toggle("show");
});

// animasi kaya text diketik
function runTypingAnimation(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.textContent.replace("|", ""); 
    element.textContent = ""; 

    let index = 0;
    let cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "|";
    element.appendChild(cursor);

    function typeLetter() {
        if (index < text.length) {
            element.insertBefore(document.createTextNode(text[index]), cursor);
            index++;
            const delay = 100 + Math.random() * 100;
            setTimeout(typeLetter, delay);
        } else {
            cursor.remove(); // hapus cursor kalau sudah selesai
        }
    }

    typeLetter();
}

function animateExperienceSection() {
  const line = document.querySelector('.line');
  const cards = document.querySelectorAll('.experience-cards');

  if (!line || cards.length === 0) return; // safety check

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('animate');
          }, i * 200);
        });

        const totalDotsDuration = cards.length * 200 + 600;
        setTimeout(() => {
          line.classList.add('animate');
        }, totalDotsDuration);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(line);
}

document.addEventListener("DOMContentLoaded", () => {
    hideLoader();
    runTypingAnimation("typed");

    // animasi line experience
    animateExperienceSection(); 

    const navLinks = document.querySelectorAll(".nav-links li a");
    const navMenu = document.getElementById("nav-links");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            // hapus class 'show' supaya menu nutup
            navMenu.classList.remove("show");
        });
    });

    // localstorage untuk bahasa
    const savedLang = localStorage.getItem("selectedLang") || "id";
    const dropdowns = document.querySelectorAll(".lang-dropdown");

    dropdowns.forEach(dropdown => {
        const currentLangImg = dropdown.querySelector(".current-lang");
        const langOptions = dropdown.querySelector(".lang-options");

        if (currentLangImg) {
            currentLangImg.src = savedLang === "id" 
                ? "assets/images/id.png" 
                : "assets/images/en.png";
        }

        setLanguage(savedLang, currentLangImg, langOptions);
    });

});

function scrollRight() {
    const wrapper = document.querySelector('.projects-cards-wrapper');
    const card = wrapper.querySelector('.project-card');
    const style = getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const gap = parseInt(style.marginRight || style.gap || 20); // fallback gap
    wrapper.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
}

// toggle ganti bahasa
document.querySelectorAll(".lang-dropdown").forEach(dropdown => {
  const langBtn = dropdown.querySelector(".lang-btn");
  const langOptions = dropdown.querySelector(".lang-options");
  const currentLangImg = dropdown.querySelector(".current-lang");

  // toggle tampil/hidden menu bahasa
  langBtn.addEventListener("click", e => {
    e.stopPropagation(); // biar klik di dalam nggak nutup langsung
    langOptions.style.display = langOptions.style.display === "block" ? "none" : "block";
  });

  // klik salah satu opsi bahasa
  langOptions.querySelectorAll("button").forEach(option => {
    option.addEventListener("click", () => {
      const lang = option.dataset.lang; // pakai data-lang misalnya <button data-lang="id">Indonesia</button>
      setLanguage(lang, currentLangImg, langOptions);
    });
  });
});

// klik di luar → semua dropdown ditutup
document.addEventListener("click", () => {
  document.querySelectorAll(".lang-options").forEach(opt => opt.style.display = "none");
});

// === Translations ===
const translations = {
    id: {
        about: "Tentang",
        experience: "Pengalaman",
        skills: "Skill",
        projects: "Projek",
        contact: "Kontak",
        heroText: "Hi, Saya Zahran",
        heroDesc: "Fullstack Web Developer",
        heroDesc2: "Junior Fullstack Web Developer yang berfokus membangun aplikasi web modern dengan desain responsif dan kinerja optimal. Berpengalaman di frontend dan backend, cepat beradaptasi, mampu bekerja dalam tim, dan selalu bersemangat menciptakan solusi web yang optimal, efisien, serta memberikan pengalaman terbaik bagi pengguna.",
        experienceTitle: "Pengalaman Bekerja",
        experiencePeriode: "Januari 2025 - Saat Ini",
        experienceList: [
            "Mengembangkan aplikasi web modern dengan desain responsif menggunakan CSS, Bootstrap, dan JavaScript",
            "Membangun backend menggunakan Laravel dan ASP.NET Core, termasuk logika aplikasi dan REST API",
            "Mengelola database dengan SQL (MySQL/Oracle), membuat tabel dan query",
            "Integrasi API dengan aplikasi web untuk alur data yang lancar",
            "Meningkatkan kinerja aplikasi dan pengalaman pengguna melalui optimasi frontend dan backend",
            "Bekerja sama dalam tim menggunakan Git (melalui GitLab) untuk version control dan kolaborasi proyek"
        ],
        skillTeknisTitle: "Skill Teknis",
        skillTeknis1: "Bahasa Pemograman",
        skillTeknis2: "Backend Teknologi",
        skillTeknis3: "Front End Teknologi",
        skillTeknis4: "Alat Pengembang",

        projectCardText1: "Proyek pertama saya adalah membuat aplikasi Todolist untuk mengelola daftar pekerjaan secara efisien.",
        projectCardList1: [
            "Fitur untuk menambahkan, mengedit, dan menghapus data pekerjaan.",
            "Halaman Home dengan form login (saat ini hanya menggunakan validasi required, belum terhubung ke fungsi autentikasi).",
            "Halaman About Us berisi deskripsi singkat mengenai kelompok kami.",
            "Halaman Contact Us, di mana pengguna dapat mengirimkan data melalui form. Data yang dikirimkan akan otomatis tersimpan ke file Excel sehingga dapat kami pantau langsung di sana."
        ],
        projectCardTitle2: "Kasir",
        projectCardText2: "Proyek aplikasi untuk mempermudah kasir dalam mengelola transaksi dan mengelola produk.",
        projectCardList2: [
            "Menyediakan fitur login dan logout untuk memastikan autentikasi dan keamanan akses pengguna dalam sistem.",
            "Dashboard admin interaktif yang menampilkan informasi penting seperti jumlah total produk yang tersedia dan total transaksi yang telah dilakukan.",
            "Admin dapat mengelola data transaksi dan produk secara lengkap melalui fitur CRUD (Create, Read, Update, Delete)."
        ],
        projectCardText3: "KopiKodir adalah aplikasi e-commerce berbasis web yang dirancang khusus untuk kebutuhan jual beli produk kopi. Aplikasi ini dilengkapi dengan fitur manajemen admin untuk mengelola produk, user, dan transaksi.",
        projectCardList3: [
            "Menyediakan fitur keranjang dan proses checkout untuk memudahkan pemesanan kopi.",
            "Fitur personalisasi berdasarkan akun pengguna, termasuk riwayat pembelian masing-masing user.",
            "Sistem login dengan pembatasan akses berdasarkan peran (user dan admin), serta dashboard admin untuk mengelola produk kopi, data pengguna, dan transaksi.",
            "Stok produk otomatis berkurang setiap kali terjadi pembelian oleh pengguna."
        ],
        projectCardTitle4: "API Aplikasi Kasir",
        projectCardText4: "API yang dapat digunakan untuk aplikasi kasir, dengan fitur melakukan transaksi dan secara otomatis mengurangi stok ketika transaksi dilakukan oleh pengguna.",
        projectCardList4: [
            "Fitur login dan logout user, Dan get data profile user yang sedang login.",
            "Fitur get produk, dan tambah produk.",
            "Fitur transaksi produk, dan stok produk otomatis berkurang setiap kali terjadi pembelian oleh pengguna.",
            "Fitur dokumentasi API menggunakan laravel swagger."
        ],

        kontakTitle: "Kontak",
        kontakcontentTitle: "Hubungi Saya",
        kontakcontentText: "Jangan ragu untuk menghubungi saya untuk pekerjaan atau saran apa pun di bawah ini.",
        kontakCardFormName: "Nama",
        kontakCardFormPesan: "Pesan",
        kontakCardFormButton: "Kirim Pesan",
    },
    en: {
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        heroText: "Hi, I am Zahran",
        heroDesc: "Fullstack Web Developer",
        heroDesc2: "Junior Fullstack Web Developer focused on building modern web applications with responsive design and optimal performance. Experienced in both front-end and back-end development, quick to adapt, able to work in a team, and passionate about creating optimal, efficient web solutions that deliver the best user experience.",
        experienceTitle: "Work Experience",
        experiencePeriode: "January 2025 - Now",
        experienceList: [
            "Develop modern web applications with responsive design using CSS, Bootstrap, and JavaScript",
            "Build backend using Laravel and ASP.NET Core, including application logic and REST API",
            "Manage databases with SQL (MySQL/Oracle), create tables and queries",
            "Integrate APIs with web applications for smooth data flow",
            "Improve application performance and user experience through frontend and backend optimization",
            "Collaborate in a team using Git (via GitLab) for version control and project collaboration"
        ],
        skillTeknisTitle: "Technical Skills",
        skillTeknis1: "Programing Languages",
        skillTeknis2: "Backend Technologies",
        skillTeknis3: "Front End Technologies",
        skillTeknis4: "Developer Tools",

        projectCardText1: "My first project was developing a Todolist application to efficiently manage task lists.",
        projectCardList1: [
            "Features for adding, editing, and deleting tasks.",
            "Home page with a login form (currently uses required field validation only and is not yet connected to an authentication function).",
            "About Us page containing a brief description of our team.",
            "Contact Us page, where users can submit data through a form. The submitted data is automatically saved to an Excel file, allowing us to monitor it directly."
        ],
        projectCardTitle2: "Cashier",
        projectCardText2: "An application project designed to simplify cashier operations in managing transactions and product inventories.",
        projectCardList2: [
            "Provides login and logout functionality to ensure user authentication and secure access within the system.",
            "An interactive admin dashboard displaying key information such as the total number of products available and completed transactions.",
            "Admins can fully manage transaction and product data through CRUD features (Create, Read, Update, Delete)."
        ],
        projectCardText3: "KopiKodir is a web-based e-commerce application specifically designed for buying and selling coffee products. It includes an admin management system for handling products, users, and transactions.",
        projectCardList3: [
            "Includes a shopping cart and checkout process to simplify coffee ordering.",
            "User personalization features, including individual purchase history tracking.",
            "A login system with role-based access control (user and admin), and an admin dashboard for managing coffee products, user data, and transactions.",
            "Product stock is automatically reduced with each user purchase."
        ],
        projectCardTitle4: "Cashier Application API",
        projectCardText4: "An API that can be used for cashier applications, with features for making transactions and automatically reducing stock when transactions are made by users.",
        projectCardList4: [
            "User login and logout features, and get user profile data that is currently logged in.",
            "Get product and add product features.",
            "Product transaction features, and product stock is automatically reduced every time a user makes a purchase.",
            "API documentation features using laravel swagger."
        ],

        kontakTitle: "Contact",
        kontakcontentTitle: "Get In Touch",
        kontakcontentText: "Please feel free to contact me for any work or suggestions below.",
        kontakCardFormName: "Name",
        kontakCardFormPesan: "Message",
        kontakCardFormButton: "Send Message",
    }
};

// === Ganti bahasa ===
function setLanguage(lang, currentLangImg, langOptions) {
    // ganti icon bendera
    currentLangImg.src = lang === "id" ? "assets/images/id.png" : "assets/images/en.png";

    // Navbar
    document.querySelector("a[href='#about']").textContent = translations[lang].about;
    document.querySelector("a[href='#experience']").textContent = translations[lang].experience;
    document.querySelector("a[href='#skills']").textContent = translations[lang].skills;
    document.querySelector("a[href='#projects']").textContent = translations[lang].projects;
    document.querySelector("a[href='#contact']").textContent = translations[lang].contact;

    // Hero
    document.querySelector(".hero-name").textContent = translations[lang].heroText;
    document.querySelector(".hero-text .hero-text-p").textContent = translations[lang].heroDesc;
    document.querySelector(".hero-text .hero-text2-p").textContent = translations[lang].heroDesc2;

    // Experience
    document.querySelector(".container-experience .experience-title").textContent = translations[lang].experienceTitle;
    document.querySelector(".container-experience .periode").textContent = translations[lang].experiencePeriode;
    const ul = document.querySelector(".experience-list");
    ul.innerHTML = "";
    translations[lang].experienceList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });

    // Skills
    document.querySelector(".container-skills .skills-title").textContent = translations[lang].skillTeknisTitle;
    document.querySelector(".container-skills .skill-1").textContent = translations[lang].skillTeknis1;
    document.querySelector(".container-skills .skill-2").textContent = translations[lang].skillTeknis2;
    document.querySelector(".container-skills .skill-3").textContent = translations[lang].skillTeknis3;
    document.querySelector(".container-skills .skill-4").textContent = translations[lang].skillTeknis4;

    // Project
    document.querySelector(".container-projects .projects-title").textContent = translations[lang].projects;

    // Contact
    document.querySelector(".container-contact .kontak-title").textContent = translations[lang].kontakTitle;
    document.querySelector(".container-contact .contact-text .contact-title").textContent = translations[lang].kontakcontentTitle;
    document.querySelector(".container-contact .contact-text .context-text-p").textContent = translations[lang].kontakcontentText;
    document.querySelector(".container-contact .contact-card .nama").textContent = translations[lang].kontakCardFormName;
    document.querySelector(".container-contact .contact-card .pesan").textContent = translations[lang].kontakCardFormPesan;
    document.querySelector(".container-contact .contact-card .btn-kirim").textContent = translations[lang].kontakCardFormButton;

    // Placeholder form
    document.getElementById("name").placeholder = translations[lang].kontakCardFormName;
    document.getElementById("message").placeholder = translations[lang].kontakCardFormPesan;

    // Tombol
    document.querySelector(".projects-cards .project-card-p1").textContent = translations[lang].projectCardText1;
    const ul1 = document.querySelector(".project-card-list1");
    ul1.innerHTML = "";
    translations[lang].projectCardList1.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul1.appendChild(li);
    });
    
    document.querySelector(".projects-cards .project-card-p2").textContent = translations[lang].projectCardText2;
    const ul2 = document.querySelector(".project-card-list2");
    const title2 = document.querySelector(".project-card-title-2");
    title2.textContent = translations[lang].projectCardTitle2;
    ul2.innerHTML = "";
    translations[lang].projectCardList2.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul2.appendChild(li);
    });
    
    document.querySelector(".projects-cards .project-card-p3").textContent = translations[lang].projectCardText3;
    const ul3 = document.querySelector(".project-card-list3");
    ul3.innerHTML = "";
    translations[lang].projectCardList3.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul3.appendChild(li);
    });

    document.querySelector(".projects-cards .project-card-p4").textContent = translations[lang].projectCardText3;
    const ul4 = document.querySelector(".project-card-list4");
    const title4 = document.querySelector(".project-card-title-4");
    title4.textContent = translations[lang].projectCardTitle4;
    ul4.innerHTML = "";
    translations[lang].projectCardList4.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul4.appendChild(li);
    });
    
    // Tutup dropdown setelah pilih
    langOptions.style.display = "none";

    // animasi
    runTypingAnimation("typed");

    localStorage.setItem("selectedLang", lang);
}

// POST contact us
// loader
function showLoader() {
  document.getElementById("loader").style.display = "flex";
}
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

// alert
function showToast(message, type = "info", duration = 3000) {
  const toaster = document.getElementById("toaster");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;

  toaster.appendChild(toast);

  // trigger animasi
  setTimeout(() => toast.classList.add("show"), 100);

  // auto hilang
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, duration);
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbyMhiYhxtl82vJK3faV-QZCzdmw3TElnekbBJ2vWqCCrecJxM1194FVQSxhrMFXXz8K/exec'
const form = document.forms['CONTACT-US'];
const btnKirim = document.querySelector('.btn-kirim');

form.addEventListener('submit', e => {
    e.preventDefault()

    const savedLang = localStorage.getItem("selectedLang") || "id";

    showLoader();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        hideLoader();
        form.reset();

        if(savedLang == "id") {
            showToast("Pesan berhasil dikirim", "success")
        } else {
            showToast("Message sent successfully", "success")
        }

    })
    .catch(error => {
            console.error("Pesan gagal dikirim", error.message);
            hideLoader()

            if(savedLang == "id") {
                showToast("Pesan gagal dikirim", "error");
            } else {
                showToast("Failed to send message", "error");
            }
    })
})