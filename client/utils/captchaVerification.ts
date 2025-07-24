

export const verifyCaptchaToken = async (token: string): Promise<boolean> => {

  if (!token || token.trim() === '') {
    return false;
  }

  try {

    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
  } catch (error) {

    return false;
  }
};

