import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <main
            role="main"
            aria-labelledby="error-heading"
            className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white font-sans"
        >
            <div className="text-center max-w-2xl w-full rounded-xl p-8 bg-white/5 shadow-2xl">
                <svg
                    className="w-24 h-24 mb-4 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                >
                    <path d="M11 15h2v2h-2z" fill="#FB7185" />
                    <path
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1 11h-2v-6h2v6z"
                        fill="#F97316"
                    />
                </svg>

                <h1 id="error-heading" className="m-0 text-3xl sm:text-4xl font-extrabold">
                    Page not found
                </h1>

                <p className="mt-3 text-slate-200 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="mt-6 flex gap-3 justify-center">
                    <Link
                        to="/"
                        className="inline-block px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold no-underline"
                    >
                        Go to Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="inline-block px-4 py-2 rounded-lg bg-transparent border border-white/12 text-white cursor-pointer font-semibold"
                    >
                        Go back
                    </button>
                </div>

                <small className="block mt-4 text-white/60 text-sm">
                    If you think this is a bug, contact support or check the URL.
                </small>
            </div>
        </main>
    );
};

export default ErrorPage;
