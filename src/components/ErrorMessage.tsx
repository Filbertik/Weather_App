import { AlertCircle, RefreshCw } from "lucide-react";

import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <div className="error-message__icon">
        <AlertCircle size={28} />
      </div>

      <div className="error-message__content">
        <h2>Something went wrong</h2>

        <p>{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="error-message__button"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
