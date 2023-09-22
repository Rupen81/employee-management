import { useQuery } from 'react-query'
import { externalGet } from './client';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

function Portfolio() {
    const [character, setCharacter] = useState(null);
    const { data, isFetching } = useQuery(["characters'"], () =>
        externalGet("https://api.gulmoharphotography.com/api/portfolio", "gulmoharphotography")
    );

    return (
        <>
            {isFetching ? <h1>...Wifi fass kar</h1> : (
                <>
                    <h1>
                        Gulmohar Photography
                    </h1>
                    <div className='portfolio-container'>
                        {
                            data?.data?.map((Character) => {
                                return (
                                    <div className="portfolio-item" style={{ filter: character && 'blur(10px)' }} onClick={() => setCharacter(Character)} >
                                        <img style={{ width: "100%", height: "100%" }} src={Character?.source} />
                                        <div className="bottom">
                                            <h2>{Character?.category?.name}</h2>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                    <Modal show={character} centered onHide={() => setCharacter(null)}>
                        <Modal.Header style={{ textTranform: "uppercase" }} closeButton>
                            <Modal.Title>{character?.category.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img style={{ width: "100%", height: "100%" }} src={character?.source} alt="Character Image" />
                        </Modal.Body>
                    </Modal>


                </>
            )
            }
        </>
    )
}

export default Portfolio;