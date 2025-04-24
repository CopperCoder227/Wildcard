const songs = [
    { id: 'song1', section: 'parallax1' },
    { id: 'song2', section: 'parallax2' },
    { id: 'song3', section: 'parallax3' }
];

let currentAudio = null;

// Function to play the song by its ID
function playSong(songId) {
    console.log(`Attempting to play: ${songId}`);
    if (currentAudio && currentAudio.id !== songId) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const newAudio = document.getElementById(songId);
    if (newAudio && newAudio !== currentAudio) {
        newAudio.play().then(() => {
            console.log(`${songId} is playing.`);
        }).catch((error) => {
            console.error(`Error playing ${songId}:`, error);
        });
        currentAudio = newAudio;
    }
}

// Function to check scroll position and change music based on visible section
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

// Automatically play the first song and unmute it after page load
window.addEventListener('load', () => {
    const firstSong = document.getElementById('song1');
    console.log('Page loaded, attempting to play the first song.');

    // Try to play the song (it starts muted to bypass autoplay restrictions)
    firstSong.play().then(() => {
        console.log('First song is playing (muted initially).');
    }).catch((error) => {
        console.error('Error starting first song:', error);
    });

    // Unmute the first song after a brief delay (1 second)
    setTimeout(() => {
        firstSong.muted = false;
        console.log('Unmuting first song.');
    }, 1000); // Adjust this delay if needed
});

// Monitor scroll event to change music based on visible section
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll); // Run once on page load