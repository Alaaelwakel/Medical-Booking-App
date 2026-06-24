import axiosInstance from "./axios";

const doctorApi = {
  /**
   * Get doctors with filters
   * @param {Object} filters - { search, specialty, sortBy, page }
   * @returns {Promise<Array>}
   */
  getDoctors: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.search) {
        params.append("q", filters.search);
      }
      if (filters.specialty) {
        params.append("specialtyId", filters.specialty);
      }
      if (filters.page) {
        params.append("_page", filters.page);
        params.append("_limit", 9);
      }
      if (filters.sortBy) {
        params.append("_sort", filters.sortBy);
        params.append("_order", "desc");
      }

      const response = await axiosInstance.get(`/doctors?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch doctors", {
        cause: error,
      });
    }
  },

  /**
   * Get single doctor by ID
   * @param {string} doctorId
   * @returns {Promise<Object>}
   */
  getDoctorById: async (doctorId) => {
    try {
      const response = await axiosInstance.get(`/doctors/${doctorId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch doctor", {
        cause: error,
      });
    }
  },

  /**
   * Get specialties
   * @returns {Promise<Array>}
   */
  getSpecialties: async () => {
    try {
      const response = await axiosInstance.get("/specialties");
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch specialties", {
        cause: error,
      });
    }
  },
};

export default doctorApi;
