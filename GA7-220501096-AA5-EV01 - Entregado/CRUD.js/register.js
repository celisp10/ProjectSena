// Recoger formulario
const form = document.getElementById("form")

// URL de la API
const APIurl = "http://localhost/GA7-220501096-AA5-EV01/API/API.php"

// Agregar función por medio de evento al formulario
// y asi agregar/crear al usuario
form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Recoger los datos enviados
    const user = document.getElementById("user").value
    const password = document.getElementById("password").value

    // Guardar los datos en un objeto
    const data = {
        user:user,
        password:password,
        process: 'register'
    }

    // Verificar que los datos esten llenos o vacios
    if(data.user === '' || data.password === '') {

        // Crear un parrafo para mostrar el error
        const paragraph = document.createElement("p")
        paragraph.textContent = 'Inputs vacios'
        paragraph.style.background = 'red'
        paragraph.style.textAlign = 'center'
        paragraph.style.padding = '5px'
        paragraph.style.fontSize = '25px'

        // Recoger el contenedor de los mensajes
        const showMessages = document.getElementById("messages")

        // Agregar el parrafo en el contenedor
        showMessages.appendChild(paragraph)

        // Eliminar el parrafo luego de 2 segundos
        setTimeout(() => {
            paragraph.remove()
        }, 2000)
    } else {
        // Enviar los datos a la API por medio de fetch y el metodo POST
        fetch(APIurl, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {

            console.log(data)

            // Recoger contenedor de mensajes (de nuevo)
            const messageDiv = document.getElementById("messages")
            
            // Si todo sale bien (la creación del ususario)
            if(data.success) {

                // Crear parrafo para mostrar mensaje
                const paragraph = document.createElement("p")
                paragraph.textContent = data.message
                paragraph.classList.add("message")
                paragraph.classList.add("g")
    
                // Agregar el parrafo en el contenedor
                messageDiv.appendChild(paragraph)
    
                // Vaciar los inputs para evitar repetición de registro
                const user = document.getElementById("user").value = ''
                const password = document.getElementById("password").value = ''
    
                // Eliminar el parrafo luego de 2 segundos
                setTimeout(() => {
                    paragraph.remove()
                }, 2000)
            } else {

                // Crear parrafo
                const paragraph = document.createElement("p")
                paragraph.textContent = data.message
                paragraph.classList.add("message")
                paragraph.classList.add("r")
    
                // Agregar parrafo
                messageDiv.appendChild(paragraph)

                // Remover parrafo en 2 segundos
                setTimeout(() => {
                    paragraph.remove()
                }, 2000)
            }
        })
    }

})

// Función innecesaria para capitalizar (poner la primera letra en mayuscula) una palabra

// function capitalizeString(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
// }

// const inputs = document.querySelectorAll('.upper').forEach(input => {
//     input.addEventListener("input", () => {
//         input.value = capitalizeString(input.value)
//     })
// })