'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import styles from "./page.module.css"
import { Form, Input, Button, message, Alert } from 'antd';

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function LoginPage(){
    const router = useRouter();
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const onFinish = async (values) =>{
        setErro(null);
        setCarregando(true);
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, values, { headers: HEADERS });
        sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
        message.success('Login realizado com sucesso!');
        router.push('/home');
    } catch (error) {
        setErro(err.response?.data?.erro || 'Erro ao conectar com o servidor.');
        'Erro ao conectar com o servidor.'
    } finally {
        setCarregando(false);
    }
};


    return(
    <div className={styles.container}>
        <div className={styles.main}>
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
            label="Usuário"
            name="login"
            rules={[{ required: true, message: 'Digite seu usuário!' }]}>
            <Input size="large" placeholder="Digite seu usuário" />
          </Form.Item>
          
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Digite sua senha!' }]}>
            <Input.Password size="large" placeholder="Digite sua senha" />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              block 
              loading={carregando}>
              Entrar no Sistema
            </Button>
          </Form.Item>
          <Button
              type="dashed"
              htmlType="submit" 
              size="large"
              block 
              loading={carregando}>
              Administrador
          </Button>
        </Form>
        </div>
        <div className={styles.aside}>
          <h1 className={styles.title}>
            Autonomia para treinar, inteligência para crescer. 
          </h1>
        </div>
    </div>
    )
}