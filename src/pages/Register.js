import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser, FaGamepad, FaCode, FaArrowRight,
    FaCheck, FaSearch, FaBolt, FaWallet
} from 'react-icons/fa';
import { registerUser, loginUsuario, buscarEnderecoPorCep } from '../services/authService';
import { useToast } from '@chakra-ui/react';
import Header from '../components/Header'; // <--- IMPORTANDO O HEADER
import './Register.css';

const ROLE_DESCRIPTIONS = {
    USER: {
        title: "Sua Carteira Digital",
        description: "Gerencie seus gastos, faça pagamentos instantâneos e tenha controle total em um painel Dark Mode exclusivo.",
        icon: <FaWallet />
    },
    STREAMER: {
        title: "Para Criadores",
        description: "Conecte-se ao LivePix, receba donations com alertas na tela e tenha as menores taxas do mercado.",
        icon: <FaGamepad />
    },
    DEV: {
        title: "Para Desenvolvedores",
        description: "Acesse nossa API RESTful robusta, webhooks seguros e integre pagamentos ao seu app em minutos.",
        icon: <FaCode />
    }
};

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [step, setStep] = useState(1);
    const totalSteps = 5;
    const [isLoading, setIsLoading] = useState(false);
    const [isCepLoading, setIsCepLoading] = useState(false);

    const [formData, setFormData] = useState({
        accountType: 'USER',
        name: '',
        userName: '',
        cpf: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        password: '',
        confirmPassword: ''
    });

    // --- MÁSCARAS ---
    const maskPhone = (value) => {
        let r = value.replace(/\D/g, "");
        r = r.replace(/^0/, "");
        if (r.length > 10) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 5) {
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
        } else {
            r = r.replace(/^(\d*)/, "($1");
        }
        return r;
    };

    const maskCpf = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const maskCep = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === 'phoneNumber') finalValue = maskPhone(value);
        if (name === 'cpf') finalValue = maskCpf(value);
        if (name === 'cep') finalValue = maskCep(value);
        if (name === 'userName') finalValue = value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleCepBlur = async () => {
        const cleanCep = formData.cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) return;

        setIsCepLoading(true);
        const endereco = await buscarEnderecoPorCep(cleanCep);
        setIsCepLoading(false);

        if (endereco) {
            setFormData(prev => ({
                ...prev,
                street: endereco.logradouro,
                neighborhood: endereco.bairro,
                city: endereco.localidade,
                state: endereco.uf
            }));
        } else {
            toast({ title: "Preencha manualmente", status: "info", duration: 2000 });
        }
    };

    const nextStep = () => {
        if (step === 2 && (!formData.name || !formData.cpf || !formData.userName)) return toast({ title: "Preencha todos os campos", status: "warning" });
        if (step === 3 && (!formData.email || !formData.phoneNumber)) return toast({ title: "Preencha os contatos", status: "warning" });
        if (step === 4 && (!formData.street || !formData.number)) return toast({ title: "Endereço incompleto", status: "warning" });

        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            return toast({ title: "As senhas não coincidem", status: "error" });
        }
        if (formData.accountType !== 'USER') {
            return toast({ title: "Em breve", description: "Apenas contas de Usuário estão liberadas no momento.", status: "info" });
        }

        setIsLoading(true);
        try {
            const payload = {
                name: formData.name,
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
                address: {
                    cep: formData.cep.replace(/\D/g, ''),
                    street: formData.street,
                    neighborhood: formData.neighborhood,
                    city: formData.city,
                    state: formData.state,
                    number: formData.number,
                    complement: formData.complement
                }
            };

            await registerUser(payload);

            const loginData = await loginUsuario(formData.email, formData.password);
            if (loginData.token) {
                localStorage.setItem('pikachupay_token', loginData.token);
                navigate('/dashboard');
            }
        } catch (err) {
            let msg = "Erro ao criar conta";
            if (err.response?.data?.errors) {
                msg = err.response.data.errors.map(e => `${e.message}`).join('. ');
            } else if (err.response?.data?.message) {
                msg = err.response.data.message;
            }
            toast({ title: "Erro", description: msg, status: "error", duration: 5000 });
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="role-grid">
                        <div className={`role-card ${formData.accountType === 'USER' ? 'selected' : ''}`} onClick={() => { setFormData(prev => ({ ...prev, accountType: 'USER' })); nextStep(); }}>
                            <FaUser className="role-icon" />
                            <div className="role-info">
                                <h3>Usuário Padrão</h3>
                                <p>Para pagamentos e gestão financeira pessoal.</p>
                            </div>
                        </div>
                        <div className={`role-card ${formData.accountType === 'STREAMER' ? 'selected' : ''}`} onClick={() => { setFormData(prev => ({ ...prev, accountType: 'STREAMER' })); nextStep(); }}>
                            <FaGamepad className="role-icon" />
                            <div className="role-info">
                                <h3>Streamer</h3>
                                <p>Receba doações e integre com OBS/LivePix.</p>
                            </div>
                        </div>
                        <div className={`role-card ${formData.accountType === 'DEV' ? 'selected' : ''}`} onClick={() => { setFormData(prev => ({ ...prev, accountType: 'DEV' })); nextStep(); }}>
                            <FaCode className="role-icon" />
                            <div className="role-info">
                                <h3>Desenvolvedor</h3>
                                <p>Acesso a API e ferramentas de integração.</p>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <>
                        <div className="input-group">
                            <label>Nome Completo</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Ash Ketchum" autoFocus />
                        </div>
                        <div className="input-group">
                            <label>Nome de Usuário (@)</label>
                            <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="ash_master" />
                        </div>
                        <div className="input-group">
                            <label>CPF</label>
                            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" maxLength={14} />
                        </div>
                    </>
                );

            case 3:
                return (
                    <>
                        <div className="input-group">
                            <label>E-mail Principal</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" autoFocus />
                        </div>
                        <div className="input-group">
                            <label>Celular / WhatsApp</label>
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="(00) 90000-0000" maxLength={15} />
                        </div>
                    </>
                );

            case 4:
                return (
                    <>
                        <div className="input-group" style={{ position: 'relative' }}>
                            <label>CEP (Busca Automática)</label>
                            <input type="text" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} placeholder="00000-000" maxLength={9} autoFocus />
                            {isCepLoading && <FaSearch className="spinner" style={{ position: 'absolute', right: 15, top: 42, color: 'var(--primary)' }} />}
                        </div>

                        <div className="input-group">
                            <label>Rua</label>
                            <input type="text" name="street" value={formData.street} onChange={handleChange} />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label>Número</label>
                                <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="123" />
                            </div>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label>Complemento (Opcional)</label>
                                <input type="text" name="complement" value={formData.complement} onChange={handleChange} placeholder="Apto 101" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label>Bairro</label>
                                <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
                            </div>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label>Cidade</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} disabled />
                            </div>
                            <div className="input-group" style={{ flex: 0.5 }}>
                                <label>UF</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} disabled />
                            </div>
                        </div>
                    </>
                );

            case 5:
                return (
                    <>
                        <div className="input-group">
                            <label>Crie uma Senha</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" autoFocus />
                        </div>
                        <div className="input-group">
                            <label>Confirme a Senha</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="********" />
                        </div>
                    </>
                );
            default: return null;
        }
    };

    const currentRoleInfo = ROLE_DESCRIPTIONS[formData.accountType];

    return (
        <>
            {/* HEADER ADICIONADO AQUI */}
            <Header />

            <div className="register-container">

                {/* LADO ESQUERDO */}
                <div className="register-visual">
                    <div className="visual-glow" />
                    <div className="visual-content" key={formData.accountType}>
                        <div className="visual-icon-large">
                            {currentRoleInfo.icon}
                        </div>
                        <h2>{currentRoleInfo.title}</h2>
                        <p style={{ marginTop: '20px', marginBottom: '30px' }}>
                            {currentRoleInfo.description}
                        </p>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#888' }}>
                            <span><FaCheck color="var(--primary)" /> Seguro</span>
                            <span><FaCheck color="var(--primary)" /> Rápido</span>
                            <span><FaCheck color="var(--primary)" /> 24/7</span>
                        </div>
                    </div>
                </div>

                {/* LADO DIREITO: FORMULÁRIO */}
                <div className="register-form-wrapper">
                    <div className="register-card">

                        <div className="form-header">

                            {/* BOTÃO CANCELAR REMOVIDO DAQUI */}

                            <div className="progress-container">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <div key={s} className={`progress-step ${s <= step ? 'active' : ''}`} />
                                ))}
                            </div>

                            <h1>
                                {step === 1 && "Escolha seu perfil"}
                                {step === 2 && "Identificação"}
                                {step === 3 && "Seus Contatos"}
                                {step === 4 && "Endereço"}
                                {step === 5 && "Segurança"}
                            </h1>
                            <p>Passo {step} de {totalSteps}</p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {renderStepContent()}

                            <div className="wizard-actions">
                                {step > 1 && (
                                    <button type="button" className="btn-back" onClick={prevStep}>
                                        Voltar
                                    </button>
                                )}

                                {step < totalSteps ? (
                                    step > 1 && (
                                        <button type="button" className="btn-next" onClick={nextStep}>
                                            Continuar <FaArrowRight style={{ marginLeft: 8, fontSize: '0.8rem' }} />
                                        </button>
                                    )
                                ) : (
                                    <button type="button" className="btn-next" onClick={handleSubmit} disabled={isLoading}>
                                        {isLoading ? <FaBolt className="spinner" /> : "FINALIZAR CADASTRO"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;