import React from 'react'
import { FiUser, FiGlobe, FiPhone } from 'react-icons/fi'

interface Contact {
  PhoneNumber: string;
  UserLang: string;
}

const getContactos = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`)
  const data = await response.json()
  return data
}

const ContactosPage = async() => {
  const {contacts} = await getContactos()
  
  const getLanguageFlag = (lang: string) => {
    const langCode = lang.split('_')[0];
    switch(langCode) {
      case 'en': return '🇺🇸';
      case 'es': return '🇪🇸';
      case 'pt': return '🇧🇷';
      case 'fr': return '🇫🇷';
      case 'de': return '🇩🇪';
      default: return '🌐';
    }
  }
  
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Contactos
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          Total: {contacts?.length || 0}
        </div>
      </div>
      
      {(!contacts || contacts.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <FiUser className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No hay contactos</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Aún no hay contactos en la base de datos. Sube un archivo CSV para comenzar.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact: Contact, index: number) => (
              <li key={index} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-orange-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center text-gray-900 dark:text-white text-sm font-medium">
                      <FiPhone className="mr-2 text-gray-500 dark:text-gray-400" />
                      {formatPhoneNumber(contact.PhoneNumber)}
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <FiGlobe className="mr-2" />
                      <span className="mr-1">{getLanguageFlag(contact.UserLang)}</span>
                      {contact.UserLang}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ContactosPage