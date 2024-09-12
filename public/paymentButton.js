// Immediately invoked function to handle the payment button functionality
(function() {
    // Fetch the button and message div elements
    const paymentButton = document.getElementById('paymentButton');

    // Check for the JWT token in local storage
    const token = localStorage.getItem('token');
    let auth = false;

    // If the token exists, verify it
    if (token) {
        auth = true; // Set auth to true if token is present
    } else {
        auth = false; // Set auth to false if no token
    }

    // Check if the button exists
    if (paymentButton) {
        // Add click event to the button
        paymentButton.addEventListener('click', function() {
            // Only proceed if the user is authenticated
            if (auth) {
                // Get the id from the button's data-id attribute
                const id = paymentButton.getAttribute('data-id');
                // Get the host from the current window's location
                const host = window.location.hostname;

                // Prepare the payload
                const payload = {
                    id: parseInt(id, 10), // Convert id to an integer
                    host: host
                };

                // Send POST request to the server for payment verification
                fetch('https://api.paymefin.tech/api/verify-payment', { // letting that this api will work
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the request
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    // Alert the user based on the server response
                    if (data.status === 'success') {
                        alert("Payment successful");
                    } else {
                        alert("Payment not successful: " + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Something went wrong.");
                });
            } else {
                // If not authenticated, inform the user
                alert("You must be logged in to verify payment.");
            }
        });
    } else {
        console.error('Payment button not found!');
    }
})();
