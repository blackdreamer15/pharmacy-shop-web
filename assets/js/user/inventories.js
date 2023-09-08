import { get_current_user, get_inventory_list} from "../modules.js";


document.addEventListener("DOMContentLoaded", async (event) => {
    await get_current_user()

    const inventory_list = await get_inventory_list()

    const inventory_list_element = document.querySelector("#inventories")

    for (const inventory of inventory_list) {
        const row = document.createElement("tr")

        const name = document.createElement("td")
        name.innerText = inventory.name

        const price = document.createElement("td")
        price.innerText = inventory.price

        const quantity = document.createElement("td")
        quantity.innerText = inventory.quantity

        const action = document.createElement("td")
        const add_to_cart_button = document.createElement("button")
        add_to_cart_button.classList.add("bi", "bi-bag-plus", "btn", "btn-outline-primary")
        add_to_cart_button.setAttribute("id", inventory.id)

        add_to_cart_button.addEventListener("click", async (event) => {
        })

        action.appendChild(add_to_cart_button)

        row.appendChild(name)
        row.appendChild(price)
        row.appendChild(quantity)
        row.appendChild(action)

        inventory_list_element.appendChild(row)

    }



})
