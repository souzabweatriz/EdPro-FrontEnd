'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthProvider';
import styles from "./login.module.css";
import { Form, Input, Button, Alert } from 'antd';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [form] = Form.useForm();
  const [displayedText, setDisplayedText] = useState('');
  
  const fullText = '“Autonomia para treinar, inteligência para crescer”.';

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
    setErro(null);
    setCarregando(true);
    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        router.push('/Studentcourses');
      } else {
        setErro(result.error);
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  const handleClick = () => {
    router.push('/signup');
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
          <p className={styles.text2}>EdPro</p>
        </div>
        <div className={styles.welcome}>
          <h1 className={styles.title1}>Olá, Bem-vindo ao EdPro</h1>
          <p className={styles.subtitle}>Faça seu login para continuar</p>
        </div>
        {erro && (
          <Alert
            message="Erro ao fazer login"
            description={erro}
            type="error"
            closable
            onClose={() => setErro(null)}
            style={{ marginBottom: '20px' }}
          />
        )}
        <Form name="login" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Digite seu email!' },
              { type: 'email', message: 'Email inválido!' }
            ]}
          >
            <Input size="large" placeholder="Digite seu email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Digite sua senha!' }]}
          >
            <Input.Password size="large" placeholder="Digite sua senha" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={carregando}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.button}>
          <p className={styles.subtitle}>
            Não possui uma conta?
          </p>
          <button
            className={styles.buttonRegister}
            onClick={handleClick}
          >
            Cadastre-se
          </button>
        </div>
      </div>
      <div className={styles.aside}>
        <p className={styles.text}>{displayedText}</p>
      </div>
    </div>
  );
}