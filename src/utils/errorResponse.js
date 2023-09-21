// Handler Error Response
export const handleErrorResponse = (res, error) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  } else {
    return res.status(400).json({ error: 'An unkown error occurred' });
  }
};

// Service Error
export const serviceError = (error, defaultMessage) => {
  if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(defaultMessage);
  }
};
