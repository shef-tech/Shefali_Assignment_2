import React, { useEffect, useState } from 'react';
import { Avatar, Card, Input, Modal, Spin } from 'antd';
import { MailOutlined, GlobalOutlined, PhoneOutlined, HeartOutlined, EditOutlined, DeleteOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import "../App.css"

const UserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilled, setIsFilled] = useState({});

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setIsLoading(false);
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleToggle = (isFilled, id) => {
        if (isFilled?.[id]) {
            setIsFilled(() => {
                return ({
                    ...isFilled,
                    [id]: false
                })
            })
        } else {
            setIsFilled(() => {
                return ({
                    ...isFilled,
                    [id]: true
                })
            })
        }
    };

    const handleDelete = (users, id) => {
        setUsers(() => {
            return users.filter(user => user.id !== id);
        })
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const generateAvatarUrl = (username) =>
        `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;

    return (
        <React.Fragment>
            {isLoading ? <Spin tip="Loading" size="large" className="loading">
                <div className="content" />
            </Spin> :
                <div className="grid">
                    {users.map((user) => (
                        <Card key={user.id} className='container card'>
                            <p>{<Avatar shape="square" size={200} src={generateAvatarUrl(user.username)} className="ant-card-cover img center-img" />}</p>
                            <h2>{user.name}</h2>
                            <p><MailOutlined className="text-margin" /> {user.email}</p>
                            <p><PhoneOutlined className="text-margin" /> {user.phone}</p>
                            <p><GlobalOutlined className="text-margin" /> {user.website}</p>
                            <div className="icons-separation">
                                {!isFilled?.[user.id] ? (<HeartOutlined style={{ fontSize: '20px', color: "red" }} className="icon-space" onClick={() => handleToggle(isFilled, user.id)} />)
                                    :
                                    (<HeartFilled style={{ fontSize: '20px', color: "red" }} className="icon-space" onClick={() => handleToggle(isFilled, user.id)} />)}
                                <EditOutlined style={{ fontSize: '20px' }} className="icon-space" onClick={showModal} />
                                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <label><span>*</span> Name: </label>
                                    <Input value={user.name} required />
                                    <label><span>&#42;</span> Email: </label>
                                    <Input value={user.email} required />
                                    <label><span>&#42;</span> Phone: </label>
                                    <Input value={user.phone} required />
                                    <label><span>&#42;</span> Website: </label>
                                    <Input value={user.website} required />
                                </Modal>
                                <DeleteOutlined style={{ fontSize: '20px' }} className="icon-space" onClick={() => handleDelete(users, user.id)} />
                            </div>
                        </Card>
                    ))}
                    <div>

                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default UserList;