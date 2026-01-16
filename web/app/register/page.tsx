'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { CREATE_USER } from '../graphql/queries'

const telephoneSchema = z.object({
  number: z.string().regex(/^\d{9}$/, 'Número deve ter 9 dígitos'),
  area_code: z.string().regex(/^\d{2}$/, 'DDD deve ter 2 dígitos'),
})

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  telephones: z.array(telephoneSchema).min(1, 'Adicione pelo menos um telefone'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [createUser, { loading }] = useMutation(CREATE_USER)
  const [telephones, setTelephones] = useState([{ number: '', area_code: '' }])
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      telephones: [{ number: '', area_code: '' }],
    },
  })

  const addTelephone = () => {
    const newTelephones = [...telephones, { number: '', area_code: '' }]
    setTelephones(newTelephones)
    setValue('telephones', newTelephones)
  }

  const removeTelephone = (index: number) => {
    if (telephones.length > 1) {
      const newTelephones = telephones.filter((_, i) => i !== index)
      setTelephones(newTelephones)
      setValue('telephones', newTelephones)
    }
  }

  const updateTelephone = (index: number, field: 'number' | 'area_code', value: string) => {
    const newTelephones = [...telephones]
    newTelephones[index][field] = value
    setTelephones(newTelephones)
    setValue('telephones', newTelephones)
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await createUser({
        variables: { 
          input: {
            ...data,
            telephones: data.telephones.map(t => ({
              ...t,
              number: parseInt(t.number),
              area_code: parseInt(t.area_code)
            }))
          }
        },
      })

      toast.success('Cadastro realizado com sucesso!')
      setTimeout(() => router.push('/login'), 1500)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cadastrar')
    }
  }

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
  <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
  </div>

  <div className="flex items-center justify-center px-6">
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Nice to see you again
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors`}
                  placeholder="Seu nome"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Telefones
                  </label>
                  <button
                    type="button"
                    onClick={addTelephone}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Adicionar telefone
                  </button>
                </div>
                
                {telephones.map((phone, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={phone.area_code}
                        onChange={(e) => updateTelephone(index, 'area_code', e.target.value)}
                        placeholder="DDD"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                        maxLength={2}
                      />
                    </div>
                    <div className="flex-2">
                      <input
                        type="text"
                        value={phone.number}
                        onChange={(e) => updateTelephone(index, 'number', e.target.value)}
                        placeholder="Número"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                        maxLength={9}
                      />
                    </div>
                    {telephones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTelephone(index)}
                        className="px-4 text-red-600 hover:text-red-800"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                {errors.telephones && (
                  <p className="mt-1 text-sm text-red-600">{errors.telephones.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>

      <p className="mt-6 text-sm text-center">
        have an account?
        <a href="/login" className="text-indigo-600 ml-1">Sign up</a>
      </p>
    </div>
  </div>
</div>
    </>
  )
}