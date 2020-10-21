import styled from 'styled-components';

export const HomeContainer = styled.div`
    .sushiChef {
        place-items: center;
        width: 100%;
        padding: 2rem 0;

        .logo {
            background: var(--mainWhite);
            width: 200px;
            height: 200px;
            margin: 0 auto 1rem;

            img {
                width: 100%;
                height: 100%
            }
        }

        h1 {
            font-family: "Kaushan Script", sans-serif;
            color: rgb(91, 57, 38);
            font-weight: 700;
            font-style: italic;
            line-height: 1.25;
            text-align: center;
            padding: 0 .5rem;
        }
        h3 {
            color: var(--lightGrey);
            font-size: 18px;
            font-weight: 400;
            text-align: center;
        }
    }

    .container {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-template-rows: 150px;
        grid-gap: 1rem;
        width: 60%;
        place-items: center;
        margin: 0 auto 5rem;

        section {
            grid-template-columns: repeat(12, 1fr);
            width: 100%;
            height: 100%;
            background: rgb(240, 233, 231);
            padding: 1rem;
            box-shadow: 5px 5px 5px var(--lightGrey);
            border-radius: .75rem;
            box-shadow: 10px 5px 20px var(--lightGrey);
        }

        .section-icon {
            
            span {
                grid-column: 1/2;
                grid-row: 1;
                font-size: 2rem;
            }
            .token {
                grid-column: 3/13;
                grid-row: 1;
                margin: 0 auto;
                width: 100%;

                p { color: var(--lightGrey) }
                h3 { 
                    font-weight: 900;
                    letter-spacing: var(--mainSpacing);
                }
            }
            .result {
                grid-column: 1/13;
                grid-row: 2;
                grid-template-columns: repeat(2, 1fr);
                width: 100%;
                margin: auto 0;
                padding: 1rem 0 0;
                border-top: 1.5px solid var(--lightGrey);
                color: var(--lightGrey);
                text-transform: capitalize;

                #right {
                    place-self: end;
                    text-transform: uppercase;
                }
            }
        }
    }

    @media (max-width: 767px) {
        .container { width: 90%; }
    }
`