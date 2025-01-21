// Function to check viewport size and adjust letter display
function adjustLetterSize() {
    const letter = document.getElementById("letter");
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth < 768) { // Mobile breakpoint
        letter.style.width = "90%";
        letter.style.margin = "20px auto";
        letter.style.fontSize = "0.9em";
    } else if (viewportWidth < 1024) { // Tablet breakpoint
        letter.style.width = "80%";
        letter.style.margin = "30px auto";
        letter.style.fontSize = "1em";
    } else { // Desktop
        letter.style.width = "60%";
        letter.style.margin = "40px auto";
        letter.style.fontSize = "1.1em";
    }
}

function toggleLetter() {
    const letter = document.getElementById("letter");
    const button = document.querySelector('button');
    const buttonText = button.querySelector('.button-text');
    const buttonIcon = button.querySelector('.button-icon');
    
    // Add fade transition
    letter.style.transition = "all 0.5s ease-in-out";
    
    if (letter.style.display === "none" || letter.style.display === "") {
        letter.style.opacity = "0";
        letter.style.display = "block";
        // Adjust size before showing
        adjustLetterSize();
        // Trigger reflow
        letter.offsetHeight;
        letter.style.opacity = "1";
        buttonText.textContent = "Close Letter";
        buttonIcon.textContent = "";
    } else {
        letter.style.opacity = "0";
        // Wait for fade out animation to complete
        setTimeout(() => {
            letter.style.display = "none";
            buttonText.textContent = "Read My Letter to You";
            buttonIcon.textContent = "💌";
        }, 500);
    }
}

function togglePicture() {
    const specialImage = document.querySelector('.special-image');
    const letterIcon = document.querySelector('.letter-icon');
    
    // Add fade transition
    specialImage.style.transition = "all 0.5s ease-in-out";
    
    if (specialImage.style.display === "none" || specialImage.style.display === "") {
        specialImage.style.opacity = "0";
        specialImage.style.display = "block";
        // Trigger reflow
        specialImage.offsetHeight;
        specialImage.style.opacity = "1";
        letterIcon.textContent = "";
    } else {
        specialImage.style.opacity = "0";
        // Wait for fade out animation to complete
        setTimeout(() => {
            specialImage.style.display = "none";
            letterIcon.textContent = "❤️";
        }, 500);
    }
}

// Create audio element for the song
const audio = new Audio('https://cdn.pixabay.com/download/audio/2024/02/14/audio_abhi-na-jao-chor-kar.mp3');
audio.loop = true;

let isPlaying = false;

function togglePlay() {
    const vinylRecord = document.querySelector('.vinyl-record');
    
    if (!isPlaying) {
        audio.play()
            .then(() => {
                isPlaying = true;
                vinylRecord.classList.add('spinning');
            })
            .catch(error => {
                console.error("Error playing audio:", error);
                // Fallback to YouTube link if audio fails to play
                window.open('https://youtu.be/mfEQgoVi7P4?si=qGdJuQGKLccSnN69', '_blank');
            });
    } else {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        vinylRecord.classList.remove('spinning');
    }
}

// Add event listeners for responsiveness
window.addEventListener('resize', adjustLetterSize);
window.addEventListener('load', adjustLetterSize);
window.addEventListener('load', () => {
    // Initially hide the special image
    const specialImage = document.querySelector('.special-image');
    specialImage.style.display = "none";
    
    // Add click event to letter icon
    const letterIcon = document.querySelector('.letter-icon');
    letterIcon.textContent = "❤️"; // Set initial heart icon
    letterIcon.addEventListener('click', togglePicture);

    // Add click event to vinyl record
    const vinylRecord = document.querySelector('.vinyl-record');
    vinylRecord.addEventListener('click', (e) => {
        // Only toggle play if not clicking the YouTube link
        if (!e.target.closest('.record-link')) {
            e.preventDefault();
            togglePlay();
        }
    });
});

// Add event listener for keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const letter = document.getElementById("letter");
        const specialImage = document.querySelector('.special-image');
        if (letter.style.display === "block") {
            toggleLetter();
        }
        if (specialImage.style.display === "block") {
            togglePicture();
        }
        // Stop audio if playing
        if (isPlaying) {
            togglePlay();
        }
    }
});
document.querySelector('.dropdown-toggle').addEventListener('click', function() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});