import {
  Card,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * DoctorFilters component for search and filtering
 */
const DoctorFilters = ({
  searchTerm,
  onSearchChange,
  specialty,
  onSpecialtyChange,
  sortBy,
  onSortChange,
  specialties,
  onClearFilters,
  resultsCount,
  loading,
}) => {
  const hasActiveFilters = searchTerm || specialty || sortBy !== "rating";

  return (
    <Card sx={{ mb: 4, p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Search Input */}
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            fullWidth
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={onSearchChange}
            disabled={loading}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />
        </Grid>

        {/* Specialty Filter */}
        <Grid item xs={12} sm={6} md={3.5}>
          <FormControl fullWidth disabled={loading}>
            <InputLabel id="specialty-label">Specialty</InputLabel>
            <Select
              labelId="specialty-label"
              value={specialty}
              label="Specialty"
              onChange={onSpecialtyChange}
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

        {/* Sort By */}
        <Grid item xs={12} sm={6} md={3.5}>
          <FormControl fullWidth disabled={loading}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={onSortChange}
            >
              <MenuItem value="rating">Highest Rating</MenuItem>
              <MenuItem value="experience">Most Experience</MenuItem>
              <MenuItem value="name">Name (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2, alignItems: "flex-start" }}
      >
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </Button>

        {/* Results Info */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Found{" "}
            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {resultsCount}
            </Typography>{" "}
            doctor{resultsCount !== 1 ? "s" : ""}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default DoctorFilters;
