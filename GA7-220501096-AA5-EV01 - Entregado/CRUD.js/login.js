// URL de la API    
const APIurl = "http://localhost/GA7-220501096-AA5-EV01/API/API.php"

// Recogiendo el formulario
const form = document.getElementById("form")

// Agregando evento al formulario para asi enviar y verificar los datos en la base de datos
form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Recogiendo los inputs
    const user = document.getElementById("user").value.trim()
    const password = document.getElementById("password").value.trim()

    // Guardando los datos en un objeto
    const data = {
        user: user,
        password: password,
        process:'login'
    }

    // Verificando si los datos están vacios o llenos
    if(data.user === '' || data.password === '') {
        // Crear parrafo para mostrar mensaje
        const paragraph = document.createElement("p")
        paragraph.textContent = 'Inputs vacios'
        paragraph.style.background = 'red'
        paragraph.style.textAlign = 'center'
        paragraph.style.padding = '5px'
        paragraph.style.fontSize = '25px'

        // Recogiendo contenedor de mensajes
        const showMessages = document.getElementById("messages")

        // Agregando parrafo en el contenedor
        showMessages.appendChild(paragraph)

        // Removiendo parrafo luego de 2 segundos
        setTimeout(() => {
            paragraph.remove()
        }, 2000)
    
    } else {
        // Enviando datos a la API por medio de fetch con el metodo POST
        fetch(APIurl, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {

            const messageDiv = document.getElementById("messages")

            if(data.success) {

                const user = document.getElementById("user").value = ''
                const password = document.getElementById("password").value = ''

                window.location.href = 'index.html'
            } else {
                // Crear parrafo
                const paragraph = document.createElement("p")
                paragraph.textContent = data.message
                paragraph.classList.add("message")
                paragraph.classList.add("r")
    
                messageDiv.appendChild(paragraph)

                // Eliminar el parrafo luego de 2 segundos
                setTimeout(() => {
                    paragraph.remove()
                }, 2000)
            }
        })
    }
})

