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
import { eachDayOfInterval } from 'date-fns';
import { useSettings } from '../settings/useSettings';
import SelectedGuestDetails from './SelectedGuestDetails';
import SelectedCabinDetails from './SelectedCabinDetails';
import { useCreateBooking } from './useCreateBooking';
function CreateBookingForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isLoadingGuests, guests } = useAllGuests();
  const { createBooking, isCreating } = useCreateBooking()
  const { settings } = useSettings();
  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const [cabinId, guestId] = watch(['cabinId', 'guestId']);

  function onSubmit(data) {
    const selectedCabin = cabins.filter((cabin) => (cabin.id = cabinId));
    const datesBetween = eachDayOfInterval({
      start: new Date(data.startDate),
      end: new Date(data.endDate),
    });
    const cabinPrice =
      selectedCabin[0].regularPrice * datesBetween.length -
      selectedCabin[0].discount;
    const extraPrice = data.hasBreakfast
      ? settings.breakfastPrice * datesBetween.length
      : 0;
    const newObject = {
      numNights: datesBetween.length,
      numGuests: selectedCabin[0].maxCapacity,
      cabinPrice: cabinPrice,
      extrasPrice: extraPrice,
      totalPrice: cabinPrice + extraPrice,
    };
    const finalData = { ...data, ...newObject };
    createBooking(finalData)
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
          optionValue="id"
          isLoading={isLoadingCabins}
          {...register('cabinId', { required: true })}
        />
      </FormRow>
      <SelectedCabinDetails filterBy={'id'} eqTo={Number(cabinId)} />
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
      <SelectedGuestDetails filterBy="id" eqTo={Number(guestId)} />
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
          id="observations"
          defaultValue=""
          {...register('observations')}
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
