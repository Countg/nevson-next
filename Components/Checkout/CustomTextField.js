import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

export default function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        defaultValue=''
        render={({ field: { onChange } }) => (
          <TextField
            fullWidth
            label={label}
            onChange={onChange}
            required={required}
          />
        )}
      />
    </Grid>
  );
}
