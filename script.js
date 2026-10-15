const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const imageDialog = document.getElementById("image-dialog");
if (imageDialog && typeof imageDialog.showModal === "function") {
  const viewerImage = imageDialog.querySelector("[data-viewer-image]");
  const viewerTitle = document.getElementById("image-dialog-title");
  const viewerCaption = document.getElementById("image-dialog-caption");
  let lastTrigger;

  document.querySelectorAll("[data-image-viewer]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const image = trigger.querySelector("img");
      if (!image || !viewerImage || !viewerTitle || !viewerCaption) return;
      const figure = trigger.closest("figure");
      viewerImage.src = image.currentSrc || image.src;
      viewerImage.alt = image.alt;
      viewerTitle.textContent = figure?.querySelector("h5")?.textContent || "PPO rotor-thrust plots";
      viewerCaption.textContent = trigger.dataset.caption || figure?.querySelector("figcaption p")?.textContent.trim() || image.alt;
      lastTrigger = trigger;
      imageDialog.showModal();
      document.body.classList.add("image-viewer-open");
    });
  });

  imageDialog.querySelector(".image-dialog-close")?.addEventListener("click", () => imageDialog.close());

  // Native dialog provides Escape-to-close and contains keyboard focus.
  imageDialog.addEventListener("close", () => {
    document.body.classList.remove("image-viewer-open");
    lastTrigger?.focus({ preventScroll: true });
  });
  imageDialog.addEventListener("click", (event) => {
    if (event.target !== imageDialog) return;
    const rect = imageDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) {
      imageDialog.close();
    }
  });
}
