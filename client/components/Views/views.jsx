import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"

export const AppViews = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Nav />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome />} />
            </Route>
        </Routes>
    )
}