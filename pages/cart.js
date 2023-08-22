import React, { useMemo, useState ,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { makePaymentRequest } from "@/utils/api";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);
  useEffect(() => {
    // Check if the user is logged in based on localStorage
    const userIsLoggedIn = localStorage.getItem("user");
    setIsLoggedIn(userIsLoggedIn);
}, []);
  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (isLoggedIn) {
      try {
        setLoading(true);
        const stripe = await stripePromise;
        const res = await makePaymentRequest("/api/orders", {
          products: cartItems,
        });
        await stripe.redirectToCheckout({
          sessionId: res.stripeSession.id,
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }else {
        // If the user is not logged in, redirect to the login form
        router.push("/login");// Change "/login" to the appropriate login URL
      }
   
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl mb-5 font-semibold leading-tight">
                Shopping Cart
              </h1>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Cart Items</h2>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Summary</h2>

                <div className="p-5 my-5 bg-gray-100 rounded-xl">
                  <div className="flex justify-between mb-5">
                    <span className="uppercase text-lg font-medium text-black">
                      Subtotal
                    </span>
                    <span className="text-lg font-medium text-black">
                      &#8360;{subTotal}
                    </span>
                  </div>
                  <p className="text-sm">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </p>
                </div>
         
        <button
                  className="w-full py-4 rounded-md bg-blue-600 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:bg-blue-700 flex items-center justify-center"
                  onClick={handlePayment}
                >
                  {loading ? (
                    <>
                      <span>Processing</span>
                      <img src="/spinner.svg" alt="Loading" className="ml-2" />
                    </>
                  ) : (
                    <span>Checkout</span>
                  )}
                </button>
                {/* BUTTON START */}
               
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        ) : (
          /* This is empty screen */
          <div className="flex flex-col items-center py-12">
            <Image
              src="/empty-cart.jpg"
              width={400}
              height={400}
              alt="Empty Cart"
              className="w-[300px] md:w-[400px]"
            />
            <h2 className="text-3xl font-bold mt-8 mb-4">
              Your cart is empty
            </h2>
            <p className="text-center mb-8">
              Looks like you haven't added anything to your cart yet.
              <br />
              Go ahead and explore our top categories.
            </p>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-blue-600 text-white text-lg font-medium transition-transform active:scale-95 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
