import { apiClient } from "./client";

export const fetchAppointments = async () => {
  const mock = [
    {
      id: 1,
      patient_name: "Jane Doe",
      phone_number: "+250788111111",
      appointment_date: "2025-11-09",
      appointment_time: "10:00",
      type: "Vaccination",
      chw_name: "UWASE Cloudine",
      status: "Scheduled",
    },
    {
      id: 2,
      patient_name: "Mary Smith",
      phone_number: "+250788222222",
      appointment_date: "2025-11-14",
      appointment_time: "14:30",
      type: "Antenatal",
      chw_name: "John Kalisa",
      status: "Scheduled",
    },
  ];

  try {
    const { data } = await apiClient.get("/appointments");
    return data;
  } catch (e) {
    return mock;
  }
};
