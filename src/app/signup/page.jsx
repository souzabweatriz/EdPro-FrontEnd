"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { Form, Input, Button, Alert } from "antd";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";
import Image from "next/image";

function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Evolua hoje. O futuro começa com o conhecimento que você escolhe.";


  const handleClick = () => {
    router.push('/login');
  };

  useEffect(() => {
    const words = fullText.split(' ');
    let currentWord = 0;
    let currentText = '';

    const interval = setInterval(() => {
      if (currentWord < words.length) {
        currentText += (currentText ? ' ' : '') + words[currentWord];
        setDisplayedText(currentText);
        currentWord++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await signup(values.name, values.email, values.password);
    setLoading(false);
    if (res.success) {
      setSuccess("Cadastro realizado! Redirecionando para login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(res.error || "Erro ao cadastrar");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <Image
            src="/images/Logo.png"
            alt="Logo EdPro"
            width={100}
            height={150}
          />
          <div className={styles.line}></div>
          <p className={styles.text1}>EdPro</p>
        </div>
        <div className={styles.welcome}>
          <h1 className={styles.title1}>Olá, Bem-vindo ao EdPro</h1>
          <p className={styles.subtitle}>Cadastre-se para continuar</p>
        </div>
        {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
        {success && <Alert type="success" message={success} showIcon style={{ marginBottom: 16 }} />}
        <Form
          className={styles.form}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              { required: true, message: "Informe seu nome" },
              { min: 2, message: "Nome deve ter pelo menos 2 caracteres" }
            ]}
          >
            <Input placeholder="Seu nome completo" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Informe um email" },
              { type: "email", message: "Email inválido" }
            ]}
          >
            <Input placeholder="seu@email.com" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Informe uma senha" },
              { min: 5, message: "Senha deve ter pelo menos 5 caracteres" }
            ]}
          >
            <Input.Password placeholder="Mínimo 5 caracteres" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Cadastrar
            </Button>
          </Form.Item>
      <div className={styles.button}>
        <p className={styles.subtitle}>
          Já possui uma conta? <span>Entre Aqui</span>
        </p>
        <button
          className={styles.buttonRegister}
          onClick={handleClick}
        >
          Login
        </button>
      </div>
        </Form>
      </div>
      <div className={styles.aside}>
        <p className={styles.text}>{displayedText}</p>
      </div>
    </div>
  );
}

export default SignupForm;
