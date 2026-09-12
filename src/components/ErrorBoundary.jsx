import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0b0d13] text-slate-100 p-8 flex flex-col items-center justify-center font-sans space-y-4">
                    <div className="bg-rose-950/80 border border-rose-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
                        <div className="flex items-center gap-3 text-rose-400 font-bold text-lg">
                            <span className="w-8 h-8 rounded-lg bg-rose-900 flex items-center justify-center font-mono">⚠️</span>
                            <span>React Application Runtime Exception Caught</span>
                        </div>
                        <p className="text-xs font-mono text-rose-200 bg-[#12080a] p-3 rounded-lg border border-rose-900/60 overflow-x-auto">
                            {this.state.error && this.state.error.toString()}
                        </p>
                        {this.state.errorInfo && (
                            <pre className="text-[11px] font-mono text-slate-400 bg-[#090b10] p-3 rounded-lg border border-slate-800 max-h-48 overflow-y-auto">
                                {this.state.errorInfo.componentStack}
                            </pre>
                        )}
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                            }}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
                        >
                            Reset Storage & Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
