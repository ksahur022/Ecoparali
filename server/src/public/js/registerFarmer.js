
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    console.log(data)

    const {name, email, password, phone, street, city, state, pinCode, landArea, cropType} = data;

    try {
        const response = await fetch('/api/farmer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, password, phone, address: {street, city, state, pinCode, country: 'India'}
            })
        })

        const res = await response.json()

        if(!response.ok) {
            throw new Error(res.message)
        }

        console.log(res)
        const newFarmer = res.farmer

        if(newFarmer.farmerId) {
            localStorage.setItem("farmerId", newFarmer.farmerId)
        }

        const r = await registerListing(newFarmer.farmerId, {landArea, cropType})
        console.log(r)

        window.location.href = "/ctof"


        
    } catch(err) {
        alert(err)
    }

    // console.log(response)
})


async function registerListing(farmerId, data) {
    console.log("hello")
    const response = await fetch("/api/listing/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': farmerId
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) alert("Error in registering listing")

    const res = await response.json()
    return res;
}