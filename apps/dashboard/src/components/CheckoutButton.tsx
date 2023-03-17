import { Button } from '@chakra-ui/react';
import { axiosInstance } from '@dashboard/utils/axios.utils';
import { useAppDispatch, useAppSelector } from '@dashboard/store/store';
import { setDialog } from '@dashboard/store/features/auth/auth.slice';

const providerKey = import.meta.env.VITE_PAYMENT_PROVIDER_KEY_ID;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CheckoutButton = ({
  couponId,
  creator,
}: {
  couponId: string;
  creator: string;
}) => {
  const diaptch = useAppDispatch();
  const user: any = useAppSelector((state) => state.auth.user);
  const shouldDisable = user?._id === creator;

  function loadRazorpayScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const checkoutHandler = async () => {
    if (!user) {
      diaptch(setDialog(true));
      return;
    }

    const res = await loadRazorpayScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. please check are you online?');
      return;
    }
    const { data } = await axiosInstance.post(
      `${backendUrl}/payments/create-order`,
      {
        couponId,
      }
    );

    const options = {
      key: providerKey,
      amount: data.amount,
      currency: 'INR',
      name: 'spm',
      description: 'Payment for coupon',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: data.orderId,
      handler: function (response: any) {
        console.log('response', response);
        axiosInstance.post(`${backendUrl}/payments/verify-payment`, {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        });
      },
      prefill: {
        name: 'SPM',
        email: 'spm@gmail.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#121212',
      },
    };

    console.log('options', options);

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Button
      variant="primary"
      onClick={checkoutHandler}
      isDisabled={shouldDisable}
    >
      Purchase
    </Button>
  );
};

export default CheckoutButton;
