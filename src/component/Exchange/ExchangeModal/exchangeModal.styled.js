import styled from "styled-components";

export const ExchangeContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 5rem auto 0;
    background: rgb(33, 36, 41);
    padding: 2rem;
    border-radius: 2rem;

    .header {
        grid-template-columns: repeat(2, 1fr);
        font-size: 1.5rem;
        height: 40px;

        .icon {
            margin: auto 0;
            place-self: end;
            font-size: 2rem;
            cursor: pointer;
        }
        h2 .icon {
            margin-top: 3px;
            backgroud: red;
        }
    }

`