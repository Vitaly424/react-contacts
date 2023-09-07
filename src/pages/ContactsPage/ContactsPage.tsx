import { Alert, Button, CircularProgress, IconButton, List, ListItem, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import _debounce from 'lodash.debounce';
import cls from './ContactsPage.module.scss';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getUserSelectors } from 'store/User'
import { $api } from "api/api";
import { USER_LOCALSTORAGE_KEY } from "const/localStorage";
import { ListItemComponent } from "components/ListItem/ListItem";

export interface IContacts {
    id: number;
    name: string;
}

const ContactsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(getUserSelectors.authData);
    const [contacts, setContacts] = useState<IContacts[]>([]);
    const [valueContacts, setValueContacts] = useState('');
    const [search, setSearch] = useState('');

    if (!user) {
        return <Navigate to={'/'} />
    }

    const fetchGetContacts = async (search?: string) => {
        try {
            setIsLoading(true);
            let searchValue = search ? `?q=${search}` : '';
            const { data } = await $api.get<IContacts[]>(`/contacts${searchValue}`);
            setContacts(data);
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGetContacts();
    }, [])

    const makeRequest = useMemo(() => _debounce((search: string) => {
        fetchGetContacts(search)
    }, 300), [])

    const onAddContacts = async () => {
        if (valueContacts.length) {
            try {
                setIsLoading(true);
                const { data } = await $api.post<IContacts>('/contacts', {
                    id: Math.random(),
                    name: valueContacts
                });

                setContacts(prev => {
                    return [
                        ...prev,
                        data
                    ]
                })
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }

            setValueContacts('')
        } else {
            alert('Поле контактов не может быть пустым')
        }
    }

    const onDeleteContact = async (id: number) => {
        try {
            setIsLoading(true);
            await $api.delete(`/contacts/${id}`);
            const newContacts = contacts.filter(contact => contact.id !== id);
            setContacts(newContacts)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }

        setValueContacts('')
    }

    const onEditContact = async (name: string, id: number) => {
        try {
            await $api.put(`/contacts/${id}`, { name });
            setContacts(prev => {
                const newContacts = contacts.map(item => {
                    if (item.id === id) {
                        return {
                            id,
                            name
                        }
                    }

                    return item
                })

                return newContacts
            })
        } catch (err) {
            console.log(err);
        }
    }

    const onSearchContact = (value: string) => {
        makeRequest(value);
        setSearch(value);
    }


    return (
        <div className={cls.contacts}>
            <form className={cls.form}>
                <div>
                    <TextField
                        id="contacts"
                        sx={{ width: '100%', marginRight: '20px' }}
                        label="Добавить контакт"
                        variant="outlined"
                        value={valueContacts}
                        onChange={(e) => setValueContacts(e.target.value)}
                    />

                    <Button
                        sx={{ marginLeft: 'auto', display: 'flex', mt: 2 }}
                        variant="contained"
                        color="primary"
                        size="medium"
                        type="button"
                        onClick={onAddContacts}
                    >
                        Добавить контакт
                    </Button>
                </div>
                <div>
                    <TextField
                        id="contacts"
                        sx={{ width: '40%', mt: 2 }}
                        label="Поиск контакта"
                        variant="outlined"
                        value={search}
                        onChange={(e) => onSearchContact(e.target.value)}
                    />
                </div>
            </form>

            {isLoading ? <CircularProgress sx={{ display: 'flex', justifyContent: 'center' }}/> : <List dense sx={{
                width: '100%',
                maxWidth: '100%',
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '20px',
                bgcolor: 'background.paper',
                mt: 4
            }}>
                {
                    contacts.length ? contacts.map((contact) => {
                        return (
                            <ListItemComponent
                                key={contact.id}
                                onDeleteContact={onDeleteContact}
                                contact={contact}
                                onEditContact = {onEditContact}
                            />
                        );
                    }) : <h2 className={cls.emptyTitle}>Ничего не найдено, список контактов пуст</h2>
                }
            </List>}
        </div>
    )
}

export default ContactsPage;
