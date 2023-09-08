const BACKEND_ROOT_URL = "http://127.0.0.1:8000"

export function redirect_to_admin_login() {
    window.location.href = "/admin/login.html"
}

export function redirect_to_user_login() {
    window.location.href = "/user/login.html"
}

export function get_admin_token_from_storage() {
    const admin_token = window.localStorage.getItem("admin_token")

    if (admin_token === null) {
        redirect_to_admin_login()
    }
    else {
        return admin_token
    }
}

export function get_user_token_from_storage() {
    const user_token = window.localStorage.getItem("user_token")

    if (user_token === null) {
        redirect_to_admin_login()
    }
    else {
        return user_token
    }
}

export async function get_current_admin() {
    const admin_token = get_admin_token_from_storage()

    const response = await fetch(`${BACKEND_ROOT_URL}/admins/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${admin_token}`
        }
    })

    if (response.status === 401) {
        redirect_to_admin_login()
    }
}

export async function get_current_user() {
    const user_token = get_user_token_from_storage()

    const response = await fetch(`${BACKEND_ROOT_URL}/users/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user_token}`
        }
    })

    if (response.status === 401) {
        redirect_to_user_login()
    }
}

export async function get_inventory_list() {
    const response = await fetch(`${BACKEND_ROOT_URL}/inventories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (response.ok) {
        return await response.json()
    } else {
        console.log("Failed to load inventory list")
    }
}

export async function delete_item_from_inventory(inventory_id) {
    const admin_token = get_admin_token_from_storage()

    const response = await fetch(`${BACKEND_ROOT_URL}/inventories/${inventory_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${admin_token}`
        }
    })

    if (response.status === 401) {
        redirect_to_admin_login()
    }
}
