import { initUser } from '@dashboard/store/features/auth/auth.actions';
import { useAppDispatch, useAppSelector } from '@dashboard/store/store';
import { useEffect, useRef } from 'react';


const useInitUser = () => {
    const renderCount = useRef(0)
    const token = useAppSelector((state) => state.auth.jwtToken);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (renderCount.current !== 0) {
            if (token) dispatch(initUser())
        }
        return () => {
            renderCount.current += 1
        }
    }, [token])
}

export default useInitUser