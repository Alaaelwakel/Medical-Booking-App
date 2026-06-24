import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Skeleton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// Mock user data
const MOCK_USERS = {
  u1: { id: 'u1', name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+20-100-1234567', role: 'patient' },
  u2: { id: 'u2', name: 'Fatima Ali', email: 'fatima@example.com', phone: '+20-100-2345678', role: 'patient' },
  u3: { id: 'u3', name: 'Mohamed Ibrahim', email: 'mohamed@example.com', phone: '+20-100-3456789', role: 'doctor' },
  u4: { id: 'u4', name: 'Layla Mahmoud', email: 'layla@example.com', phone: '+20-100-4567890', role: 'patient' },
  u5: { id: 'u5', name: 'Hassan Karim', email: 'hassan@example.com', phone: '+20-100-5678901', role: 'doctor' },
  u6: { id: 'u6', name: 'Noor Saleh', email: 'noor@example.com', phone: '+20-100-6789012', role: 'patient' },
  u7: { id: 'u7', name: 'Amin Rashid', email: 'amin@example.com', phone: '+20-100-7890123', role: 'doctor' },
  u8: { id: 'u8', name: 'Zainab Adel', email: 'zainab@example.com', phone: '+20-100-8901234', role: 'patient' },
  u9: { id: 'u9', name: 'Omar Samir', email: 'omar@example.com', phone: '+20-100-9012345', role: 'patient' },
};

const ProfileEdit = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load user data
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const userData = MOCK_USERS[user?.id] || {};
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          role: userData.role || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user?.id]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local mock data
      MOCK_USERS[user?.id] = {
        ...MOCK_USERS[user?.id],
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
      };

      // Update auth context
      await login({
        email: formData.email,
        password: '********', // Mock password
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" width="80%" sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Edit Profile
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}
            >
              {formData.name?.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {formData.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Patient
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Profile updated successfully!
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  required
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth disabled={saving}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    label="Role"
                    onChange={handleChange('role')}
                  >
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={saving}
                    sx={{ fontWeight: 600 }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => window.history.back()}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileEdit;
