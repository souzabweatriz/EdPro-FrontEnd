'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from "./page.module.css";
import { Form, Input, Button, message, Alert } from 'antd';
import Image from 'next/image';
import ButtonAdm from '../components/ButtonAdm/ButtonAdm.jsx';

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function LoginPage() {
  const router = useRouter();
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const onFinish = async (values) => {
    setErro(null);
    setCarregando(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        values,
        { headers: HEADERS }
      );
      sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
      message.success('Login realizado com sucesso!');
      router.push('/home');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  const handleClick = () => {
    router.push('/register');
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
          <p className={styles.text}>EdPro</p>
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
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Digite seu usuário!' }]}
          >
            <Input size="large" placeholder="Digite seu usuário" />
          </Form.Item>
          <Form.Item
            name="senha"
            rules={[{ required: true, message: 'Digite sua senha!' }]}
          >
            <Input.Password size="large" placeholder="Digite sua senha" />
          </Form.Item>
          <Form.Item>
            <Button
              type="normal"
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
          <ButtonAdm/>
        </div>
      </div>
      <div className={styles.aside}>
        <h1 className={styles.title}>
          ❝Autonomia para treinar, inteligência para crescer.❞
        </h1>
      </div>
    </div>
  );
}