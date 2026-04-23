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
        <img src="${sitter.image}" alt="${sitter.name}" style="width: 200px; height: 200px; border-radius: 12px; object-fit: cover; margin: 0 auto 1.5rem; display: block;">
        <h1>${sitter.name}</h1>
        <p style="font-size: 1.1rem; color: #1a7f37; margin: 0.5rem 0; font-weight: bold;">${sitter.rate}</p>
        <p style="font-size: 0.95rem; color: #555; margin: 1rem 0;">${sitter.tagline}</p>
        <div style="margin: 1.5rem 0; font-size: 0.95rem;">
            <p><strong>Rating:</strong> ⭐ ${sitter.rating} (${sitter.reviews} reviews)</p>
            <p><strong>Location:</strong> ${sitter.location}</p>
            <p><strong>Service Areas:</strong> ${sitter.zipCodes.join(', ')}</p>
        </div>
        <a href="booking.html?id=${sitter.id}" style="display: inline-block; padding: 0.8rem 2rem; background: #1a7f37; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 1.5rem;">Book This Sitter</a>
    `;

    console.log("Profile page loaded for:", sitterName);
});