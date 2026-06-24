import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  Pagination,
  CircularProgress,
  Skeleton,
  Chip,
  Avatar,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";
import doctorApi from "../../api/doctorApi";

// Mock data
const MOCK_DOCTORS = [
  {
    id: "d1",
    userId: "u1",
    name: "Dr. Ahmed Hassan",
    specialtyId: "s1",
    specialty: "Cardiology",
    bio: "Experienced cardiologist with 15+ years of practice.",
    experience: 15,
    rating: 4.8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    isAvailable: true,
  },
  {
    id: "d2",
    userId: "u2",
    name: "Dr. Fatima Ali",
    specialtyId: "s2",
    specialty: "Dermatology",
    bio: "Specialist in skin care and treatment.",
    experience: 10,
    rating: 4.6,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    isAvailable: true,
  },
  {
    id: "d3",
    userId: "u3",
    name: "Dr. Mohamed Ibrahim",
    specialtyId: "s3",
    specialty: "Neurology",
    bio: "Expert in neurological disorders.",
    experience: 12,
    rating: 4.9,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    isAvailable: false,
  },
  {
    id: "d4",
    userId: "u4",
    name: "Dr. Layla Mahmoud",
    specialtyId: "s4",
    specialty: "Pediatrics",
    bio: "Dedicated to children's health and wellness.",
    experience: 8,
    rating: 4.7,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    isAvailable: true,
  },
  {
    id: "d5",
    userId: "u5",
    name: "Dr. Hassan Karim",
    specialtyId: "s1",
    specialty: "Cardiology",
    bio: "Leading cardiac surgeon and researcher.",
    experience: 18,
    rating: 4.9,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan",
    isAvailable: true,
  },
  {
    id: "d6",
    userId: "u6",
    name: "Dr. Noor Saleh",
    specialtyId: "s5",
    specialty: "Orthopedics",
    bio: "Specialized in bone and joint treatment.",
    experience: 11,
    rating: 4.5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noor",
    isAvailable: true,
  },
  {
    id: "d7",
    userId: "u7",
    name: "Dr. Amin Rashid",
    specialtyId: "s2",
    specialty: "Dermatology",
    bio: "Dermatology and cosmetic procedures expert.",
    experience: 9,
    rating: 4.6,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amin",
    isAvailable: true,
  },
  {
    id: "d8",
    userId: "u8",
    name: "Dr. Zainab Adel",
    specialtyId: "s3",
    specialty: "Neurology",
    bio: "Neurology specialist with advanced training.",
    experience: 13,
    rating: 4.8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
    isAvailable: false,
  },
  {
    id: "d9",
    userId: "u9",
    name: "Dr. Omar Samir",
    specialtyId: "s4",
    specialty: "Pediatrics",
    bio: "Pediatric specialist with focus on development.",
    experience: 7,
    rating: 4.7,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    isAvailable: true,
  },
];

const MOCK_SPECIALTIES = [
  { id: "s1", name: "Cardiology" },
  { id: "s2", name: "Dermatology" },
  { id: "s3", name: "Neurology" },
  { id: "s4", name: "Pediatrics" },
  { id: "s5", name: "Orthopedics" },
];

// Debounce hook
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Doctor Card Component
const DoctorCard = ({ doctor, onViewProfile }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Avatar src={doctor.image} sx={{ width: 100, height: 100 }} />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {doctor.name}
        </Typography>

        <Chip
          label={doctor.specialty}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ mb: 1 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Rating value={doctor.rating} readOnly size="small" />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {doctor.rating}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
          {doctor.experience} years experience
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block" }}
        >
          {doctor.bio}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Chip
            label={doctor.isAvailable ? "Available" : "Not Available"}
            size="small"
            color={doctor.isAvailable ? "success" : "default"}
            variant="outlined"
          />
        </Box>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onViewProfile(doctor.id)}
          disabled={!doctor.isAvailable}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

// Loading Skeleton Card
const DoctorCardSkeleton = () => (
  <Card>
    <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
      <Skeleton variant="circular" width={100} height={100} />
    </Box>
    <CardContent>
      <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
    </CardContent>
    <CardActions>
      <Skeleton variant="rectangular" width="100%" height={40} />
    </CardActions>
  </Card>
);

// Empty State Component
const EmptyState = () => (
  <Box
    sx={{
      textAlign: "center",
      py: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography
      variant="h5"
      sx={{ mb: 1, fontWeight: 600, color: "text.secondary" }}
    >
      No Doctors Found
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Try adjusting your search or filter criteria
    </Typography>
  </Box>
);

// Main Component
const DoctorSearch = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState(MOCK_SPECIALTIES);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Load mock data
  useEffect(() => {
    setDoctors(MOCK_DOCTORS);
  }, []);

  // Filter and sort doctors
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      let filtered = [...doctors];

      // Filter by search term
      if (debouncedSearchTerm) {
        filtered = filtered.filter(
          (doc) =>
            doc.name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            doc.specialty
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()),
        );
      }

      // Filter by specialty
      if (selectedSpecialty) {
        filtered = filtered.filter(
          (doc) => doc.specialtyId === selectedSpecialty,
        );
      }

      // Sort
      if (sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "experience") {
        filtered.sort((a, b) => b.experience - a.experience);
      } else if (sortBy === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredDoctors(filtered);
      setPage(1);
      setLoading(false);
    }, 500);
  }, [debouncedSearchTerm, selectedSpecialty, sortBy, doctors]);

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
    setSortBy("rating");
    setPage(1);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0056b3 0%, #007bff 100%)",
            borderRadius: 2,
            p: { xs: 3, md: 6 },
            color: "white",
            mb: 5,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            🏥 Find Your Perfect Doctor
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 300, mb: 3 }}>
            Browse our network of experienced healthcare professionals and book
            your appointment today
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={() => setPage(1)}
            sx={{ fontWeight: 600 }}
          >
            Start Browsing
          </Button>
        </Box>

        {/* Search and Filter Section */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Specialty</InputLabel>
                <Select
                  value={selectedSpecialty}
                  label="Specialty"
                  onChange={handleSpecialtyChange}
                >
                  <MenuItem value="">All Specialties</MenuItem>
                  {specialties.map((spec) => (
                    <MenuItem key={spec.id} value={spec.id}>
                      {spec.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="rating">Highest Rating</MenuItem>
                  <MenuItem value="experience">Most Experience</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            onClick={handleClearFilters}
            disabled={!searchTerm && !selectedSpecialty && sortBy === "rating"}
          >
            Clear Filters
          </Button>

          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Found {filteredDoctors.length} doctor
            {filteredDoctors.length !== 1 ? "s" : ""}
          </Typography>
        </Card>

        {/* Doctor Cards Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <DoctorCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : paginatedDoctors.length > 0 ? (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {paginatedDoctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                  <DoctorCard
                    doctor={doctor}
                    onViewProfile={handleViewProfile}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </Container>
    </Box>
  );
};

export default DoctorSearch;
