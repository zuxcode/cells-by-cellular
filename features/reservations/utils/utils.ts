const getDefaultDOB = () => {
  const today = new Date();
  return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
};

export { getDefaultDOB };
