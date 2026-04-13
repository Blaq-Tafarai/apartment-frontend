import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return 
        <div>
          <h2>Oops! Something broke.</h2>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
