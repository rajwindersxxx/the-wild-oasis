import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { eachDayOfInterval, format } from 'date-fns';
/* eslint-disable react/prop-types */
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Checkbox from '../../ui/Checkbox';
import Textarea from '../../ui/Textarea';
import SpinnerMini from '../../ui/SpinnerMini';
import SelectedGuestDetails from './SelectedGuestDetails';
import SelectedCabinDetails from './SelectedCabinDetails';

import { useCabins } from '../cabins/useCabins';
import { useAllGuests } from '../guests/useAllGuests';
import { useSettings } from '../settings/useSettings';
import { useFilteredBookings } from './useFilterBookings';
import { useCreateBooking } from './useCreateBooking';
import { getTodayDate } from '../../utils/helpers';
import { destructureBookingsForEdit } from '../../utils/bookingUtils';
import toast from 'react-hot-toast';

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const editData = destructureBookingsForEdit(bookingToEdit);
  const { id: editId, ...editValues } = editData;
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState, watch } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const [cabinId, guestId, startDate, endDate, hasBreakfast, isPaid] = watch([
    'cabinId',
    'guestId',
    'startDate',
    'endDate',
    'hasBreakfast',
    'isPaid',
  ]);
  const [isBooked, setIsBooked] = useState(false);
  const { settings } = useSettings();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isCreatingBookings, createBooking } = useCreateBooking();
  const { isLoading: isLoadingGuests, guests } = useAllGuests();
  const { filteredBookings } = useFilteredBookings(cabinId);

  useEffect(() => {
    if (filteredBookings.length !== 0 && cabinId !== editData.cabinId) {
      const inputDates = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      });
      const bookedDatesList = filteredBookings
        .map((item) =>
          eachDayOfInterval({
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          })
        )
        .flat();
      const result = inputDates.filter((date) => {
        return bookedDatesList.some(
          (outputDate) => outputDate.getTime() === date.getTime()
        );
      });
      setIsBooked(result.length !== 0);
    } else {
      setIsBooked(false);
    }

    queryClient.invalidateQueries(['filteredBookings']);
  }, [
    startDate,
    endDate,
    filteredBookings,
    queryClient,
    setIsBooked,
    cabins,
    cabinId,
    editData.cabinId,
  ]);
  function onSubmit(data) {
    const selectedCabin = cabins.filter((cabin) => (cabin.id = cabinId))[0];
    const totalDays = eachDayOfInterval({
      start: new Date(data.startDate),
      end: new Date(data.endDate),
    }).length;
    const cabinPrice =
      selectedCabin.regularPrice * totalDays - selectedCabin.discount;
    const extraPrice = data.hasBreakfast
      ? settings.breakfastPrice * totalDays
      : 0;
    const newObject = {
      numNights: totalDays,
      numGuests: selectedCabin.maxCapacity,
      cabinPrice: cabinPrice,
      extrasPrice: extraPrice,
      totalPrice: cabinPrice + extraPrice,
    };
    const finalData = { ...data, ...newObject };

    if (isEditSession) {
      createBooking(
        { finalData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            toast.success('Booking updated Successfully');
          },
        }
      );
    } else {
      createBooking(
        { finalData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            toast.success('New Booking has created successfully');
          },
        }
      );
    }
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Select Cabin" error={errors?.cabinId?.message}>
        <Select
          id="cabinId"
          options={cabins}
          label="name"
          optionValue="id"
          isLoading={isLoadingCabins}
          placeHolder="select a Cabin"
          {...register('cabinId', {
            required: 'please select the cabin',
          })}
        />
      </FormRow>
      {cabinId && (
        <SelectedCabinDetails
          filterBy={'id'}
          eqTo={Number(cabinId)}
          cabins={cabins}
        />
      )}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isEditSession}
          min={getTodayDate()}
          {...register('startDate', {
            required: 'Start date is Required',
          })}
        />
      </FormRow>

      <FormRow
        label={'endDate'}
        error={errors?.endDate?.message}
        message={isBooked && `⚠️  Cabin already booked `}
      >
        <Input
          type="date"
          id="endDate"
          min={startDate || getTodayDate()}
          {...register('endDate', {
            required: 'End date is required ',
          })}
          disabled={isEditSession}
        />
      </FormRow>

      <FormRow label="Select Guest" error={errors?.guestId?.message}>
        <Select
          id="guestId"
          options={guests}
          optionValue="id"
          label="fullName"
          placeHolder="select a guest"
          isLoading={isLoadingGuests}
          {...register('guestId', {
            required: 'Please select the guest',
          })}
        />
      </FormRow>
      {guestId && (
        <SelectedGuestDetails
          filterBy="id"
          eqTo={Number(guestId)}
          guests={guests}
        />
      )}
      <FormRow
        label="Breakfast included?"
        error={errors?.hasBreakfast?.message}
      >
        <Checkbox id="hasBreakfast" {...register('hasBreakfast')}>
          {hasBreakfast > 0 && 'breakfast added'}
        </Checkbox>
      </FormRow>
      <FormRow label="Payment done?" error={errors?.isPaid?.message}>
        <Checkbox id="isPaid" {...register('isPaid')}>
          {isPaid > 0 && 'payment added'}
        </Checkbox>
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
        <Button disabled={isBooked}>
          {!isCreatingBookings &&
            (isEditSession ? 'Edit Guest' : 'Create new Booking')}
          {isCreatingBookings && <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
