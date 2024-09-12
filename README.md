# Payment Verification System

Hello there, welcome to my project! This project implements a payment verification system using JWT authentication and a simple frontend interface.

## Description 📚

This project allows users to verify payments through a button click, utilizing JWT tokens for authentication. It checks if the user is authenticated and then sends a request to verify the payment. The response is displayed to the user through alerts.

### JWT Authentication 🛠️
Users must be authenticated to verify payments.

### Payment Verification 📜
Sends a request to the server to verify the payment based on user input.

### User Feedback 🌐
Alerts the user about the success or failure of the payment verification.

## Installation 📦

* Clone or download the code from the GitHub repository.
* Ensure you have the necessary backend setup to handle JWT authentication and payment verification.
* Open the HTML file in a browser/use ```python3 -m http.server``` to access the payment verification functionality.

## Usage 🚀

1. **Authenticate User**:
   - Ensure the user is logged in and the JWT token is stored in local storage.

   

2. **Verify Payment:**:
   - Click the payment verification button.
   - The system checks if the user is authenticated.
   - If authenticated, it sends a request to the server to verify the payment.



3. **Receive Feedback**:
   - Alerts will inform the user if the payment was successful or not.


## Code Overview 📝

The main functionality is encapsulated in a self-invoking function that handles the payment button's click event. It checks for authentication, prepares the payload, and sends a request to the server.

```
(function() {
    const paymentButton = document.getElementById('paymentButton');
    const token = localStorage.getItem('token');
    let auth = !!token; // Set auth to true if token exists

    if (paymentButton) {
        paymentButton.addEventListener('click', function() {
            if (auth) { // letting here that user who is accessing the website have already logged in the website and have JWT token
                const id = paymentButton.getAttribute('data-id');
                const host = window.location.hostname;
                const payload = { id: parseInt(id, 10), host: host };

                fetch('http://localhost:3002/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
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
            } else { // if no JWT token is found it will print this 
                alert("You must be logged in to verify payment.");
            }
        });
    } else {
        console.error('Payment button not found!');
    }
})();

```

## 👤 Authors
Hey there! I'm Mannu Baveja, the creator of this project.

---


