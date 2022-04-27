import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Api from '../../api/Api';
import Header from '../../components/header/Header';

function Partner() {
    const { username } = useParams();
    const [partner, setPartner] = useState(null)

    const getPartner = () => Api(false).get(`/partner/public/${username}`)
        .then(res => {
            if (res.data.success === true) {
                setPartner(res.data.data)
            } else {
                console.log(res.data.message)
            }
        })

    useEffect(() => {
        getPartner()
    }, [])

    return (
        <div className='defaultPage'>
            <Header />
            {partner && <>
                <Image src={partner.photoUrl} className="partnerPhoto" />

                <p className='partnerFio'>{partner.fio}</p>

                <a href={`https://pay-sandbox.cloudtips.ru/p/${partner.externalLayoutId}`}
                    target='blank'
                    className="donateLink">
                    ПОДДЕРЖАТЬ
                </a>

                <div className='descriptionWrapper'>
                    <b><h3>О себе</h3></b>
                    <div className='description'>
                        {partner.description}
                    </div>
                </div>
            </>}

        </div>
    )
}

export default Partner