import { apiClient } from "./client";

export const fetchEmergencies = async () => {
  const mock = [
    {
      id: 1,
      alert_id: "AMB-00833",
      caller_name: "Kalisa John",
      phone_number: "+250788123456",
      location: "Kimironko / Biryogo",
      maintenance_date: "25 - 09 - 2025",
      status: "Available",
    },
    {
      id: 2,
      alert_id: "AMB-00835",
      caller_name: "Mukamana Elise",
      phone_number: "+250781234567",
      location: "Remera / Kabeza",
      maintenance_date: "21 - 09 - 2025",
      status: "Urgent",
    },
  ];

  try {
    const { data } = await apiClient.get("/emergencies");
    return data;
  } catch (e) {
    return mock;
  }
};
