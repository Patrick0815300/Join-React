import { Outlet } from "react-router-dom";
import { Header } from "../Shared/Header.tsx";
import { Navbar } from "../Shared/Navbar.tsx";
import styles from './AppLayout.module.scss'

export function AppLayout() {
    return (
        <>
            <div className={styles.layoutContainer}>
                <Navbar />
                <div className={styles.wrapper}>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                </div>

            </div>
        </>
    )
}