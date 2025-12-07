"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, Card, Alert, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "@/lib/AuthProvider";
import Image from "next/image";
import ButtonAdm from "../../components/ButtonAdm/ButtonAdm.jsx";
import styles from "./login.module.css";

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    const result = await login(values.email, values.password);

    if (result.success) {
      router.push("/");
    } else {
      setError(
        result.error || "Erro ao fazer login. Verifique suas credenciais."
      );
    }

    setLoading(false);
  };

  const handleClick = () => {
    router.push("/register");
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
        {error && (
          <Alert
            title="Erro ao fazer login"
            type="error"
            showIcon
            closable
            style={{ marginBottom: 24 }}
            onClose={() => setError("")}
          />
        )}
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Digite seu usuário!" }]}
          >
            <Input size="large" placeholder="Digite seu usuário" />
          </Form.Item>
          <Form.Item
            name="senha"
            rules={[{ required: true, message: "Digite sua senha!" }]}
          >
            <Input.Password size="large" placeholder="Digite sua senha" />
          </Form.Item>
          <Form.Item>
            <Button
              type="normal"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.button}>
          <p className={styles.subtitle}>Não possui uma conta?</p>
          <button className={styles.buttonRegister} onClick={handleClick}>
            Cadastre-se
          </button>
          <ButtonAdm />
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
