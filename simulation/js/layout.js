let listItems = document.querySelectorAll(".steps ol li");
let activeIdx = 0;
// handle list items click
// for (const item of listItems) {
//     item.addEventListener("click", (event) => {
//         event.
//     });
// }
function nextDrawerItem() {
  if (activeIdx < listItems.length) {
    listItems[activeIdx].classList.add("active");
    if (activeIdx > 0) {
      listItems[activeIdx - 1].classList.add("completed");
      listItems[activeIdx - 1].classList.remove("active");
    }
  }
  activeIdx = activeIdx < listItems.length ? activeIdx + 1 : activeIdx;
  get("ol .active").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

function backDrawerItem() {
  if (activeIdx <= 1) return;
  activeIdx--;
  listItems[activeIdx].classList.remove("active");
  listItems[activeIdx].classList.add("completed");
  if (activeIdx > 0) {
    listItems[activeIdx - 1].classList.add("active");
  }
}

function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  const toggle = document.getElementById("drawer-toggle");

  drawer.classList.toggle("collapsed");
  toggle.classList.toggle("open");

  // Clear the auto-close timeout if user interacts manually
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout);
    autoCloseTimeout = null;
  }
}

// Initial state: drawer starts open (X icon)
document.getElementById("drawer-toggle").classList.add("open");
document.getElementById("drawer-toggle").addEventListener("click", toggleDrawer);

// Auto-close after 8 seconds
let autoCloseTimeout = setTimeout(() => {
  const drawer = document.getElementById("drawer");
  // Only close if it's currently open (doesn't have 'collapsed' class)
  if (!drawer.classList.contains("collapsed")) {
    toggleDrawer();
  }
}, 8000);

// Fullscreen Logic
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Update icon based on fullscreen state
document.addEventListener("fullscreenchange", () => {
  const icon = document.getElementById("fullscreen-icon");
  if (document.fullscreenElement) {
    // Exit fullscreen icon (exact YouTube current path)
    icon.innerHTML =
      '<path d="M3.29 3.29C3.11 3.46 3.01 3.70 3.00 3.94C2.98 4.19 3.06 4.43 3.22 4.63L3.29 4.70L7.58 8.99H5C4.73 8.99 4.48 9.10 4.29 9.29C4.10 9.47 4 9.73 4 9.99C4 10.26 4.10 10.51 4.29 10.70C4.48 10.89 4.73 10.99 5 10.99H11V4.99C11 4.73 10.89 4.47 10.70 4.29C10.51 4.10 10.26 3.99 10 3.99C9.73 3.99 9.48 4.10 9.29 4.29C9.10 4.47 9 4.73 9 4.99V7.58L4.70 3.29L4.63 3.22C4.43 3.06 4.19 2.98 3.94 3.00C3.70 3.01 3.46 3.11 3.29 3.29ZM19 13H13V19C13 19.26 13.10 19.51 13.29 19.70C13.48 19.89 13.73 20 14 20C14.26 20 14.51 19.89 14.70 19.70C14.89 19.51 15 19.26 15 19V16.41L19.29 20.70L19.36 20.77C19.56 20.92 19.80 21.00 20.04 20.99C20.29 20.98 20.52 20.87 20.70 20.70C20.87 20.52 20.98 20.29 20.99 20.04C21.00 19.80 20.92 19.56 20.77 19.36L20.70 19.29L16.41 15H19C19.26 15 19.51 14.89 19.70 14.70C19.89 14.51 20 14.26 20 14C20 13.73 19.89 13.48 19.70 13.29C19.51 13.10 19.26 13 19 13Z" />';
  } else {
    // Enter fullscreen icon (exact YouTube current path)
    icon.innerHTML =
      '<path d="M10 3H3V10C3 10.26 3.10 10.51 3.29 10.70C3.48 10.89 3.73 11 4 11C4.26 11 4.51 10.89 4.70 10.70C4.89 10.51 5 10.26 5 10V6.41L9.29 10.70L9.36 10.77C9.56 10.92 9.80 11.00 10.04 10.99C10.29 10.98 10.52 10.87 10.70 10.70C10.87 10.52 10.98 10.29 10.99 10.04C11.00 9.80 10.92 9.56 10.77 9.36L10.70 9.29L6.41 5H10C10.26 5 10.51 4.89 10.70 4.70C10.89 4.51 11 4.26 11 4C11 3.73 10.89 3.48 10.70 3.29C10.51 3.10 10.26 3 10 3ZM20 13C19.73 13 19.48 13.10 19.29 13.29C19.10 13.48 19 13.73 19 14V17.58L14.70 13.29L14.63 13.22C14.43 13.07 14.19 12.99 13.95 13.00C13.70 13.01 13.47 13.12 13.29 13.29C13.12 13.47 13.01 13.70 13.00 13.95C12.99 14.19 13.07 14.43 13.22 14.63L13.29 14.70L17.58 19H14C13.73 19 13.48 19.10 13.29 19.29C13.10 19.48 13 19.73 13 20C13 20.26 13.10 20.51 13.29 20.70C13.48 20.89 13.73 21 14 21H21V14C21 13.73 20.89 13.48 20.70 13.29C20.51 13.10 20.26 13 20 13Z" />';
  }
});

document.getElementById("fullscreen-btn").addEventListener("click", toggleFullscreen);

// ! Animation Speed Control
function initSpeedControl() {
  const speedSlider = document.getElementById("speed-slider");
  const speedBadge = document.getElementById("speed-badge");
  const speedNeedle = document.getElementById("speed-needle");
  const iconWrapper = document.querySelector(".icon-wrapper");

  if (!speedSlider) return;

  const syncSpeed = (speed) => {
    // Update global anime speed
    if (typeof anime !== "undefined") {
      anime.speed = speed;
    }

    // Update badge
    if (speed === 1) {
      speedBadge.classList.remove("visible");
    } else {
      speedBadge.innerText = `${speed}x`;
      speedBadge.classList.add("visible");
    }

    // Rotate needle mapping: 0.5x -> -22.5deg, 1x -> 0deg, 3x -> 90deg (approx with 45 factor)
    const rotation = (speed - 1) * 45;
    speedNeedle.style.transform = `rotate(${rotation}deg)`;

    // Update slider and tooltip
    speedSlider.value = speed;
    speedSlider.parentElement.title = `Animation Speed: ${speed}x`;
  };

  speedSlider.addEventListener("input", (e) => {
    syncSpeed(Math.min(Math.max(parseFloat(e.target.value), 0.5), 3));
  });

  // Reset speed to 1x on icon/badge click
  iconWrapper.addEventListener("click", () => {
    syncSpeed(1);
  });

  // Default init
  syncSpeed(1);
}

initSpeedControl();
