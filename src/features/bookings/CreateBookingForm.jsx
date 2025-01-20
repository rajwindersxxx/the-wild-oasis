/* eslint-disable react/prop-types */
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import Select from '../../ui/Select';

import { useCabins } from '../cabins/useCabins';
import { useAllGuests } from '../guests/useAllGuests';
import Checkbox from '../../ui/Checkbox';
import Textarea from '../../ui/Textarea';
import Table from '../../ui/Table';
import CabinRow from '../cabins/CabinRow';
import CreateCabinDetail from '../../ui/CreateCabinDetail';
import { useGetFetchQuery } from '../../hooks/useGetFetchQuery';
import { useEffect, useState } from 'react';
import CreateGuestDetail from '../../ui/CreateGuestDetail';
function CreateBookingForm({ cabinToEdit = {}, onCloseModal }) {
  const [selectedCabin, setSelectedCabin] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState([]);
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isLoadingGuests, guests } = useAllGuests();
  const [cabinId, guestId] = watch(['cabinId', 'guestId']);

  const cabinData = useGetFetchQuery(['cabins']);
  const guestData = useGetFetchQuery(['guests']);
  const { errors } = formState;
  useEffect(() => {
    const selectedCabin = cabinData?.filter((data) => data.name === cabinId);
    setSelectedCabin(selectedCabin);
  }, [cabinId, cabinData]);

  useEffect(() => {
    const selectedGuest = guestData?.data.filter(
      (data) => data.id === Number(guestId)
    );
    setSelectedGuest(selectedGuest);
    console.log(selectedGuest);
  }, [guestId, guestData]);

  function onSubmit(data) {
    console.log(data);
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Start Date" error={errors?.starDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register('startDate', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label={'endDate'} error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register('endDate', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Select Cabin" error={errors?.cabinId?.message}>
        <Select
          id="cabinId"
          options={cabins}
          label="name"
          optionValue="name"
          isLoading={isLoadingCabins}
          {...register('cabinId', { required: true })}
        />
      </FormRow>
      <CreateCabinDetail cabins={selectedCabin} />
      <FormRow label="Select Guest" error={errors?.guestId?.message}>
        <Select
          id="guestId"
          options={guests}
          optionValue="id"
          label="fullName"
          isLoading={isLoadingGuests}
          {...register('guestId', { required: true })}
        />
      </FormRow>
      <CreateGuestDetail guests={selectedGuest} />
      <FormRow
        label="Breakfast included?"
        error={errors?.hasBreakfast?.message}
      >
        <Checkbox id="hasBreakfast" {...register('hasBreakfast')} />
      </FormRow>
      <FormRow label="Payment done?" error={errors?.isPaid?.message}>
        <Checkbox id="isPaid" {...register('isPaid')} />
      </FormRow>
      <FormRow
        label={'Description (optional)'}
        error={errors?.observation?.message}
      >
        <Textarea
          type="number"
          id="observation"
          defaultValue=""
          {...register('observation')}
        />
      </FormRow>
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? 'Edit Guest' : 'Create new Booking'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
