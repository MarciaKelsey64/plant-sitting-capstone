// ==========================================
// 1. THE MOCK DATABASE (Our Shared Vault)
// ==========================================
import { sittersData } from './db.js';

// ==========================================
// 2. THE PROFILE LOGIC (The Catcher's Mitt)
// ==========================================

// A. Look at the browser's URL bar and extract the ID
const urlParams = new URLSearchParams(window.location.search);
const targetId = urlParams.get('id');

// B. Find the empty container on our HTML page
const profileContainer = document.getElementById('profileContainer');

// C. Search our database to find the EXACT sitter that matches the ID
const sitter = sittersData.find(person => person.id === targetId);

// D. Paint the data onto the screen!
if (sitter) {
    // We found them! We replace the "Catching data..." text with a beautiful profile layout.

    // First, let's remove the grey background box styling from the container
    profileContainer.style.background = "transparent";
    profileContainer.style.padding = "0";

    // Now, inject the HTML
  profileContainer.innerHTML = `
        <picture>
            <img src="${sitter.image}" alt="${sitter.name}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        </picture>

        <div style="text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h1 style="margin: 0; font-size: 2.5rem; color: #333;">${sitter.name}</h1>
                <h2 style="margin: 0; color: #1a7f37;">${sitter.rate}</h2>
            </div>

            <p style="font-size: 1.2rem; color: #666; margin-bottom: 1.5rem;">📍 ${sitter.location} &nbsp;|&nbsp; ⭐ ${sitter.rating} (${sitter.reviews} Reviews)</p>

            <div style="background: #f4fcf6; border: 1px solid #c3e6cb; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; color: #1a7f37;">About Me</h3>
                <p style="line-height: 1.6; color: #444; margin-bottom: 0;">${sitter.bio}</p>
            </div>

            <a href="booking.html?id=${sitter.id}" class="view-profile-btn" style="display:block; text-align:center; text-decoration:none; box-sizing:border-box; width: 100%; font-size: 1.2rem; padding: 1rem;">Request to Book ${sitter.name}</a>
        </div>
    `;
} else {
    // Uh oh, the ID wasn't found (e.g., someone typed ?id=fake_id into the URL)
    profileContainer.innerHTML = `
        <h2 style="color: #d32f2f;">Profile Not Found</h2>
        <p>We couldn't find a plant sitter with that ID. They may have moved or deactivated their account.</p>
    `;
}
