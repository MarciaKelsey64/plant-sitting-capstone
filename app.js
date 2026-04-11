// ==========================================
// 1. THE MOCK DATABASE
// ==========================================
const sittersData = [
    {
        name: "Elena R.",
        rate: "$15/day",
        tagline: "Monstera Specialist & Plant Whisperer",
        rating: "4.9",
        reviews: 24,
        location: "Chapel Hill, NC",
        zipCodes: ["27514", "27516", "27517"],
        image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=600&h=360&q=80"
    },
    {
        name: "David T.",
        rate: "$20/day",
        tagline: "Outdoor Garden & Succulent Expert",
        rating: "5.0",
        reviews: 18,
        location: "Chapel Hill, NC",
        zipCodes: ["27514", "27516", "27517", "27312"],
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&h=360&q=80"
    },
    {
        name: "Sarah M.",
        rate: "$12/day",
        tagline: "Cacti Lover. Will water with care!",
        rating: "4.7",
        reviews: 31,
        location: "Pittsboro, NC",
        zipCodes: ["27312", "27517"],
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=360&q=80"
    }
];

// ==========================================
// 2. THE SEARCH LOGIC
// ==========================================
const searchForm = document.getElementById('sitterSearchForm');
const locationInput = document.getElementById('locationInput');
const sitterGrid = document.getElementById('sitterGrid');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page reload

    // 1. Get the zip code the user typed, and trim any accidental spaces
    const searchZip = locationInput.value.trim();

    // 2. Filter our database! Keep only the sitters whose zipCodes array includes the searchZip
    const filteredSitters = sittersData.filter(sitter => sitter.zipCodes.includes(searchZip));

    // 3. Clear the current HTML grid completely
    sitterGrid.innerHTML = '';

    // 4. Inject the new results into the HTML
    if (filteredSitters.length === 0) {
        // If nobody matches, show a friendly empty state
        sitterGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: #555;">No sitters found in ${searchZip}. Try 27517 or 27312!</p>`;
    } else {
        // Loop through the filtered sitters and build a card for each one
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
                        <button class="view-profile-btn" aria-label="View ${sitter.name}'s full profile">View Profile</button>
                    </div>
                </article>
            `;
            // Add this new card to the grid container
            sitterGrid.innerHTML += cardHTML;
        });
    }
});