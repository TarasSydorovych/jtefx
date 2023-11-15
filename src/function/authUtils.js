export const checkRegistration = () => {
  const authData = localStorage.getItem("auth");

  if (authData) {
    const parsedAuthData = JSON.parse(authData);
    const isRegistered = parsedAuthData !== null;
    const { firstName, userId, role } = isRegistered ? parsedAuthData : {};

    return { isRegistered, role, firstName, userId };
  }

  return { isRegistered: false, firstName: null, userId: null, role: null };
};
