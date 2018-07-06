export const loadState = () => {
  try {
    const data = sessionStorage.getItem('state');
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const data = JSON.stringify(state);
    sessionStorage.setItem('state', data);
  } catch (error) {
    return undefined;
  }
};
