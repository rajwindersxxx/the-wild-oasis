/* eslint-disable react/prop-types */
import GuestRow from '../features/guests/GuestRow';
import Menus from './Menus';
import SpinnerMini from './SpinnerMini';
import Table from './Table';

function CreateGuestDetail({ guests }) {
  if (!guests) return <SpinnerMini />;

  return (
    <Menus>
      <Table columns=" 0.6fr 1fr 1.5fr 1fr 1fr 0.3fr 1fr">
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CreateGuestDetail;
