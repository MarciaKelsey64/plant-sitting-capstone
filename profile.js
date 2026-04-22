// ==========================================
// 1. THE MOCK DATABASE (Our Shared Vault)
// ==========================================
const sittersData = [
    {
        id: "sitter_01",
        name: "Elena R.",
        rate: "$15/day",
        tagline: "Monstera Specialist & Plant Whisperer",
        rating: "4.9",
        reviews: 24,
        location: "Chapel Hill, NC",
        zipCodes: ["27514", "27516", "27517"],
        image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=600&h=360&q=80",
        bio: "I've been propagating rare aroids for 5 years. I specialize in tropicals and guarantee your monsteras will thrive while you are away! I will also send daily photo updates."
    },
    {
        id: "sitter_02",
        name: "David T.",
        rate: "$20/day",
        tagline: "Outdoor Garden & Succulent Expert",
        rating: "5.0",
        reviews: 18,
        location: "Chapel Hill, NC",
        zipCodes: ["27514", "27516", "27517", "27312"],
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&h=360&q=80",
        bio: "Master gardener with a focus on drought-tolerant landscapes and outdoor vegetable beds. Rain or shine, your outdoor garden is completely safe with me."
    },
    {
        id: "sitter_03",
        name: "Sarah M.",
        rate: "$12/day",
        tagline: "Cacti Lover. Will water with care!",
        rating: "4.7",
        reviews: 31,
        location: "Pittsboro, NC",
        zipCodes: ["27312", "27517"],
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=360&q=80",
        bio: "Overwatering is the #1 plant killer! I know exactly when to ignore your cacti and when to give them a drink. Perfect for low-maintenance collections."
    }
];

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
        <img src="${sitter.image}" alt="${sitter.name}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

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
