import { useState, useEffect } from 'react'
import { supabase } from './client.ts'
import type { Session } from '@supabase/supabase-js';

export function Session() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])
    if (!session) {
        return console.log('No Session');
    }
}