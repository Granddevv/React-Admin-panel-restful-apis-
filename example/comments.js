import React from 'react';
import { List, Filter, Edit, Create, DateField, ReferenceField, TextField, EditButton, DisabledInput, DateInput, LongTextInput, SelectObjectInput, ReferenceInput } from 'admin-on-rest/mui';

export CommentIcon from 'material-ui/svg-icons/communication/chat-bubble';

const CommentFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Post" source="post_id" reference="posts" allowEmpty>
            <SelectObjectInput property="title" />
        </ReferenceInput>
    </Filter>
);

export const CommentList = (props) => (
    <List title="All comments" {...props} filter={CommentFilter}>
        <TextField label="id" source="id" />
        <ReferenceField label="Post" source="post_id" reference="posts">
            <TextField source="title" />
        </ReferenceField>
        <DateField label="date" source="created_at" />
        <EditButton />
    </List>
);

export const CommentEdit = (props) => (
    <Edit {...props}>
        <DisabledInput label="id" source="id" />
        <ReferenceInput label="Post" source="post_id" reference="posts">
            <SelectObjectInput property="title" />
        </ReferenceInput>
        <DateInput label="date" source="created_at" />
        <LongTextInput label="body" source="body" />
    </Edit>
);

export const CommentCreate = (props) => (
    <Create {...props}>
        <ReferenceInput label="Post" source="post_id" reference="posts" allowEmpty>
            <SelectObjectInput property="title" />
        </ReferenceInput>
        <DateInput label="date" source="created_at" />
        <LongTextInput label="body" source="body" />
    </Create>
);
