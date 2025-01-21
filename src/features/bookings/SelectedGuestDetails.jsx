/* eslint-disable react/prop-types */
import uuid4 from 'uuid4';
import { useGetFetchQuery } from '../../hooks/useGetFetchQuery';
import { Flag } from '../../ui/Flag';
import Menus from '../../ui/Menus';
import SpinnerMini from '../../ui/SpinnerMini';
import Table from '../../ui/Table';
import { useEffect, useState } from 'react';

function SelectedGuestDetails({ filterBy, eqTo }) {
  const guests = useGetFetchQuery(['allGuests']);
  const [selectedGuest, setSelectedGuest] = useState([]);
  useEffect(() => {
    if (!guests?.data) return;
    const selectedGuest = guests?.data?.filter(
      (data) => data[filterBy] === eqTo
    );
    return setSelectedGuest(selectedGuest);
  }, [guests, filterBy, eqTo]);

  if (!guests) return <SpinnerMini />;
  return (
    <Menus>
      <Table columns=" 1fr 1fr 1fr 1fr 0.1fr ">
        <Table.Body
          data={selectedGuest}
          render={(guest) => <SelectedGuestRow guest={guest} key={uuid4()} />}
        />
      </Table>
    </Menus>
  );
}

function SelectedGuestRow({ guest }) {
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
      {/* <div>{bookingId}</div> */}
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationalID}</div>
      <div>{nationality}</div>
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
    </Table.Row>
  );
}

export default SelectedGuestDetails;
