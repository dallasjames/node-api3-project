import React, { useState, useEffect } from "react"
import axios from "axios"

function AddUser() {
    const [user, setUser] = useState({
        name: ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:8080/api/users", user)
            .then(res => {
                console.log(res)
            })
            .catch (err => {
                console.log(err)
            })
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="name" name="name" placeholder="name" value={user.name} onChange={handleChange} />
            <button type="submit">Add User</button>
        </form>
        </>
    )
}

export default AddUser