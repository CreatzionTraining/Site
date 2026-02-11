"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, CheckCircle, Github, Twitter, Facebook, Loader2, User, ArrowRight } from "lucide-react";



interface AuthPageProps {
    initialMode: "login" | "signup";
}

export default function AuthPage({ initialMode }: AuthPageProps) {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "signup">(initialMode);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // Handle URL sync on mode change without full navigation reload
    const handleModeSwitch = (newMode: "login" | "signup") => {
        setMode(newMode);
        setError("");
        // Use History API to change URL without triggering Next.js navigation (SPA feel)
        window.history.pushState(null, "", `/${newMode}`);
    };

    // Listen for browser back/forward buttons to sync state
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
            if (path.includes("login")) setMode("login");
            else if (path.includes("signup")) setMode("signup");
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (mode === "signup") {
                // Validation
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords do not match");
                    setLoading(false);
                    return;
                }
                if (formData.password.length < 8) {
                    setError("Password must be at least 8 characters");
                    setLoading(false);
                    return;
                }

                // Register
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Registration failed");
                }
            }

            // Login (for both flows)
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error("Invalid credentials");
            }

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            setLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: string) => {
        setLoading(true);
        try {
            await signIn(provider, { callbackUrl: "/" });
        } catch (error) {
            setError("Failed to sign in with " + provider);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans flex items-center justify-center p-4 lg:p-0 overflow-hidden relative">

            {/* Desktop Container */}
            <div className="absolute inset-0 w-full h-full hidden lg:flex overflow-hidden bg-gray-50">

                {/* SIGNUP FORM LAYER (Left Side - Underneath initially) */}
                <motion.div
                    className="absolute top-0 left-0 w-[50%] h-full flex items-center justify-center z-10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                        opacity: mode === 'signup' ? 1 : 0,
                        x: mode === 'signup' ? 0 : -50,
                        zIndex: mode === 'signup' ? 10 : 0
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="w-full max-w-[460px] p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] border border-gray-100">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-500">Get started with your free account today.</p>
                        </div>
                        <AuthForm
                            mode="signup"
                            formData={formData}
                            setFormData={setFormData}
                            loading={loading}
                            handleSubmit={handleSubmit}
                            handleOAuth={handleOAuthSignIn}
                            error={error}
                            onSwitch={() => handleModeSwitch('login')}
                            showNameInput
                        />
                    </div>
                </motion.div>

                {/* LOGIN FORM LAYER (Right Side - Visible initially) */}
                <motion.div
                    className="absolute top-0 right-0 w-[50%] h-full flex items-center justify-center z-10"
                    initial={{ opacity: 1, x: 0 }}
                    animate={{
                        opacity: mode === 'login' ? 1 : 0,
                        x: mode === 'login' ? 0 : 50,
                        zIndex: mode === 'login' ? 10 : 0
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="w-full max-w-[460px] p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] border border-gray-100">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-500">Enter your credentials to access your account.</p>
                        </div>
                        <AuthForm
                            mode="login"
                            formData={formData}
                            setFormData={setFormData}
                            loading={loading}
                            handleSubmit={handleSubmit}
                            handleOAuth={handleOAuthSignIn}
                            error={error}
                            onSwitch={() => handleModeSwitch('signup')}
                        />
                    </div>
                </motion.div>


                {/* SLIDING BRANDING OVERLAY (Top Layer) */}
                <motion.div
                    initial={false}
                    animate={{ x: mode === "login" ? "0%" : "100%" }}
                    transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="absolute top-0 left-0 w-[50%] h-full bg-[#080c14] text-white z-20 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12"
                >
                    {/* Animated Background */}


                    {/* Glassmorphism Card for Content */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                        {/* Branding */}
                        <div className="flex-none w-full flex">
                            <motion.div
                                layout
                                transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
                                className={`relative ${mode === "login" ? "mr-auto" : "ml-auto"}`}
                            >
                                {/* Glow Effect */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/25 blur-3xl rounded-full pointer-events-none mix-blend-screen" />

                                <Image
                                    src="/creatzion_brand_logo.png"
                                    alt="Creatzion"
                                    width={360}
                                    height={120}
                                    className="relative z-10 h-32 w-auto object-contain drop-shadow-lg"
                                />
                            </motion.div>
                        </div>

                        {/* Main Text Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col gap-6"
                            >
                                <blockquote className="text-4xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300">
                                    {mode === "login" ? (
                                        '"Empowering the next generation of digital creators."'
                                    ) : (
                                        '"Join a network of elite developers building the future."'
                                    )}
                                </blockquote>

                                <div className="space-y-4">
                                    {mode === "login" ? (
                                        <div className="flex flex-col gap-3 text-lg text-blue-100/80">
                                            <p>Access your dashboard to manage projects and track performance.</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            {[
                                                "Enterprise-grade Security",
                                                "Real-time Analytics Dashboard",
                                                "Collaborative Workspaces"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-lg text-blue-100/90">
                                                    <div className="w-6 h-6 rounded-full bg-[#0A66C2]/20 flex items-center justify-center">
                                                        <CheckCircle className="w-4 h-4 text-[#4dabf7]" />
                                                    </div>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Footer */}
                        <div className="flex-none flex items-center justify-between text-sm text-blue-400/60 border-t border-[#0A66C2]/30 pt-6">
                            <span>© 2025 Creatzion Inc.</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Layout (Stacked & Optimized) */}
            <div className="fixed inset-0 z-50 lg:hidden bg-[#0B1320] flex flex-col overflow-y-auto">
                {/* Mobile Header: Logo */}
                {/* Mobile Header: Logo */}
                <div className="flex-none flex items-center justify-center pt-10 pb-6">
                    <Image
                        src="/creatzion_brand_logo.png"
                        alt="Creatzion Logo"
                        width={300}
                        height={100}
                        className="h-32 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    />
                </div>

                {/* Mobile Content: Card */}
                <div className="flex-1 flex items-start justify-center p-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 mb-8"
                        >
                            <div className="mb-6 text-center">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
                                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {mode === 'login' ? 'Enter credentials to access account' : 'Get started with your free account'}
                                </p>
                            </div>

                            <AuthForm
                                mode={mode}
                                formData={formData}
                                setFormData={setFormData}
                                loading={loading}
                                handleSubmit={handleSubmit}
                                handleOAuth={handleOAuthSignIn}
                                // error is handled inside form
                                error={error}
                                onSwitch={() => handleModeSwitch(mode === 'login' ? 'signup' : 'login')}
                                showNameInput={mode === 'signup'}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
}

// Reusable Sub-Component for the Form Fields to reduce duplication
function AuthForm({ mode, formData, setFormData, loading, handleSubmit, handleOAuth, error, onSwitch, showNameInput }: any) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="hidden lg:flex p-3 bg-red-50 text-red-600 text-sm rounded-lg items-center gap-2 mb-4 animate-in fade-in"><CheckCircle className="w-4 h-4 text-red-600" />{error}</div>}

            {showNameInput && (
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
                            placeholder="John Doe"
                        />
                    </div>
                </div>
            )}

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
                        placeholder="name@company.com"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    {mode === 'login' && <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>}
                </div>
                <div className="relative group">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {mode === 'signup' && (
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
                {/* Google */}
                <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_#4285F4]"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.02z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                </button>

                {/* Facebook */}
                <button
                    type="button"
                    onClick={() => handleOAuth('facebook')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_#1877F2]"
                >
                    <svg className="w-6 h-6 fill-[#1877F2]" viewBox="0 0 24 24">
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.841c0-2.435 1.378-3.777 3.516-3.777 1.025 0 2.156.108 2.156.108v2.361h-1.215c-1.196 0-1.602.778-1.602 1.576v1.572h2.583l-.337 3.667h-2.246v7.98h-2.855z" />
                    </svg>
                </button>

                {/* Apple */}
                <button
                    type="button"
                    onClick={() => handleOAuth('apple')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_rgba(0,0,0,0.5)]"
                >
                    <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                </button>

                {/* Github */}
                <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_#24292e]"
                >
                    <svg className="w-6 h-6 fill-[#24292e]" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-8">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={onSwitch} className="font-semibold text-blue-600 hover:underline">
                    {mode === 'login' ? "Sign up" : "Log in"}
                </button>
            </div>
        </form>
    );
}
