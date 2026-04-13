import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      componentStack: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      componentStack: errorInfo.componentStack
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      componentStack: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
          <div className="max-w-lg w-full bg-surface rounded-lg border border-border-color p-8 shadow-xl text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-danger/10 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Something went wrong</h2>
            <p className="text-text-secondary mb-6">We're sorry, an unexpected error occurred.</p>
            
            {this.state.error && (
              <div className="mb-6 p-4 bg-danger/10 border border-danger rounded-lg">
                <p className="font-mono text-sm text-danger mb-2">Error: {this.state.error.message}</p>
                {this.state.componentStack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-danger/80">Component Stack</summary>
                    <pre className="font-mono text-xs bg-danger/5 p-3 rounded mt-2 overflow-auto max-h-40">
                      {this.state.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 border border-border-color bg-surface text-text-primary rounded-lg hover:bg-surface-variant transition-all font-medium"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
