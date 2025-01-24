/* eslint-disable react/prop-types */
import uuid4 from 'uuid4';
import { Flag } from '../../ui/Flag';
import Menus from '../../ui/Menus';
import SpinnerMini from '../../ui/SpinnerMini';
import Table from '../../ui/Table';
import { useMemo } from 'react';
import styled from 'styled-components';
const StyledDev = styled.div`
  text-align: center;
`;
function SelectedGuestDetails({ guests }) {
  const memoizedGuests = useMemo(() => {
    const guestToArray = [guests];
    if (!guests) return <SpinnerMini />;
    return (
      <StyledDev>
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
              data={guestToArray}
              render={(guest) => <SelectedGuestRow guest={guest} key={uuid4()} />}
            />
          </Table>
        </Menus>
      </StyledDev>
    );
  }, [guests]);

  return memoizedGuests;
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
