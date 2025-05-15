import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import './Users.css'

export const Users = () => {
    const [user, setUser] = useState([])
    
    useEffect(()=>{
        getAllUsers().then(setUser)
    },[])

    return (
        <article className="user-container">
            <h2>Users</h2>
                <section className="user-body">
                    {user.map((user)=>{
                        return (
                            <div className="user-info" key={user.id}>
                                <div>{user.name}</div>
                                <div>{user.location}</div>
                                <div>{user.handicap}</div>
                                <div>{user.playStyle}</div>
                                <div>{user.bio}</div>
                            </div>
                        )
                    })}
                </section>
        </article>
    )
}