const form = document.getElementById("order-form");
const select = document.getElementById("product");
const totalDiv = document.getElementById("total");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const selectedItems = Array.from(select.selectedOptions).map(option => option.value);
    const prices = { "rice": 100, "beans": 100, "plantain": 50, "egg": 70, "meat": 80 };
    const total = selectedItems.reduce((acc, curr) => acc + prices[curr], 0);
    totalDiv.textContent = `Total for ${email}: $${total.toFixed(2)}`;
    console.log(selectedItems)

    fetch('/api/payment/paystack', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            item: selectedItems[0],
            amount: total * 100
        })
    })
        .then(response => response.json())
        .then(data => {
            // reference = data.data.reference
            console.log(data.response.data.reference)
            window.location.href = data.response.data.authorization_url
        })
        .catch(error => console.error(error))
});

// fetch(`http://localhost:3000/api/payment/paystack/verify/${reference}`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error => console.error(error))
