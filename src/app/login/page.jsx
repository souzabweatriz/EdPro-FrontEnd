"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, Card, Alert, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "@/lib/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./login.module.css";

const { Title, Paragraph } = Typography;

export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        setError("");

        try {
            const result = await login(values.email, values.password);

            if (result && result.success) {
                router.replace("/");
            } else {
                setError(result?.error || "Erro ao fazer login. Verifique suas credenciais.");
            }
        } catch (err) {
            console.error("Login unexpected error:", err);
            setError(err?.message || "Erro inesperado ao tentar logar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <Card className={styles.loginCard}>
                        <div className={styles.loginHeader}>
                            <div className={styles.logoSection}>
                                <UserOutlined className={styles.loginIcon} />
                                <Title level={2} className={styles.loginTitle}>
                                    Entrar no Portal
                                </Title>
                                <Paragraph className={styles.loginSubtitle}>
                                    Acesse sua conta para continuar seus estudos
                                </Paragraph>
                            </div>
                        </div>

                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                closable
                                style={{ marginBottom: 24 }}
                                onClose={() => setError("")}
                            />
                        )}

                        <Form
                            form={form}
                            name="login"
                            onFinish={onFinish}
                            size="large"
                            layout="vertical"
                            className={styles.loginForm}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Por favor, insira seu email!" },
                                    { type: "email", message: "Email inválido!" },
                                ]}>
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="seu.email@exemplo.com"
                                    className={styles.inputField}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Senha"
                                rules={[
                                    { required: true, message: "Por favor, insira sua senha!" },
                                    { min: 5, message: "Senha deve ter no mínimo 5 caracteres!" },
                                ]}>
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Digite sua senha"
                                    className={styles.inputField}
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    className={styles.loginButton}>
                                    {loading ? "Entrando..." : "Entrar"}
                                </Button>
                            </Form.Item>
                        </Form>

                        <Divider className={styles.divider}>ou</Divider>

                        <div className={styles.signupSection}>
                            <Paragraph className={styles.signupText}>
                                Ainda não tem uma conta?
                            </Paragraph>
                            <Link href="/signup" className={styles.signupLink}>
                                Criar conta gratuita
                            </Link>
                        </div>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}