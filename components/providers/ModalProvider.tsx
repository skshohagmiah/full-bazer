'use client';
import React from 'react'
import SignInModal from '../modals/SignInModal';
import SignUpModal from '../modals/SignUpModal';

const ModalProvider = () => {
  return (
    <div>
        <SignInModal />
        <SignUpModal />
    </div>
  )
}

export default ModalProvider