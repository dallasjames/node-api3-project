import React, {useState, useEffect} from "react"
import axios from "axios"

function Users() {
    const [users, setUsers] = useState()
    useEffect(() => {
        axios.get("http://localhost:8080/api/users")
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
        })
        .catch (err => {
            return (
                <h1>Failed</h1>
            )
        })
    }, [])
    return (
        <>
        <h1>Users</h1>
        {users && users.map((user, i) => (
            <>
            <h3>{user.name}</h3>
            </>
        ))}
        </>
    )
}

export default Users