const container = document.querySelectorAll(".mask-image");
const image = document.querySelector("img");

gsap.registerPlugin(Draggable);

container.forEach((elem) => {
  const canvas = elem.querySelector("canvas");

  canvas.width = elem.clientWidth;
  canvas.height = elem.clientHeight;

  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    -elem.offsetLeft,
    -elem.offsetTop,
    window.innerWidth,
    window.innerHeight
  );

  Draggable.create(elem, {
    type: "x,y",
    onDrag: (e) => {
      const rect = elem.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        -rect.left,
        -rect.top,
        window.innerWidth,
        window.innerHeight
      );
    },
    onDragEnd: (e) => {
      const rect = elem.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        -rect.left,
        -rect.top,
        window.innerWidth,
        window.innerHeight
      );
    }
  });
});
