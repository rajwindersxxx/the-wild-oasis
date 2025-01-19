/* eslint-disable react/prop-types */
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import Select from '../../ui/Select';
import { useBooking } from './useBooking';
import { useBookings } from './useBookings';
import { useCabins } from '../cabins/useCabins';
import { useGuests } from '../guests/useGuests';
import { useAllGuests } from '../guests/useAllGuests';
import Checkbox from '../../ui/Checkbox';
import Textarea from '../../ui/Textarea';

function CreateBookingForm({ cabinToEdit = {}, onCloseModal }) {
  const {isLoading: isLoadingCabins  , cabins} = useCabins();
  const {isLoading: isLoadingGuest  , guests} = useAllGuests();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {}
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
        <FormRow
          label="Start Date"
          error={errors?.starDate?.message}
        >
          <Input
            type="date"
            id="startDate"
            {...register('startDate', {
              required: 'This field is required',
            })}
          />
        </FormRow>
        <FormRow label={'endDate'} error={errors?.endDate?.message} >
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
          name="name"
          label="name"
          isLoading={isLoadingCabins}
          {...register('cabinId', { required: true })}
        />
      </FormRow>
      <FormRow label="Select Guest" error={errors?.guestId?.message}>
        <Select
          id="guestId"
          options={guests}
          name="fullName"
          label="fullName"
          isLoading={isLoadingGuest}

          {...register('guestId', { required: true })}
        />
      </FormRow>
      <FormRow label="No. of Guests" error={errors?.numGuest?.message}>
        <Input
          type="number"
          id="endDate"
          {...register('numGuest', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Breakfast included?" error={errors?.hasBreakfast?.message}>
        <Checkbox
          {...register('hasBreakfast', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label={'Description (optional)'}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="observation"
          defaultValue=""
          {...register('observation')}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
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
