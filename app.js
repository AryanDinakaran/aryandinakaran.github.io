/**
 * EPOCHLYPSE RESEARCH // APP SCRIPT (LIGHT MODE)
 * - 3D Binary Earth Globe with Google Maps-style navigation (Direct grab, drag, zoom, touch pinch)
 * - Single-Page Tab Switching (Home, Projects, Contact)
 * - Mumbai, India (19.050862, 72.835904) Coordinate Tracking & Radar Pulse
 * - Monospace Terminal Interactions & 1-Click Clipboard
 * - Real-time Mumbai (IST) & UTC System Clocks
 */

// Embedded 2.7KB Base64 Equirectangular Landmask (360x180 resolution)
const WORLD_MASK_BASE64 = 
  "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";

// ==========================================================================
// 1. REVOLVING 3D BINARY EARTH GLOBE (GOOGLE MAPS STYLE INTERACTION)
// ==========================================================================

class BinaryGlobe {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    
    // Globe configuration: Fixed size, non-resizable, large sphere
    this.radius = 180;
    this.points = [];
    this.pointCount = window.innerWidth < 680 ? 2400 : 3600;
    this.axialTilt = -0.41; // approx 23.5 degrees in radians
    
    // Rotation state
    this.rotationY = 0.85; // Initial view centered on India/Asia
    this.rotationX = 0.15;
    this.autoRotateSpeed = 0.003;
    this.isAutoSpinning = true;
    this.userInteracted = false;
    
    // Easy direct drag tracking (inverted to opposite direction)
    this.isDragging = false;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.dragVelocityX = 0;
    this.dragVelocityY = 0;
    
    // Exact Mumbai Coordinates from User: 19.050862, 72.835904
    this.mumbaiLat = 19.050862;
    this.mumbaiLon = 72.835904;
    this.pulsePhase = 0;
    
    // Initialization
    this.initCanvasSize();
    this.loadLandMaskAndGeneratePoints();
    this.setupEventListeners();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvasSize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 480);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.width = size;
    this.height = size;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    
    // Radius fills canvas container grandly (non-resizable, big size)
    this.radius = size * 0.46;
  }

  loadLandMaskAndGeneratePoints() {
    const img = new Image();
    img.src = "data:image/png;base64," + WORLD_MASK_BASE64;
    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = 360;
      offCanvas.height = 180;
      const offCtx = offCanvas.getContext("2d");
      offCtx.drawImage(img, 0, 0);
      const imgData = offCtx.getImageData(0, 0, 360, 180).data;
      
      this.generateSpherePoints(imgData);
    };
  }

  generateSpherePoints(imgData) {
    this.points = [];
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < this.pointCount; i++) {
      const y = 1 - (i / (this.pointCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phiSpan * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      // Convert (x, y, z) to Latitude and Longitude
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);
      
      // Look up pixel on equirectangular map
      const px = Math.floor((lon + 180 + 360) % 360);
      const py = Math.floor(Math.max(0, Math.min(179, 90 - lat)));
      const idx = (py * 360 + px) * 4;
      
      // White pixel in mask represents land
      const isLand = imgData[idx] > 120;
      
      this.points.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        lat: lat,
        lon: lon,
        isLand: isLand,
        char: Math.random() > 0.5 ? "1" : "0",
        shimmerRate: Math.random() * 0.04 + 0.01
      });
    }
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.initCanvasSize();
    });

    const container = this.canvas.parentElement;
    
    // Smooth, effortless mouse drag navigation (inverted direction)
    container.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
      this.dragVelocityX = 0;
      this.dragVelocityY = 0;
      this.userInteracted = true;
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastPointerX;
      const dy = e.clientY - this.lastPointerY;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
      
      // Horizontal drag kept, vertical movement inverted per user request
      const sensitivity = 0.0052;
      this.dragVelocityX = -dx * sensitivity;
      this.dragVelocityY = dy * sensitivity;
      
      this.rotationY += this.dragVelocityX;
      this.rotationX += this.dragVelocityY;
      this.rotationX = Math.max(-1.1, Math.min(1.1, this.rotationX));
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    // Double-click to focus / recenter on Mumbai
    container.addEventListener("dblclick", () => {
      this.recenterOnMumbai();
    });

    // Touch drag for mobile phones
    container.addEventListener("touchstart", (e) => {
      if (e.touches.length >= 1) {
        this.isDragging = true;
        this.lastPointerX = e.touches[0].clientX;
        this.lastPointerY = e.touches[0].clientY;
        this.dragVelocityX = 0;
        this.dragVelocityY = 0;
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (this.isDragging && e.touches.length >= 1) {
        const dx = e.touches[0].clientX - this.lastPointerX;
        const dy = e.touches[0].clientY - this.lastPointerY;
        this.lastPointerX = e.touches[0].clientX;
        this.lastPointerY = e.touches[0].clientY;
        
        const sensitivity = 0.006;
        this.dragVelocityX = -dx * sensitivity;
        this.dragVelocityY = dy * sensitivity;
        
        this.rotationY += this.dragVelocityX;
        this.rotationX += this.dragVelocityY;
        this.rotationX = Math.max(-1.1, Math.min(1.1, this.rotationX));
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      this.isDragging = false;
    });

    // Controls Buttons
    const toggleSpinBtn = document.getElementById("toggleSpinBtn");
    if (toggleSpinBtn) {
      toggleSpinBtn.addEventListener("click", () => {
        this.isAutoSpinning = !this.isAutoSpinning;
        toggleSpinBtn.textContent = `Auto-Spin: ${this.isAutoSpinning ? "ON" : "OFF"}`;
      });
    }

    const resetGlobeBtn = document.getElementById("resetGlobeBtn");
    if (resetGlobeBtn) {
      resetGlobeBtn.addEventListener("click", () => {
        this.recenterOnMumbai();
      });
    }
  }

  recenterOnMumbai() {
    this.rotationY = 0.85;
    this.rotationX = 0.15;
    this.dragVelocityX = 0;
    this.dragVelocityY = 0;
  }

  projectPoint(x, y, z) {
    // 1. Rotation around Y-axis (Spin)
    const cosY = Math.cos(this.rotationY);
    const sinY = Math.sin(this.rotationY);
    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;
    let y1 = y;

    // 2. Rotation around X-axis (Pitch / Tilt)
    const totalPitch = this.rotationX + this.axialTilt;
    const cosX = Math.cos(totalPitch);
    const sinX = Math.sin(totalPitch);
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;
    let x2 = x1;

    // Center and scale onto canvas (fixed non-resizable large sphere)
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const depthScale = 1 + (z2 * 0.2);
    
    return {
      screenX: centerX + x2 * this.radius * depthScale,
      screenY: centerY - y2 * this.radius * depthScale,
      depth: z2,
      depthScale: depthScale
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.pulsePhase += 0.05;

    // Physics / Auto-spin damping
    if (this.isDragging) {
      // User is controlling rotation directly
    } else {
      // Damping release inertia
      this.rotationY += this.dragVelocityX;
      this.rotationX += this.dragVelocityY;
      this.dragVelocityX *= 0.94;
      this.dragVelocityY *= 0.94;

      if (this.isAutoSpinning) {
        this.rotationY += this.autoRotateSpeed;
      }
    }

    // Render Binary Points (0s and 1s - no circles or outer rings!)
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    for (let i = 0; i < this.points.length; i++) {
      const pt = this.points[i];
      
      // Shimmer binary character toggling
      if (Math.random() < pt.shimmerRate) {
        pt.char = pt.char === "1" ? "0" : "1";
      }

      const proj = this.projectPoint(pt.baseX, pt.baseY, pt.baseZ);
      const depth = proj.depth;

      if (pt.isLand) {
        // Land point: Crisp black binary characters '0' and '1'
        if (depth > 0) {
          // Front hemisphere: High contrast, prominent
          const alpha = 0.45 + depth * 0.55;
          const fontSize = Math.max(7, Math.round(11 * proj.depthScale));
          this.ctx.font = `600 ${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
          this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          this.ctx.fillText(pt.char, proj.screenX, proj.screenY);
        } else {
          // Back hemisphere: Faint depth silhouette
          const alpha = 0.08 + (depth + 1) * 0.08;
          const fontSize = Math.max(6, Math.round(8.5 * proj.depthScale));
          this.ctx.font = `400 ${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
          this.ctx.fillStyle = `rgba(110, 110, 110, ${alpha})`;
          this.ctx.fillText(pt.char, proj.screenX, proj.screenY);
        }
      } else {
        // Ocean point: Faint subtle background matrix dot
        if (depth > 0.15) {
          const alpha = 0.05 * depth;
          this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          this.ctx.fillRect(proj.screenX - 0.75, proj.screenY - 0.75, 1.5, 1.5);
        }
      }
    }
    this.ctx.textBaseline = "middle";

    for (let i = 0; i < this.points.length; i++) {
      const pt = this.points[i];
      
      // Shimmer binary character toggling
      if (Math.random() < pt.shimmerRate) {
        pt.char = pt.char === "1" ? "0" : "1";
      }

      const proj = this.projectPoint(pt.baseX, pt.baseY, pt.baseZ);
      const depth = proj.depth;

      if (pt.isLand) {
        // Land point: Vivid black binary characters '0' and '1'
        if (depth > 0) {
          // Front hemisphere: Crisp black, high contrast
          const alpha = 0.45 + depth * 0.55;
          const fontSize = Math.max(7, Math.round(10.5 * proj.depthScale * Math.min(1.3, this.zoom)));
          this.ctx.font = `600 ${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
          this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          this.ctx.fillText(pt.char, proj.screenX, proj.screenY);
        } else {
          // Back hemisphere: Faint depth silhouette
          const alpha = 0.08 + (depth + 1) * 0.08;
          const fontSize = Math.max(6, Math.round(8.5 * proj.depthScale * Math.min(1.2, this.zoom)));
          this.ctx.font = `400 ${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
          this.ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`;
          this.ctx.fillText(pt.char, proj.screenX, proj.screenY);
        }
      } else {
        // Ocean point: Faint subtle background matrix dot
        if (depth > 0.15) {
          const alpha = 0.05 * depth;
          this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          this.ctx.fillRect(proj.screenX - 0.75, proj.screenY - 0.75, 1.5, 1.5);
        }
      }
    }

    // 3. Mumbai (19.050862, 72.835904) Location Tracker & Callout
    this.renderMumbaiMarker();

    requestAnimationFrame(this.animate);
  }

  renderMumbaiMarker() {
    // Convert Mumbai Lat/Lon to Unit Sphere
    const latRad = this.mumbaiLat * (Math.PI / 180);
    const lonRad = this.mumbaiLon * (Math.PI / 180);
    
    const mx = Math.cos(latRad) * Math.sin(lonRad);
    const my = Math.sin(latRad);
    const mz = Math.cos(latRad) * Math.cos(lonRad);

    const proj = this.projectPoint(mx, my, mz);

    // Only display marker if Mumbai is facing the viewer
    if (proj.depth > 0.05) {
      const alpha = Math.min(1, (proj.depth - 0.05) * 3);
      const pulseSize = 6 + Math.sin(this.pulsePhase) * 4;

      this.ctx.save();

      // Pulsing radar target rings (Black in Light Mode)
      this.ctx.beginPath();
      this.ctx.arc(proj.screenX, proj.screenY, pulseSize + 4, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 0, 0, ${0.35 * alpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(proj.screenX, proj.screenY, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      this.ctx.fill();

      // Label text & measure
      const labelText = "MUMBAI [19.0509° N, 72.8359° E]";
      this.ctx.font = "700 9px " + getComputedStyle(document.body).fontFamily;
      const textWidth = this.ctx.measureText(labelText).width;

      // Smart positioning: flip left if near right edge of canvas
      let calloutX = proj.screenX + 34;
      let calloutY = proj.screenY - 22;
      let lineMidX = proj.screenX + 16;
      let lineMidY = proj.screenY - 14;
      let lineEndX = calloutX - 4;

      if (calloutX + textWidth + 10 > this.width) {
        calloutX = proj.screenX - textWidth - 34;
        lineMidX = proj.screenX - 16;
        lineEndX = calloutX + textWidth + 4;
      }

      // Hairline connector line to HUD callout box
      this.ctx.beginPath();
      this.ctx.moveTo(proj.screenX, proj.screenY);
      this.ctx.lineTo(lineMidX, lineMidY);
      this.ctx.lineTo(lineEndX, calloutY);
      this.ctx.strokeStyle = `rgba(0, 0, 0, ${0.75 * alpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // HUD Label Background Pill (White with Crisp Black Border)
      this.ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
      this.ctx.fillRect(calloutX - 4, calloutY - 9, textWidth + 8, 16);
      this.ctx.strokeStyle = `rgba(0, 0, 0, ${0.85 * alpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(calloutX - 4, calloutY - 9, textWidth + 8, 16);

      // HUD Text
      this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      this.ctx.textAlign = "left";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(labelText, calloutX, calloutY);

      this.ctx.restore();
    }
  }
}

// ==========================================================================
// 2. TAB ROUTING & NAVIGATION
// ==========================================================================

function initTabNavigation() {
  const tabs = document.querySelectorAll(".nav-tab-btn");
  const views = document.querySelectorAll(".tab-view");

  function switchTab(targetTabId) {
    let cleanId = targetTabId.replace("#", "").toLowerCase();
    if (!["home", "projects", "contact"].includes(cleanId)) {
      cleanId = "home";
    }

    tabs.forEach(btn => {
      const tabName = btn.getAttribute("data-tab");
      if (tabName === cleanId) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });

    views.forEach(view => {
      if (view.id === `tab-${cleanId}`) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });

    if (window.location.hash !== `#${cleanId}`) {
      history.replaceState(null, "", `#${cleanId}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab");
      switchTab(tabName);
    });
  });

  document.querySelectorAll("[data-nav-target]").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const target = trigger.getAttribute("data-nav-target");
      switchTab(target);
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    if (hash) {
      switchTab(hash);
    }
  });

  window.addEventListener("hashchange", () => {
    switchTab(window.location.hash);
  });
}

// ==========================================================================
// 3. TOAST & CLIPBOARD UTILITIES
// ==========================================================================

function showToast(message) {
  let toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.textContent = `[SYSTEM] ${message}`;
  toast.classList.add("show");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || "Copied to clipboard");
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  tempInput.style.position = "fixed";
  tempInput.style.opacity = "0";
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    showToast(successMsg || "Copied to clipboard");
  } catch (err) {
    showToast("Copy failed — manual copy required");
  }
  document.body.removeChild(tempInput);
}

// ==========================================================================
// 4. LIVE MUMBAI (IST) & UTC CLOCK
// ==========================================================================

function initLiveClocks() {
  const clockEl = document.getElementById("liveClock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    
    // Mumbai (IST = UTC+5:30)
    const istOptions = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const istTime = new Intl.DateTimeFormat("en-GB", istOptions).format(now);
    
    // UTC
    const utcHours = String(now.getUTCHours()).padStart(2, "0");
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, "0");
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, "0");
    const utcTime = `${utcHours}:${utcMinutes}:${utcSeconds}`;

    clockEl.textContent = `MUMBAI [IST] ${istTime} // UTC ${utcTime}`;
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// 5. INTERACTIVE MESSAGE COMPOSER
// ==========================================================================

function initMessageComposer() {
  const composerBtn = document.getElementById("sendComposerBtn");
  const subjectInput = document.getElementById("composerSubject");
  const bodyInput = document.getElementById("composerBody");

  if (composerBtn && subjectInput && bodyInput) {
    composerBtn.addEventListener("click", () => {
      const subject = encodeURIComponent(subjectInput.value.trim() || "Epochlypse Research Inquiry");
      const body = encodeURIComponent(bodyInput.value.trim());
      const mailtoUrl = `mailto:aryan@epochlypse.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoUrl;
      showToast("Opening default mail client...");
    });
  }
}

// ==========================================================================
// 6. DOM BOOTSTRAP
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  new BinaryGlobe("globeCanvas");
  initTabNavigation();
  initLiveClocks();
  initMessageComposer();

  document.querySelectorAll("[data-copy-target]").forEach(button => {
    button.addEventListener("click", () => {
      const targetText = button.getAttribute("data-copy-target");
      const label = button.getAttribute("data-copy-label") || "Copied!";
      copyToClipboard(targetText, label);
    });
  });
});
