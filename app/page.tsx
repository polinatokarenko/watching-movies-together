'use client';

import css from './page.module.css';

import { useState } from 'react';
 
import Modal from '@/components/Modal/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [isEnterViaCode, setIsEnterViaCode] = useState(false);

  const CreateRoomContent = {
    title: 'Create Room',
    subtitle: 'Set your name and create a room to watch movies and TV series together.',
    inputRequireSvg: '/images/sprite.svg#icon-svgInputRequire',
    inputSvg: '/images/sprite.svg#icon-personIcon',
    label: 'Your name',
    placeholder: 'Enter your name...',
    inputName: 'username',
    inputType: 'text',
    button: 'Create Room',
    buttonSvg: '/images/sprite.svg#icon-burgundyStars'
  }

  const EnterViaCodeContent = {
    title: 'Enter Room Code',
    subtitle: 'Join an existing room by entering its code.',
    placeholder: 'Enter room code...',
    inputName: 'roomCode',
    inputType: 'text',
    button: 'Join Room',
    buttonSvg: '/images/sprite.svg#icon-burgundyStars'
  }

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} {...(isCreateRoom ? CreateRoomContent : EnterViaCodeContent)} />
      )}
      <section className={css.container}>
        <h1 className={css.title}>YURIN</h1>
        <p className={css.subtitle}>Watch movies and TV series with friends from anywhere in the world.</p>
        <div className={css.actionsContainer}>
          <ul className={css.roomActionsList}>
            <li>
              <button className={`${css.roomActionButton} ${css.createRoomButton}`} onClick={() => {
                setIsModalOpen(true);
                setIsCreateRoom(true);
                setIsEnterViaCode(false);
              }}>
                <svg width={15} height={16}>
                  <use href="/images/sprite.svg#icon-svgCreateARoom"></use>
                </svg>
                <span>Create room</span>
              </button>
            </li>
            <li>
              <button className={`${css.roomActionButton} ${css.enterViaCodeButton}`} onClick={() => {
                setIsModalOpen(true);
                setIsCreateRoom(false);
                setIsEnterViaCode(true);
              }}>
                <svg width={30} height={27}>
                  <use href="/images/sprite.svg#icon-svgEnterViaCode"></use>
                </svg>
                <span>Enter via code</span>
              </button>
            </li>
          </ul>
          <div className={css.divider}>
            <span>or</span>
          </div>
          <button className={css.logInSignUpButton}>
            <span>Log In / Sign Up</span>
          </button>
        </div>
        <p className={css.copyright}>© YURIN 2026</p>
      </section>
    </>
  )
}
