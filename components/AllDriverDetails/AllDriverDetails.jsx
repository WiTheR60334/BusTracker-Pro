const AllDriverDetails = async () => {
    try {
      const response = await fetch("/api/AllDriverConnector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch driver data");
      }
  
      const data = await response.json();
      return data.body;
    } catch (error) {
      console.error("Error fetching driver data:", error);
      return [];
    }
  };
  
  export default AllDriverDetails;
  