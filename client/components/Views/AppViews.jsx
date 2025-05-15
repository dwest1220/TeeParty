import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"
import { NavBar } from "../Nav/NavBar"
import { Courses } from "../Courses/courses"
import { MyTeeTimes } from "/home/dwest1220/workspace/TeeParty/client/components/TeeTimes/MyTeeTimes.jsx"
import { BookTeeTimes } from "../TeeTimes/BookTeeTimes"
import { useEffect, useState } from "react"
import { EditTeeTime } from "../TeeTimes/EditTeeTime"
import { Users } from "../Users/Users"
import { Profile } from "../Profile/profile"
import { EditProfile } from "../Profile/EditProfile"



export const AppViews = () => {

    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        const localGolfUser = localStorage.getItem("golf_user");
        if (localGolfUser) {
          const GolfUserObj = JSON.parse(localGolfUser);
          setCurrentUser(GolfUserObj);
        }
      }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome />} />
                <Route path="courses" element={<Courses />} />
                <Route path="teetimes">
                    <Route index element={<MyTeeTimes currentUser={currentUser}/>} />
                    <Route path="book" element={<BookTeeTimes currentUser={currentUser}/>} />
                    <Route path="edit/:id" element={<EditTeeTime currentUser={currentUser} />} />
                </Route>
                <Route path="profile"> 
                    <Route index element={<Profile currentUser={currentUser} />} /> 
                    <Route path="edit/:id" element={<EditProfile />} />
                </Route>
                <Route path="users" element={<Users currentUser={currentUser} />} />    
            </Route>
        </Routes>
    )
}