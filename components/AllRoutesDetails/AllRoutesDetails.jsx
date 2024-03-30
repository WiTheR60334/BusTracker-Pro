const AllRoutesDetails = async () => {
  try {
    const response = await fetch("/api/AllRoutesConnector", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch student data");
    }

    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
};

export default AllRoutesDetails;
