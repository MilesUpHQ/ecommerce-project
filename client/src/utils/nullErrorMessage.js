export const clearMessageTimeout = (errorMessage) => {
  setTimeout(() => {
    errorMessage(null);
  }, 6000);
};
// this function is used for hiding the message or error after 6 sec.
