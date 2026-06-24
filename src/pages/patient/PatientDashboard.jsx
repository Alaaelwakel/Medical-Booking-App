import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Alert,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import appointmentApi from '../../api/appointmentApi';

// Mock data for appointments
const MOCK_APPOINTMENTS = [
  {
    id: 'apt1',
    doctorId: 'd1',
    doctorName: 'Dr. Ahmed Hassan',
    doctorSpecialty: 'Cardiology',
    doctorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    date: '2026-06-25',
    time: '09:00 - 09:30',
    status: 'pending',
    createdAt: '2026-06-20T10:30:00Z',
  },
  {
    id: 'apt2',
    doctorId: 'd5',
    doctorName: 'Dr. Hassan Karim',
    doctorSpecialty: 'Cardiology',
    doctorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan',
    date: '2026-06-26',
    time: '10:00 - 10:30',
    status: 'confirmed',
    createdAt: '2026-06-18T14:20:00Z',
  },
  {
    id: 'apt3',
    doctorId: 'd4',
    doctorName: 'Dr. Layla Mahmoud',
    doctorSpecialty: 'Pediatrics',
    doctorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
    date: '2026-06-15',
    time: '15:00 - 15:30',
    status: 'completed',
    createdAt: '2026-06-10T09:15:00Z',
  },
];

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

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load appointments
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const userAppointments = MOCK_APPOINTMENTS.filter((apt) => apt.doctorId === user?.id);
        setAppointments(userAppointments);
        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getUserData = () => {
    return MOCK_USERS[user?.id] || null;
  };

  const userData = getUserData();

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) >= new Date()
  );

  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.date) < new Date()
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
                <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 1 }} />
                <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Patient Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Summary Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
              >
                {userData?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {userData?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Patient
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {userData?.email}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {userData?.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Role:</strong> {userData?.role}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Upcoming Appointments
              </Typography>

              {upcomingAppointments.length === 0 ? (
                <Alert severity="info">No upcoming appointments</Alert>
              ) : (
                <List>
                  {upcomingAppointments.map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 2,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={appointment.doctorImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {appointment.doctorName}
                            </Typography>
                            <Chip
                              label={appointment.status}
                              size="small"
                              color={getStatusColor(appointment.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                              {appointment.doctorSpecialty}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Appointment History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Appointment History
              </Typography>

              {pastAppointments.length === 0 ? (
                <Alert severity="info">No past appointments</Alert>
              ) : (
                <List>
                  {pastAppointments.map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 2,
                        bgcolor: 'background.paper',
                        opacity: 0.8,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={appointment.doctorImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {appointment.doctorName}
                            </Typography>
                            <Chip
                              label={appointment.status}
                              size="small"
                              color={getStatusColor(appointment.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                              {appointment.doctorSpecialty}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDashboard;
