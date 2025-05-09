import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"
import { NavBar } from "../Nav/NavBar"
import { Courses } from "../Courses/courses"

export const AppViews = () => {
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
            </Route>
        </Routes>
    )
}