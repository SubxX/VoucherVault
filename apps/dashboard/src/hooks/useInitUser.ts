import { initUser } from '@dashboard/store/features/auth/auth.actions';
import { useAppDispatch, useAppSelector } from '@dashboard/store/store';
import { useEffect, useRef } from 'react';
import { useGetRazorpayOnboardingQuery, } from '@dashboard/store/api/payment.query';

const useInitUser = () => {
  const renderCount = useRef(0)
  const token = useAppSelector((state) => state.auth.jwtToken);
  const dispatch = useAppDispatch()

  const { refetch } = useGetRazorpayOnboardingQuery('onboarding', { skip: !token })

  useEffect(() => {
    if (renderCount.current !== 0) {
      if (!token) return
      dispatch(initUser())
      refetch()
    }
    return () => {
      renderCount.current += 1
    }
  }, [token])
}

export default useInitUser
