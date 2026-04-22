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
        image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=600&h=360&q=80"
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
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&h=360&q=80"
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
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=360&q=80"
    }
];

// ==========================================
// 2. THE BOOKING LOGIC & DYNAMIC BACK BUTTON
// ==========================================

// A. Extract the ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const targetId = urlParams.get('id');

// B. Fix the "Back to Profile" button dynamically
const backBtn = document.getElementById('backToProfileBtn');
if (targetId) {
    backBtn.href = `profile.html?id=${targetId}`;
} else {
    backBtn.href = `index.html`;
}

// C. Find the empty container and the specific sitter
const checkoutContainer = document.getElementById('checkoutContainer');
const sitter = sittersData.find(person => person.id === targetId);

// D. Inject the Secure Checkout Form
if (sitter) {
    checkoutContainer.style.background = "transparent";
    checkoutContainer.style.padding = "0";
    checkoutContainer.style.textAlign = "left";

    checkoutContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">

            <div style="background: #ffffff; padding: 2rem; border-radius: 12px; border: 1px solid #eaeaea; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h2 style="margin-top: 0; color: #333;">Booking Details</h2>

                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Select Dates</label>
                <input type="date" style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;">

                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Message to ${sitter.name}</label>
                <textarea rows="4" placeholder="Tell ${sitter.name} about your plants..." style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid #ccc; border-radius: 8px; font-family: inherit;"></textarea>

                <button id="confirmBtn" class="view-profile-btn" style="width: 100%; font-size: 1.2rem; padding: 1rem;">Confirm Booking</button>
            </div>

            <div style="background: #f9f9f9; padding: 2rem; border-radius: 12px; border: 1px solid #eaeaea;">
                <h3 style="margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">Order Summary</h3>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; margin-top: 1.5rem;">
                <picture>
                    <img src="${sitter.image}" alt="${sitter.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%;">
                </picture>
                    <div>
                        <h4 style="margin: 0; font-size: 1.2rem;">${sitter.name}</h4>
                        <p style="margin: 0; color: #666;">⭐ ${sitter.rating} Rating</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Daily Rate</span><strong>${sitter.rate}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Service Fee</span><strong>$5.00</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #ddd; font-size: 1.2rem; font-weight: bold;">
                    <span>Total</span><span style="color: #1a7f37;">Calculated at checkout</span>
                </div>
            </div>
        </div>
    `;

    // ==========================================
    // E. THE SUCCESS ANIMATION LOGIC
    // ==========================================
    const confirmBtn = document.getElementById('confirmBtn');

    confirmBtn.addEventListener('click', function() {
        // 1. Show processing state
        this.innerHTML = '<div class="spinner"></div> Processing Payment...';
        this.style.opacity = '0.8';
        this.disabled = true;

        // 2. Wait 1.5 seconds, then show the sprouting success screen!
        setTimeout(() => {
            checkoutContainer.innerHTML = `
                <div class="success-container">
                    <div style="margin-bottom: 1.5rem;">
                        <span class="sprout-icon sprout-1">🌱</span>
                        <span class="sprout-icon sprout-2">🪴</span>
                        <span class="sprout-icon sprout-3">🌿</span>
                    </div>
                    <h2 style="color: #1a7f37; font-size: 2.5rem; margin-bottom: 1rem;">Booking Confirmed!</h2>
                    <p style="font-size: 1.2rem; color: #555; max-width: 500px; margin: 0 auto 2rem auto;">
                        Your plants are in good hands! We've sent your request to <strong>${sitter.name}</strong>. They will review your dates and reach out shortly.
                    </p>
                    <a href="index.html" class="view-profile-btn" style="display: inline-block; text-decoration: none; padding: 1rem 2rem;">Return to Dashboard</a>
                </div>
            `;
        }, 1500);
    });

} else {
    checkoutContainer.innerHTML = `
        <h2 style="color: #d32f2f;">Checkout Error</h2>
        <p>We couldn't load the booking details. Please return to the search page.</p>
    `;
}
