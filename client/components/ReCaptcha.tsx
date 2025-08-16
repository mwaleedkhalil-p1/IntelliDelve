import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6Le6iYYrAAAAALPQ2Qd7wcP_p53u4wKBridN4bAO';

export interface ReCaptchaRef {
  executeRecaptcha: () => Promise<string | null>;
  resetRecaptcha: () => void;
}

interface ReCaptchaProps {
  onVerify?: (token: string | null) => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal';
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, theme = 'light', size = 'normal' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      executeRecaptcha: async (): Promise<string | null> => {
        if (recaptchaRef.current) {
          return recaptchaRef.current.getValue();
        }
        return null;
      },
      resetRecaptcha: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
    }));

    const handleChange = (token: string | null) => {
      if (onVerify) {
        onVerify(token);
      }
    };

    const handleExpired = () => {
      if (onVerify) {
        onVerify(null);
      }
    };

    const handleError = () => {
      if (onVerify) {
        onVerify(null);
      }
    };

    return (
      <div className="flex justify-center my-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={handleChange}
          onExpired={handleExpired}
          onError={handleError}
          theme={theme}
          size={size}
        />
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;
