import AddGuest from '../features/guests/AddGuest';
import GuestsTable from '../features/guests/GuestsTable';
import GuestTableOperations from '../features/guests/GuestTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Guests() {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All Guests</Heading>
        <GuestTableOperations/>
      </Row>
      <Row $type="vertical">
        <GuestsTable />
        <AddGuest/>
      </Row>
    </>
  );
}

export default Guests;
