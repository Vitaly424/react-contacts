import { CircularProgress, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { ListItem } from "@mui/material";
import { IContacts } from "pages/ContactsPage/ContactsPage";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import cls from './ListItem.module.scss';


interface ListItemComponentProps {
    contact: IContacts;
    onDeleteContact: (id: number) => void;
    onEditContact: (name: string, id: number) => void;
}

export const ListItemComponent = (props: ListItemComponentProps) => {
    const { contact, onDeleteContact, onEditContact } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [inputEditValue, setInputEditValue] = useState(contact.name);
    const [isEdit, setIsEdit] = useState(false);

    const onClickEditContact = async () => {
        if (inputEditValue.length) {
            setIsLoading(true)
            await onEditContact(inputEditValue, contact.id);
            setIsEdit(!isEdit);
            setIsLoading(false)
        } else {
            alert('Поле контактов не может быть пустым')
        }
    }

    return <>
        <ListItem
            sx={{
                width: '100%',
                padding: '20px',
                height: '100px',
                bgcolor: '#e9e1e1',
                borderRadius: '30px',
                mb: 2
            }}
            disablePadding
        >
            <div className={cls.contact}>
                {isEdit ? <TextField
                    id="contacts"
                    sx={{ width: '40%', marginRight: '20px' }}
                    label={`Редактировать контакт`}
                    variant="outlined"
                    value={inputEditValue}
                    onChange={(e) => setInputEditValue(e.target.value)}
                /> : <p className={cls.name}>{contact.name}</p>}

                <div className={cls.control}>
                    {isLoading ? <CircularProgress /> : null}
                    {isEdit && <IconButton onClick={() => onClickEditContact()} aria-label='edit' size="small">
                        <BeenhereIcon htmlColor={'green'} fontSize="large" />
                    </IconButton>}
                    {!isEdit && <IconButton onClick={() => setIsEdit(!isEdit)} aria-label='edit' size="small">
                        <EditIcon htmlColor={'blue'} fontSize="large" />
                    </IconButton>}
                    <IconButton onClick={() => onDeleteContact(contact.id)} aria-label="delete" size="small">
                        <DeleteIcon htmlColor={'red'} fontSize="large" />
                    </IconButton>
                </div>
            </div>
        </ListItem>
    </>
}
