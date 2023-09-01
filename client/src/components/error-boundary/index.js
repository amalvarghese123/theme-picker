import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      err: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("err:", error);
    console.log("Error info:", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Application has encountered an error</h2>
          <p>{this.state.err?.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
