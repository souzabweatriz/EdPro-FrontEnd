"use client";
import { useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { Form, Input, Button, Alert } from "antd";
import { useRouter } from "next/navigation";

function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Cadastro</h1>
      {error && <Alert type="error" title={error} showIcon style={{ marginBottom: 16 }} />}
      {success && <Alert type="success" title={success} showIcon style={{ marginBottom: 16 }} />}
      <Form
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
      </Form>
    </div>
  );
}

export default SignupForm;
