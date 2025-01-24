/* eslint-disable react/prop-types */
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import { useCreateGuest } from './useCreateGuest';
import Select from '../../ui/Select';
import { useCountries } from './useCountries';
import { useUpdateGuest } from './useUpdateGuest';
import toast from 'react-hot-toast';

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);
  const { createGuest, isCreating } = useCreateGuest();
  const { updateGuest, isUpdating } = useUpdateGuest();
  const { countriesList, isLoading } = useCountries();
  const isWorking = isUpdating || isCreating;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const selectedCountryLabel = document
      .querySelector('#countryCode')
      .selectedOptions[0].text.slice(0, -5);
    const finalData = { ...data, nationality: selectedCountryLabel };
    delete data.bookings;

    if (isEditSession)
      updateGuest(
        {
          newGuestData: {
            ...finalData,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            toast.success('Guest Details updated successfully');
          },
        }
      );
    else
      createGuest(finalData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
          toast.success('Guest Created successfully');
        },
      });
  }
  function onError() {
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
          disabled={isWorking}
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Email Address" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register('nationalID', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.countryCode?.message}>
        <Select
          id="countryCode"
          label="countryName"
          optionValue="countryCode"
          detail="countryCode"
          isLoading={isLoading}
          disabled={isWorking}
          options={countriesList}
          placeHolder="Select a Country"
          {...register('countryCode', {
            required: true,
          })}
        />
      </FormRow>
      {/* <FormRow label="Country Code" error={errors?.countryCode?.message}>
        <Select
          id="countryCode"
          optionValue="countryCode"
          label="countryCode"
          isLoading={isLoading}
          disabled={isWorking}
          options={countriesList}
          placeHolder="Select a Country Code"
          {...register('countryCode', { required: true })}
        />
      </FormRow> */}
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Guest' : 'Create new Guest'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
