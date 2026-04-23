// ==========================================
// 1. THE MOCK DATABASE (Our Shared Vault)
// ==========================================
import { sittersData } from './db.js';

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

                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Start Date</label>
                <input id="bookingStartDate" type="date" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;">

                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">End Date</label>
                <input id="bookingEndDate" type="date" style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;">

                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Message to ${sitter.name}</label>
                <textarea id="bookingMessage" rows="4" placeholder="Tell ${sitter.name} about your plants..." style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid #ccc; border-radius: 8px; font-family: inherit;"></textarea>

                <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #333; font-size: 1.1rem;">Payment Method</h3>
                
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box; font-family: monospace;">

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">CVV</label>
                        <input type="text" placeholder="123" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box; font-family: monospace;">
                    </div>
                </div>

                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Name on Card</label>
                <input type="text" placeholder="Full Name" style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;">

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
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Days</span><strong id="bookingDays">0</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #ddd; font-size: 1.2rem; font-weight: bold;">
                    <span>Total</span><span id="orderTotal" style="color: #1a7f37;">$0.00</span>
                </div>
            </div>
        </div>
    `;

    const startDateInput = document.getElementById('bookingStartDate');
    const endDateInput = document.getElementById('bookingEndDate');
    const bookingDaysDisplay = document.getElementById('bookingDays');
    const orderTotalDisplay = document.getElementById('orderTotal');
    const ratePerDay = Number(sitter.rate.replace(/[^0-9.]/g, ''));
    const serviceFee = 5;

    const calculateTotal = () => {
        const startValue = startDateInput.value;
        const endValue = endDateInput.value;

        if (!startValue || !endValue) {
            bookingDaysDisplay.textContent = '0';
            orderTotalDisplay.textContent = '$0.00';
            return;
        }

        const start = new Date(startValue);
        const end = new Date(endValue);

        if (end < start) {
            bookingDaysDisplay.textContent = '0';
            orderTotalDisplay.textContent = '$0.00';
            return;
        }

        const diffMs = end - start;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
        const total = ratePerDay * days + serviceFee;

        bookingDaysDisplay.textContent = days.toString();
        orderTotalDisplay.textContent = `$${total.toFixed(2)}`;
    };

    startDateInput.addEventListener('change', calculateTotal);
    endDateInput.addEventListener('change', calculateTotal);

    // ==========================================
    // E. THE SUCCESS ANIMATION LOGIC
    // ==========================================
    const confirmBtn = document.getElementById('confirmBtn');

    confirmBtn.addEventListener('click', function() {
        const startValue = startDateInput.value;
        const endValue = endDateInput.value;

        if (!startValue || !endValue) {
            alert('Please select both a start and end date for your booking.');
            return;
        }

        const start = new Date(startValue);
        const end = new Date(endValue);

        if (end < start) {
            alert('The end date must be on or after the start date.');
            return;
        }

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
