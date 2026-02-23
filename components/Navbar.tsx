"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Explore Projects" },
        { href: "/submit", label: "Submit Project" },
    ];

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(15, 15, 26, 0.85)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <nav
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 24px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                        }}
                    >
                        💻
                    </div>
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: "17px",
                            letterSpacing: "-0.02em",
                            color: "#e0e7ff",
                        }}
                    >
                        Open<span className="gradient-text">Codex</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                    className="desktop-nav"
                >
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 500,
                                textDecoration: "none",
                                color: pathname === href ? "#c4b5fd" : "#6b7280",
                                background:
                                    pathname === href
                                        ? "rgba(124, 58, 237, 0.12)"
                                        : "transparent",
                                border:
                                    pathname === href
                                        ? "1px solid rgba(124, 58, 237, 0.3)"
                                        : "1px solid transparent",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {label}
                        </Link>
                    ))}

                    <Link
                        href="/submit"
                        className="btn-primary"
                        style={{ marginLeft: "8px", textDecoration: "none" }}
                    >
                        + Submit Project
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        display: "none",
                        background: "none",
                        border: "none",
                        color: "#e0e7ff",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    className="mobile-menu-btn"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    style={{
                        padding: "16px 24px",
                        background: "rgba(15, 15, 26, 0.97)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "10px",
                                fontSize: "15px",
                                fontWeight: 500,
                                textDecoration: "none",
                                color: pathname === href ? "#c4b5fd" : "#9ca3af",
                                background:
                                    pathname === href
                                        ? "rgba(124, 58, 237, 0.12)"
                                        : "transparent",
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </header>
    );
}
