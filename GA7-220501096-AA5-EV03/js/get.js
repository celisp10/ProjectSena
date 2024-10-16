const urlApi = "http://localhost/GA7-220501096-AA5-EV03/API/LiquidationsApi.php"

const container = document.getElementById("liquidations")

function getLiquidations() {
    fetch(urlApi)
        .then(response => response.json())
        .then(data => {

            data.liquidations.forEach(liquidation => {

                const div = document.createElement("div")
                div.classList.add("liquidation")
                const template = `
                    <p>ID: ${liquidation.id}</p>
                    <p>ID User: ${liquidation.id_operator}</p>
                    <p>ID Product: ${liquidation.id_product}</p>
                    <p>Quantity liters: ${liquidation.quantity_liters}</p>
                    <p>Total price: ${liquidation.total_price}</p>
                    <p>Farmer: ${liquidation.farmer}</p>
                    <p>Farm: ${liquidation.farm}</p>    
                    <p>Date Created: ${liquidation.date_created}</p>
                `

                div.innerHTML = template

                container.appendChild(div)

            })

        })
}

getLiquidations()