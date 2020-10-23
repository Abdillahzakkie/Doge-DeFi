import styled from 'styled-components';

export const NavbarContainer = styled.div`
    grid-template-columns: repeat(12, 1fr);
    width: 100%;
    height: auto;
    padding: 1.5em 1rem;
    z-index: 1;

    & .nav-list ul a {
        font-size: 1.5rem;
        margin-right: 3rem;
        font-weight: bold;
        color: rgb(91, 57, 38);
    }
    & .nav-list ul a,
    & .toggle {
        color: ${props => props.theme === 'dark' && 'var(--white)'};
    }

    @media (max-width: 991px) {
        & { padding: 0; }
    }
`