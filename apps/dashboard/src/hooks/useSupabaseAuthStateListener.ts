import { useEffect } from "react"
import { supabase } from '@dashboard/utils/supabase.utils';
import { useAppDispatch } from "@dashboard/store/store";
import { setToken, signOut } from "@dashboard/store/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const useSupabaseAuthStateListener = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const subscription = supabase.auth.onAuthStateChange((ev, session) => {
            if (ev === 'SIGNED_IN') {
                dispatch(setToken(session?.access_token ?? ''))
                // navigate('/dashboard')
            }
            if (ev === 'SIGNED_OUT') {
                dispatch(signOut())
                navigate('/')
            }
        })

        return () => {
            subscription.data?.unsubscribe()
        }
    }, [])
}

export default useSupabaseAuthStateListener