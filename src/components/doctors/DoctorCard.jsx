import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Stack,
  Chip,
  Avatar,
  Rating,
  Box,
} from "@mui/material";

/**
 * DoctorCard component to display doctor information
 */
const DoctorCard = ({ doctor, onViewProfile }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(doctor.id);
    } else {
      navigate(`/doctors/${doctor.id}`);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* Avatar Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 3,
          pb: 2,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Avatar
          src={doctor.image}
          alt={doctor.name}
          sx={{
            width: 100,
            height: 100,
            border: "3px solid white",
            boxShadow: 1,
          }}
        />
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Name */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {doctor.name}
        </Typography>

        {/* Specialty Chip */}
        <Chip
          label={doctor.specialty}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ mb: 1.5 }}
        />

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Rating value={doctor.rating} readOnly size="small" />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {doctor.rating.toFixed(1)}
          </Typography>
        </Stack>

        {/* Experience */}
        <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
          {doctor.experience} years experience
        </Typography>

        {/* Bio */}
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            mb: 1.5,
            minHeight: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {doctor.bio}
        </Typography>

        {/* Availability Status */}
        <Chip
          label={doctor.isAvailable ? "✓ Available" : "Not Available"}
          size="small"
          color={doctor.isAvailable ? "success" : "default"}
          variant="outlined"
        />
      </CardContent>

      {/* Actions Section */}
      <CardActions sx={{ pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleViewProfile}
          disabled={!doctor.isAvailable}
          sx={{ fontWeight: 600 }}
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;
