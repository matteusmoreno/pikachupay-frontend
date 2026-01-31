import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import { FaBolt, FaCode, FaGamepad } from 'react-icons/fa';

export default function Home() {
    return (
        <>
            <Header />

            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-spotlight" />
                <div className="container">
                    <h1>
                        PAGAMENTOS NA <br />
                        <span className="text-gradient">VELOCIDADE DA LUZ</span>
                    </h1>
                    <p>
                        A plataforma financeira completa para quem vive no digital.
                        Doações em live, pagamentos instantâneos e APIs para devs.
                    </p>
                    <div className="hero-btns">
                        <button className="btn-primary">Criar Conta Agora</button>
                        <button className="btn-secondary">Documentação</button>
                    </div>
                </div>
            </section>

            {/* BENTO GRID FEATURES */}
            <section className="bento-section">
                <div className="container">

                    <div className="section-header">
                        <span className="section-tag">NOSSOS PRODUTOS</span>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>Um ecossistema. Três mundos.</h2>
                    </div>

                    <div className="bento-grid">

                        {/* Card 1: User (Grande) */}
                        <div className="card col-span-2">
                            <div className="card-content">
                                <FaBolt size={40} color="var(--yellow-main)" style={{ marginBottom: '20px' }} />
                                <h3>Para Você</h3>
                                <p style={{ maxWidth: '400px' }}>
                                    Sua carteira digital definitiva. Esqueça aplicativos de banco lentos.
                                    Controle total em um painel Dark Mode intuitivo com analytics de gastos.
                                </p>
                            </div>
                            <div className="card-gradient" />
                        </div>

                        {/* Card 2: Streamer (Normal) */}
                        <div className="card">
                            <FaGamepad size={40} color="white" style={{ marginBottom: '20px' }} />
                            <h3>Streamers</h3>
                            <p>
                                LivePix integrado. Receba donations com TTS (Texto para fala) e alertas na tela sem delay.
                            </p>
                            <div className="card-gradient" />
                        </div>

                        {/* Card 3: Devs (Normal) */}
                        <div className="card">
                            <FaCode size={40} color="white" style={{ marginBottom: '20px' }} />
                            <h3>Developers</h3>
                            <p>
                                REST API documentada com Swagger. Webhooks seguros. SDKs Java e Node.js prontos.
                            </p>
                            <div className="card-gradient" />
                        </div>

                        {/* Card 4: Security (Grande) */}
                        <div className="card col-span-2">
                            <h3>Segurança nível Bancário</h3>
                            <p>
                                Criptografia ponta-a-ponta e conformidade total. Seus dados blindados.
                            </p>
                            <div className="card-gradient" />
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}