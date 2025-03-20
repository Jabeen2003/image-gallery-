document.addEventListener("DOMContentLoaded", function () {
    let currentAudio = null; 

    const images = document.querySelectorAll(".grid-item");

    images.forEach((image) => {
        let clickTimeout = null; 

        image.addEventListener("click", function () {
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
                return;
            }

            clickTimeout = setTimeout(() => {
                const audioId = image.getAttribute("data-audio");
                const audio = document.getElementById(audioId);

                if (audio) {
                    if (currentAudio && currentAudio !== audio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                    audio.play().catch((error) => {
                        console.error("Error playing audio:", error);
                    });
                    currentAudio = audio;
                } else {
                    console.error("Audio element not found:", audioId);
                }
                clickTimeout = null;
            }, 250);
        });

        image.addEventListener("dblclick", function () {
            const audioId = image.getAttribute("data-audio");
            const audio = document.getElementById(audioId);

            if (audio && !audio.paused) {
                audio.pause();
            }
        });
    });
});
