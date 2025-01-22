import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import GuestRow from './GuestRow';
import { useGuests } from './useGuests';


function GuestsTable() {
  const { isLoading, error, guests, count } = useGuests();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns=" 0.7fr 1fr 1.5fr 1fr 1fr 0.3fr 1fr 0.3fr">
        <Table.Header>
          <div>Guest id</div>
          <div>Guest Name</div>
          <div>Email</div>
          <div>NationalId</div>
          <div>Nationality</div>
          <div>Flag</div>
          <div>Status</div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    
    </Menus>
  );
}

export default GuestsTable;
