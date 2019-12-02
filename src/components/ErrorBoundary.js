import React, { Component } from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <ErrorFallback
        title="Oops!"
        subtitle="Görünüşe göre bir sorunla karşılaştık. Ana Sayfa'ya dönerek tekrar deneyebilirsiniz."
      />
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
