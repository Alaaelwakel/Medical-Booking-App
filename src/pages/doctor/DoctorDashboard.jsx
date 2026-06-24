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
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../../context/AuthContext';
import appointmentApi from '../../api/appointmentApi';

// Mock data for appointments
const MOCK_APPOINTMENTS = [
  {
    id: 'apt1',
    doctorId: 'u3',
    patientId: 'u1',
    patientName: 'Ahmed Hassan',
    patientImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    date: '2026-06-25',
    time: '09:00 - 09:30',
    status: 'pending',
    createdAt: '2026-06-20T10:30:00Z',
  },
  {
    id: 'apt2',
    doctorId: 'u3',
    patientId: 'u4',
    patientName: 'Layla Mahmoud',
    patientImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
    date: '2026-06-26',
    time: '10:00 - 10:30',
    status: 'pending',
    createdAt: '2026-06-18T14:20:00Z',
  },
  {
    id: 'apt3',
    doctorId: 'u3',
    patientId: 'u6',
    patientName: 'Noor Saleh',
    patientImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noor',
    date: '2026-06-25',
    time: '11:00 - 11:30',
    status: 'confirmed',
    createdAt: '2026-06-15T09:15:00Z',
  },
];

// Mock availability for today
const TODAY_APPOINTMENTS = [
  {
    id: 'apt1',
    patientName: 'Ahmed Hassan',
    patientImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    time: '09:00 - 09:30',
    status: 'pending',
  },
  {
    id: 'apt2',
    patientName: 'Layla Mahmoud',
    patientImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
    time: '10:00 - 10:30',
    status: 'pending',
  },
  {
    id: 'apt3',
    patientName: 'Noor Saleh',
    patientImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noor',
    time: '11:00 - 11:30',
    status: 'confirmed',
  },
];

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load appointments and today's schedule
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const doctorAppointments = MOCK_APPOINTMENTS.filter((apt) => apt.doctorId === user?.id);
        setAppointments(doctorAppointments);

        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = doctorAppointments.filter((apt) => apt.date === today);
        setTodaySchedule(todayAppointments);

        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user?.id]);

  const handleApprove = async (appointmentId) => {
    try {
      await appointmentApi.updateAppointmentStatus(appointmentId, 'confirmed');
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: 'confirmed' } : apt
        )
      );
    } catch (err) {
      console.error('Failed to approve appointment:', err);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await appointmentApi.updateAppointmentStatus(appointmentId, 'cancelled');
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      );
    } catch (err) {
      console.error('Failed to reject appointment:', err);
    }
  };

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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="60%" height={28} sx={{ mb: 2 }} />
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

  const pendingAppointments = appointments.filter((apt) => apt.status === 'pending');
  const confirmedAppointments = appointments.filter((apt) => apt.status === 'confirmed');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Doctor Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Schedule
              </Typography>

              {todaySchedule.length === 0 ? (
                <Alert severity="info">No appointments scheduled for today</Alert>
              ) : (
                <List>
                  {todaySchedule.map((appointment) => (
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
                        <Avatar src={appointment.patientImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {appointment.patientName}
                            </Typography>
                            <Chip
                              label={appointment.status}
                              size="small"
                              color={getStatusColor(appointment.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            🕐 {appointment.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Appointments */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Pending Appointments
              </Typography>

              {pendingAppointments.length === 0 ? (
                <Alert severity="success">No pending appointments</Alert>
              ) : (
                <List>
                  {pendingAppointments.map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 2,
                        bgcolor: 'warning.lighter',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={appointment.patientImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {appointment.patientName}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                              📅 {new Date(appointment.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                              🕐 {appointment.time}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleApprove(appointment.id)}
                                sx={{ fontSize: '0.75rem' }}
                              >
                                Approve
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<CancelIcon />}
                                onClick={() => handleReject(appointment.id)}
                                sx={{ fontSize: '0.75rem' }}
                              >
                                Reject
                              </Button>
                            </Box>
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

        {/* Confirmed Appointments */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Confirmed Appointments
              </Typography>

              {confirmedAppointments.length === 0 ? (
                <Alert severity="info">No confirmed appointments</Alert>
              ) : (
                <List>
                  {confirmedAppointments.map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 2,
                        bgcolor: 'success.lighter',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={appointment.patientImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {appointment.patientName}
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
                              📅 {new Date(appointment.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              🕐 {appointment.time}
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

export default DoctorDashboard;
