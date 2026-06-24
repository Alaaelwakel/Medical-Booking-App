import axiosInstance from "./axios";

/**
 * Appointment API Service Layer
 * Owner: Dev2 + Dev3
 */
const appointmentApi = {
  /**
   * Book an appointment
   * @param {Object} data - { doctorId, patientId, availabilityId }
   * @returns {Promise<Object>}
   */
  bookAppointment: async (data) => {
    try {
      // Check if slot is already booked
      const availabilityResponse = await axiosInstance.get(
        `/availability/${data.availabilityId}`,
      );
      if (availabilityResponse.data.isBooked) {
        throw new Error("Time slot is no longer available");
      }

      // Create appointment
      const appointmentData = {
        doctorId: data.doctorId,
        patientId: data.patientId,
        availabilityId: data.availabilityId,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const appointmentResponse = await axiosInstance.post(
        "/appointments",
        appointmentData,
      );

      // Update availability slot to mark as booked
      await axiosInstance.patch(`/availability/${data.availabilityId}`, {
        isBooked: true,
      });

      return appointmentResponse.data;
    } catch (error) {
      throw new Error(error.message || "Failed to book appointment", {
        cause: error,
      });
    }
  },

  /**
   * Get patient appointments
   * @param {string} patientId
   * @returns {Promise<Array>}
   */
  getPatientAppointments: async (patientId) => {
    try {
      const response = await axiosInstance.get("/appointments", {
        params: {
          patientId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch appointments", {
        cause: error,
      });
    }
  },

  /**
   * Get doctor appointments
   * @param {string} doctorId
   * @returns {Promise<Array>}
   */
  getDoctorAppointments: async (doctorId) => {
    try {
      const response = await axiosInstance.get("/appointments", {
        params: {
          doctorId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch appointments", {
        cause: error,
      });
    }
  },

  /**
   * Cancel appointment
   * @param {string} appointmentId
   * @returns {Promise<Object>}
   */
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await axiosInstance.get(
        `/appointments/${appointmentId}`,
      );
      const appointment = response.data;

      // Update appointment status to cancelled
      const updatedResponse = await axiosInstance.patch(
        `/appointments/${appointmentId}`,
        {
          status: "cancelled",
        },
      );

      // Release the availability slot
      await axiosInstance.patch(`/availability/${appointment.availabilityId}`, {
        isBooked: false,
      });

      return updatedResponse.data;
    } catch (error) {
      throw new Error(error.message || "Failed to cancel appointment", {
        cause: error,
      });
    }
  },

  /**
   * Get appointment details
   * @param {string} appointmentId
   * @returns {Promise<Object>}
   */
  getAppointment: async (appointmentId) => {
    try {
      const response = await axiosInstance.get(
        `/appointments/${appointmentId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch appointment", {
        cause: error,
      });
    }
  },

  /**
   * Update appointment status
   * @param {string} appointmentId
   * @param {string} status - pending, confirmed, completed, cancelled
   * @returns {Promise<Object>}
   */
  updateAppointmentStatus: async (appointmentId, status) => {
    try {
      const response = await axiosInstance.patch(
        `/appointments/${appointmentId}`,
        { status },
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to update appointment", {
        cause: error,
      });
    }
  },
};

export default appointmentApi;
