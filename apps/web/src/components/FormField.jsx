'use client';
import React from 'react';
import { useController } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const FormField = (props) => {
  const { field, fieldState } = useController(props);
  return (
    <Field data-invalid={Boolean(fieldState.error)}>
      <FieldLabel htmlFor={props.name}>
        {fieldState.error ? fieldState.error?.message : props.label}
      </FieldLabel>
      <Input {...field} id={props.name} type={props.type} placeholder={props.placeholder} />
      {props.description && <FieldDescription>{props.description}</FieldDescription>}
    </Field>
  );
};
export default FormField;
