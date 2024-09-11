// Immediately invoked function to handle the payment button functionality
(function() {
    // Fetch the button and message div elements
    const paymentButton = document.getElementById('paymentButton');
    const messageDiv = document.getElementById('message');

    // Check if the button exists
    if (paymentButton) {
        // Add click event to the button
        paymentButton.addEventListener('click', function() {
            // Get the id from the button's data-id attribute
            const id = paymentButton.getAttribute('data-id');
            
            // Get the host from the current window's location
            const host = window.location.hostname;
            console.log(host);

            // Prepare the payload
            const payload = {
                id: parseInt(id, 10), // Convert id to an integer
                host: host
            };

            // Send POST request to the server for payment verification
            fetch('http://localhost:3002/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                // Display success or error message based on the server response
                if (data.status === 'success') {
                    messageDiv.innerHTML = `<p style="color: green">${data.message}</p>`;
                } else {
                    messageDiv.innerHTML = `<p style="color: red">${data.message}</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.innerHTML = `<p style="color: red">Something went wrong.</p>`;
            });
        });
    } else {
        console.error('Payment button not found!');
    }
})();
