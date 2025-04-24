// Get the audio elements
const song1 = document.getElementById('song1');
const song2 = document.getElementById('song2');

// Get the sections to trigger the audio change
const parallax5 = document.getElementById('parallax5');
const parallax6 = document.getElementById('parallax6');
const parallax7 = document.getElementById('parallax7');

// Start song1 when the page loads
window.addEventListener('load', () => {
    song1.play();
});

// Listen to the scroll event and trigger audio changes
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // When the scroll position reaches parallax5, stop song1 and play song2
    if (scrollPosition >= parallax5.offsetTop - window.innerHeight / 2) {
        if (!song1.paused) {
            song1.pause();
        }
        song2.play();
    } else {
        // If in parallax4 or before parallax5 starts, stop song2 and play song1
        if (!song2.paused) {
            song2.pause();
        }
        song1.play();
    }

    // If the user scrolls into parallax7, stop both songs
    if (scrollPosition >= parallax7.offsetTop - window.innerHeight / 2) {
        song1.pause();
        song2.pause();
    }
});





const songs = [
    { id: 'song1', section: 'parallax1' },
    { id: 'song2', section: 'parallax2' },
    { id: 'song3', section: 'parallax3' }
];

let currentAudio = null;

function playSong(songId) {
    if (currentAudio && currentAudio.id !== songId) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const newAudio = document.getElementById(songId);
    if (newAudio && newAudio !== currentAudio) {
        newAudio.play();
        currentAudio = newAudio;
    }
}

function checkScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let s of songs) {
        const section = document.getElementById(s.section);
        if (section) {
            const rect = section.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const bottom = top + rect.height;

            if (scrollPosition >= top && scrollPosition < bottom) {
                playSong(s.id);
                break;
            }
        }
    }
}

// Mute and unmute the first song to bypass autoplay restrictions
window.addEventListener('load', () => {
    // Allow the first song to play with the muted attribute
    const firstSong = document.getElementById('song1');
    firstSong.play();

    // Wait for a moment (like a timeout) and then unmute
    setTimeout(() => {
        firstSong.muted = false;
    }, 1000); // Unmute after 1 second
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll); // Run once on page load

setTimeout(() => {
    firstSong.muted = false;
}, 1000); // Adjust delay if needed
