
export const createAuthSlice = (set) => ({
    userInfo: undefined, // Initial state for user information
    setUserInfo: (userInfo) => set({ userInfo }), // Action to update user information
  });
  