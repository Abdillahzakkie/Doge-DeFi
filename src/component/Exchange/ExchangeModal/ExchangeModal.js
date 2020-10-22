import React from 'react';
import ReactDom from 'react-dom';
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";
import { ErrorBoundary } from "../../ErrorBoundary";
import { ExchangeContainer } from "./exchangeModal.styled";

const modalRoot = document.getElementById('modal-root');

export const ExchangeModal = () => {
    const closeModal = () => {
        const modal = document.querySelector('#modal-root');
        modal.classList.add('modal-root-hide')
    }

    return ReactDom.createPortal(
        <ExchangeContainer className='grid exchange-modal'>
            <section className="grid header">
                <h2 >
                    Select a token <AiOutlineQuestionCircle className='icon' />
                </h2>
                <AiOutlineClose className='icon' onClick={closeModal} />
            </section>
            <form className="grid form-control">

            </form>
        </ExchangeContainer>,
        modalRoot
    )
}

export default ErrorBoundary(ExchangeModal)
