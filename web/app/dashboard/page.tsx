'use client'

import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import ProtectedRoute from '../components/ProtectedRoute'
import UserCard from '../components/UserCard'
import SearchBar from '../components/SearchBar'
import { GET_USERS, SEARCH_USERS } from '../graphql/queries'

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<any[]>([])

  const { data: allUsersData, loading: allUsersLoading, error: allUsersError } = useQuery(GET_USERS)
  const [searchUsers, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_USERS)

  useEffect(() => {
    if (searchQuery) {
      searchUsers({ variables: { name: searchQuery } })
    } else if (allUsersData?.users) {
      setUsers(allUsersData.users)
    }
  }, [searchQuery, allUsersData])

  useEffect(() => {
    if (searchData?.searchUsers) {
      setUsers(searchData.searchUsers)
    }
  }, [searchData])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logout realizado com sucesso!')
    setTimeout(() => router.push('/login'), 1000)
  }

  if (allUsersError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Erro ao carregar usuários</p>
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

  return (
    <ProtectedRoute>
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-2">Gerencie seus usuários</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Olá, Admin</span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Users List */}
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Usuários'}
              </h2>
              <span className="text-gray-600">
                {users.length} {users.length === 1 ? 'usuário' : 'usuários'}
              </span>
            </div>

            {allUsersLoading || searchLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Carregando usuários...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 5.197a4 4 0 00-4-4m4 4a4 4 0 01-4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {searchQuery ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? 'Tente buscar por outro nome'
                    : 'Cadastre o primeiro usuário para começar'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 5.197a4 4 0 00-4-4m4 4a4 4 0 01-4-4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total de Usuários</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Online</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Hoje</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {new Date().toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  )
}