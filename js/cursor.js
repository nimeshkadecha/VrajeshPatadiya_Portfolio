let cursorVisible = false;
let cursorEnlarged = false;

let endX = window.innerWidth / 2;
let endY = window.innerHeight / 2;
let cursorX = endX;
let cursorY = endY;

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

const delay = 18;
const dotSize = 8;

// Variables to track cursor state during interactions
let isScrolling = false;
let isClicking = false;
let cursorState = {
  size: "normal",
  color: "",
  outlineSize: { width: "40px", height: "40px" },
};

function toggleCursorVisibility() {
  if (cursorVisible) {
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
  } else {
    cursorDot.style.opacity = 0;
    cursorOutline.style.opacity = 0;
  }
}

// Updated function to modify scale without affecting position
function updateCursorScale() {
  if (cursorEnlarged) {
    gsap.to(cursorDot, { 
      scale: 2.5, 
      duration: 0.2,
      ease: "power2.out"
    });
    gsap.to(cursorOutline, { 
      scale: 0.5, 
      duration: 0.2,
      ease: "power2.out"
    });
  } else {
    gsap.to(cursorDot, { 
      scale: 1, 
      duration: 0.2,
      ease: "power2.out"
    });
    gsap.to(cursorOutline, { 
      scale: 1, 
      duration: 0.2,
      ease: "power2.out"
    });
  }
}

function mouseOverEvent() {
  cursorEnlarged = true;
  updateCursorScale();

  // Store the current state
  cursorState.size = "enlarged";
}

function mouseOutEvent() {
  cursorEnlarged = false;
  updateCursorScale();

  // Reset to normal state
  cursorState.size = "normal";
  cursorState.color = "";

  // Reset style only if not clicking or scrolling
  if (!isClicking && !isScrolling) {
    cursorDot.style.backgroundColor = "";
    cursorOutline.style.borderColor = "";
    cursorOutline.style.width = "40px";
    cursorOutline.style.height = "40px";
  }
}

function mouseEnterEvent() {
  cursorVisible = true;
  toggleCursorVisibility();
}

function mouseLeaveEvent() {
  cursorVisible = false;
  toggleCursorVisibility();
}

// Updated function to properly position the cursor dot
function mouseMoveEvent(e) {
  cursorVisible = true;
  toggleCursorVisibility();

  // Store the cursor position
  endX = e.clientX;
  endY = e.clientY;

  // Position the dot immediately at cursor position
  gsap.set(cursorDot, {
    x: endX,
    y: endY,
    xPercent: -50,
    yPercent: -50
  });
}

function mouseDownEvent() {
  isClicking = true;

  // Shrink the outline on click
  gsap.to(cursorDot, { 
    scale: 2.8, 
    duration: 0.2
  });
  gsap.to(cursorOutline, { 
    scale: 0.4, 
    duration: 0.2
  });

  // Store previous state to restore after click
  cursorState.previousScale = cursorOutline._gsap ? cursorOutline._gsap.scale : 1;
}

function mouseUpEvent() {
  isClicking = false;

  // Restore previous state
  if (cursorState.size === "enlarged") {
    gsap.to(cursorDot, { 
      scale: 2.5, 
      duration: 0.2
    });
    gsap.to(cursorOutline, { 
      scale: 0.5, 
      duration: 0.2
    });
  } else {
    gsap.to(cursorDot, { 
      scale: 1, 
      duration: 0.2
    });
    gsap.to(cursorOutline, { 
      scale: 1, 
      duration: 0.2
    });
  }
}

// Handle scroll event
function scrollEvent() {
  isScrolling = true;

  // Clear previous timeout if it exists
  if (window.scrollTimeout) {
    clearTimeout(window.scrollTimeout);
  }

  // Set timeout to detect when scrolling has stopped
  window.scrollTimeout = setTimeout(function () {
    isScrolling = false;

    // Restore previous state if not hovering or clicking
    if (cursorState.size !== "enlarged" && !isClicking) {
      gsap.to(cursorDot, { 
        scale: 1, 
        duration: 0.2
      });
      gsap.to(cursorOutline, { 
        scale: 1, 
        duration: 0.2
      });

      cursorDot.style.backgroundColor = "";
      cursorOutline.style.borderColor = "";
      cursorOutline.style.width = "40px";
      cursorOutline.style.height = "40px";
    }
  }, 200);
}

// Cursor following animation with lag effect - completely revised
function animateCursor() {
  // Calculate distance between current cursor position and target position
  cursorX += (endX - cursorX) / delay;
  cursorY += (endY - cursorY) / delay;

  // Apply the position to the outline with lag, but maintain transforms
  gsap.set(cursorOutline, {
    x: cursorX,
    y: cursorY,
    xPercent: -50,
    yPercent: -50
  });

  requestAnimationFrame(animateCursor);
}

// Initialize cursor functionality once the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if cursor elements exist
  if (!cursorDot || !cursorOutline) return;

  // Reset any transforms from CSS to start with clean slate
  gsap.set([cursorDot, cursorOutline], {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  // Event listeners for cursor behavior
  document.addEventListener("mousemove", mouseMoveEvent);
  document.addEventListener("mouseenter", mouseEnterEvent);
  document.addEventListener("mouseleave", mouseLeaveEvent);
  document.addEventListener("mousedown", mouseDownEvent);
  document.addEventListener("mouseup", mouseUpEvent);
  document.addEventListener("scroll", scrollEvent, { passive: true });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .portfolio-item, .filter-btn, input, textarea, .modal-image, .social-icon"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      mouseOverEvent();

      // Store element type for proper state restoration
      cursorState.elementType = this.tagName.toLowerCase();

      // Special handling for different element types
      if (this.classList.contains("portfolio-item")) {
        cursorDot.style.backgroundColor = "#fd79a8";
        cursorOutline.style.borderColor = "#fd79a8";
        cursorOutline.style.width = "80px";
        cursorOutline.style.height = "80px";
        cursorState.outlineSize = { width: "80px", height: "80px" };
        cursorState.color = "#fd79a8";
      } else if (this.classList.contains("cta-button")) {
        cursorDot.style.backgroundColor = "#00b894";
        cursorState.color = "#00b894";
      }
    });

    el.addEventListener("mouseleave", mouseOutEvent);
  });

  // Prevent cursor from getting stuck on click
  document.addEventListener("click", function (e) {
    // Don't reset if clicking on interactive elements
    if (
      e.target.tagName === "A" ||
      e.target.tagName === "BUTTON" ||
      e.target.classList.contains("portfolio-item") ||
      e.target.classList.contains("modal-image")
    ) {
      return;
    }

    // Reset to normal state after a brief delay
    setTimeout(() => {
      if (!isScrolling && !isClicking) {
        cursorEnlarged = false;
        updateCursorScale();
        cursorDot.style.backgroundColor = "";
        cursorOutline.style.borderColor = "";
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorState.size = "normal";
        cursorState.color = "";
      }
    }, 100);
  });

  // Start the cursor animation
  animateCursor();

  // Hide default cursor
  document.body.style.cursor = "none";

  // Fix for mobile/touch devices
  if ("ontouchstart" in window) {
    document.body.style.cursor = "auto";
    cursorDot.style.display = "none";
    cursorOutline.style.display = "none";
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  // Reset cursor position to prevent jumping when resizing
  if (!cursorVisible) {
    cursorX = window.innerWidth / 2;
    cursorY = window.innerHeight / 2;
    endX = cursorX;
    endY = cursorY;
  }
});

// Add magnetic effect for CTA buttons
document.addEventListener("DOMContentLoaded", () => {
  const ctaButtons = document.querySelectorAll(".cta-button");

  ctaButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) * 0.1;
      const deltaY = (y - centerY) * 0.1;

      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      // Fix the cursor scaling to ensure proper alignment
      gsap.to(cursorDot, {
        scale: 3,
        backgroundColor: "#00b894",
        duration: 0.2
      });

      cursorState.color = "#00b894";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";

      if (!isScrolling && !isClicking) {
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: "",
          duration: 0.2
        });
      }
    });
  });
});
