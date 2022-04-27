import React, { useEffect, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Api from '../../api/Api'
import Header from '../../components/header/Header'

function Admin() {

    const [partners, setPartners] = useState([])
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        username: "",
        fio: "",
        description: "",
        phoneNumber: ""
    })

    const loadPartners = () => {
        Api(false).get("/partner/public/all")
            .then(res => {
                if (res.data.success === true) {
                    setPartners(res.data.data)
                } else {
                    alert("Возникла ошибка. Перезагрузите страницу.")
                }
            })
    }

    const saveNewPartner = (evt) => {
        evt.preventDefault()
        Api(true).post("/partner/create", { ...form })
            .then(res => {
                if (res.data.success === true) {
                    var id = res.data.data.id
                    var formdata = new FormData()
                    var file = document.querySelector("#file")
                    formdata.append("file", file.files[0])
                    Api(true).post(`/partner/${id}/add-photo`, formdata, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }).then(res => {
                        if (res.data.success === true) {
                            window.location.reload()
                        } else {
                            alert(res.data.message)
                        }
                    })
                } else {
                    alert(res.data.message)
                }
            })
    }

    useEffect(() => {
        loadPartners();
    }, [])

    return (
        <div className='defaultPage'>
            <Header />
            <div className='adminBody'>
                <div className='listWithAdd'>
                    <p>Список партнеров</p>
                    <Button style={{ height: "38px" }} onClick={() => setShowForm(!showForm)}>Добавить</Button>
                </div>

                {showForm &&
                    <Form onSubmit={saveNewPartner} className='simpleForm' style={{ marginTop: "16px" }}>
                        <Form.Control value={form.username}
                            placeholder='username'
                            onChange={evt => setForm({ ...form, username: evt.target.value })} />
                        <Form.Control value={form.fio}
                            style={{ marginTop: "16px" }}
                            placeholder='ФИО'
                            onChange={evt => setForm({ ...form, fio: evt.target.value })} />
                        <Form.Control value={form.phoneNumber}
                            style={{ marginTop: "16px" }}
                            placeholder='Телефон +7...'
                            onChange={evt => setForm({ ...form, phoneNumber: evt.target.value })} />
                        <Form.Control id="file" type="file" style={{ marginTop: "16px" }} />
                        <Form.Control value={form.description}
                            as="textarea"
                            style={{ margin: "16px 0px" }}
                            placeholder='О себе'
                            onChange={evt => setForm({ ...form, description: evt.target.value })} />

                        <Button type="submit">Сохранить</Button>
                    </Form>
                }

                {partners.map(partner => <Link to={`/partner/${partner.username}`} className='partnerItem'>
                    <Image src={partner.photoUrl} className="partnerItemPhoto" />
                    <div>{partner.fio}</div>
                </Link>)}
            </div>
        </div>
    )
}

export default Admin