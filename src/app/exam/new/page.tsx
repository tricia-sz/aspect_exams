'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function NewExamPage() {
  const router = useRouter();

  const [examName, setExamName] = useState('');
  const [medicalSpecialisty, setMedicalSpecialisty] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (examName.trim().length < 3) {
      return setMessage('O nome do exame deve ter pelo menos 3 caracteres.');
    }
    if (medicalSpecialisty.trim().length < 3) {
      return setMessage('A especialidade deve ter pelo menos 3 caracteres.');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examName,
          medicalSpecialisty,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Erro ao criar exame');
      } else {
        router.push('/exam');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro inesperado. Tente novamente.');
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-2xl shadow-accent-blue border-none">
      <h1 className="text-2xl font-bold mb-4">Novo Exame</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block mb-1 text-xl font-medium">Nome</Label>
          <Input
            type="text"
            className="w-full p-2 border-content-secondary rounded-md"
            placeholder="Ex: Hemograma Completo"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="block mb-1 text-xl font-medium">
            Especialidade
          </Label>
          <Input
            type="text"
            className="w-full p-2 border-content-secondary rounded-md"
            placeholder="Ex: Clínica Geral"
            value={medicalSpecialisty}
            onChange={(e) => setMedicalSpecialisty(e.target.value)}
            required
          />
        </div>

        <Button
          disabled={loading}
          className="w-sm mt-8 mb-4 flex justify-center text-xl items-center mx-auto bg-accent-primary text-white  rounded-md hover:bg-accent-blue disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Exame'}
        </Button>
      </form>
      {message && (
        <p className="mt-4 text-red-500 font-medium text-sm">{message}</p>
      )}
    </div>
  );
}
