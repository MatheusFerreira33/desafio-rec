'use client'

import { User } from '../graphql/generated/types'

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">ID: {user.id}</p>
          <p className="text-xs text-gray-400">
            Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      
      {user.telephones && user.telephones.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Telefones:</h4>
          <div className="flex flex-wrap gap-2">
            {user.telephones.map((phone, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                +{phone.area_code} {phone.number}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Última atualização: {new Date(user.modified_at).toLocaleDateString('pt-BR')}
        </span>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Ver detalhes
        </button>
      </div>
    </div>
  )
}