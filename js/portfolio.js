// Portfolio data structure
const portfolioItems = [
  {
    id: 1,
    title: "💼 Bankist Web – Smooth Banking UI Experience",
    description:
      `A sleek, modern banking front-end project focused on delivering a professional UI/UX. This single-page interface demonstrates advanced JavaScript concepts like lazy loading, smooth scrolling, sticky navigation, modal windows, and tabbed components.
      Highlights:
• Lazy loading for performance optimization
• Section reveal on scroll
• Sticky navigation and page transitions
• Modal for login and tabbed account features
Tech Used: HTML, CSS, JavaScript (DOM manipulation, Intersection Observer API)`,
    thumbnail: "assets/portfolio/thumbnails/bankistWeb.jpg",
    image: "assets/portfolio/bankistWeb.jpg",
    ViewLive: "https://bankist-web.netlify.app/",
    technologyTag: "HTML, CSS, JavaScript",
    category: "websites",
  },
  {
    id: 2,
    title: "🍽 Omnifood – Smart Food Delivery Website",
    description:
      "Atmospheric loading screen design with gradient background and decorative elements creating visual interest while players wait.",
    category: "backgrounds",
    thumbnail: "assets/portfolio/thumbnails/acs.webp",
    image: "assets/portfolio/acs.webp",
  },
  {
    id: 3,
    title: "🏦 Bankist – Functional Banking Web App",
    description:
      "Playful game icon featuring an adorable cat character with appealing colors and shapes designed for high visibility in app stores.",
    category: "icons",
    thumbnail: "assets/portfolio/thumbnails/catIcon.webp",
    image: "assets/portfolio/catIcon.webp",
  },
  {
    id: 4,
    title: "🎲 Pig Game – Two Player Dice Challenge",
    description:
      "Warm and inviting loading screen for Cooking Valley game with food-themed visuals that establish the game's culinary atmosphere.",
    category: "backgrounds",
    thumbnail: "assets/portfolio/thumbnails/cookingVeli.webp",
    image: "assets/portfolio/cookingVeli.webp",
  },
  {
    id: 5,
    title: "Story board",
    description:
      "Sequential storyboard panels illustrating game narrative flow with clear visual progression and character interactions.",
    category: "backgrounds",
    thumbnail: "assets/portfolio/thumbnails/storyBoard.webp",
    image: "assets/portfolio/storyBoard.webp",
  },
];

// Sort the portfolioItems array by id
portfolioItems.sort((a, b) => a.id - b.id);

function initPortfolio() {
  const portfolioGrid = document.querySelector(".portfolio-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const modal = document.querySelector(".portfolio-modal");
  let currentCategory = "all";
  let currentItemIndex = 0;
  let preloadedImages = new Map(); // For caching preloaded images

  // Create portfolio items
  function renderPortfolioItems(category) {
    // Clear grid
    if (portfolioGrid) portfolioGrid.innerHTML = "";

    // Filter and create items
    const filteredItems =
      category === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === category);

    if (filteredItems.length === 0) {
      portfolioGrid.innerHTML =
        '<p class="no-items">No items to display in this category</p>';
      return;
    }

    filteredItems.forEach((item) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.className = "portfolio-item";
      portfolioItem.dataset.category = item.category;
      portfolioItem.dataset.id = item.id;

      portfolioItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="portfolio-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
                <div class="portfolio-item-hover">
                    <span>View Details</span>
                </div>
            `;

      // 3D hover effect
      portfolioItem.addEventListener("mousemove", handleHover3D);
      portfolioItem.addEventListener("mouseleave", resetHover3D);

      // Open modal on click
      portfolioItem.addEventListener("click", () => {
        openModal(item.id);
      });

      portfolioGrid.appendChild(portfolioItem);
    });

    // Add animation to items
    animatePortfolioItems();

    // Start preloading the first few full-size images
    preloadNextImages(filteredItems, 0, 3);
  }

  // Preload images for better performance when navigating
  function preloadNextImages(items, startIdx, count) {
    for (let i = 0; i < count && i + startIdx < items.length; i++) {
      const item = items[i + startIdx];
      if (!preloadedImages.has(item.id)) {
        const img = new Image();
        img.src = item.image;
        preloadedImages.set(item.id, img);
      }
    }
  }

  // 3D hover effect
  function handleHover3D(e) {
    const item = this;
    const { left, top, width, height } = item.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  function resetHover3D() {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }

  // Enhanced animation for portfolio items
  function animatePortfolioItems() {
    // Clear previous animations
    gsap.killTweensOf(".portfolio-item");

    // Create a staggered entrance animation
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // Reset initial state
    gsap.set(portfolioItems, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationY: 15,
    });

    // Create timeline for smoother sequence
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(".portfolio-filter", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    tl.to(portfolioItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      stagger: {
        each: 0.1,
        from: "center",
        grid: "auto",
      },
      duration: 0.8,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Add hover animations after items are loaded
        addHoverEffects();
      },
    });

    // Add particle effects to the background during animation
    createParticleEffect();
  }

  // New particle effect for the portfolio section
  function createParticleEffect() {
    const portfolioSection = document.querySelector(".portfolio-section");
    if (!portfolioSection) return;

    // Create canvas for particles
    if (!document.getElementById("portfolio-particles")) {
      const canvas = document.createElement("canvas");
      canvas.id = "portfolio-particles";
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "0";
      portfolioSection.prepend(canvas);

      const ctx = canvas.getContext("2d");
      const particles = [];

      function resizeCanvas() {
        canvas.width = portfolioSection.offsetWidth;
        canvas.height = portfolioSection.offsetHeight;
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Create particles
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: ["#6c5ce7", "#fd79a8", "#00b894"][
            Math.floor(Math.random() * 3)
          ],
          speed: Math.random() * 1 + 0.5,
          angle: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      // Animate particles
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.x += Math.cos((p.angle * Math.PI) / 180) * p.speed;
          p.y += Math.sin((p.angle * Math.PI) / 180) * p.speed;

          // Bounce off edges
          if (p.x < 0 || p.x > canvas.width) p.angle = 180 - p.angle;
          if (p.y < 0 || p.y > canvas.height) p.angle = 360 - p.angle;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace(")", `, ${p.opacity})`)
            .replace("rgb", "rgba");
          ctx.fill();
        });

        requestAnimationFrame(animateParticles);
      }

      animateParticles();
    }
  }

  // Enhanced hover effects
  function addHoverEffects() {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {
      const img = item.querySelector("img");
      const info = item.querySelector(".portfolio-item-info");

      // Create hover timeline for each item
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(
        img,
        {
          scale: 1.1,
          filter: "brightness(0.8) contrast(1.2)",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );

      hoverTl.to(
        info,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );

      // Add shine effect element if not exists
      if (!item.querySelector(".shine-effect")) {
        const shineEffect = document.createElement("div");
        shineEffect.classList.add("shine-effect");
        shineEffect.style.position = "absolute";
        shineEffect.style.top = "0";
        shineEffect.style.left = "0";
        shineEffect.style.width = "100%";
        shineEffect.style.height = "100%";
        shineEffect.style.background =
          "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)";
        shineEffect.style.transform = "translateX(-100%)";
        shineEffect.style.pointerEvents = "none";
        item.appendChild(shineEffect);

        hoverTl.to(
          shineEffect,
          {
            x: "100%",
            duration: 1,
            ease: "power2.out",
          },
          0
        );
      }

      // Handle mouse events
      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());

      // 3D tilt effect
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(item, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power1.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }

  // Enhance filter functionality with animations
  if (filterButtons) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active state
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Add pulsing animation to the clicked button
        gsap.fromTo(
          btn,
          { scale: 0.9 },
          { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }
        );

        // Get category and render items with enhanced animation
        const category = btn.getAttribute("data-filter");
        currentCategory = category;

        // Animate current items out before rendering new ones
        const currentItems = document.querySelectorAll(".portfolio-item");
        if (currentItems.length) {
          gsap.to(currentItems, {
            opacity: 0,
            y: -50,
            scale: 0.8,
            stagger: 0.05,
            duration: 0.3,
            onComplete: () => renderPortfolioItems(category),
          });
        } else {
          renderPortfolioItems(category);
        }
      });
    });
  }

  // Enhanced modal functionality with image optimization
  function openModal(itemId) {
    if (!modal) return;

    const item = portfolioItems.find((i) => i.id === parseInt(itemId));
    if (!item) return;

    // Set current item index for navigation
    currentItemIndex = portfolioItems.indexOf(item);

    // Clear previous modal content
    const modalContent = modal.querySelector(".modal-content");
    
    // Check if it's a developer project (id:1)
    if (item.id === 1) {
      // Developer project specialized layout
      modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="dev-project-modal">
          <div class="dev-project-bg" style="background-image: url('${item.image}')"></div>
          <div class="dev-project-content">
            <h2 class="dev-project-title">${item.title}</h2>
            <div class="dev-project-description">${item.description}</div>
            <div class="dev-project-meta">
              <div class="dev-project-tech">
                <h4>Technologies</h4>
                <div class="tech-tags">
                  ${item.technologyTag.split(',').map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
                </div>
              </div>
              ${item.ViewLive ? `<a href="${item.ViewLive}" class="dev-project-live" target="_blank">View Live Demo</a>` : ''}
            </div>
          </div>
        </div>
        <div class="modal-navigation">
          <button class="modal-prev">Previous</button>
          <button class="modal-next">Next</button>
        </div>
      `;
      
      // Re-add event listeners for close button
      const closeBtn = modalContent.querySelector(".close-modal");
      if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
      }
      
      // Re-add event listeners for navigation
      const prevButton = modalContent.querySelector(".modal-prev");
      const nextButton = modalContent.querySelector(".modal-next");
      
      if (prevButton) {
        prevButton.addEventListener("click", () => navigateModal("prev"));
      }
      
      if (nextButton) {
        nextButton.addEventListener("click", () => navigateModal("next"));
      }
    } else {
      // Standard modal display for non-developer projects
      const modalImage = modal.querySelector(".modal-image");
      const modalTitle = modal.querySelector(".modal-title");
      const modalDesc = modal.querySelector(".modal-description");
      const modalCategory = modal.querySelector(".modal-category");

      // Show loading state
      if (modalImage) {
        modalImage.classList.add("loading");
        modalImage.src = item.thumbnail; // Show thumbnail first

        // Always update to full image regardless of preloading status
        const updateFullImage = () => {
          modalImage.src = item.image;
          modalImage.classList.remove("loading");
        };

        // Check if image is already preloaded
        if (preloadedImages.has(item.id)) {
          // If already preloaded, switch to full image immediately
          setTimeout(updateFullImage, 100); // Small timeout for smoother transition
        } else {
          // If not preloaded, load it now
          const fullImg = new Image();
          fullImg.onload = updateFullImage;
          fullImg.onerror = () => {
            console.warn(`Failed to load image: ${item.image}`);
            modalImage.classList.remove("loading");
          };
          fullImg.src = item.image;
          preloadedImages.set(item.id, fullImg);
        }
      }

      if (modalTitle) modalTitle.textContent = item.title;
      if (modalDesc) modalDesc.textContent = item.description;
      if (modalCategory) modalCategory.textContent = `Category: ${item.category}`;
    }

    // Show modal with animation
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Preload next and previous images for smoother navigation
    preloadAdjacentImages(currentItemIndex);
  }

  // Preload adjacent images for smoother modal navigation
  function preloadAdjacentImages(index) {
    let nextIndex = (index + 1) % portfolioItems.length;
    let prevIndex = index - 1 < 0 ? portfolioItems.length - 1 : index - 1;

    // Preload next image
    if (!preloadedImages.has(portfolioItems[nextIndex].id)) {
      const nextImg = new Image();
      nextImg.src = portfolioItems[nextIndex].image;
      preloadedImages.set(portfolioItems[nextIndex].id, nextImg);
    }

    // Preload previous image
    if (!preloadedImages.has(portfolioItems[prevIndex].id)) {
      const prevImg = new Image();
      prevImg.src = portfolioItems[prevIndex].image;
      preloadedImages.set(portfolioItems[prevIndex].id, prevImg);
    }
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Close modal when clicking on close button
  const closeModalBtn = modal ? modal.querySelector(".close-modal") : null;
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside of modal content
  if (modal) {
    modal.addEventListener("click", function (e) {
      // Only close if the click is directly on the modal background
      // and not on any of its children
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Modal navigation with fixed functionality and optimized image loading
  function navigateModal(direction) {
    let filteredItems =
      currentCategory === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === currentCategory);

    if (filteredItems.length === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentItemIndex + 1) % filteredItems.length;
    } else {
      newIndex =
        currentItemIndex - 1 < 0
          ? filteredItems.length - 1
          : currentItemIndex - 1;
    }

    // Find the item in the entire portfolioItems array
    const newItemId = filteredItems[newIndex].id;
    const newItem = portfolioItems.find((item) => item.id === newItemId);
    currentItemIndex = portfolioItems.indexOf(newItem);

    // Update modal content with animation
    const modalImage = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDesc = modal.querySelector(".modal-description");
    const modalCategory = modal.querySelector(".modal-category");
    // const modalDate = modal.querySelector(".modal-date");

    // Fade out current content
    gsap.to([modalTitle, modalDesc, modalCategory], {
      opacity: 0,
      y: direction === "next" ? -20 : 20,
      duration: 0.3,
      onComplete: () => {
        // Update content
        if (modalImage) {
          modalImage.classList.add("loading");
          // Use thumbnail first for fast transition
          modalImage.src = newItem.thumbnail;

          // Then load full image if needed
          if (preloadedImages.has(newItem.id)) {
            // We already have the preloaded image
            setTimeout(() => {
              modalImage.src = newItem.image;
              modalImage.classList.remove("loading");
            }, 50); // Small delay for smoother transition
          } else {
            // Need to load the full image
            const fullImg = new Image();
            fullImg.onload = function () {
              modalImage.src = newItem.image;
              modalImage.classList.remove("loading");
              preloadedImages.set(newItem.id, fullImg);
            };
            fullImg.src = newItem.image;
          }
        }

        if (modalTitle) modalTitle.textContent = newItem.title;
        if (modalDesc) modalDesc.textContent = newItem.description;
        if (modalCategory)
          modalCategory.textContent = `Category: ${newItem.category}`;
        // if (modalDate) modalDate.textContent = `Created: ${newItem.date}`;

        // Fade in new content
        gsap.to([modalTitle, modalDesc, modalCategory], {
          opacity: 1,
          y: 0,
          duration: 0.3,
        });

        // Preload the next image in the navigation sequence for smoother experience
        preloadAdjacentImages(currentItemIndex);
      },
    });
  }

  // Fix modal navigation button click handlers
  const prevButton = modal ? modal.querySelector(".modal-prev") : null;
  const nextButton = modal ? modal.querySelector(".modal-next") : null;

  if (prevButton) {
    // Remove any existing event listeners to avoid duplicates
    prevButton.replaceWith(prevButton.cloneNode(true));
    // Get the new button reference
    const newPrevButton = modal.querySelector(".modal-prev");
    // Add event listener
    newPrevButton.addEventListener("click", () => {
      navigateModal("prev");
    });
  }

  if (nextButton) {
    // Remove any existing event listeners to avoid duplicates
    nextButton.replaceWith(nextButton.cloneNode(true));
    // Get the new button reference
    const newNextButton = modal.querySelector(".modal-next");
    // Add event listener
    newNextButton.addEventListener("click", () => {
      navigateModal("next");
    });
  }

  // Add keyboard navigation for modal
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      navigateModal("prev");
    } else if (e.key === "ArrowRight") {
      navigateModal("next");
    }
  });

  // Initialize portfolio with all items
  renderPortfolioItems("all");

  // Add event listener for window resize to optimize particle effect
  window.addEventListener(
    "resize",
    debounce(() => {
      const canvas = document.getElementById("portfolio-particles");
      if (canvas) {
        // Resize canvas and adjust particles
        canvas.width = portfolioGrid.offsetWidth;
        canvas.height = portfolioGrid.offsetHeight;
      }
    }, 250)
  ); // Debounce to avoid performance hit

  // Debounce helper function
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
}
