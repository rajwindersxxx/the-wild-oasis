/* eslint-disable react/prop-types */
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import { useCreateGuest } from './useCreateGuest';
import Select from '../../ui/Select';
import { useCountries } from './useCountries';

function CreateGuestForm({ cabinToEdit = {}, onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const { countriesList, isLoading } = useCountries();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data)
    createGuest(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Email Address" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isCreating}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow label="National Id" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating}
          {...register('nationalID', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Select
          id="nationality"
          label="countryName"
          optionValue="countryName"
          isLoading={isLoading}
          disabled={isCreating}
          options={countriesList}
          placeHolder='Select a Country'
          {...register('nationality', {
            required: true,
          })}
        />
      </FormRow>
      <FormRow label="Country Code" error={errors?.countryCode?.message}>
        <Select
          id="countryCode"
          optionValue="countryCode"
          label="countryCode"
          isLoading={isLoading}
          disabled={isCreating}
          options={countriesList}
          placeHolder='Select a Country Code'
          {...register('countryCode', { required: true })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? 'Edit Guest' : 'Create new Guest'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
