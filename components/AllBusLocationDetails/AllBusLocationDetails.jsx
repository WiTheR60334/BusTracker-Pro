const AllBusLocationDetails = async () => {
    try {
      const response = await fetch("/api/AllBusLocationConnector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch Bus data");
      }
  
      const data = await response.json();
      return data.body;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return [];
    }
  };
  
  export default AllBusLocationDetails;
  