document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".project-media").forEach((wrapper) => {
  const video = wrapper.querySelector("video");
  if (!video) return;

  video.addEventListener("loadeddata", () => {
    wrapper.classList.add("has-video");
  });

  video.addEventListener("error", () => {
    wrapper.classList.remove("has-video");
  });
});