const express = require("express");
const app = express();
app.use(express.json());

// In-memory seat storage
let seats = [
  { id: 1, status: "available" },
  { id: 2, status: "available" },
  { id: 3, status: "available" },
  { id: 4, status: "available" },
  { id: 5, status: "available" }
];

// Lock timeout (10 seconds)
const LOCK_TIMEOUT = 10000;
let locks = {}; // { seatId: { lockedBy: "userId", expiresAt: timestamp } }

// Get available seats
app.get("/seats", (req, res) => {
  res.json(seats);
});

// Lock a seat
app.post("/lock/:id", (req, res) => {
  const seatId = parseInt(req.params.id);
  const user = req.body.user || "guest";

  const seat = seats.find(s => s.id === seatId);
  if (!seat) return res.status(404).json({ message: "Seat not found" });

  // Already booked
  if (seat.status === "booked") {
    return res.status(400).json({ message: "Seat already booked" });
  }

  const now = Date.now();
  const lock = locks[seatId];

  // Check if seat is already locked by someone else
  if (lock && lock.expiresAt > now && lock.lockedBy !== user) {
    return res.status(400).json({ message: "Seat is locked by another user" });
  }

  // If no active lock or same user, lock it
  locks[seatId] = { lockedBy: user, expiresAt: now + LOCK_TIMEOUT };
  seat.status = "locked";

  res.json({ message: `Seat ${seatId} locked successfully by ${user}`, seat });
});

// Confirm booking
app.post("/confirm/:id", (req, res) => {
  const seatId = parseInt(req.params.id);
  const user = req.body.user || "guest";

  const seat = seats.find(s => s.id === seatId);
  if (!seat) return res.status(404).json({ message: "Seat not found" });

  const now = Date.now();
  const lock = locks[seatId];

  // Check lock validity
  if (!lock || lock.expiresAt < now || lock.lockedBy !== user) {
    return res.status(400).json({ message: "Seat is not locked by you or lock expired" });
  }

  // Confirm booking
  seat.status = "booked";
  delete locks[seatId];

  res.json({ message: `Seat ${seatId} booked successfully`, seat });
});

// Unlock expired seats automatically
setInterval(() => {
  const now = Date.now();
  for (const [seatId, lock] of Object.entries(locks)) {
    if (lock.expiresAt < now) {
      const seat = seats.find(s => s.id == seatId);
      if (seat && seat.status === "locked") {
        seat.status = "available";
      }
      delete locks[seatId];
    }
  }
}, 2000);

// Start server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
