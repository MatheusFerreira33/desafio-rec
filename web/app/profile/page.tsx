'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import ProtectedRoute from '../components/ProtectedRoute'
import { GET_USER } from '../graphql/queries'

export default function ProfilePage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setUserId('1')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logout realizado com sucesso!')
    setTimeout(() => router.push('/login'), 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Erro ao carregar perfil</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  const user = data?.user

  return (
    <ProtectedRoute>
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Meu Perfil</h1>
                <p className="text-gray-600 mt-2">Gerencie suas informações</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Sair
                </button>
              </div>
            </div>

            {user && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="relative px-8 pb-8">
                  <div className="absolute -top-16 left-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-8">
                    <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                      Editar Perfil
                    </button>
                  </div>

                  <div className="pt-20">
                    <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <p className="text-gray-500 mt-2 text-sm">ID: {user.id}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Membro desde</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Última atualização</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(user.modified_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-lg font-semibold text-green-600">Ativo</p>
                    </div>
                  </div>

                  {user.telephones && user.telephones.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Telefones</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.telephones.map((phone: any, index: number) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-300"
                          >
                            <div className="flex items-center">
                              <div className="p-2 bg-indigo-100 rounded-lg">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <p className="font-medium text-gray-800">
                                  +{phone.area_code} {phone.number}
                                </p>
                                <p className="text-sm text-gray-600">Telefone {index + 1}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </ProtectedRoute>
  )
}