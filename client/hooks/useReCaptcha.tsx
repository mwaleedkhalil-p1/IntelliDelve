import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback } from "react";
import { submitFormWithRecaptcha } from "../lib/recaptchaService";

export const useReCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha() || {};

  const verifyRecaptcha = useCallback(
    async (action: string = "form_submit") => {
      if (!executeRecaptcha) {
        console.warn(
          "ReCAPTCHA not available - using mock verification for development",
        );
        // Return a mock token for development when reCAPTCHA is disabled
        return "development_mock_token";
      }

      try {
        const token = await executeRecaptcha(action);
        return token;
      } catch (error) {
        console.error("ReCAPTCHA execution failed:", error);
        return null;
      }
    },
    [executeRecaptcha],
  );

  const submitWithRecaptcha = useCallback(
    async (
      formData: any,
      action: string = "form_submit",
      endpoint: string = "/api/contact",
    ) => {
      const token = await verifyRecaptcha(action);
      if (!token) {
        throw new Error("ReCAPTCHA verification failed");
      }

      return await submitFormWithRecaptcha(formData, token, endpoint);
    },
    [verifyRecaptcha],
  );

  return {
    verifyRecaptcha,
    submitWithRecaptcha,
  };
};

export default useReCaptcha;
