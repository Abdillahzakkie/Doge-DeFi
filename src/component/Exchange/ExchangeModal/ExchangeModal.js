import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";
import { ErrorBoundary } from "../../ErrorBoundary";
import { ExchangeContainer } from "./exchangeModal.styled";
import '../Exchange.css';
import fetchModalData from '../../../utils/fetchModalData';

const modalRoot = document.getElementById('modal-root');

export const ExchangeModal = () => {
    const [modalData, setModalData] = useState(null);
    
    const fetchData = async () => {
        const { tokens } = await fetchModalData();
        setModalData(tokens)
    }
  
    useEffect(() => {
        if (!modalData) fetchData();
    }, [modalData]);
    
    const closeModal = () => {
        const modal = document.querySelector('#modal-root');
        modal.classList.add('modal-root-hide')
    }
 
    const renderTokens = () => {
        const tokens = modalData && modalData.sort();
        return (
            <div style={{margin: "2rem 0", overflowY: 'scroll', height: '100px'}}>
                {
                    tokens.map((token, index) => {
                        return (
                            <div className="flex small-mr coins" key={index}>
                                <div className="flex">
                                    <img alt="" src={token.logoURI}
                                    height="30px"
                                    width="30px"
                                    style={{marginRight: "1rem"}}    
                                    ></img>
                                    <p className="mr">{token.symbol}</p>
                                </div>
                                <div>-</div>
                            </div> 
                        )
                    })
                }
            </div>
        )
    
    }

    return ReactDom.createPortal(
        <ExchangeContainer className='grid exchange-modal'>
            <section className="grid header small-mr">
                <h2>
                    <span style={{whiteSpace: 'nowrap', fontSize:"1.4rem", marginRight:"1rem"}}>Select a token</span>
                    <AiOutlineQuestionCircle className='icon' />
                </h2>
                <AiOutlineClose className='icon' onClick={closeModal} />
            </section>
            <div>
            <form className="grid form-control">
                <input 
                    type="text" 
                    placeholder="tokenSearchPlaceholder" 
                    className="mode" 
                />
                <div className="tokens small-mr">
                    <span>Token Name</span>
                    <span className="arrow">↓</span>
                </div>
                
                <div className="hr"></div>
                
                {modalData && modalData.length ? renderTokens(): null}
                
                <div className="hr"></div>
            </form>
                <div className="modal-footer">
                    <button>Having trouble finding a token?</button>
                </div>
            </div>
        </ExchangeContainer>,
        modalRoot
    )
}

export default ErrorBoundary(ExchangeModal)
