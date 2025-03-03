console.log("Frontend connected!");


fetch("/api/message")
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error("Error:", error));


    document.getElementById("callbackForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const fullName = document.getElementById("fullName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
    
        fetch("/submit-callback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullName, phoneNumber, email, message }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadRequests(); // Reload data after submission
        })
        .catch(error => console.error("Error:", error));
    });
    
    // Function to load and display saved requests
    function loadRequests() {
        fetch("/get-requests")
        .then(response => response.json())
        .then(data => {
            const requestsList = document.getElementById("requestsList");
            requestsList.innerHTML = ""; // Clear old data
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.fullName} (${item.phoneNumber}) - ${item.message}`;
                requestsList.appendChild(li);
            });
        })
        .catch(error => console.error("Error:", error));
    }
    
    // Load requests when the page loads
    loadRequests();
    