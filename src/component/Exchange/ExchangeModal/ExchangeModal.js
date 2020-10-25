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
    const [allTokens, setAllTokens] = useState(null);
    
    const fetchData = async () => {
        const { tokens } = await fetchModalData();
        setModalData(tokens)
    }
  
    useEffect(() => {
        if (!modalData) {
            fetchData();
        }
        
        if(modalData && modalData.length > 0) {
            const token = renderTokens();
            setAllTokens(token);
        }
        
    }, [modalData]);
    
    const closeModal = () => {
        const modal = document.querySelector('#modal-root');
        modal.classList.add('modal-root-hide')
    }
     
    const handleSearch = ({ target: { value }}) => {
        const filterData = renderTokens(value);
        setAllTokens(filterData);
    }
 
    const renderTokens = (searchToken="") => {
        let tokens = modalData && modalData.sort();
        
        if (!searchToken || searchToken.trim().length > 0) {
            tokens = tokens.filter(({symbol}) => (searchToken ? RegExp(`^${searchToken}`, "ig").test(symbol) : true))
        }
        
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
                    onChange={handleSearch}
                />
                <div className="tokens small-mr">
                    <span>Token Name</span>
                    <span className="arrow">↓</span>
                </div>
                
                <div className="hr"></div>
                
                {allTokens && Object.values(allTokens).length > 0 ? allTokens : null}
                
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
