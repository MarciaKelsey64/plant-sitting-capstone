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
        <div class="checkout-grid">

            <div class="booking-details-card">
                <h2>Booking Details</h2>

                <label class="booking-label">Start Date</label>
                <input id="bookingStartDate" type="date" class="booking-input">

                <label class="booking-label">End Date</label>
                <input id="bookingEndDate" type="date" class="booking-input">

                <label class="booking-label">Message to ${sitter.name}</label>
                <textarea id="bookingMessage" rows="4" placeholder="Tell ${sitter.name} about your plants..." class="booking-textarea"></textarea>

                <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #333; font-size: 1.1rem;">Payment Method</h3>
                
                <label class="booking-label">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" class="booking-input booking-input-mono">

                <div class="expiry-cvv-grid">
                    <div>
                        <label class="booking-label">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" class="booking-input booking-input-no-margin">
                    </div>
                    <div>
                        <label class="booking-label">CVV</label>
                        <input type="text" placeholder="123" class="booking-input booking-input-no-margin booking-input-mono">
                    </div>
                </div>

                <label class="booking-label">Name on Card</label>
                <input type="text" placeholder="Full Name" class="booking-input booking-input-large-margin">

                <button id="confirmBtn" class="view-profile-btn booking-confirm-btn">Confirm Booking</button>
            </div>

            <div class="order-summary-card">
                <h3>Order Summary</h3>
                <div class="sitter-summary-info">
                <picture>
                    <img src="${sitter.image}" alt="${sitter.name}" class="sitter-summary-image">
                </picture>
                    <div>
                        <h4 class="sitter-summary-name">${sitter.name}</h4>
                        <p class="sitter-summary-rating">⭐ ${sitter.rating} Rating</p>
                    </div>
                </div>
                <div class="order-line">
                    <span>Daily Rate</span><strong>${sitter.rate}</strong>
                </div>
                <div class="order-line">
                    <span>Service Fee</span><strong>$5.00</strong>
                </div>
                <div class="order-line">
                    <span>Days</span><strong id="bookingDays">0</strong>
                </div>
                <div class="order-total-line">
                    <span>Total</span><span id="orderTotal" class="order-total-amount">$0.00</span>
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
