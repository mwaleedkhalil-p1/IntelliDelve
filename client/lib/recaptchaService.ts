/**
 * Mock reCAPTCHA verification service
 * In a real application, this would be handled by your backend
 */

export interface RecaptchaVerificationResponse {
  success: boolean;
  message?: string;
  "error-codes"?: string[];
}

export const verifyRecaptchaToken = async (
  token: string,
  secretKey?: string,
): Promise<RecaptchaVerificationResponse> => {
  if (!token) {
    return {
      success: false,
      message: "No reCAPTCHA token provided",
      "error-codes": ["missing-input-response"],
    };
  }

  try {
    // Use the actual secret key from environment or parameter
    const secret = secretKey || "6LehToYrAAAAAO2NVDhiCSfG6odLkgL8gDvYadIS";

    // Make actual verification request to Google's API
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secret}&response=${token}`,
      },
    );

    const result = await response.json();

    return {
      success: result.success,
      message: result.success
        ? "reCAPTCHA verification successful"
        : "reCAPTCHA verification failed",
      "error-codes": result["error-codes"] || [],
    };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      success: false,
      message: "reCAPTCHA verification failed",
      "error-codes": ["network-error"],
    };
  }
};

export const submitFormWithRecaptcha = async (
  formData: any,
  recaptchaToken: string,
  endpoint: string = "/api/contact",
): Promise<{ success: boolean; message: string }> => {
  // First verify reCAPTCHA
  const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);

  if (!recaptchaResult.success) {
    throw new Error(recaptchaResult.message || "reCAPTCHA verification failed");
  }

  // Mock form submission
  // In production, this would submit to your actual backend
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Form submitted successfully",
  };
};
