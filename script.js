document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".project-media").forEach((wrapper) => {
  const video = wrapper.querySelector("video");
  if (!video) return;

  const showVideo = () => {
    wrapper.classList.add("has-video");
  };

  // With preload="metadata", loadeddata is not guaranteed to fire immediately.
  // Show the video as soon as its metadata/source has been resolved.
  if (video.readyState >= 1) {
    showVideo();
  }

  video.addEventListener("loadedmetadata", showVideo);
  video.addEventListener("canplay", showVideo);

  video.addEventListener("error", () => {
    wrapper.classList.remove("has-video");
  });
});

document.querySelectorAll("[data-dialog-target]").forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.dialogTarget);
  if (!dialog) return;

  trigger.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });

  const closeButton = dialog.querySelector(".image-dialog-close");
  closeButton?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedBackdrop) dialog.close();
  });
});
