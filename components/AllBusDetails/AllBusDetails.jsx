const AllBusDetails = async () => {
    try {
    const response = await fetch("/api/AllBusConnector", {
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
    console.error("Error fetching Bus data:", error);
    }
};

export default AllBusDetails;
