import { Outlet } from "react-router-dom";
import { Header } from "../Shared/Header.tsx";
import { Navbar } from "../Shared/Navbar.tsx";
import './AppLayout.modules.scss'

export function AppLayout() {
    return (
        <>
            <div className="layout-container">
                <Navbar />
                <div className="wrapper">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                </div>

            </div>
        </>
    )
}