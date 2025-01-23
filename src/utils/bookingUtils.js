export function destructureBookingsForEdit(booking) {
  if (Object.keys(booking).length === 0) return {};

  const startDate = booking.startDate.split('T')[0];
  const endDate = booking.startDate.split('T')[0];
  const {
    id,
    cabins: { id: cabinId },
    guestId,
    hasBreakfast,
    observations,
    isPaid,
  } = booking;
  return {
    id,
    cabinId,
    startDate,
    endDate,
    guestId,
    hasBreakfast,
    isPaid,
    observations,
  };
}
