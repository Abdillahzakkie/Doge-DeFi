import styled from 'styled-components';

export const NavbarContainer = styled.div`
    grid-template-columns: repeat(12, 1fr);
    background-color: ${props => props.theme === 'dark' ? 'var(--darkGrey)' : 'var(--mainWhite)'};
    color: ${props => props.theme !== 'dark' ? 'var(--darkGrey)' : 'var(--white)'};
    border-bottom: ${props => props.theme !== 'dark' && '1px solid var(--darkGrey)'};
    width: 100vw;
    height: auto;
    padding: 1.5em 1rem;
    z-index: 1;

    & .nav-list ul a,
    & .toggle {
        color: ${props => props.theme === 'dark' && 'var(--white)'};
    }

    @media (max-width: 991px) {
        & { padding: 0; }
    }
`