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
    const [stars, setStars] = useState<any[]>([]);

    // Generate stars only on client to avoid hydration mismatch
    useEffect(() => {
        const generatedStars = Array.from({ length: 20 }).map(() => ({
            width: Math.random() < 0.5 ? '2px' : '3px',
            height: Math.random() < 0.5 ? '2px' : '3px',
            top: -10,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`,
        }));
        setStars(generatedStars);
    }, []);

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
                    transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }} // Premium Bezier
                    className="absolute top-0 left-0 w-[50%] h-full bg-[#0B1320] text-white z-20 flex flex-col justify-between p-16 overflow-hidden shadow-2xl"
                >
                    {/* Falling Stars Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,119,255,0.1),_transparent_70%)]"></div>
                        {stars.map((star, i) => (
                            <div
                                key={i}
                                className="absolute bg-blue-400/30 rounded-full"
                                style={{
                                    width: star.width,
                                    height: star.height,
                                    top: star.top,
                                    left: star.left,
                                    opacity: star.opacity,
                                    animation: star.animation,
                                    animationDelay: star.animationDelay,
                                    boxShadow: '0 0 4px rgba(0, 119, 255, 0.4)'
                                }}
                            />
                        ))}
                        <style jsx>{`
                            @keyframes fall {
                                0% { transform: translateY(-10px) translateX(0); opacity: 0; }
                                10% { opacity: 1; }
                                90% { opacity: 1; }
                                100% { transform: translateY(100vh) translateX(-20px); opacity: 0; }
                            }
                        `}</style>
                    </div>

                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "40px 40px"
                        }}
                    ></div>

                    {/* Content inside Panel */}
                    <div className="relative z-20 h-full flex flex-col justify-between">
                        <div className="flex items-center gap-2.5 select-none">
                            <Image
                                src="/creatzion_brand_logo.png"
                                alt="Creatzion Logo"
                                width={300}
                                height={100}
                                className="h-32 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <blockquote className="text-3xl font-medium leading-relaxed tracking-tight mb-8">
                                    {mode === "login" ? (
                                        '"The platform for creators who demand excellence. Build, manage, and scale your digital presence."'
                                    ) : (
                                        '"Join our community of innovators. Experience the future of web development today."'
                                    )}
                                </blockquote>

                                <div className="flex items-center gap-4">
                                    {mode === "login" ? (
                                        <></>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-blue-400" /> <span className="text-gray-300">Enterprise Security</span></div>
                                            <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-blue-400" /> <span className="text-gray-300">Real-time Analytics</span></div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
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
                        width={240}
                        height={80}
                        className="h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    />
                </div>

                {/* Mobile Content: Card */}
                <div className="flex-1 flex items-start justify-center p-4">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
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
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_#dd4b39]"
                >
                    <svg className="w-7 h-7 fill-current text-[#dd4b39]" viewBox="-13 -13 72 72" aria-hidden="true">
                        <path d="M48,22h-5v-5h-4v5h-5v4h5v5h4v-5h5 M16,21v6.24h8.72c-0.67,3.76-3.93,6.5-8.72,6.5c-5.28,0-9.57-4.47-9.57-9.75s4.29-9.74,9.57-9.74c2.38,0,4.51,0.82,6.19,2.42v0.01l4.51-4.51C23.93,9.59,20.32,8,16,8C7.16,8,0,15.16,0,24s7.16,16,16,16c9.24,0,15.36-6.5,15.36-15.64c0-1.17-0.11-2.29-0.31-3.36C31.05,21,16,21,16,21z" />
                    </svg>
                </button>

                {/* Facebook */}
                <button
                    type="button"
                    onClick={() => handleOAuth('facebook')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_#3b5998]"
                >
                    <svg className="w-7 h-7 fill-current text-[#3b5998]" viewBox="0 -7 16 30" aria-hidden="true">
                        <path d="M12 3.303h-2.285c-0.27 0-0.572 0.355-0.572 0.831v1.65h2.857v2.352h-2.857v7.064h-2.698v-7.063h-2.446v-2.353h2.446v-1.384c0-1.985 1.378-3.6 3.269-3.6h2.286v2.503z" />
                    </svg>
                </button>

                {/* Apple */}
                <button
                    type="button"
                    onClick={() => handleOAuth('apple')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_rgba(0,0,0,0.5)]"
                >
                    <svg className="w-6 h-6 fill-current text-black" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                </button>

                {/* Github */}
                <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    className="group flex items-center justify-center w-14 h-14 border border-gray-100 rounded-full shadow-[0_0_8px_0_rgba(50,50,50,0.15)] bg-white transition-all duration-300 hover:shadow-[0_0_24px_0_#4183c4]"
                >
                    <svg className="w-7 h-7 fill-current text-[#4183c4]" viewBox="-30 -30 150 150" aria-hidden="true">
                        <path d="M61.896,52.548c-3.59,0-6.502,4.026-6.502,8.996c0,4.971,2.912,8.999,6.502,8.999 c3.588,0,6.498-4.028,6.498-8.999C68.395,56.574,65.484,52.548,61.896,52.548z M84.527,29.132c0.74-1.826,0.777-12.201-3.17-22.132 c0,0-9.057,0.993-22.76,10.396c-2.872-0.793-7.736-1.19-12.597-1.19s-9.723,0.396-12.598,1.189C19.699,7.993,10.645,7,10.645,7 c-3.948,9.931-3.913,20.306-3.172,22.132C2.834,34.169,0,40.218,0,48.483c0,35.932,29.809,36.508,37.334,36.508 c1.703,0,5.088,0.004,8.666,0.009c3.578-0.005,6.965-0.009,8.666-0.009C62.191,84.991,92,84.415,92,48.483 C92,40.218,89.166,34.169,84.527,29.132z M46.141,80.574H45.86c-18.859,0-33.545-2.252-33.545-20.58 c0-4.389,1.549-8.465,5.229-11.847c6.141-5.636,16.527-2.651,28.316-2.651c0.045,0,0.093-0.001,0.141-0.003 c0.049,0.002,0.096,0.003,0.141,0.003c11.789,0,22.178-2.984,28.316,2.651c3.68,3.382,5.229,7.458,5.229,11.847 C79.686,78.322,65,80.574,46.141,80.574z M30.104,52.548c-3.588,0-6.498,4.026-6.498,8.996c0,4.971,2.91,8.999,6.498,8.999 c3.592,0,6.502-4.028,6.502-8.999C36.605,56.574,33.695,52.548,30.104,52.548z" />
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
