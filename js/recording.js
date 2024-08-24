document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".video-thumbnail");
  const mainVideo = document.getElementById("main-video");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoSrc = this.getAttribute("data-video-src");

      // Update the main video source and play it
      mainVideo.src = videoSrc;
      mainVideo.load();
      mainVideo.play();
    });
  });
});
/*
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.video-thumbnail');
    const mainVideo = document.getElementById('main-video');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const videoSrc = this.getAttribute('data-video-src');
            mainVideo.querySelector('source').src = videoSrc;
            mainVideo.load();
            mainVideo.play();
        });
    });
});
*/
