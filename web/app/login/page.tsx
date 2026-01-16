'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { LOGIN } from '../graphql/queries'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [login, { loading }] = useMutation(LOGIN)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        variables: { input: data },
      })

      if (response.data?.login?.token) {
        localStorage.setItem('token', response.data.login.token)
        toast.success('Login realizado com sucesso!')
        setTimeout(() => router.push('/dashboard'), 1000)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login')
    }
  }

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
  
  {/* LADO ESQUERDO - VISUAL */}
  <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
    {/* opcional: ilustração ou vazio */}
  </div>

  {/* LADO DIREITO - FORM */}
  <div className="flex items-center justify-center px-6">
    <div className="w-full max-w-sm">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Nice to see you again
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          type="email"
          placeholder="Email or phone number"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <a className="text-indigo-600 hover:underline">Forgot password?</a>
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
          Sign in
        </button>
      </form>

      <p className="mt-6 text-sm text-center">
        Don’t have an account?
        <a href="/register" className="text-indigo-600 ml-1">Sign up</a>
      </p>
    </div>
  </div>
</div>

    </>
  )
}