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