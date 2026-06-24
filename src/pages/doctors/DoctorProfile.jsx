import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
  Rating,
  Skeleton,
  Alert,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookingDialog from "../../components/booking/BookingDialog";
import appointmentApi from "../../api/appointmentApi";
import { useAuth } from "../../context/AuthContext";

// Mock doctor data (same as in DoctorSearch)
const MOCK_DOCTORS = [
  {
    id: "d1",
    userId: "u1",
    name: "Dr. Ahmed Hassan",
    specialtyId: "s1",
    specialty: "Cardiology",
    bio: "Experienced cardiologist with 15+ years of practice in heart disease treatment.",
    experience: 15,
    rating: 4.8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    isAvailable: true,
    email: "ahmed.hassan@medicalapp.com",
    phone: "+20-100-1234567",
    location: "Cairo, Egypt",
  },
  {
    id: "d2",
    userId: "u2",
    name: "Dr. Fatima Ali",
    specialtyId: "s2",
    specialty: "Dermatology",
    bio: "Specialist in skin care, treatment, and cosmetic procedures.",
    experience: 10,
    rating: 4.6,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    isAvailable: true,
    email: "fatima.ali@medicalapp.com",
    phone: "+20-100-2345678",
    location: "Alexandria, Egypt",
  },
  {
    id: "d3",
    userId: "u3",
    name: "Dr. Mohamed Ibrahim",
    specialtyId: "s3",
    specialty: "Neurology",
    bio: "Expert in neurological disorders and brain health management.",
    experience: 12,
    rating: 4.9,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    isAvailable: false,
    email: "mohamed.ibrahim@medicalapp.com",
    phone: "+20-100-3456789",
    location: "Giza, Egypt",
  },
  {
    id: "d4",
    userId: "u4",
    name: "Dr. Layla Mahmoud",
    specialtyId: "s4",
    specialty: "Pediatrics",
    bio: "Dedicated to children's health, development, and wellness.",
    experience: 8,
    rating: 4.7,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    isAvailable: true,
    email: "layla.mahmoud@medicalapp.com",
    phone: "+20-100-4567890",
    location: "Cairo, Egypt",
  },
  {
    id: "d5",
    userId: "u5",
    name: "Dr. Hassan Karim",
    specialtyId: "s1",
    specialty: "Cardiology",
    bio: "Leading cardiac surgeon and cardiovascular research specialist.",
    experience: 18,
    rating: 4.9,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan",
    isAvailable: true,
    email: "hassan.karim@medicalapp.com",
    phone: "+20-100-5678901",
    location: "Cairo, Egypt",
  },
  {
    id: "d6",
    userId: "u6",
    name: "Dr. Noor Saleh",
    specialtyId: "s5",
    specialty: "Orthopedics",
    bio: "Specialized in bone, joint treatment, and sports medicine.",
    experience: 11,
    rating: 4.5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noor",
    isAvailable: true,
    email: "noor.saleh@medicalapp.com",
    phone: "+20-100-6789012",
    location: "Alexandria, Egypt",
  },
  {
    id: "d7",
    userId: "u7",
    name: "Dr. Amin Rashid",
    specialtyId: "s2",
    specialty: "Dermatology",
    bio: "Expert in dermatology and cosmetic procedures with modern techniques.",
    experience: 9,
    rating: 4.6,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amin",
    isAvailable: true,
    email: "amin.rashid@medicalapp.com",
    phone: "+20-100-7890123",
    location: "Cairo, Egypt",
  },
  {
    id: "d8",
    userId: "u8",
    name: "Dr. Zainab Adel",
    specialtyId: "s3",
    specialty: "Neurology",
    bio: "Neurology specialist with advanced training in complex disorders.",
    experience: 13,
    rating: 4.8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
    isAvailable: false,
    email: "zainab.adel@medicalapp.com",
    phone: "+20-100-8901234",
    location: "Cairo, Egypt",
  },
  {
    id: "d9",
    userId: "u9",
    name: "Dr. Omar Samir",
    specialtyId: "s4",
    specialty: "Pediatrics",
    bio: "Pediatric specialist focused on child development and wellness.",
    experience: 7,
    rating: 4.7,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    isAvailable: true,
    email: "omar.samir@medicalapp.com",
    phone: "+20-100-9012345",
    location: "Giza, Egypt",
  },
];

// Mock availability data
const MOCK_AVAILABILITY = {
  d1: [
    {
      id: "av1",
      doctorId: "d1",
      date: "2026-06-25",
      startTime: "09:00",
      endTime: "09:30",
      isBooked: false,
    },
    {
      id: "av2",
      doctorId: "d1",
      date: "2026-06-25",
      startTime: "09:30",
      endTime: "10:00",
      isBooked: false,
    },
    {
      id: "av3",
      doctorId: "d1",
      date: "2026-06-25",
      startTime: "10:00",
      endTime: "10:30",
      isBooked: true,
    },
    {
      id: "av4",
      doctorId: "d1",
      date: "2026-06-26",
      startTime: "09:00",
      endTime: "09:30",
      isBooked: false,
    },
    {
      id: "av5",
      doctorId: "d1",
      date: "2026-06-26",
      startTime: "10:00",
      endTime: "10:30",
      isBooked: false,
    },
    {
      id: "av6",
      doctorId: "d1",
      date: "2026-06-27",
      startTime: "14:00",
      endTime: "14:30",
      isBooked: false,
    },
  ],
  d2: [
    {
      id: "av7",
      doctorId: "d2",
      date: "2026-06-25",
      startTime: "11:00",
      endTime: "11:30",
      isBooked: false,
    },
    {
      id: "av8",
      doctorId: "d2",
      date: "2026-06-26",
      startTime: "11:00",
      endTime: "11:30",
      isBooked: false,
    },
  ],
  d4: [
    {
      id: "av9",
      doctorId: "d4",
      date: "2026-06-25",
      startTime: "15:00",
      endTime: "15:30",
      isBooked: false,
    },
    {
      id: "av10",
      doctorId: "d4",
      date: "2026-06-27",
      startTime: "15:00",
      endTime: "15:30",
      isBooked: false,
    },
  ],
};

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Load doctor profile
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundDoctor = MOCK_DOCTORS.find((d) => d.id === id);
      if (foundDoctor) {
        setDoctor(foundDoctor);
        const slots = MOCK_AVAILABILITY[id] || [];
        setAvailableSlots(slots);
      } else {
        toast.error("Doctor not found");
        navigate("/doctors");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleBookAppointment = async (bookingData) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }

    setBookingLoading(true);

    try {
      const appointment = await appointmentApi.bookAppointment({
        doctorId: bookingData.doctorId,
        patientId: user.id,
        availabilityId: bookingData.availabilityId,
      });

      toast.success(
        `Appointment booked successfully! Date: ${bookingData.date}, Time: ${bookingData.time}`,
      );

      // Refresh available slots
      const slots = MOCK_AVAILABILITY[id] || [];
      setAvailableSlots(slots);

      setBookingOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Skeleton
                  variant="circular"
                  width={120}
                  height={120}
                  sx={{ mx: "auto", mb: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={28}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  sx={{ mx: "auto", mb: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Skeleton
                  variant="text"
                  width="40%"
                  height={32}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!doctor) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Doctor not found</Alert>
      </Container>
    );
  }

  const bookedSlotsCount = availableSlots.filter((s) => s.isBooked).length;
  const availableSlotsCount = availableSlots.length - bookedSlotsCount;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Doctor Info Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              {/* Avatar */}
              <Avatar
                src={doctor.image}
                alt={doctor.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  border: "3px solid",
                  borderColor: "primary.main",
                }}
              />

              {/* Name */}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {doctor.name}
              </Typography>

              {/* Specialty */}
              <Chip
                label={doctor.specialty}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              {/* Rating */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Rating value={doctor.rating} readOnly />
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
                  {doctor.rating.toFixed(1)}
                </Typography>
              </Box>

              {/* Experience */}
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                {doctor.experience} years experience
              </Typography>

              {/* Availability Status */}
              <Chip
                label={doctor.isAvailable ? "✓ Available" : "Not Available"}
                color={doctor.isAvailable ? "success" : "error"}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              {/* Contact Info */}
              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon
                    sx={{ mr: 1, fontSize: 20, color: "primary.main" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {doctor.email}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon
                    sx={{ mr: 1, fontSize: 20, color: "primary.main" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {doctor.phone}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon
                    sx={{ mr: 1, fontSize: 20, color: "primary.main" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {doctor.location}
                  </Typography>
                </Box>
              </Stack>

              {/* Book Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setBookingOpen(true)}
                disabled={!doctor.isAvailable || !isAuthenticated}
                sx={{ mt: 3, fontWeight: 600 }}
              >
                {!isAuthenticated ? "Login to Book" : "Book Appointment"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Doctor Details & Availability */}
        <Grid item xs={12} md={8}>
          {/* Bio Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                About
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.8 }}
              >
                {doctor.bio}
              </Typography>
            </CardContent>
          </Card>

          {/* Availability Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Availability
              </Typography>

              {availableSlots.length === 0 ? (
                <Alert severity="info">No available slots at the moment</Alert>
              ) : (
                <>
                  {/* Summary */}
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Paper sx={{ p: 2, flex: 1, bgcolor: "success.lighter" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Available Slots
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "success.main" }}
                      >
                        {availableSlotsCount}
                      </Typography>
                    </Paper>
                    <Paper sx={{ p: 2, flex: 1, bgcolor: "warning.lighter" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Booked Slots
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "warning.main" }}
                      >
                        {bookedSlotsCount}
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Slots by Date */}
                  {Object.entries(
                    availableSlots.reduce((acc, slot) => {
                      if (!acc[slot.date]) {
                        acc[slot.date] = [];
                      }
                      acc[slot.date].push(slot);
                      return acc;
                    }, {}),
                  )
                    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                    .map(([date, slots]) => (
                      <Box key={date} sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
                        >
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {slots.map((slot) => (
                            <Chip
                              key={slot.id}
                              label={`${slot.startTime} - ${slot.endTime}`}
                              variant={slot.isBooked ? "filled" : "outlined"}
                              color={slot.isBooked ? "default" : "primary"}
                              disabled={slot.isBooked}
                              sx={{ opacity: slot.isBooked ? 0.6 : 1 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        doctor={doctor}
        availableSlots={availableSlots}
        onConfirm={handleBookAppointment}
        loading={bookingLoading}
      />
    </Container>
  );
};

export default DoctorProfile;
