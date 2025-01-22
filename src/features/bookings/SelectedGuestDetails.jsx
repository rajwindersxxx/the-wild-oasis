/* eslint-disable react/prop-types */
import uuid4 from 'uuid4';
import { Flag } from '../../ui/Flag';
import Menus from '../../ui/Menus';
import SpinnerMini from '../../ui/SpinnerMini';
import Table from '../../ui/Table';
import { useEffect, useState } from 'react';

function SelectedGuestDetails({ filterBy, eqTo, guests }) {
  const [selectedGuest, setSelectedGuest] = useState([]);
  useEffect(() => {
    if (!guests) return;
    const selectedGuest = guests.filter(
      (data) => data[filterBy] === eqTo
    );
    return setSelectedGuest(selectedGuest);
  }, [guests, filterBy, eqTo]);

  if (!guests) return <SpinnerMini />;
  return (
    <Menus>
      <Table columns=" 0.7fr 1fr 1.6fr 1fr 1fr 0.3fr ">
              <Table.Header>
                <div>Guest Id</div>
                <div>Guest Name</div>
                <div>Email</div>
                <div>NationalId</div>
                <div>Nationality</div>
                <div>Flag</div>
              </Table.Header>
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
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
    id:guestId
  } = guest;
  return (
    <Table.Row>
      <div>#{guestId}</div>
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationalID}</div>
      <div>{nationality}</div>
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
    </Table.Row>
  );
}

export default SelectedGuestDetails;
