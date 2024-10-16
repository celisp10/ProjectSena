const messagesContainer = document.getElementById("messages")

function addMessage(messageText, color="r") {

    const message = document.createElement("p")
    message.classList.add("title")
    message.textContent = messageText

    if(color === 'r') {
        message.style.color = 'red'
    } else if (color === 'g') {
        message.style.color = 'green'
    }

    messagesContainer.appendChild(message)

    setTimeout(() => {
        message.remove()
    }, 3000)
}

const urlApi = "http://localhost/GA7-220501096-AA5-EV03/API/LiquidationsApi.php"
const form = document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()

    const product = document.getElementById('product');
    const quantityLiters = document.getElementById('quantity_liters');
    const farmer = document.getElementById('farmer');
    const farm = document.getElementById('farm');
    const operator = document.getElementById('operator');

    const data = {
        id_product: product.value,
        quantity_liters: quantityLiters.value,
        farmer: farmer.value,
        farm: farm.value,
        id_operator: operator.value
    }

    if(data.id_product == '' || data.quantity_liters == '' || data.farmer == '' || data.farm == '' || data.operator == '') {
        addMessage("Inputs vacios")
    } else {
        fetch(urlApi, {
            method:"POST",
            headers: {
                'Content-Tyep': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                const product = document.getElementById('product').value = ''
                const quantityLiters = document.getElementById('quantity_liters').value = ''
                const farmer = document.getElementById('farmer').value = ''
                const farm = document.getElementById('farm').value = ''
                const operator = document.getElementById('operator').value = ''

                addMessage(data.message, "g")
            } else {
                addMessage(data.message)
            }
        })
    }
    
})
