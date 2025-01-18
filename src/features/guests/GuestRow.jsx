import { Flag } from '../../ui/Flag';
import Table from '../../ui/Table';
import Tag from '../../ui/Tag';

/* eslint-disable react/prop-types */
function GuestRow({ guest }) {
  const status = guest?.bookings[0]?.status;
  const bookingId = guest?.bookings[0]?.id;
  const {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  } = guest;
  return (
    <Table.Row>
      <div>{bookingId}</div>
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationalID}</div>
      <div>{nationality}</div>
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}
      {status === 'checked-out' && <Tag type="indigo">Checked out</Tag>}
      {!status && <Tag type="yellow">no Booking</Tag>}
    </Table.Row>
  );
}

export default GuestRow;
