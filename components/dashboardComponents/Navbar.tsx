'use client'

import React, { useState } from 'react'
import { MdMenu, MdContacts, MdCampaign } from 'react-icons/md'
import { useSidebar } from '../context/SidebarContext'
import Modal from './Modal'

const Navbar = () => {
  const { toggle } = useSidebar()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewContact = () => {
    setIsModalOpen(true)
  } 

  const handleNewCampaign = () => {
    console.log('Nueva Campaña')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700 h-14 flex-shrink-0 text-gray-200 shadow-md">
        <div className="h-full px-4 md:px-6 py-2 flex justify-between items-center">
          {/* Left section with menu button and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggle}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              <MdMenu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-100">
              Dashboard
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              className="px-3 md:px-4 py-1 text-white bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
              onClick={handleNewContact}
            >
              <MdContacts className="w-4 h-4" />
              <span className="hidden md:inline">Nuevos Contactos</span>
            </button>
            
            <button
              className="px-3 md:px-4 py-1 text-white bg-green-500 hover:bg-green-600 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
              onClick={handleNewCampaign}
            >
              <MdCampaign className="w-4 h-4" />
              <span className="hidden md:inline">Nueva Campaña</span>
            </button>
          </div>
        </div>
      </nav>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Nuevos Contactos"
      />
    </>
  )
}

export default Navbar