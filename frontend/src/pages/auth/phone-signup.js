import Link from "next/link";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import phone from "phone";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

//internal import
import Layout from "@layout/Layout";
import Label from "@components/form/Label";
import BottomNavigation from "@components/login/BottomNavigation";
import { notifyError, notifySuccess } from "@utils/toast";
import { UserContext } from "@context/UserContext";
import CustomerServices from "@services/CustomerServices";

const PhoneSignup = () => {
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { dispatch } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const name = "phone";

  const rules = {
    required: {
      value: true,
      message: "Phone Number is required!",
    },
    validate: (value) => {
      return phone(value)?.isValid || "Enter valid phone number!";
    },
  };

  useEffect(() => {
    // Clear any existing verifier to avoid "element removed" errors
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (error) {
        console.error("Error clearing recaptcha", error);
      }
      window.recaptchaVerifier = null;
    }

    // Initialize Recaptcha
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      });
      
      window.recaptchaVerifier.render();
    } catch (error) {
      console.error("Error initializing recaptcha", error);
    }

    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.error("Error clearing recaptcha on unmount", error);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const onSignInSubmit = async ({ phone }) => {
    setLoading(true);
    setPhoneNumber(phone);
    const appVerifier = window.recaptchaVerifier;

    // Development Bypass for sending OTP
    if (process.env.NODE_ENV === "development" && phone.includes("1234567890")) {
        setShowOtpInput(true);
        setLoading(false);
        notifySuccess("OTP sent successfully (Dev Bypass)!");
        return;
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowOtpInput(true);
      setLoading(false);
      notifySuccess("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP", error);
      setLoading(false);
      notifyError(error.message);
      
      if (error.code === 'auth/network-request-failed') {
        notifyError("Network error. Check internet or Authorized Domains.");
      }

      // Reset recaptcha if needed
      if (window.recaptchaVerifier) {
          // window.recaptchaVerifier.clear(); 
      }
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Development Bypass for verifying OTP
    if (process.env.NODE_ENV === "development" && otp === "123456") {
        try {
            const res = await CustomerServices.loginWithPhone({ phone: phoneNumber });
            notifySuccess("Phone verified successfully (Dev Bypass)!");
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("userInfo", JSON.stringify(res));
            router.push("/"); 
            setLoading(false);
            return;
        } catch (error) {
             console.error("Error verifying OTP (Dev Bypass)", error);
             setLoading(false);
             notifyError("Login Failed (Dev Bypass)");
             return;
        }
    }

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      console.log("User verified", user);
      
      // Send phone number to backend to get/create user and get JWT
      const res = await CustomerServices.loginWithPhone({ phone: user.phoneNumber });
      
      notifySuccess("Phone verified successfully!");
      
      dispatch({ type: "USER_LOGIN", payload: res });
      Cookies.set("userInfo", JSON.stringify(res));
      
      router.push("/"); 
      setLoading(false);
    } catch (error) {
      console.error("Error verifying OTP", error);
      setLoading(false);
      notifyError("Invalid OTP or Login Failed");
    }
  };

  return (
    <Layout
      title="Phone Signup"
      description="this is phone number sign up page"
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold font-serif">
                    {showOtpInput ? "Verify OTP" : "Signing Up"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 mb-8 sm:mb-10">
                    {showOtpInput ? "Enter the OTP sent to your phone" : "Create an account by phone number."}
                  </p>
                  {process.env.NODE_ENV === "development" && !showOtpInput && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 text-xs text-left mb-4">
                      <p className="font-bold">Development Mode:</p>
                      <p>Use phone number containing <b>1234567890</b> to bypass SMS verification.</p>
                    </div>
                  )}
                  {process.env.NODE_ENV === "development" && showOtpInput && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 text-xs text-left mb-4">
                      <p className="font-bold">Development Mode:</p>
                      <p>Use OTP <b>123456</b> to bypass verification.</p>
                    </div>
                  )}
                </div>
                
                <div id="recaptcha-container"></div>

                {!showOtpInput ? (
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSignInSubmit)}
                    className="flex flex-col justify-center mb-6"
                  >
                    <div className="grid grid-cols-1 gap-5">
                      <div className="form-group">
                        <Label label="Phone Number" />

                        <Controller
                          name={name}
                          control={control}
                          rules={rules}
                          defaultValue={formatPhoneNumberIntl("12345678900")}
                          render={({ field }) => {
                            return (
                              <PhoneInput
                                {...field}
                                name={name}
                                placeholder="Enter phone number"
                                international={true}
                                onChange={(value) => {
                                  field.onChange(value);
                                }}
                                className="rounded-md h-12"
                              />
                            );
                          }}
                        />
                        {errors?.phone && (
                          <span className="text-red-400 text-sm mt-2 ml-10">
                            {errors?.phone?.message}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex ms-auto">
                          <Link
                            href="/auth/signup"
                            className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                          >
                            Sign Up with Email?
                          </Link>
                        </div>
                      </div>
                      {loading ? (
                        <button
                          disabled={loading}
                          type="submit"
                          className={`md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-store-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-store-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto`}
                        >
                          <img
                            src="/loader/spinner.gif"
                            alt="Loading"
                            width={20}
                            height={10}
                          />
                          <span className="font-serif ml-2 font-light">
                            Processing
                          </span>
                        </button>
                      ) : (
                        <button
                          disabled={loading}
                          type="submit"
                          className={`w-full text-center py-3 rounded bg-store-500 text-white hover:bg-store-600 transition-all focus:outline-none my-1`}
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <form onSubmit={verifyOtp} className="flex flex-col justify-center mb-6">
                     <div className="grid grid-cols-1 gap-5">
                        <div className="form-group">
                          <Label label="OTP Code" />
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-store-500 h-11 md:h-12"
                            placeholder="Enter OTP"
                          />
                        </div>
                        <button
                          disabled={loading}
                          type="submit"
                          className={`w-full text-center py-3 rounded bg-store-500 text-white hover:bg-store-600 transition-all focus:outline-none my-1`}
                        >
                          {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                     </div>
                  </form>
                )}

                <BottomNavigation
                  desc
                  route={"/auth/login"}
                  pageName={"Login"}
                  loginTitle="Sign Up"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhoneSignup;
