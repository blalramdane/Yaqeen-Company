document.addEventListener("DOMContentLoaded", async function () {
  window.scrollTo(0, 0);

  const fileList = [
      { file: "headertest2.html", containerId: "header-container" },
      { file: "home.html", containerId: "content" },
      { file: "about.html", containerId: "content" },
      { file: "services.html", containerId: "content" },
      { file: "gallery.html", containerId: "content" },
      { file: "taqyeemat.html", containerId: "taqyeemat" },
      { file: "contact.html", containerId: "content" },
      { file: "footer.html", containerId: "footer-container" }
  ];

  for (const item of fileList) {
      try {
          const response = await fetch(item.file);
          if (!response.ok) throw new Error(`تعذر تحميل ${item.file}`);
          const html = await response.text();
          const container = document.getElementById(item.containerId);
          if (container) {
              container.innerHTML += html;
          }
      } catch (error) {
          console.error(error);
      }
  }

  // السلايدر
  const carouselInner = document.querySelector(".carousel-inner");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  if (carouselInner && prevBtn && nextBtn && slides.length) {
      function updateSlidePosition() {
          carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      function startAutoPlay() {
          setInterval(() => {
              currentIndex = (currentIndex + 1) % slides.length;
              updateSlidePosition();
          }, 3000);
      }

      prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex === 0 ? slides.length : currentIndex) - 1;
          updateSlidePosition();
      });

      nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlidePosition();
      });

      startAutoPlay();
  }

  // تحديث الروابط النشطة في التنقل
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
          e.preventDefault();
          navLinks.forEach(link => link.classList.remove("active"));
          this.classList.add("active");
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
          }
      });
  });

  window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      document.querySelectorAll("section").forEach(section => {
          if (scrollPos >= section.offsetTop - 100 && scrollPos < section.offsetTop + section.offsetHeight) {
              navLinks.forEach(link => link.classList.remove("active"));
              document.querySelector(`nav ul li a[href="#${section.id}"]`)?.classList.add("active");
          }
      });
  });

  // رابط WhatsApp
  const phoneInput = document.getElementById("phone");
  const whatsappLink = document.getElementById("whatsapp-link");
  if (phoneInput && whatsappLink) {
      phoneInput.addEventListener("input", function () {
          const phoneNumber = this.value.trim();
          whatsappLink.href = phoneNumber ? `https://wa.me/${phoneNumber}` : "#";
          whatsappLink.style.display = phoneNumber ? "inline-block" : "none";
      });
  }

  // إضافة التقييمات
  const ratingsGrid = document.querySelector(".ratings-grid");
  const addRatingForm = document.getElementById("add-rating-form");
  if (ratingsGrid && addRatingForm) {
      addRatingForm.addEventListener("submit", function(e) {
          e.preventDefault();
          const clientName = document.getElementById("client-name").value;
          const ratingValue = parseInt(document.getElementById("rating-value").value);
          const ratingText = document.getElementById("rating-text").value;

          const ratingCard = document.createElement("div");
          ratingCard.className = "rating-card";
          ratingCard.innerHTML = `
              <div class="rating-header">
                  <span class="client-name"><span class="math-inline">\{clientName\}</span\>
<span class\="rating\-stars"\></span>{"★".repeat(ratingValue)}<span class="math-inline">\{"☆"\.repeat\(5 \- ratingValue\)\}</span\>
</div\>
<p class\="rating\-text"\></span>{ratingText}</p>
          `;

          ratingsGrid.appendChild(ratingCard);
          if (ratingsGrid.children.length > 9) ratingsGrid.removeChild(ratingsGrid.firstElementChild);
          addRatingForm.reset();
      });
  }

  // التحقق من تحميل الصور
  document.querySelectorAll(".slide img").forEach(img => {
      img.addEventListener("error", () => img.style.backgroundColor = "red");
  });

  // معرض الصور
  const galleryImages = document.querySelectorAll(".gallery-image");
  const prevGalleryBtn = document.querySelector(".prev-btn");
  const nextGalleryBtn = document.querySelector(".next-btn");
  let galleryIndex = 0;

  function showImage(index) {
      galleryImages.forEach((img, i) => img.classList.toggle("active", i === index));
  }

  if (galleryImages.length && prevGalleryBtn && nextGalleryBtn) {
      showImage(galleryIndex);
      prevGalleryBtn.addEventListener("click", () => showImage((galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length)));
      nextGalleryBtn.addEventListener("click", () => showImage((galleryIndex = (galleryIndex + 1) % galleryImages.length)));
  }
});