import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                {/* Brand */}
                <div className="footer-brand">
                    <h3>OpenCodex</h3>
                    <p>
                        Connecting developers with meaningful open source projects. 
                        Empowering the community through collaboration and shared code.
                    </p>
                </div>

                {/* Navigation */}
                <nav>
                    <h4 className="footer-title">Explore</h4>
                    <ul className="footer-list">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">Browse Projects</Link></li>
                        <li><Link href="/submit">Submit Project</Link></li>
                        <li><Link href="/">Categories</Link></li>
                    </ul>
                </nav>

                {/* Resources */}
                <nav>
                    <h4 className="footer-title">Resources</h4>
                    <ul className="footer-list">
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/guidelines">Guidelines</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/changelog">Changelog</Link></li>
                    </ul>
                </nav>

                {/* Legal */}
                <nav>
                    <h4 className="footer-title">Legal</h4>
                    <ul className="footer-list">
                        <li><Link href="/terms">Terms of Service</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>

                {/* Social */}
                <div>
                    <h4 className="footer-title">Connect</h4>
                    <ul className="footer-list">
                        <li>
                            <a
                                href="https://github.com/felipecastillo-b"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://x.com/barraza_dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                𝕏 Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/felipe-castillo-barraza/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                © {new Date().getFullYear()} OpenCodex · Built with care by the community.
            </div>
        </footer>
    );
}