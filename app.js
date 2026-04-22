// ==========================================
// 1. THE MOCK DATABASE
// ==========================================
import { sittersData } from './db.js';


// ==========================================
// 2. THE SEARCH LOGIC (With Loading Spinner)
// ==========================================
const searchForm = document.getElementById('sitterSearchForm');
const locationInput = document.getElementById('locationInput');
const sitterGrid = document.getElementById('sitterGrid');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page reload

    // 1. Grab the zip code and the actual submit button
    const searchZip = locationInput.value.trim();
    const submitBtn = searchForm.querySelector('button');

    // 2. Change the button to the "Loading" state
    const originalButtonText = submitBtn.innerHTML; // Save the original text
    submitBtn.innerHTML = '<div class="spinner"></div> Searching...';
    submitBtn.disabled = true; // Prevent double-clicking
    submitBtn.style.opacity = "0.8";

    // 3. Clear the current HTML grid immediately so the user knows action is taking place
    sitterGrid.innerHTML = '';

    // 4. THE FAKE DELAY: Set a timer to simulate a cloud database
    setTimeout(() => {

        // --- EVERYTHING INSIDE HERE HAPPENS AFTER 1.5 SECONDS ---
        const filteredSitters = sittersData.filter(sitter => sitter.zipCodes.includes(searchZip));

        if (filteredSitters.length === 0) {
            sitterGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: #555;">No sitters found in ${searchZip}. Try 27517 or 27312!</p>`;
        } else {
            filteredSitters.forEach(sitter => {
                const cardHTML = `
                    <article class="sitter-card">
                        <img src="${sitter.image}" alt="Photo of ${sitter.name}" class="sitter-photo">
                        <div class="sitter-info">
                            <div class="sitter-header">
                                <h3>${sitter.name}</h3>
                                <span class="sitter-rate">${sitter.rate}</span>
                            </div>
                            <p class="sitter-tagline">${sitter.tagline}</p>
                            <div class="sitter-meta">
                                <span>⭐ ${sitter.rating} (${sitter.reviews} reviews)</span>
                                <span>📍 ${sitter.location}</span>
                            </div>
                            <a href="profile.html?id=${sitter.id}" class="view-profile-btn" style="display:block; text-align:center; text-decoration:none; box-sizing:border-box;" aria-label="View ${sitter.name}'s full profile">View Profile</a>
                        </div>
                    </article>
                `;
                sitterGrid.innerHTML += cardHTML;
            });
        }

        // 5. Restore the button to normal so they can search again!
        submitBtn.innerHTML = originalButtonText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";

    }, 1500); // 1500 milliseconds = 1.5 seconds
});
