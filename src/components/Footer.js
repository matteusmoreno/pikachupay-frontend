import React from 'react';
import './Footer.css';
import { FaTwitter, FaInstagram, FaGithub, FaBolt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="container">

                <div className="footer-grid">
                    {/* Coluna 1: Marca */}
                    <div className="footer-brand">
                        <h2>PIKACHU<span style={{ color: 'var(--yellow-main)' }}>PAY</span></h2>
                        <p className="footer-desc">
                            Infraestrutura de pagamentos de alta performance para a próxima geração de criadores e desenvolvedores.
                        </p>
                    </div>

                    {/* Coluna 2 */}
                    <div className="footer-col">
                        <h4>Produto</h4>
                        <ul className="footer-links">
                            <li><a href="#">Carteira Digital</a></li>
                            <li><a href="#">LivePix para Streamers</a></li>
                            <li><a href="#">API Gateway</a></li>
                            <li><a href="#">Segurança</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3 */}
                    <div className="footer-col">
                        <h4>Empresa</h4>
                        <ul className="footer-links">
                            <li><a href="#">Sobre nós</a></li>
                            <li><a href="#">Carreiras</a></li>
                            <li><a href="#">Brand Kit</a></li>
                            <li><a href="#">Contato</a></li>
                        </ul>
                    </div>

                    {/* Coluna 4 */}
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#">Termos de Uso</a></li>
                            <li><a href="#">Privacidade</a></li>
                            <li><a href="#">Compliance</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>&copy; 2026 Pikachu Pay. Todos os direitos reservados.</span>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem' }}>
                        <FaTwitter style={{ cursor: 'pointer' }} />
                        <FaInstagram style={{ cursor: 'pointer' }} />
                        <FaGithub style={{ cursor: 'pointer' }} />
                    </div>
                </div>

            </div>
        </footer>
    );
}