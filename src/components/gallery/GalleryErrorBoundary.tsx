"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type GalleryErrorBoundaryProps = {
  children: ReactNode;
  onError: (error: unknown) => void;
};

type GalleryErrorBoundaryState = {
  hasError: boolean;
};

export default class GalleryErrorBoundary extends Component<GalleryErrorBoundaryProps, GalleryErrorBoundaryState> {
  state: GalleryErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): GalleryErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    this.props.onError(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
