# MT Error

## Documentation

[Documentation](https://github.com/MINIMAL-TECHNOLOGY/mt-error)

## Installation

```bash
pnpm add https://github.com/MINIMAL-TECHNOLOGY/mt-error.git
```

## Usage

1. Create file `ErrorBoundary.tsx`:

```tsx
import React from 'react';
import {
  IClient,
  EventTypes,
  getErrorBoundaryTrace,
} from '@minimaltech/error-browser';

//----------------------------------------------
interface IErrorBoundaryProps {
  client: IClient;
  FallbackComponent?: React.ReactElement;
  children?: React.ReactNode;
}

//----------------------------------------------
interface IErrorBoundaryState {
  isError: boolean;
}

//----------------------------------------------
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = { isError: false };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error) {
    const { client } = this.props;

    const trace = getErrorBoundaryTrace({ error });

    const event = client.createEvent({
      eventType: EventTypes.ERROR,
      trace,
    });

    client.notify(event);
  }

  render() {
    const { isError } = this.state;
    const { FallbackComponent, children } = this.props;

    if (!isError) {
      return children;
    }

    if (FallbackComponent) {
      return FallbackComponent;
    }

    return <>Something went wrong.</>;
  }
}
```

2. Add into your project:

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from './ErrorBoundary';
import { MTError } from '@minimaltech/error-browser';
import packageJson from '/package.json';

export const client = MTError.init({
  publicKey: 'YOUR_PUBLIC_KEY',
  endpoint: 'YOUR_ENDPOINT',
  environment: 'YOUR_ENVIRONMENT',
  projectId: 'YOUR_PROJECT_ID',
  appVersion: packageJson.version,
  appType: 'REACTJS',
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <ErrorBoundary client={client}>
    <App />
  </ErrorBoundary>
)
```
