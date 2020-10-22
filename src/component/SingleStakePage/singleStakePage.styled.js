import styled from "styled-components";

export const SingleStakePageContainer = styled.div`
    .card-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2rem;
        width: 60%;
        max-width: 980px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .menu-item-one h4,
        .menu-item-one h3 {
            lne-height: 2;
        }
        .card-container {
            grid-template-columns: 1fr;
            max-width: 600px;
            grid-gap: 2rem 0;
        }
    }
    
    @media only screen and (max-width: 30em) {
        .card-container {
            grid-template-columns: 1fr;
            max-width: 350px;
        }
    }
`