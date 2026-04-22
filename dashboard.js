// ==========================================
// 1. THE MOCK BOOKING DATABASE
// ==========================================
// This represents the requests coming into Elena's account.
// Notice the "status" property - this is what our code will look at!
let bookings = [
    {
        id: "job_001",
        clientName: "Client #8492",
        location: "Chapel Hill, NC",
        dates: "June 14 - June 26, 2026",
        message: "Hi Elena! I have a collection of tropicals and a large Monstera that needs daily misting while we are away on a family trip.",
        payout: "$195.00",
        status: "pending" // This can be "pending" or "upcoming"
    }
];

// ==========================================
// 2. THE DASHBOARD LOGIC (State Management)
// ==========================================
const pendingList = document.getElementById('pendingList');
const upcomingList = document.getElementById('upcomingList');
const pendingCount = document.getElementById('pendingCount');

// This function acts as the "painter". Whenever data changes, we call this to redraw the screen.
function renderDashboard() {
    // 1. Clear both columns completely
    pendingList.innerHTML = '';
    upcomingList.innerHTML = '';

    // 2. Count how many pending jobs we have and update the red notification badge
    const pendingJobs = bookings.filter(job => job.status === "pending");
    pendingCount.innerText = pendingJobs.length;

    // Hide the red badge if there are zero pending requests
    if (pendingJobs.length === 0) {
        pendingCount.style.display = 'none';
    }

    // 3. Loop through ALL bookings and sort them into the correct column based on their status
    bookings.forEach(job => {

        if (job.status === "pending") {
            // Build the Pending Card (Includes Accept/Decline Buttons)
            const cardHTML = `
                <div style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #ffcc00; margin-bottom: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <h3 style="margin: 0; color: #333;">${job.clientName}</h3>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">📍 ${job.location}</p>
                        </div>
                        <span style="font-weight: bold; color: #1a7f37; font-size: 1.2rem;">${job.payout}</span>
                    </div>
                    <p style="background: #f9f9f9; padding: 0.8rem; border-radius: 4px; font-size: 0.95rem; color: #555;"><strong>Dates:</strong> ${job.dates}<br><br>"${job.message}"</p>
                    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <button onclick="acceptJob('${job.id}')" style="flex: 1; background: #1a7f37; color: white; border: none; padding: 0.8rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Accept</button>
                        <button style="flex: 1; background: white; color: #d32f2f; border: 1px solid #d32f2f; padding: 0.8rem; border-radius: 4px; cursor: pointer;">Decline</button>
                    </div>
                </div>
            `;
            pendingList.innerHTML += cardHTML;

        } else if (job.status === "upcoming") {
            // Build the Upcoming Card (No buttons, just the confirmed job details)
            const cardHTML = `
                <div style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #eaeaea; border-left: 5px solid #1a7f37; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h3 style="margin: 0; color: #333;">${job.clientName}</h3>
                            <p style="margin: 0; color: #1a7f37; font-weight: bold; margin-top: 0.3rem;">📅 ${job.dates}</p>
                        </div>
                        <span style="font-weight: bold; color: #555;">${job.payout}</span>
                    </div>
                </div>
            `;
            upcomingList.innerHTML += cardHTML;
        }
    });

    // If there's nothing upcoming, show an empty state message
    if (upcomingList.innerHTML === '') {
        upcomingList.innerHTML = `<p style="color: #888; text-align: center; margin-top: 2rem;">No upcoming jobs yet.</p>`;
    }
}

// ==========================================
// 3. THE "ACCEPT" ACTION
// ==========================================
// This function runs when Elena clicks the green Accept button
function acceptJob(targetId) {
    // 1. Find the exact job in the database
    const jobIndex = bookings.findIndex(job => job.id === targetId);

    // 2. Change its status!
    if (jobIndex !== -1) {
        bookings[jobIndex].status = "upcoming";

        // 3. Tell the screen to redraw itself with the new data
        renderDashboard();
    }
}

// Initial paint of the screen when the file first loads
renderDashboard();
