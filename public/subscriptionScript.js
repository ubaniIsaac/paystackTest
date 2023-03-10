const form = document.querySelector('#subscription-form');
const responseMessage = document.querySelector('#response-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const phone = form.elements.phone.value;
    try {
        fetch('/api/payment/paystack/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                phone
            })
        })
            .then(response => response.json())
            .then(data => {
                // reference =
                responseMessage.textContent = `${data.message} CHeck your mail for reciept`;
                responseMessage.style.color = '#H00';

            })
            .catch(error => console.error(error))
    } catch (error) {
        console.log(error)
        responseMessage.textContent = 'There was an error subscribing.';
        // responseMessage.style.color = '#f00';
    }
});
