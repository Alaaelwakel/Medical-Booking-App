import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Pagination,
  Skeleton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DoctorCard from "../../components/doctors/DoctorCard";
import DoctorFilters from "../../components/doctors/DoctorFilters";
import useDebounce from "../../hooks/useDebounce";

// Mock data
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
  },
];

const MOCK_SPECIALTIES = [
  { id: "s1", name: "Cardiology" },
  { id: "s2", name: "Dermatology" },
  { id: "s3", name: "Neurology" },
  { id: "s4", name: "Pediatrics" },
  { id: "s5", name: "Orthopedics" },
];

// Loading Skeleton Card
const DoctorCardSkeleton = () => (
  <Card>
    <Box sx={{ pt: 3, pb: 2, display: "flex", justifyContent: "center" }}>
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
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const specialties = MOCK_SPECIALTIES;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Filter and sort doctors
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
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
      if (specialty) {
        filtered = filtered.filter((doc) => doc.specialtyId === specialty);
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
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, specialty, sortBy, doctors]);

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
    setSpecialty(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSpecialty("");
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
            onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            sx={{ fontWeight: 600 }}
          >
            Start Browsing
          </Button>
        </Box>

        {/* Search and Filter Section */}
        <DoctorFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          specialty={specialty}
          onSpecialtyChange={handleSpecialtyChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          specialties={specialties}
          onClearFilters={handleClearFilters}
          resultsCount={filteredDoctors.length}
          loading={loading}
        />

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
