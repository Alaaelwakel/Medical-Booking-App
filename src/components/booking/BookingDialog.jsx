import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

/**
 * BookingDialog Component for selecting date and time to book an appointment
 */
const BookingDialog = ({
  open,
  onClose,
  doctor,
  availableSlots,
  onConfirm,
  loading,
}) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [error, setError] = useState("");

  // Group available slots by date
  const slotsByDate =
    availableSlots?.reduce((acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    }, {}) || {};

  const uniqueDates = Object.keys(slotsByDate).sort();
  const timeSlots = selectedDate ? slotsByDate[selectedDate] : [];

  const handleConfirm = () => {
    setError("");

    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    if (!selectedTimeSlot) {
      setError("Please select a time slot");
      return;
    }

    const slot = availableSlots.find((s) => s.id === selectedTimeSlot);
    if (!slot) {
      setError("Selected slot is no longer available");
      return;
    }

    onConfirm({
      doctorId: doctor.id,
      availabilityId: slot.id,
      date: slot.date,
      time: `${slot.startTime} - ${slot.endTime}`,
    });

    handleClose();
  };

  const handleClose = () => {
    setSelectedDate("");
    setSelectedTimeSlot("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book Appointment with {doctor?.name}</DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Doctor Info */}
        <Box sx={{ mb: 3, p: 2, bgcolor: "background.alt", borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <strong>Specialty:</strong> {doctor?.specialty}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            <strong>Rating:</strong> ⭐ {doctor?.rating}
          </Typography>
        </Box>

        {/* Date Selection */}
        <FormControl fullWidth disabled={loading} sx={{ mb: 2 }}>
          <InputLabel>Select Date</InputLabel>
          <Select
            value={selectedDate}
            label="Select Date"
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedTimeSlot("");
            }}
          >
            <MenuItem value="">
              <em>-- Choose a date --</em>
            </MenuItem>
            {uniqueDates.map((date) => (
              <MenuItem key={date} value={date}>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {uniqueDates.length === 0
              ? "No dates available"
              : "Select an available date"}
          </FormHelperText>
        </FormControl>

        {/* Time Slot Selection */}
        <FormControl
          fullWidth
          disabled={!selectedDate || loading}
          sx={{ mb: 2 }}
        >
          <InputLabel>Select Time</InputLabel>
          <Select
            value={selectedTimeSlot}
            label="Select Time"
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <MenuItem value="">
              <em>-- Choose a time --</em>
            </MenuItem>
            {timeSlots.map((slot) => (
              <MenuItem key={slot.id} value={slot.id} disabled={slot.isBooked}>
                {slot.startTime} - {slot.endTime}
                {slot.isBooked && " (Booked)"}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {!selectedDate
              ? "Select a date first"
              : timeSlots.length === 0
                ? "No time slots available for this date"
                : "Select an available time slot"}
          </FormHelperText>
        </FormControl>

        {/* Summary */}
        {selectedDate && selectedTimeSlot && (
          <Box sx={{ p: 2, bgcolor: "success.light", borderRadius: 1, mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Appointment Summary
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", mt: 1 }}
            >
              <strong>Date:</strong>{" "}
              {new Date(selectedDate).toLocaleDateString("en-US")}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
            >
              <strong>Time:</strong>{" "}
              {timeSlots.find((s) => s.id === selectedTimeSlot)?.startTime} -{" "}
              {timeSlots.find((s) => s.id === selectedTimeSlot)?.endTime}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!selectedDate || !selectedTimeSlot || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Confirm Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;
