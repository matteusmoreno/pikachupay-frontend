import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/pikachu-pay-logo-1.png';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Efeito de Scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Trava o scroll da página quando o menu mobile está aberto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className={`header-wrapper ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-content">

                    {/* 1. LOGO */}
                    <div className="brand" onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" className="brand-icon" />
                        <div className="brand-text">PIKACHU<span>PAY</span></div>
                    </div>

                    {/* 2. MENU DESKTOP */}
                    <nav className="nav-links">
                        <a href="#features" className="link-item">Soluções</a>
                        <a href="#streamers" className="link-item">Para Streamers</a>
                        <a href="#devs" className="link-item">API</a>
                        <a href="#pricing" className="link-item">Preços</a>
                    </nav>

                    {/* 3. BOTÕES DESKTOP */}
                    <div className="cta-group">
                        <button className="btn-text" onClick={() => navigate('/login')}>
                            Entrar
                        </button>
                        <button className="btn-primary" onClick={() => navigate('/register')}>
                            Criar Conta
                        </button>
                    </div>

                    {/* 4. BOTÃO MOBILE */}
                    <button className="menu-toggle" onClick={toggleMenu}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>

            {/* 5. MENU MOBILE OVERLAY */}
            <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`}>
                <a href="#features" className="mobile-link" onClick={closeMenu}>Soluções</a>
                <a href="#streamers" className="mobile-link" onClick={closeMenu}>Streamers</a>
                <a href="#devs" className="mobile-link" onClick={closeMenu}>API & Docs</a>
                <a href="#pricing" className="mobile-link" onClick={closeMenu}>Preços</a>

                <div style={{ marginTop: '40px', display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
                    <button
                        className="btn-text"
                        style={{ fontSize: '1.2rem', color: 'white' }}
                        onClick={() => { navigate('/login'); closeMenu(); }}
                    >
                        Fazer Login
                    </button>
                    <button
                        className="btn-primary"
                        style={{ padding: '15px 40px', fontSize: '1.1rem' }}
                        onClick={() => { navigate('/register'); closeMenu(); }}
                    >
                        Começar Agora
                    </button>
                </div>
            </div>
        </>
    );
}