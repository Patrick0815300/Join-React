import { useState, useEffect } from "react"
import AuthForm from "./AuthForm"
import './Login.modules.scss'
import { getInstruments } from "../../api/supabase/data"

const Login = ({ }) => {
    const [instrument, setInstrument] = useState<any[]>([]);
    useEffect(() => {
        getInstruments()
            .then(data => setInstrument(data))
            .catch(e => console.error('Fehler beim laden der Daten' + e))
    }, [])

    //console.log('Instrument: ' + instrument);

    //Session();



    return (
        <>
            <section>
                <AuthForm mode="login" />
                <footer>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Legal otice</a>
                </footer>
            </section>
        </>
    )

}

export default Login