import { sittersData } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get the sitter id or name from the URL (e.g., profile.html?id=sitter_01 or profile.html?name=Elena R.)
    const params = new URLSearchParams(window.location.search);
    const sitterId = params.get('id');
    const sitterName = params.get('name');

    if (!sitterId && !sitterName) {
        console.error("No sitter id or name provided in URL");
        return;
    }

    // Find the sitter data by id first, then fallback to name
    const sitter = sitterId
        ? sittersData.find(s => s.id === sitterId)
        : sittersData.find(s => s.name === sitterName);

    if (!sitter) {
        console.error("Sitter not found:", sitterId || sitterName);
        document.getElementById('profileContainer').innerHTML = '<p>Sitter not found.</p>';
        return;
    }

    // Display the sitter profile
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = `
        <img src="${sitter.image}" alt="${sitter.name}" class="profile-image">
        <h1>${sitter.name}</h1>
        <p class="profile-rate">${sitter.rate}</p>
        <p class="profile-tagline">${sitter.tagline}</p>
        <div class="profile-meta">
            <p><strong>Rating:</strong> ⭐ ${sitter.rating} (${sitter.reviews} reviews)</p>
            <p><strong>Location:</strong> ${sitter.location}</p>
            <p><strong>Service Areas:</strong> ${sitter.zipCodes.join(', ')}</p>
        </div>
        <a href="booking.html?id=${sitter.id}" class="profile-book-btn">Book This Sitter</a>
    `;

    console.log("Profile page loaded for:", sitterName);
});