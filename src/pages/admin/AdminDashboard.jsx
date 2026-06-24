import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Alert,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// Mock data
const MOCK_USERS = [
  { id: 'u1', name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+20-100-1234567', role: 'patient', status: 'active' },
  { id: 'u2', name: 'Fatima Ali', email: 'fatima@example.com', phone: '+20-100-2345678', role: 'patient', status: 'active' },
  { id: 'u3', name: 'Mohamed Ibrahim', email: 'mohamed@example.com', phone: '+20-100-3456789', role: 'doctor', status: 'active' },
  { id: 'u4', name: 'Layla Mahmoud', email: 'layla@example.com', phone: '+20-100-4567890', role: 'patient', status: 'active' },
  { id: 'u5', name: 'Hassan Karim', email: 'hassan@example.com', phone: '+20-100-5678901', role: 'doctor', status: 'active' },
  { id: 'u6', name: 'Noor Saleh', email: 'noor@example.com', phone: '+20-100-6789012', role: 'patient', status: 'active' },
  { id: 'u7', name: 'Amin Rashid', email: 'amin@example.com', phone: '+20-100-7890123', role: 'doctor', status: 'active' },
  { id: 'u8', name: 'Zainab Adel', email: 'zainab@example.com', phone: '+20-100-8901234', role: 'patient', status: 'active' },
  { id: 'u9', name: 'Omar Samir', email: 'omar@example.com', phone: '+20-100-9012345', role: 'patient', status: 'active' },
];

const MOCK_APPOINTMENTS = [
  { id: 'apt1', doctorId: 'u3', patientId: 'u1', date: '2026-06-25', status: 'confirmed' },
  { id: 'apt2', doctorId: 'u5', patientId: 'u4', date: '2026-06-26', status: 'pending' },
  { id: 'apt3', doctorId: 'u3', patientId: 'u6', date: '2026-06-25', status: 'confirmed' },
  { id: 'apt4', doctorId: 'u7', patientId: 'u2', date: '2026-06-27', status: 'completed' },
  { id: 'apt5', doctorId: 'u5', patientId: 'u8', date: '2026-06-28', status: 'pending' },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setUsers(MOCK_USERS);
        setAppointments(MOCK_APPOINTMENTS);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getStats = () => {
    const totalUsers = users.length;
    const totalDoctors = users.filter((u) => u.role === 'doctor').length;
    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter((apt) => apt.status === 'pending').length;

    return {
      totalUsers,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
    };
  };

  const stats = getStats();

  const handleBlockUser = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
          : user
      )
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="30%" height={28} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="100%" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                Total Users
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                Total Doctors
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
                {stats.totalDoctors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                Total Appointments
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main' }}>
                {stats.totalAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                Pending Appointments
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {stats.pendingAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Management Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            User Management
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={user.role === 'admin' ? 'error' : user.role === 'doctor' ? 'success' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        color={user.status === 'active' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color={user.status === 'active' ? 'error' : 'success'}
                        onClick={() => handleBlockUser(user.id)}
                        sx={{ fontSize: '0.75rem' }}
                      >
                        {user.status === 'active' ? 'Block' : 'Unblock'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
