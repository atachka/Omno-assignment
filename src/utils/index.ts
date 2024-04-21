import dotenv from 'dotenv';
dotenv.config();

export const generatePaymentForm = (
  id: string,
  status: string,
  amount: number,
  currency: string,
) => {
  return status !== 'succeeded'
    ? `
  <html>
  <head>
    <title>Payment Form</title>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Function to handle form submission
        function handleFormSubmit(event) {
          event.preventDefault(); // Prevent default form submission
          // Gather data from input fields
          const number = document.getElementById('number').value;
          const expiry = document.getElementById('expiry').value;
          const cvc = document.getElementById('cvc').value;
          // Send data to the server
          sendDataToServer(number, expiry, cvc);
        }

        // Function to send data to the server
        function sendDataToServer(number, expiry, cvc) {
          const paymentIntentId = '${id}'; // Payment intent ID from URL
          // Send data to the server using fetch
          fetch('${process.env.baseUrl}/payments/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              card: {
                number: number,
                expiry: expiry,
                cvc: cvc
              },
              paymentIntentId: paymentIntentId
            }),
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            // Handle the response from the server, if needed
          })
          .catch(error => {
            console.error('Error sending data to server:', error);
          });
        }

        // Add event listener to the form submission
        document.getElementById('confirm-button').addEventListener('click', handleFormSubmit);
      });
    </script>
  </head>
  <body>
    <h1>Payment Form</h1>
    <p>${amount} ${currency}<p>
    <form id="payment-form">
      <label for="number">Card Number:</label>
      <input type="text" id="number" name="number" required>
      <br>
      <label for="expiry">Expiry (MM/YY):</label>
      <input type="text" id="expiry" name="expiry" required>
      <br>
      <label for="cvc">CVC:</label>
      <input type="text" id="cvc" name="cvc" required>
      <br>
      <button type="button" id="confirm-button">Confirm Payment</button>
    </form>
  </body>
  </html>
`
    : '<p>This payment has already been processed.</p>';
};
