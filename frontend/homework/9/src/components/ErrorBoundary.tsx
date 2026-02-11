import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorState from './ErrorState'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: 'An unexpected error occurred.',
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected error occurred.',
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  handleRetry = () => {
    globalThis.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-main">
          <ErrorState
            message={this.state.message}
            actionLabel="Reload"
            onAction={this.handleRetry}
          />
        </main>
      )
    }

    return this.props.children;
  }
}
