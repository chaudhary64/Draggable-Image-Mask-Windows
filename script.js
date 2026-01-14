const containers = document.querySelectorAll(".mask-image");
const image = document.querySelector("img");

gsap.registerPlugin(Draggable);

containers.forEach((elem) => {
  const canvas = elem.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = elem.clientWidth;
  canvas.height = elem.clientHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  function drawClippedImage() {
    if (!image.naturalWidth) return;

    const rect = elem.getBoundingClientRect();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    /* ================================
       1️⃣ ASPECT RATIOS
    ================================= */
    const imageAspect = image.naturalWidth / image.naturalHeight;
    const windowAspect = windowWidth / windowHeight;

    /* ================================
       2️⃣ SIMULATE object-fit: cover
    ================================= */
    let displayWidth, displayHeight, displayX, displayY;

    if (imageAspect > windowAspect) {
      // image is wider → fit height
      displayHeight = windowHeight;
      displayWidth = displayHeight * imageAspect;
      displayX = (windowWidth - displayWidth) / 2;
      displayY = 0;
    } else {
      // image is taller → fit width
      displayWidth = windowWidth;
      displayHeight = displayWidth / imageAspect;
      displayX = 0;
      displayY = (windowHeight - displayHeight) / 2;
    }

    /* ================================
       3️⃣ DISPLAY → IMAGE SCALE
    ================================= */
    const scaleX = image.naturalWidth / displayWidth;
    const scaleY = image.naturalHeight / displayHeight;

    /* ================================
       4️⃣ SCREEN → IMAGE COORDS
    ================================= */
    const sourceX = (rect.left - displayX) * scaleX;
    const sourceY = (rect.top - displayY) * scaleY;
    const sourceWidth = canvas.width * scaleX;
    const sourceHeight = canvas.height * scaleY;

    /* ================================
       5️⃣ DRAW CROPPED IMAGE
    ================================= */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  // Initial draw
  drawClippedImage();

  // Draggable mask
  Draggable.create(elem, {
    type: "x,y",
    onDrag: drawClippedImage,
    onDragEnd: drawClippedImage,
  });

  // Optional: keep correct on resize
  window.addEventListener("resize", () => {
    canvas.width = elem.clientWidth;
    canvas.height = elem.clientHeight;
    drawClippedImage();
  });
});
