const Notification = ({ errorMessage, successMessage }) => {
    if (errorMessage === null && successMessage === null) {
      return null;
    }
  
    if (successMessage) {
      return (
        <div className="success">
          {successMessage}
        </div>
      );
    }
  
    if (errorMessage) {
      return (
        <div className="error">
          {errorMessage}
        </div>
      );
    }
  };
  
  export default Notification;
  