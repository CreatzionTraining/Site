"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Building2 } from "lucide-react";

interface NewsItem {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

const FALLBACK_NEWS: NewsItem[] = [
    {
        id: 1,
        datetime: Date.now() / 1000,
        headline: "Next-Gen Humanoid Robots Deployed in Advanced Manufacturing",
        image: "",
        summary: "Leading tech firms are rolling out AI-driven humanoid robots to automate complex assembly line tasks with human-like precision.",
        url: "#",
        category: "robotics",
        related: "",
        source: "Robotics Daily"
    },
    {
        id: 2,
        datetime: Date.now() / 1000 - 86400,
        headline: "Generative AI Models Exceed Human Performance in Coding",
        image: "",
        summary: "The latest highly specialized LLMs demonstrate unprecedented accuracy in software engineering and code optimization.",
        url: "#",
        category: "ai & ml",
        related: "",
        source: "AI Insider"
    },
    {
        id: 3,
        datetime: Date.now() / 1000 - 172800,
        headline: "Breakthrough in Machine Learning Efficiency for Edge Devices",
        image: "",
        summary: "New neural network architectures allow complex ML inference to run locally on low-power IoT devices.",
        url: "#",
        category: "technology",
        related: "",
        source: "Edge Computing News"
    },
    {
        id: 4,
        datetime: Date.now() / 1000 - 250000,
        headline: "Autonomous Swarm Robotics Transform Logistics Operations",
        image: "",
        summary: "AI-coordinated robot swarms are increasing warehouse fulfillment speeds by 400% in global distribution centers.",
        url: "#",
        category: "robotics",
        related: "",
        source: "Tech Logistics"
    }
];

export default function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    // Fetch News from Finnhub
    useEffect(() => {
        const fetchNews = async () => {
            const apiKey = "d4qhkphr01quli1cm8sgd4qhkphr01quli1cm8t0";

            try {
                const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${apiKey}`);
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    // Filter for specific Tech, AI, ML, and Robotics keywords
                    const techKeywords = ['ai', 'artificial intelligence', 'ml', 'machine learning', 'robot', 'robotics', 'automation', 'neural', 'deep learning', 'gpt', 'llm'];

                    const validNews = data.filter((item: any) => {
                        const content = (item.headline + item.summary).toLowerCase();
                        return item.headline && item.summary && techKeywords.some(k => content.includes(k));
                    }).slice(0, 10);

                    if (validNews.length > 0) {
                        setNews(validNews);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch news, keeping fallback", error);
            }
        };

        fetchNews();
    }, []);

    const handleNewsClick = (item: NewsItem) => {
        setSelectedNews(item);
    };

    const closeModal = () => {
        setSelectedNews(null);
    };

    return (
        <section className="py-32 bg-white text-slate-900 relative overflow-hidden flex flex-col justify-center border-t border-slate-100">
            {/* Header */}
            <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 mb-12 flex justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2">Technical News</h3>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div
                className="w-full relative z-10 flex cursor-pointer group"
            >
                <style jsx global>{`
                    @keyframes marquee-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: marquee-scroll 80s linear infinite;
                    }
                `}</style>

                {/* We create a track that moves */}
                <div
                    className="flex gap-16 md:gap-32 px-4 animate-marquee"
                    style={{
                        minWidth: "max-content",
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {/* Original List */}
                    {news.map((item, idx) => {
                        const dateStr = new Date(item.datetime * 1000).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        });

                        return (
                            <div
                                key={`${item.id}-${idx}`}
                                className="w-[300px] md:w-[600px] flex-shrink-0 flex flex-col justify-start"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
                                <span className="text-sm font-semibold text-slate-500 mb-4 tracking-wide block">
                                    {dateStr}
                                </span>
                                <button
                                    onClick={() => handleNewsClick(item)}
                                    className="group/link block text-left"
                                >
                                    <h2 className="text-xl md:text-5xl font-bold leading-tight text-slate-900 hover:text-blue-600 transition-colors">
                                        {item.headline}
                                    </h2>
                                </button>
                            </div>
                        );
                    })}

                    {/* Duplicate List for Seamless Loop */}
                    {news.map((item, idx) => {
                        const dateStr = new Date(item.datetime * 1000).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        });

                        return (
                            <div
                                key={`${item.id}-dup-${idx}`}
                                className="w-[300px] md:w-[600px] flex-shrink-0 flex flex-col justify-start"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
                                <span className="text-sm font-semibold text-slate-500 mb-4 tracking-wide block">
                                    {dateStr}
                                </span>
                                <button
                                    onClick={() => handleNewsClick(item)}
                                    className="group/link block text-left"
                                >
                                    <h2 className="text-xl md:text-5xl font-bold leading-tight text-slate-900 hover:text-blue-600 transition-colors">
                                        {item.headline}
                                    </h2>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* News Modal */}
            <AnimatePresence>
                {selectedNews && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="p-8 md:p-12">
                                {/* Category Badge */}
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-4">
                                    {selectedNews.category}
                                </span>

                                {/* Headline */}
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                    {selectedNews.headline}
                                </h2>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(selectedNews.datetime * 1000).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300" />
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        <span>{selectedNews.source}</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    {selectedNews.summary}
                                </p>

                                {/* Read More Link */}
                                {selectedNews.url && selectedNews.url !== "#" && (
                                    <a
                                        href={selectedNews.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:gap-3"
                                    >
                                        <span>Read Full Article</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
