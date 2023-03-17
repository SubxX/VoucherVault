import { Button } from "@chakra-ui/react"
import { axiosInstance } from "@dashboard/utils/axios.utils";
const providerKey = import .meta.env.VITE_PAYMENT_PROVIDER_KEY_ID
const backendUrl = import .meta.env.VITE_BACKEND_URL

const Checkout = () => {
    const amount = 10;

    function loadRazorpayScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
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

    const res = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
  
    if (!res) {
        alert("Razorpay SDK failed to load. please check are you online?");
        return;
    }
    const {data}  = await axiosInstance.post(`${backendUrl}/payments/create-order`, {
        amount
    })

    const options = {
        key: providerKey,
        amount: data.amount,
        currency: "INR",
        name: "spm",
        description: "Payment for coupon",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: data.orderId,
        handler: function(response){
            console.log("response", response)
            axiosInstance.post(`${backendUrl}/payments/verify-payment`, {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
            })
        },
        prefill: {
            name: "SPM",
            email: "spm@gmail.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };

    
    console.log("options", options)

    const razor = new window.Razorpay(options);
    razor.open();
}

return (
    <Button title="Pay Now" onClick={checkoutHandler}>Pay Now</Button>
)
};

export default Checkout;
